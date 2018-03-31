<?php
require_once __DIR__ . '/DBService.php';
require_once __DIR__ . '/TokenGenerator.php';

// include './php/startup.php';
class OrderService {

  private $db;

  private $g;

  private $tokenGenerator;

  public function __construct() {
    $this->db = new DBService();
    $this->g = md5("guest123@nowhere.none");
    $this->tokenGenerator = new TokenGenerator("abHkl0ndike");
  }

  private function generateToken() {
    return $this->tokenGenerator->generate();
  }

  private function createNewCart() {
    $token = $this->generateToken();
    // // 1. Cookie
    // $cookie->setCookie( "f_" . $this->g, $token, time() + 60 * 60 * 24 * 30 );
    // 2. DB
    $dbh = $this->db->createPDOConnection();
    try {
      $stmt = $dbh->prepare("insert into carts (token) values (?)");
      $dbh->beginTransaction();
      $stmt->execute(array($token));
      $cartId = $dbh->lastInsertId();
      $this->updateCart($cartId, $dbh);
      $dbh->commit();
      echo '{"cn": "c_' . $this->g . '", "cv": "' . $token . '"}';
    } catch ( Exception $e ) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }

  public function findCart($tokenStr) {
    $dbh = $this->db->createPDOConnection();
    $q = $dbh->query('select id from carts where token = "' . $tokenStr . '"');
    $row = $q->fetch(PDO::FETCH_OBJ);
    if ($row)
      return $row->id;
    else
      return null;
  }

  public function nextId($tableName) {
    $dbh = $this->db->createPDOConnection();
    $q = $dbh->query('select min, max, last_id from increments where table_name = "' . $tableName . '"');
    // SELECT * FROM `increments` WHERE `table_name` LIKE 'orders'
    $row = $q->fetch(PDO::FETCH_OBJ);
    $nextId = $row->last_id + rand($row->min, $row->max);
    
    $stmt = $dbh->prepare("update increments set last_id = ? where table_name = ?");
    $stmt->execute(array($nextId, $tableName));
    
    return $nextId;
  }

  public function readCartOnly($tokenStr) {
    $dbh = $this->db->createPDOConnection();
    $q = $dbh->query('select * from carts where token = "' . $tokenStr . '"');
    $row = $q->fetch(PDO::FETCH_OBJ);
    if ($row)
      return $row;
    else
      return null;
  }

  private function updateOrderStatuses() {
    try {
      $rest_json = file_get_contents("php://input");
      $body = json_decode($rest_json, true);
      $ids = '' . implode(', ', $body ['orderIds']);
      
      $dbh = $this->db->createPDOConnection();
      
      $sql = 'update orders set status = "' . $body ['status'] . '" where id in (' . $ids . ')';
      // $stmt = $dbh->prepare("update orders set status = ? where id in (?)");
      $dbh->exec($sql);
      // $stmt->execute(array($body ['status'], $ids));
    } catch ( Exception $e ) {
      // echo 'Message: ' .$e->getMessage();
      echo '{"result":"error", "message": "' . $e->getMessage() . '" }';
    }
    
    // echo json_encode($ids);
    echo '{"result":"ok"}';
  }

  private function updateCart($cartId, $dbh) {
    $rest_json = file_get_contents("php://input");
    $p = json_decode($rest_json, true);
    
    // shipping data
    // [shippingData] => [[name] => Zhivko Hristov, [phone] => 887362619, [editShipping] => false, [touched] => true,
    // [address] => 2B 488th Str., [email] => zhristov@gmail.com],
    // [paymentData] => [[methodOfPayment] => cash, [editPayment] => true, [touched] => false]]
    
    if (isset($p ['shippingData'])) {
      $s = $p ['shippingData'];
      
      $stmt = $dbh->prepare("update carts set name = ?, phone = ?, address = ?, email = ?, methodOfPayment = ?" . ", wantInvoice = ?, invoiceInfo = ? where id = ?");
      $address = isset($s ['address']) ? $s ['address'] : '';
      $email = isset($s ['email']) ? $s ['email'] : '';
      $wantInvoice = isset($s ['wantInvoice']) ? ($s ['wantInvoice'] == 'true' ? 1 : 0) : 0;
      $invoiceInfo = isset($s ['invoiceInfo']) ? $s ['invoiceInfo'] : '';
      $method = isset($p ['paymentData']) ? $p ['paymentData'] ['methodOfPayment'] : '';
      $stmt->execute(array($s ['name'], $s ['phone'], $address, $email, $method, $wantInvoice, $invoiceInfo, $cartId));
    }
    
    // items
    
    // [[items] => [[0] => [[product] => 28, [quantity] => 2], [1] => [[product] => 29, [quantity] => 4]]]
    $stmt = $dbh->prepare("delete from cart_items where cart_id = ?");
    $stmt->execute(array($cartId));
    // todo insert
    $items = $p ['items'];
    $pos = 1;
    foreach ( $items as $i => $item ) {
      $stmt = $dbh->prepare("insert into cart_items (cart_id, product_id, quantity, pos) values (?, ?, ?, ?)");
      $stmt->execute(array($cartId, $item ['product'], $item ['quantity'], $pos ++));
    }
  }

