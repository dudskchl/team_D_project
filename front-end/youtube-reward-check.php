<?php
$servername = "127.0.0.1";
$username = "root";
$password = "changethis";
$dbname = "capstonedesign";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$userID = $_GET["userID"];

// Query to retrieve the numofstickers and favcharacter from the users table
$query = "SELECT numofstickers FROM users WHERE userID = '$userID'";
$result = mysqli_query($conn, $query);

if ($result) {
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $numofapples = $row['numofstickers'];

    // Return the numofapples and favcharacter values as a comma-separated string
    echo $numofapples;
  } else {
    // User not found or no data available
    echo '0,'; // Return 0 as the default numofapples value and an empty favcharacter value
  }
} else {
  // Error executing the query
  echo '0,'; // Return 0 as the default numofapples value and an empty favcharacter value
}

$conn->close();
?>
