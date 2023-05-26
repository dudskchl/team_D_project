const centerContent = document.getElementById("center-content");
const emotionVideo = document.getElementById("emotion-video");
const emotionContent = document.getElementById("emotion-content");
const webcamContent = document.getElementById("webcam-content");
const happyButton = document.getElementById("happy");
const sadButton = document.getElementById("sad");
const angerButton = document.getElementById("anger");
const fearButton = document.getElementById("fear");
const surpriseButton = document.getElementById("surprise");
const video = document.getElementById("webcam");
const retryButton = document.getElementById("retry");
const playSoundButton = document.getElementById("play-sound");

const userID = localStorage.getItem('userID');

const persons = ["sunyoung"];
const emotions = ["surprise", "fear"];

const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
const randomPerson = persons[Math.floor(Math.random() * persons.length)];

const videoFilePath = `${randomEmotion}/${randomEmotion}_${randomPerson}.mp4`;
const audioFilePath = `${randomEmotion}/${randomEmotion}_${randomPerson}.mp3`;

emotionVideo.src = videoFilePath;
const audio = new Audio(audioFilePath);

playSoundButton.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
});

emotionVideo.addEventListener('canplaythrough', () => {
  emotionVideo.play();
});

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
      var xhr = new XMLHttpRequest();
      var url = 'emotion.php';
      var method = 'POST';

      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      var requestBody = 'userID=' + encodeURIComponent(userID);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log(xhr.responseText);
        }
      };

      xhr.send(requestBody);

      emotionContent.innerHTML = `
        <h2>정답입니다! 잘하셨어요!</h2>
        <h3>${emotionToKorean(randomEmotion)} 표정을 지어보세요!</h3>
      `;
      emotionContent.style.display = 'flex';
      emotionContent.style.flexDirection = 'column';
      emotionContent.style.alignItems = 'center';
      emotionContent.style.width = '50%';

      emotionVideo.src = videoFilePath;
      emotionVideo.play();

      webcamContent.style.display = 'flex';
    } else {
      emotionContent.innerHTML = `
        <h2>틀렸습니다. 정답은 ${emotionToKorean2(randomEmotion)}입니다.</h2>
        <h3>${emotionToKorean(randomEmotion)} 표정을 지어보세요!</h3>
      `;
      emotionContent.style.display = 'flex';
      emotionContent.style.flexDirection = 'column';
      emotionContent.style.alignItems = 'center';
      emotionContent.style.width = '50%';

      emotionVideo.src = videoFilePath;
      emotionVideo.play();
    }

    setTimeout(() => {
      emotionContent.style.opacity = '1';
      webcamContent.style.opacity = '1';
    }, 1000);

  }, 600);
}
