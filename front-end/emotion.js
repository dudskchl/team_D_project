// JavaScript code for the Emotion Page
// Add your JavaScript code here

const centerContent = document.getElementById('center-content');
const emotionContent = document.getElementById('emotion-content');
const webcamContent = document.getElementById('webcam-content');
const happyButton = document.getElementById('happy');
const sadButton = document.getElementById('sad');
const video = document.getElementById('webcam');

const userID = localStorage.getItem('userID');

happyButton.addEventListener('click', showContent);

sadButton.addEventListener('click', () => {
  alert('정답은 기쁨입니다. 다시 시도해주세요.');
});

function showContent() {
  centerContent.style.opacity = '0';

  setTimeout(() => {   
    centerContent.style.display = 'none';

    // Send an HTTP request to the PHP file
    var xhr = new XMLHttpRequest();
    var url = 'emotion.php';
    var method = 'POST';

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Construct the request body
    var requestBody = 'userID=' + encodeURIComponent(userID);

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        console.log(response);
        handleResponse(response); // Call a function to handle the response
      } else {
        console.error('Request failed. Status:', xhr.status);
      }
    };

    xhr.send(requestBody);

    // Rest of your existing code
    // ...
  }, 1500);
}

function handleResponse(response) {
  // Parse the response or perform any additional actions based on the response
  console.log('Response received:', response);
  // Update the content or perform any other desired actions
  emotionContent.innerHTML = `
    <img src="기쁨.png" alt="emotion">
    <h2>정답입니다!!!! 잘하셨어요!</h2>
    <h3>기뻐하는 표정을 지어보세요!</h3>
  `;
  emotionContent.style.display = 'flex';
  emotionContent.style.flexDirection = 'column';
  emotionContent.style.alignItems = 'center';
  emotionContent.style.width = '50%';

  webcamContent.style.display = 'flex';

  setTimeout(() => {
    emotionContent.style.opacity = '1';
    webcamContent.style.opacity = '1';
    startWebcam();
  }, 1000);
}

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing webcam: ', err);
  }
  
}
