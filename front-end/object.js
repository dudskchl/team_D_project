const centerContent = document.getElementById("center-content");
const objectImage = document.getElementById("object-image");
const objectContent = document.getElementById("object-content");
const webcamContent = document.getElementById("webcam-content");
const video = document.getElementById("webcam");
const retryButton = document.getElementById("retry");
const endButton = document.getElementById("end");
const buttonContainer = document.getElementById("button-container");

const userID = localStorage.getItem('userID');

const objects = {
  object1: {
    apple: "image/apple",
    banana: "image/banana",
    broccoli: "image/broccoli",
    carrot: "image/carrot",
    orange: "image/orange",
    pear: "image/pear",
    watermelon: "image/watermelon",
    lemon: "image/lemon",
    grape: "image/grape",
    pineapple: "image/pineapple",
    orientalmelon: "image/orientalmelon",
  },
  object2: {
    // book: "image/book",
    chair: "image/chair",
    clock: "image/clock",
    cup: "image/cup",
    pizza: "image/pizza",
    scissors: "image/scissors",
    // spoon: "image/spoon",
    // toothbrush: "image/toothbrush",
    umbrella: "image/umbrella",
  },
};

const objectGroups = Object.keys(objects);
const selectedGroup = objects[objectGroups[Math.floor(Math.random() * objectGroups.length)]];
const selectedGroupKeys = Object.keys(selectedGroup);
const randomObject = selectedGroupKeys[Math.floor(Math.random() * selectedGroupKeys.length)];

objectImage.src = `${selectedGroup[randomObject]}.png`;

// Create buttons dynamically based on selected group
selectedGroupKeys.forEach(key => {
  const button = document.createElement('button');
  button.id = key;
  button.innerText = objectToKorean(key);
  button.addEventListener('click', () => checkAnswer(key));
  buttonContainer.appendChild(button);
});
function objectToKorean(object) {
  const koreanObjects = {
    apple: "사과",
    banana: "바나나",
    orange: "오렌지",
    broccoli: "브로콜리",
    carrot: "당근",
    pear: "배",
    watermelon: "수박",
    lemon: "레몬",
    grape: "포도",
    pineapple: "파인애플",
    orientalmelon: "참외",
    // book: "책",
    chair: "의자",
    clock: "시계",
    cup: "컵",
    pizza: "피자",
    scissors: "가위",
    // spoon: "숟가락",
    // toothbrush: "칫솔",
    umbrella: "우산",
  };

  return koreanObjects[object] || object;
};

function objectToKorean2(object) {
  const koreanObjects = {
    apple: "사과를",
    banana: "바나나를",
    orange: "오렌지를",
    broccoli: "브로콜리를",
    carrot: "당근을",
    pear: "배를",
    watermelon: "수박을",
    lemon: "레몬을",
    grape: "포도를",
    pineapple: "파인애플을",
    orientalmelon: "참외를",
    // book: "책을",
    chair: "의자를",
    clock: "시계를",
    cup: "컵을",
    pizza: "피자를",
    scissors: "가위를",
    // spoon: "숟가락을",
    // toothbrush: "칫솔을",
    umbrella: "우산을",
  };

  return koreanObjects[object] || object;
};

retryButton.addEventListener("click", () => {
  location.reload();
});

endButton.addEventListener("click", () => {
  window.location.href = "main.html";
});

// appleButton.addEventListener("click", () => checkAnswer("apple"));
// bananaButton.addEventListener("click", () => checkAnswer("banana"));
// grapeButton.addEventListener("click", () => checkAnswer("grape"));
// orangeButton.addEventListener("click", () => checkAnswer("orange"));
// strawberryButton.addEventListener("click", () => checkAnswer("strawberry"));

function checkAnswer(answer) {
  if (answer === randomObject) {
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
      var url = 'object.php';
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
          objectContent.innerHTML = `
            <img src="${selectedGroup[randomObject]}.png" alt="object">
            <h2>정답입니다! 잘하셨어요!</h2>
            <h3>${objectToKorean2(randomObject)} 보여주세요!</h3>
          `;
          objectContent.style.display = 'flex';
          objectContent.style.flexDirection = 'column';
          objectContent.style.alignItems = 'center';
          objectContent.style.width = '50%';

          webcamContent.style.display = 'flex';

          document.querySelector('.retry-btn').style.display = 'block';
          document.querySelector('.end-btn').style.display = 'block';

          objectContent.style.opacity = '1';
          webcamContent.style.opacity = '1';
          startWebcam();

        } else {
          console.error('Request failed. Status:', xhr.status);
        }
      };

      xhr.send(requestBody);

    } else {
      objectContent.innerHTML = `
        <img src="${selectedGroup[randomObject]}.png" alt="object">
        <h2>틀렸습니다. 정답은 ${objectToKorean(randomObject)}입니다.</h2>
        <h3>${objectToKorean2(randomObject)} 보여주세요!</h3>
      `;

      objectContent.style.display = 'flex';
      objectContent.style.flexDirection = 'column';
      objectContent.style.alignItems = 'center';
      objectContent.style.width = '50%';
      objectContent.style.opacity = '1';

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
