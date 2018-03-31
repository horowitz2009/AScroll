<?php

class MailService {

  public function sendMail() {
    try {
      $rest_json = file_get_contents("php://input");
      $body = json_decode($rest_json, true);
      $email = $body ['email'];
      $subject = $body ['subject'];
      $message = $body ['message'];
      
      $headers = 'From: info@craftsbox.eu\r\nReply-To: no-reply@craftsbox.eu';
      
      $code = mail($email, $subject, $message, $headers);
      
      $res = new stdClass();
      $res->code = $code;
      echo json_encode($res);
    } catch ( Exception $e ) {
      // echo 'Message: ' .$e->getMessage();
      echo '{"result":"error", "message": "' . $e->getMessage() . '" }';
    }
  }

}

$service = new MailService();
$service->sendMail();

?>