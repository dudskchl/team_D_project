<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["favcharacter"], $_POST["favsnack"], $_POST["userID"])) {
        $favcharacter = $_POST["favcharacter"];
        $favsnack = $_POST["favsnack"];
        $userID = $_POST["userID"];

        // Establish a database connection
        $servername = "127.0.0.1";
        $username = "root";
        $password = "changethis";
        $dbname = "capstonedesign";
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare the SQL update statement
        $sqlUpdate = 'UPDATE users SET favcharacter = ?, favsnack = ? WHERE userid = ?';

        // Create a prepared statement
        $stmt = $conn->prepare($sqlUpdate);

        // Bind the parameters
        $stmt->bind_param('sss', $favcharacter, $favsnack, $userID);

        // Execute the update query
        if ($stmt->execute()) {
            echo "Update successful.";
        } else {
            echo "Update failed: " . $stmt->error;
        }

        // Close the database connection
        $stmt->close();
        $conn->close();
    }
}
?>
