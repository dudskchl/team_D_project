<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    // Initialize variables with form data
    $userID = $_POST["userID"];
    $userPassword = $_POST["userPassword"];

    // Check if the inputs are not empty
    if (empty($userID) || empty($userPassword))
    {?>
        <script> alert("Please enter both userid and password."); location.href="http://localhost/login.html"; </script> 
    <?php
    } 
 

    // Connect to the database
    $servername = "127.0.0.1";
    $username = "root";
    $password = "changethis";
    $dbname = "capstonedesign";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute SQL statement to retrieve user information
    $stmt = $conn->prepare("SELECT userid, userpassword FROM users WHERE userid = ?");
    $stmt->bind_param("s", $userID);
    $stmt->execute();

    // Get the query result
    $result = $stmt->get_result();

    // Check if there is a user with the provided userid and password
    if ($result->num_rows > 0) 
    {
        $row = $result->fetch_assoc();
        if (password_verify($userPassword, $row["userpassword"])) 
        {?>
            <script> alert("환영합니다."); location.href="http://localhost/main.html"; </script> 
        <?php
        }
        else 
        {?>
            <script> alert("잘못된 비밀번호입니다."); location.href="http://localhost/login.html"; </script> 
        <?php
        }
    } 
    else 
    {?>
        <script> alert("잘못된 아이디입니다."); location.href="http://localhost/login.html"; </script> 
    <?php
    }

    $stmt->close();
    $conn->close();
}
?>