  private function getCartIds() {
    $cartIds = new stdClass();
    $cartIds->token = null;
    $cartIds->id = null;
    
    foreach ( $_COOKIE as $name => $value ) {
      if ($name === 'c_' . $this->g) {
        $cartIds->token = $value;
        $cartIds->id = $this->findCart($value);
        break;
      }
    }
    return $cartIds;
  }

  public function createOrUpdateCart() {
    $cartIds = $this->getCartIds();
    if ($cartIds->token !== null && $cartIds->token !== '') {
      // we have already cookie
      if ($cartIds->id != null) {
        // update all items -> delete and insert new OR analyse and update/delete/add
        $dbh = $this->db->createPDOConnection();
        try {
          $dbh->beginTransaction();
          $this->updateCart($cartIds->id, $dbh);
          $dbh->commit();
          echo '{"cn": "c_' . $this->g . '", "cv": "' . $cartIds->token . '"}';
        } catch ( Exception $e ) {
          // TODO handle the error
          $dbh->rollBack();
        }
      } else {
        // cart not found. Abandon this cookie and start over
        $this->createNewCart();
      }
    } else {
      // no cookie, then create new cart
      $this->createNewCart();
    }
  }

  public function finalize() {
    $rest_json = file_get_contents("php://input");
    $p = json_decode($rest_json, true);
    $s = $p ['shippingData'];
    
    // shipping data
    // [shippingData] => [[name] => Zhivko Hristov, [phone] => 887362619, [editShipping] => false, [touched] => true,
    // [address] => 2B 488th Str., [email] => zhristov@gmail.com],
    // [paymentData] => [[methodOfPayment] => cash, [editPayment] => true, [touched] => false]]
    
    $dbh = $this->db->createPDOConnection();
    try {
      $address = isset($s ['address']) ? $s ['address'] : '';
      $email = isset($s ['email']) ? $s ['email'] : '';
      $wantInvoice = isset($s ['wantInvoice']) ? ($s ['wantInvoice'] == 'true' ? 1 : 0) : 0;
      $invoiceInfo = isset($s ['invoiceInfo']) ? $s ['invoiceInfo'] : '';
      $method = isset($p ['paymentData']) ? $p ['paymentData'] ['methodOfPayment'] : '';
      
      $orderId = $this->nextId("orders");
      
      $dbh->beginTransaction();
      $stmt = $dbh->prepare("insert into orders (id, status, name, phone, address, email, methodOfPayment, wantInvoice, invoiceInfo) " . "values (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      $stmt->execute(array($orderId, $p ['status'], $s ['name'], $s ['phone'], $address, $email, $method, $wantInvoice, $invoiceInfo));
      // $orderId = $dbh->lastInsertId();
      
      $items = $p ['items'];
      $pos = 1;
      foreach ( $items as $i => $item ) {
        $stmt = $dbh->prepare("insert into order_items (order_id, product_id, quantity, pos) values (?, ?, ?, ?)");
        $stmt->execute(array($orderId, $item ['product'], $item ['quantity'], $pos ++));
      }
      
      // delete the cart
      $cartIds = $this->getCartIds();
      $stmt = $dbh->prepare("delete from carts where id = ?");
      $stmt->execute(array($cartIds->id));
      
      $stmt = $dbh->prepare("delete from cart_items where cart_id = ?");
      $stmt->execute(array($cartIds->id));
      
      $dbh->commit();
      
      echo '{"cn": "c_' . $this->g . '", "orderId": "' . $orderId . '"}';
    } catch ( Exception $e ) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }

  public function readCart() {
    $cart = new stdClass();
    $cart->items = array();
    
    $token = null;
    foreach ( $_COOKIE as $name => $value ) {
      if ($name === 'c_' . $this->g) {
        $token = $value;
        break;
      }
    }
    if ($token !== null && $token !== '') {
      // we have already cookie
      $cartObj = $this->readCartOnly($token);
      // do we have a record in db?
      if ($cartObj != null) {
        $cartObj->items = array();
        $dbh = $this->db->createPDOConnection();
        $q = $dbh->query('select * from cart_items where cart_id = ' . $cartObj->id . ' order by pos');
        $row = $q->fetch(PDO::FETCH_OBJ);
        $rows = array();
        while ( $row ) {
          $rows [] = $row;
          $row = $q->fetch(PDO::FETCH_OBJ);
        }
        
        $cart->items = $rows;
        
        // $cart = $cartObj;
        
        $cart->cartData = $cartObj;
        
        // [shippingData] => [[name] => Zhivko Hristov, [phone] => 887362619, [editShipping] => false, [touched] => true, [address] => 2B 488th Str., [email] => zhristov@gmail.com],
        // [paymentData] => [[methodOfPayment] => cash, [editPayment] => true, [touched] => false]]
      }
    }
    print json_encode($cart);
  }

  public function readAll() {
    $orders = new stdClass();
    
    $dbh = $this->db->createPDOConnection();
    
    // $q = $dbh->query('select o.*, p.name as "product_name", oi.quantity, p.price from orders o, order_items oi, products p where o.id = oi.order_id and p.id = oi.product_id order by o.id, oi.pos');
    $q = $dbh->query('select o.*, oi.* from orders o, order_items oi where o.id = oi.order_id order by o.created DESC, o.id, oi.pos');
    
    $row = $q->fetch(PDO::FETCH_OBJ);
    //$rows = array();
    while ( $row ) {
      //$rows [] = $row;
      
      if (! isset($orders->{$row->id})) {
        $order = clone ($row);
        $order->items = array();
        $order->created = $order->created;
        $order->created2 = date_format(date_create($order->created), 'c');
        unset($order->product_id);
        unset($order->pos);
        unset($order->quantity);
        unset($order->order_id);
        unset($order->adjustment);
        // $order = new stdClass();
        // $order->id = $row->id;
        // $order->status = $row->status;
        // $order->created = $row->created;
        // $order->name = $row->name;
        // $order->phone = $row->phone;
        // $order->address = $row->address;
        
        // push it to array
        $orders->{$row->id} = $order;
      }
      
      $item = new stdClass();
      $item->product_id = $row->product_id;
      $item->pos = $row->pos;
      $item->quantity = $row->quantity;
      // TODO adjustment
      $orders->{$row->id}->items [] = $item;
      
      // fetch next
      $row = $q->fetch(PDO::FETCH_OBJ);
    }
    
    echo json_encode(array_values(( array ) $orders));
  }

  public function read($id) {
    //$orders = new stdClass();
    
    $dbh = $this->db->createPDOConnection();
    
    // $q = $dbh->query('select o.*, p.name as "product_name", oi.quantity, p.price from orders o, order_items oi, products p where o.id = oi.order_id and p.id = oi.product_id order by o.id, oi.pos');
    $q = $dbh->query('select o.*, oi.* from orders o, order_items oi where o.id = oi.order_id and o.id = ' . $id . ' order by o.created DESC, o.id, oi.pos' );
    
    $row = $q->fetch(PDO::FETCH_OBJ);
    //$rows = array();
    $order = null;
    while ( $row ) {
      //$rows [] = $row;
      
      //if (! isset($orders->{$row->id})) {
      if ($order == null) {
        $order = clone ($row);
        $order->items = array();
        $order->created = $order->created;
        $order->created2 = date_format(date_create($order->created), 'c');
        unset($order->product_id);
        unset($order->pos);
        unset($order->quantity);
        unset($order->order_id);
        unset($order->adjustment);
        // $order = new stdClass();
        // $order->id = $row->id;
        // $order->status = $row->status;
        // $order->created = $row->created;
        // $order->name = $row->name;
        // $order->phone = $row->phone;
        // $order->address = $row->address;
        
        // push it to array
        //$orders->{$row->id} = $order;
      }
      
      $item = new stdClass();
      $item->product_id = $row->product_id;
      $item->pos = $row->pos;
      $item->quantity = $row->quantity;
      // TODO adjustment
      //$orders->{$row->id}->items [] = $item;
      $order->items[] = $item;
      // fetch next
      $row = $q->fetch(PDO::FETCH_OBJ);
    }
    
    //echo json_encode(array_values(( array ) $orders));
    echo json_encode($order);
  }

  private function getPath() {
    $request = isset($_SERVER ['PATH_INFO']) ? $_SERVER ['PATH_INFO'] : '';
    if (! $request) {
      $request = isset($_SERVER ['ORIG_PATH_INFO']) ? $_SERVER ['ORIG_PATH_INFO'] : '';
      $request = $request != $_SERVER ['SCRIPT_NAME'] ? $request : '';
    }
    return $request;
  }

  private function parseRequestParameter(&$request, $characters) {
    if ($request === '')
      return false;
    $pos = strpos($request, '/');
    $value = $pos ? substr($request, 0, $pos) : $request;
    $request = $pos ? substr($request, $pos + 1) : '';
    if (! $characters)
      return $value;
    return preg_replace("/[^$characters]/", '', $value);
  }

  public function processRequest() {
    $request = $this->getPath();
    $pos = strpos($request, '/');
    if ($pos == 0) {
      $request = substr($request, 1);
    }
    $action = $this->parseRequestParameter($request, 'a-zA-Z0-9\-_');
    $id = $this->parseRequestParameter($request, 'a-zA-Z0-9\-_,');
    
    if ($action === 'create') {
      // echo 'CREATE';
      $this->createOrUpdateCart();
    } else if ($action === 'read') {
      if ($id) {
        $this->read($id);
      } else {
        $this->readAll();
      }
    } else if ($action === 'finalize') {
      $this->finalize();
    } else if ($action === 'updateorderstatuses') {
      $this->updateOrderStatuses();
    } else {
      echo 'TODO';
    }
  }

}
$service = new OrderService();
$service->processRequest();
?>