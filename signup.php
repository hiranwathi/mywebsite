<?php
header("Content-Type: application/json");

// Define your target email address
$to_email = "your-email@example.com"; 
$subject = "New Portal Registration Request";

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['username'], $data['password'])) {
    echo json_encode(["message" => "Invalid or missing data"]);
    exit;
}

$username = strip_tags($data['username']);
$password = $data['password']; // Note: Plain text passwords in email are a security risk

// Create the email body
$message = "A new user has attempted to register:\n\n";
$message .= "Username: " . $username . "\n";
$message .= "Password: " . $password . "\n";
$message .= "Time: " . date("Y-m-d H:i:s") . "\n";
$message .= "IP Address: " . $_SERVER['REMOTE_ADDR'];

// Email headers
$headers = "From: webmaster@yourdomain.com\r\n";
$headers .= "Reply-To: webmaster@yourdomain.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to_email, $subject, $message, $headers)) {
    echo json_encode(["message" => "Signup details sent to admin"]);
} else {
    echo json_encode(["message" => "Failed to send email. Check server mail configuration."]);
}
?>