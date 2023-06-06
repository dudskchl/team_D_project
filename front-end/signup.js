const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userName = signupForm.elements.userName.value;
  const userPassword = signupForm.elements.userPassword.value;
  const userPassword2 = signupForm.elements.userPassword2.value;

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;

  if (userName.length < 6) {
    alert('Username must be at least 6 characters long');
    return;
  }

  if (koreanRegex.test(userName)) {
    alert('Username cannot contain Korean characters');
    return;
  }

  if (userPassword.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  if (koreanRegex.test(userPassword)) {
    alert('Password cannot contain Korean characters');
    return;
  }

  const specialChars = userPassword.match(specialCharRegex);
  if (!specialChars || specialChars.length < 2) {
    alert('Password must contain at least two special characters');
    return;
  }

  if (userPassword !== userPassword2) {
    alert('Passwords do not match');
    return;
  }

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [userName, userPassword], (error, results, fields) => {
    if (error) {
      console.error('Error inserting user into MySQL database: ' + error.stack);
      return;
    }
    console.log('User inserted into MySQL database with id ' + results.insertId);
    // redirect the user to a success page or perform some other action
  });
});
