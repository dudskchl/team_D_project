const centerContent = document.getElementById("center-content");
const emotionImage = document.getElementById("emotion-image");
const emotionContent = document.getElementById("emotion-content");
const webcamContent = document.getElementById("webcam-content");
const happyButton = document.getElementById("happy");
const sadButton = document.getElementById("sad");
const angerButton = document.getElementById("anger");
const fearButton = document.getElementById("fear");
const surpriseButton = document.getElementById("surprise");
const video = document.getElementById("webcam");
const retryButton = document.getElementById("retry");

const userID = localStorage.getItem('userID');

const emotions = {
  happy: [
    "happy/happy_eunyeong",
    "happy/happy_minji",
    "happy/happy_minseok",
    "happy/happy_minsu",
    "happy/happy_seoyeon",
    "happy/happy_sookja",
    "happy/happy_sujin",
    "happy/happy_sunyoung",
  ],
  sad: [
    "sad/sad_eunyeong",
    "sad/sad_minji",
    "sad/sad_minseok",
    "sad/sad_minsu",
    "sad/sad_seoyeon",
    "sad/sad_sookja",
    "sad/sad_sujin",
    "sad/sad_sunyoung",
  ],
  anger: [
    "anger/anger_eunyeong",
    "anger/anger_minji",
    "anger/anger_minseok",
    "anger/anger_minsu",
    "anger/anger_seoyeon",
    "anger/anger_sookja",
    "anger/anger_sujin",
    "anger/anger_sunyoung",
  ],
  fear: [
    "fear/fear_eunyeong",
    "fear/fear_minji",
    "fear/fear_minseok",
    "fear/fear_minsu",
    "fear/fear_seoyeon",
    "fear/fear_sookja",
    "fear/fear_sujin",
    "fear/fear_sunyoung",
  ],
  surprise: [
    "surprise/surprise_eunyeong",
    "surprise/surprise_minji",
    "surprise/surprise_minseok",
    "surprise/surprise_minsu",
    "surprise/surprise_seoyeon",
    "surprise/surprise_sookja",
    "surprise/surprise_sujin",
    "surprise/surprise_sunyoung",
  ],
};

const emotionKeys = Object.keys(emotions);
const randomEmotion = emotionKeys[Math.floor(Math.random() * emotionKeys.length)];
const randomPerson = emotions[randomEmotion][Math.floor(Math.random() * 8)];

emotionImage.src = `${randomPerson}.png`;

function emotionToKorean(emotion) {
  const koreanEmotions = {
    happy: "기쁜",
    sad: "슬픈",
    anger: "화난",
    fear: "무서운",
    surprise: "놀란",
  };

  return koreanEmotions[emotion] || emotion;
};

function emotionToKorean2(emotion) {
  const koreanEmotions = {
    happy: "기쁨",
    sad: "슬픔",
    anger: "화남",
    fear: "무서움",
    surprise: "놀람",
  };

  return koreanEmotions[emotion] || emotion;
};

retryButton.addEventListener("click", () => {
  location.reload();
});



happyButton.addEventListener("click", () => checkAnswer("happy"));
sadButton.addEventListener("click", () => checkAnswer("sad"));
angerButton.addEventListener("click", () => checkAnswer("anger"));
fearButton.addEventListener("click", () => checkAnswer("fear"));
surpriseButton.addEventListener("click", () => checkAnswer("surprise"));

function checkAnswer(answer) {
  if (answer === randomEmotion) {
    showContent(true);
  } else {
    showContent(false);
  }
}

function showContent(isCorrect) {
  centerContent.style.opacity = '0';

  setTimeout(() => {
    centerContent.style.display = 'none';

    if (isCorrect) {
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

          // Call a function to handle the response
          // Parse the response or perform any additional actions based on the response
          console.log('Response received:', response);
          // Update the content or perform any other desired actions
          emotionContent.innerHTML = `
            <img src="${randomPerson}.png" alt="emotion">
            <h2>정답입니다! 잘하셨어요!</h2>
            <h3>${emotionToKorean(randomEmotion)} 표정을 지어보세요!</h3>
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

        } else {
          console.error('Request failed. Status:', xhr.status);
        }
      };

      xhr.send(requestBody);

    } else {
      emotionContent.innerHTML = `
        <img src="${randomPerson}.png" alt="emotion">
        <h2>틀렸습니다. 정답은 ${emotionToKorean2(randomEmotion)}입니다.</h2>
        <h3>${emotionToKorean(randomEmotion)} 표정을 지어보세요!</h3>
      `;

      emotionContent.style.display = 'flex';
      emotionContent.style.flexDirection = 'column';
      emotionContent.style.alignItems = 'center';
      emotionContent.style.width = '50%';
      emotionContent.style.opacity = '1';

      webcamContent.style.display = 'flex';
      webcamContent.style.opacity = '1';

      startWebcam();

      document.querySelector('.retry-btn').style.display = 'block';
    }

  }, 1500);
}


async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing webcam: ', err);
  }

}
