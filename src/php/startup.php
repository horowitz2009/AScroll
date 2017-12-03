<?php

//////include __DIR__.'/init_auth.php';

// handle errors with exceptions
function exception_error_handler($severity, $message, $file, $line) {
  if (! (error_reporting () & $severity)) {
    // This error code is not included in error_reporting
    return;
  }
  throw new ErrorException ( $message, 0, $severity, $file, $line );
}

set_error_handler ( "exception_error_handler" );

$useremail = false;

//void session_set_cookie_params ( int $lifetime [, string $path [, string $domain [, bool $secure = false [, bool $httponly = false ]]]] )
//session_set_cookie_param (30 * 60);

// First, we initialize the session, to see if we are already logged in
session_start();

/* Secure against Session Hijacking by checking user agent */
if (isset($_SESSION['HTTP_USER_AGENT'])) {
  if ($_SESSION['HTTP_USER_AGENT'] != md5($_SERVER['HTTP_USER_AGENT'])) {
    $this->signout();
    exit;
  }
}

//////checkCookies();

?>