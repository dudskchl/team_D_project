<?php
  $servername = "127.0.0.1";
  $username = "root";
  $password = "1234";
  $dbname = "capstonedesign";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $userID = $_GET["userID"];

  $sql = "SELECT numofstickers FROM users WHERE userid = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $userID);
  $stmt->execute();
  $stmt->bind_result($numofstickers);
  $stmt->fetch();

  echo $numofstickers;

  $stmt->close();
  $conn->close();
?>
