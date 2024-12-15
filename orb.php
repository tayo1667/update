<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Database Connection
$host = 'localhost'; // Change to your database host
$user = 'root'; // Change to your database username
$password = ''; // Change to your database password
$dbname = 'test_db'; // Change to your database name

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to send verification email
function sendVerificationEmail($recipientEmail, $verificationCode) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'orbytpay1@gmail.com'; // Replace with your email
        $mail->Password = 'Toluwan1'; // Replace with your email password or app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('your_email@gmail.com', 'Your App Name');
        $mail->addAddress($recipientEmail);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification';
        $mail->Body    = "Your verification code is: <b>$verificationCode</b>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}
function generateVerificationCode() {
    return bin2hex(random_bytes(4)); 
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register'])) {
    $email = $_POST['email'];
    $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkEmailQuery);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Email is already registered.";
    } else {
        $verificationCode = generateVerificationCode();

        // Insert user and verification code into database
        $insertQuery = "INSERT INTO users (email, verification_code, is_verified) VALUES (?, ?, 0)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param('ss', $email, $verificationCode);

        if ($stmt->execute()) {
            if (sendVerificationEmail($email, $verificationCode)) {
                echo "Verification email sent! Please check your inbox.";
            } else {
                echo "Failed to send verification email.";
            }
        } else {
            echo "Error registering user.";
        }
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['verify'])) {
    $email = $_POST['email'];
    $verificationCode = $_POST['verification_code'];
    $verifyQuery = "SELECT * FROM users WHERE email = ? AND verification_code = ?";
    $stmt = $conn->prepare($verifyQuery);
    $stmt->bind_param('ss', $email, $verificationCode);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $updateQuery = "UPDATE users SET is_verified = 1 WHERE email = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param('s', $email);
        if ($stmt->execute()) {
            echo "Your email has been verified!";
        } else {
            echo "Error verifying email.";
        }
    } else {
        echo "Invalid verification code.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h1>Register</h1>
    <form method="POST">
        <input type="email" name="email" placeholder="Enter your email" required>
        <button type="submit" name="register">Register</button>
    </form>

    <h1>Verify Email</h1>
    <form method="POST">
        <input type="email" name="email" placeholder="Enter your email" required>
        <input type="text" name="verification_code" placeholder="Enter verification code" required>
        <button type="submit" name="verify">Verify</button>
    </form>
</body>
</html>
