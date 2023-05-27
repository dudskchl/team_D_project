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
const endButton = document.getElementById("end");
const playSoundButton = document.getElementById("play-sound");

const userID = localStorage.getItem('userID');

const emotions = {
  happy: [
    "emotion_video/happy/happy_minji",
    "emotion_video/happy/happy_minseok",
    "emotion_video/happy/happy_minsu",
    "emotion_video/happy/happy_seoyeon",
    "emotion_video/happy/happy_sookja",
    "emotion_video/happy/happy_sujin",
    "emotion_video/happy/happy_sunyoung",
  ],
  sad: [
    "emotion_video/sad/sad_minji",
    "emotion_video/sad/sad_minseok",
    "emotion_video/sad/sad_minsu",
    "emotion_video/sad/sad_seoyeon",
    "emotion_video/sad/sad_sookja",
    "emotion_video/sad/sad_sujin",
    "emotion_video/sad/sad_sunyoung",
  ],
  anger: [
    "emotion_video/anger/anger_minji",
    "emotion_video/anger/anger_minseok",
    "emotion_video/anger/anger_minsu",
    "emotion_video/anger/anger_seoyeon",
    "emotion_video/anger/anger_sookja",
    "emotion_video/anger/anger_sujin",
    "emotion_video/anger/anger_sunyoung",
  ],
  fear: [
    "emotion_video/fear/fear_minji",
    "emotion_video/fear/fear_minseok",
    "emotion_video/fear/fear_minsu",
    "emotion_video/fear/fear_seoyeon",
    "emotion_video/fear/fear_sookja",
    "emotion_video/fear/fear_sujin",
    "emotion_video/fear/fear_sunyoung",
  ],
  surprise: [
    "emotion_video/surprise/surprise_minji",
    "emotion_video/surprise/surprise_minseok",
    "emotion_video/surprise/surprise_minsu",
    "emotion_video/surprise/surprise_seoyeon",
    "emotion_video/surprise/surprise_sookja",
    "emotion_video/surprise/surprise_sujin",
    "emotion_video/surprise/surprise_sunyoung",
  ],
};

const people = {
  minji: "민지는",
  minseok: "민석이는",
  minsu: "튼튼반선생님은",
  seoyeon: "서연이는",
  sookja: "원장선생님은",
  sujin: "햇님반선생님은",
  sunyoung: "달님반선생님은"
};




const emotionKeys = Object.keys(emotions);
const randomEmotion = emotionKeys[Math.floor(Math.random() * emotionKeys.length)];
const randomPerson = emotions[randomEmotion][Math.floor(Math.random() * 7)];
const randomNumber = Math.floor(Math.random() * 3) + 1;

const person = randomPerson.split("/").pop().split("_").pop();
const personName = people[person];

const question = document.querySelector('h3');
question.textContent = `${personName} 현재 어떤 기분일까요?`;

emotionImage.src = `${randomPerson}.mp4`;

const audioFilePath = `${randomPerson}${randomNumber}.mp3`;
//const audioFilePath = `surprise/surprise_sunyoung.mp3`;
const audio = new Audio(audioFilePath);
playSoundButton.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
});


//emotionImage.src = 'surprise/surprise_sunyoung.mp4'
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

endButton.addEventListener("click", () => {
  window.location.href = "main.html";
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
            <video src="${randomPerson}.mp4" autoplay muted loop></video>
            <h2>정답입니다! 잘하셨어요!</h2>
            <h3>${emotionToKorean(randomEmotion)} 표정을 지어보세요!</h3>
          `;
          emotionContent.style.display = 'flex';
          emotionContent.style.flexDirection = 'column';
          emotionContent.style.alignItems = 'center';
          emotionContent.style.width = '50%';

          webcamContent.style.display = 'flex';

          document.querySelector('.retry-btn').style.display = 'block';
          document.querySelector('.end-btn').style.display = 'block';

          setTimeout(() => {
            emotionContent.style.opacity = '1';
            webcamContent.style.opacity = '1';
            startWebcam();
          }, 10);

        } else {
          console.error('Request failed. Status:', xhr.status);
        }
      };

      xhr.send(requestBody);

    } else {
      emotionContent.innerHTML = `
        <video src="${randomPerson}.mp4" autoplay muted loop></video>
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
      document.querySelector('.end-btn').style.display = 'block';
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
