<?php
/**
 * This example shows making an SMTP connection with authentication.
 */

// Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\EmailTemplate;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
require 'EmailTemplate.php';

// SMTP needs accurate times, and the PHP time zone MUST be set
// This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

// require '../vendor/autoload.php';

// Create a new PHPMailer instance
$mail = new PHPMailer();
// Tell PHPMailer to use SMTP
$mail->isSMTP();
// Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
// Set the hostname of the mail server
$mail->Host = 'mail.craftsbox.eu';
// Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 26;
// Whether to use SMTP authentication
$mail->SMTPAuth = true;
// Username to use for SMTP authentication
$mail->Username = 'info@craftsbox.eu';
// Password to use for SMTP authentication
$mail->Password = 'Gogaasha300#';

$mail->CharSet = "utf-8";
// Set who the message is to be sent from
$mail->setFrom('info@craftsbox.eu', 'КрафтсБокс');
// Set an alternative reply-to address
$mail->addReplyTo('info@craftsbox.eu', 'КрафтсБокс');

$rest_json = file_get_contents("php://input");
$body = json_decode($rest_json, true);

$email = $body ['email'];
$subject = $body ['subject'];
$message = 'no message provided!';
if (isset($body ['message'])) {
  $message = $body ['message'];
  $mail->Body = $message;
} elseif (isset($body ['templateFile'])) {
  
  $templateFile = $body ['templateFile'];
  
  $template = new EmailTemplate($templateFile);
  $template->orderId = 123456;
  if (isset($body ['variables'])) {
    $template->putAll($body ['variables']);
  }
  $content = $template->compile();
  
  $mail->msgHTML($content);
  
  // $mail->msgHTML(file_get_contents($templateFile), __DIR__);
}
// Set who the message is to be sent to
$mail->addAddress($email);

// Set the subject line

$mail->Subject = $subject;
// Read an HTML message body from an external file, convert referenced images to embedded,
// convert HTML into a basic plain-text alternative body
// Replace the plain text body with one created manually
// Attach an image file
// $mail->addAttachment('images/phpmailer_mini.png');

// send the message, check for errors
if (! $mail->send()) {
  echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
  echo 'Message sent!';
}

?>
