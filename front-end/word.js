orange// JavaScript code for the word Page
// Add your JavaScript code here

const centerContent = document.getElementById("center-content");
const wordImage = document.getElementById("word-image");
const wordContent = document.getElementById("word-content");
const webcamContent = document.getElementById("webcam-content");
const appleButton = document.getElementById("apple");
const bananaButton = document.getElementById("banana");
const grapeButton = document.getElementById("grape");
const orangeButton = document.getElementById("orange");
const strawberryButton = document.getElementById("strawberry");
const video = document.getElementById("webcam");
const retryButton = document.getElementById("retry");
const endButton = document.getElementById("end");

const userID = localStorage.getItem('userID');

const words = {
  apple: [
    "image/apple",
  ],
  banana: [
    "image/banana",
  ],
  grape: [
    "image/grape",
  ],
  orange: [
    "image/orange",
  ],
  strawberry: [
    "image/strawberry",
  ],
};

const wordKeys = Object.keys(words);
const randomWord = wordKeys[Math.floor(Math.random() * wordKeys.length)];

wordImage.src = `${words[randomWord]}.png`;

function wordToKorean(word) {
  const koreanWords = {
    apple: "사과",
    banana: "바나나",
    grape: "포도",
    orange: "오렌지",
    strawberry: "딸기",
  };

  return koreanWords[word] || word;
};


retryButton.addEventListener("click", () => {
  location.reload();
});

endButton.addEventListener("click", () => {
  window.location.href = "main.html";
});

appleButton.addEventListener("click", () => checkAnswer("apple"));
bananaButton.addEventListener("click", () => checkAnswer("banana"));
grapeButton.addEventListener("click", () => checkAnswer("grape"));
orangeButton.addEventListener("click", () => checkAnswer("orange"));
strawberryButton.addEventListener("click", () => checkAnswer("strawberry"));

function checkAnswer(answer) {
  if (answer === randomWord) {
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
      var url = 'word.php';
      var method = 'POST';

      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      // Construct the request body
      var requestBody = 'userID=' + encodeURIComponent(userID);

      xhr.onload = function () {
        if (xhr.status === 200) {
          var response = xhr.responseText;
          console.log(response);

          // Update the content or perform any other desired actions
          wordContent.innerHTML = `
            <img src="${words[randomWord]}.png" alt="word">
            <h2>정답입니다! 잘하셨어요!</h2>
            <h3>${wordToKorean(randomWord)}가 적힌 낱말 카드를 보여주세요!</h3>
          `;
          wordContent.style.display = 'flex';
          wordContent.style.flexDirection = 'column';
          wordContent.style.alignItems = 'center';
          wordContent.style.width = '50%';

          webcamContent.style.display = 'flex';

          document.querySelector('.retry-btn').style.display = 'block';
          document.querySelector('.end-btn').style.display = 'block';

          wordContent.style.opacity = '1';
          webcamContent.style.opacity = '1';
          startWebcam();

        } else {
          console.error('Request failed. Status:', xhr.status);
        }
      };

      xhr.send(requestBody);

    } else {
      wordContent.innerHTML = `
        <img src="${words[randomWord]}.png" alt="word">
        <h2>틀렸습니다. 정답은 ${wordToKorean(randomWord)}입니다.</h2>
        <h3>${wordToKorean(randomWord)}가 적힌 낱말 카드를 보여주세요!</h3>
      `;

      wordContent.style.display = 'flex';
      wordContent.style.flexDirection = 'column';
      wordContent.style.alignItems = 'center';
      wordContent.style.width = '50%';
      wordContent.style.opacity = '1';

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
