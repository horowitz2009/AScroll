<?php
require_once __DIR__ . '/php/DBService.php';
// require_once __DIR__ . '/php/Cookie.php';
require_once __DIR__ . '/php/TokenGenerator.php';

// include './php/startup.php';
class CartService {

	private $db;

	private $g;

	private $tokenGenerator;

	public function __construct(){
		$this->db = new DBService();
		$this->g = md5( "guest123@nowhere.none" );
		$this->tokenGenerator = new TokenGenerator( "abHkl0ndike" );
	}

	private function generateToken(){
		return $this->tokenGenerator->generate();
	}

	private function createNewCart(){
		$token = $this->generateToken();
		// // 1. Cookie
		// $cookie->setCookie( "f_" . $this->g, $token, time() + 60 * 60 * 24 * 30 );
		// 2. DB
		$dbh = $this->db->createPDOConnection();
		try {
			$stmt = $dbh->prepare( "insert into carts (token) values (?)" );
			$dbh->beginTransaction();
			$stmt->execute( array ($token ) );
			$cartId = $dbh->lastInsertId();
			$this->updateItems( $cartId, $dbh );
			$dbh->commit();
			echo '{"cn": "c_' . $this->g . '", "cv": "' . $token . '"}';
		} catch ( Exception $e ) {
			$dbh->rollBack();
			echo "Failed: " . $e->getMessage();
		}
	}

	public function findCart($tokenStr){
		$dbh = $this->db->createPDOConnection();
		$q = $dbh->query( 'select id from carts where token = "' . $tokenStr . '"' );
		$row = $q->fetch( PDO::FETCH_OBJ );
		if ($row)
			return $row->id;
		else
			return null;
	}

	private function updateItems($cartId, $dbh){
		$rest_json = file_get_contents( "php://input" );
		$p = json_decode( $rest_json, true );
		// [[items] => [[0] => [[product] => 28, [quantity] => 2], [1] => [[product] => 29, [quantity] => 4]]]
		$stmt = $dbh->prepare( "delete from cart_items where cart_id = ?" );
		$stmt->execute( array ($cartId ) );
		// todo insert
		$items = $p ['items'];
		$pos = 1;
		foreach ( $items as $i => $item ) {
			$stmt = $dbh->prepare( "insert into cart_items (cart_id, product_id, quantity, pos) values (?, ?, ?, ?)" );
			$stmt->execute( array ($cartId,$item ['product'],$item ['quantity'], $pos++ ) );
		}
	}

	public function createCart(){
		$token = null;
		foreach ( $_COOKIE as $name => $value ) {
			if ($name === 'c_' . $this->g) {
				$token = $value;
				break;
			}
		}
		if ($token !== null && $token !== '') {
			// we have already cookie
			$cartId = $this->findCart( $token );
			// do we have a record in db?
			if ($cartId != null) {
				// update all items -> delete and insert new OR analyse and update/delete/add
				$dbh = $this->db->createPDOConnection();
				try {
					$dbh->beginTransaction();
					$this->updateItems( $cartId, $dbh );
					$dbh->commit();
					echo '{"cn": "c_' . $this->g . '", "cv": "' . $token . '"}';
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

	public function readCart(){
		$cart = new stdClass();
		$cart->items = array ();
		$token = null;
		foreach ( $_COOKIE as $name => $value ) {
			if ($name === 'c_' . $this->g) {
				$token = $value;
				break;
			}
		}
		if ($token !== null && $token !== '') {
			// we have already cookie
			$cartId = $this->findCart( $token );
			// do we have a record in db?
			if ($cartId != null) {
				$dbh = $this->db->createPDOConnection();
				$q = $dbh->query( 'select * from cart_items where cart_id = ' . $cartId . ' order by pos' );
				$row = $q->fetch( PDO::FETCH_OBJ );
				$rows = array ();
				while ( $row ) {
					$rows [] = $row;
					$row = $q->fetch( PDO::FETCH_OBJ );
				}
				$cart->items = $rows;
			}
		}
		print json_encode( $cart );
	}

	public function getPath(){
		$request = isset( $_SERVER ['PATH_INFO'] ) ? $_SERVER ['PATH_INFO'] : '';
		if (! $request) {
			$request = isset( $_SERVER ['ORIG_PATH_INFO'] ) ? $_SERVER ['ORIG_PATH_INFO'] : '';
			$request = $request != $_SERVER ['SCRIPT_NAME'] ? $request : '';
		}
		return $request;
	}

	public function processRequest(){
		$action = $this->getPath();
		$action = str_replace( '/', '', $action );
		if ($action === '') {
			$action = 'read';
		}
		if ($action === 'create') {
			// echo 'CREATE';
			$this->createCart();
		} else if ($action === 'read') {
			$this->readCart();
		} else {
			echo 'TODO';
		}
	}

	public function shaTest1(){
		$timeTarget = .15; // 50 milliseconds
		$cost = 8;
		do {
			$cost ++;
			$start = microtime( true );
			password_hash( "test", PASSWORD_BCRYPT, [ "cost" => $cost ] );
			$end = microtime( true );
		} while ( ($end - $start) < $timeTarget );
		echo "Appropriate Cost Found: " . $cost . '<BR>';
		$start = microtime( true );
		$s = '';
		for($i = 0; $i < 100; $i ++) {
			$s = $s . password_hash( "rasmuslerdorf", PASSWORD_DEFAULT );
		}
		$end = microtime( true );
		echo $s;
		echo "<BR>TIME: " . ($end - $start) . '<BR>';
		$s = '';
		$start = microtime( true );
		for($i = 0; $i < 100; $i ++) {
			$s = $s . sha1( "rasmuslerdorf" );
		}
		$end = microtime( true );
		echo $s;
		echo "<BR>TIME: " . ($end - $start) . '<BR>';
		$s = '';
		$start = microtime( true );
		for($i = 0; $i < 100; $i ++) {
			$s = $s . md5( "rasmuslerdorf" );
		}
		$end = microtime( true );
		echo $s;
		echo "<BR>TIME: " . ($end - $start) . '<BR>';
		// echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT) . '<BR>';
		// echo sha1("rasmuslerdorf");
	}

	public function shaTest2(){
		$s = "guest123@nowhere.none";
		echo "c_" . sha1( $s ) . "<br>";
		echo sha1( $s ) . "<br>";
		echo sha1( $s ) . "<br>";
		echo md5( $s ) . "<br>";
		echo md5( $s ) . "<br>";
		echo md5( $s, true ) . "<br>";
	}

}
$service = new CartService();
$service->processRequest();
// $service->shaTest1();
?>