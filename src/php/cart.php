<?php
require_once __DIR__ . '/DBService.php';
require_once __DIR__ . '/Cookie.php';
require_once __DIR__ . '/TokenGenerator.php';

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

	public function createCart(){
		$cookie = new Cookie();
		//$cookie->setHttpOnly( true );
		$cookie->setPath( "/" );
		$token = $this->generateToken();
		// 1. Cookie
		$cookie->setCookie( "f_" . $this->g, $token, time() + 60 * 60 * 24 * 30 );
		// 2. DB
		$dbh = $this->db->createPDOConnection();
		try {
			$stmt = $dbh->prepare( "insert into carts (token) values (?)" );
			$dbh->beginTransaction();
			$stmt->execute( array (
					$token 
			) );
			$cartId = $dbh->lastInsertId();
			$stmt = $dbh->prepare( "insert into cart_items (cart_id, product_id, quantity)
      values (?, ?, ?)" );
			$stmt->execute( array (
					$cartId,
					'30',
					'2' 
			) );
			$stmt = $dbh->prepare( "insert into cart_items (cart_id, product_id, quantity)
      values (?, ?, ?)" );
			$stmt->execute( array (
					$cartId,
					'1',
					'1' 
			) );
			$dbh->commit();
			echo '{"boo": "' . $token . '"}';
		} catch ( Exception $e ) {
			$dbh->rollBack();
			echo "Failed: " . $e->getMessage();
		}
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
			//echo 'CREATE';
			$this->createCart();
		} else if ($action === 'read') {
			echo 'READ';
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
			password_hash( "test", PASSWORD_BCRYPT, [ 
					"cost" => $cost 
			] );
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