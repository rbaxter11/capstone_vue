<?php
/* RECAPTCHA REMOTE PROCESS */
if (!isset($_SESSION)) session_start();
include 'recaptcha/autoload.php';
include 'settings/settings.php';
	
$reCaptchaResponse = strip_tags(trim($_REQUEST["g-recaptcha-response"]));

$reCaptcha = new \ReCaptcha\ReCaptcha($secretKey);
$response = $reCaptcha->verify($reCaptchaResponse,$userIP);

if($response->isSuccess()) {
	echo 'true';
} else {
	echo 'false';
}
?>