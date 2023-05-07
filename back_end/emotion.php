<?php
// PHP code for handling the emotion request


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $userID = $_POST["userID"];
  var_dump($userID);

  // Establish a database connection
  $servername = "127.0.0.1";
  $username = "root";
  $password = "changethis";
  $dbname = "capstonedesign";

  // Create a connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check the connection
  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }

  // Prepare the SQL update statement
  $sqlUpdate = 'UPDATE users SET numofstickers = numofstickers + 1 WHERE userid = ?';

  // Create a prepared statement
  $stmt = $conn->prepare($sqlUpdate);

  // Bind the user ID parameter
  $stmt->bind_param('s', $userID); // Assuming the user ID is of type string, modify 's' if needed

  // Execute the statement
  if ($stmt->execute()) {
    $response = 'Update successful'; // Modify the response as needed
  } else {
    $response = 'Update failed'; // Modify the response as needed
  }

  // Close the statement and connection
  $stmt->close();
  $conn->close();

  // Send the response
  echo $response;
}
?>
