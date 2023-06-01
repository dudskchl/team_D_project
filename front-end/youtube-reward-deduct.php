<?php
// Retrieve the userID and numofstickers values from the query parameters
$userID = $_GET['userID'];
$numofstickers = $_GET['numofstickers'];

// Connect to your MySQL database (replace with your actual database credentials)
$servername = "127.0.0.1";
$username = "root";
$password = "changethis";
$dbname = "capstonedesign";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform the deduction operation in the database
$sql = "UPDATE users SET numofstickers = $numofstickers WHERE userID = '$userID'";

if ($conn->query($sql) === TRUE) {
    echo "success"; // Return a success message to indicate the update was successful
} else {
    echo "error"; // Return an error message if the update failed
}

$conn->close();
?>
