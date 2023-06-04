<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Initialize variables with form data
    $userID = $_POST["userID"];
    $userPassword = $_POST["userPassword"];

    // Check if the inputs are not empty
    if (empty($userID) || empty($userPassword))
    {?>
        <script> alert("아이디와 비밀번호를 입력해주세요."); location.href="login.html"; </script>
    <?php
    }


    // Connect to the database
    $servername = "127.0.0.1";
    $username = "root";
    $password = "1234";
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
        if (password_verify($userPassword, $row["userpassword"])) {

            echo "<script>";
            echo "var audio = new Audio('success.mp3');";
            echo "audio.volume = 0.5;"; // Adjust the volume as needed (0.5 = 50%)
            echo "audio.play();";
            echo "localStorage.setItem('userID', '" . $userID . "');";
            echo "setTimeout(function() { window.location.href='main.html'; }, 2000);"; // Delay redirection for 2000 milliseconds (2 seconds)
            echo "</script>";
        
        }
        
        else
        {?>
            <script> alert("잘못된 비밀번호입니다."); location.href="login.html"; </script>
        <?php
        }


    }
    else
    {?>
        <script> alert("잘못된 아이디입니다."); location.href="login.html"; </script>
    <?php
    }

    $stmt->close();
    $conn->close();
}
?>
