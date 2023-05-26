<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    // Initialize variables with form data
    $userName = $_POST["userName"];
    $userID = $_POST["userID"];
    $userPassword = $_POST["userPassword"];
    $userPassword2 = $_POST["userPassword2"];

    // Check if the username and password contain no Korean characters
    if (preg_match("/[ㄱ-ㅎㅏ-ㅣ가-힣]/", $userID))
    {?>
        <script> alert("아이디는 한글을 포함할 수 없습니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }
    elseif (preg_match("/[ㄱ-ㅎㅏ-ㅣ가-힣]/", $userPassword))
    {?>
        <script> alert("비밀번호는 한글을 포함할 수 없습니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }
    // Check if the username and password meet the minimum length requirements
    elseif (strlen($userID) < 6)
    {?>
        <script> alert("아이디는 최소 6자 이상이어야 합니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }
    elseif (strlen($userPassword) < 8)
    {?>
        <script> alert("비밀번호는 최소 8자 이상이어야 합니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }

    // Check if the password contains at least two special characters
    elseif (preg_match_all("/[~!@#$%^&*()_+]/", $userPassword) < 2)
    {?>
        <script> alert("비밀번호는 특수문자를 2개 이상 포함해야 합니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }

    // Check if the password and password confirmation match
    elseif ($userPassword !== $userPassword2)
    {?>
        <script> alert("비밀번호와 비밀번호 확인이 일치하지 않습니다."); location.href="http://localhost/signup.html"; </script>
    <?php
    }
    else
    {
        $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);
        // All checks pass, store the user information in the database
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

        // Insert user information into the "users" table
        $sql = "INSERT INTO users (username, userid, userpassword, numofstickers, favcharacter)
        VALUES ('$userName', '$userID', '$hashedPassword', 0, NULL)";

        if ($conn->query($sql) === TRUE)
        {?>
            <script> alert("회원가입이 완료되었습니다."); location.href="http://localhost/login.html"; </script>
        <?php
        }
        else
        {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

}
?>
