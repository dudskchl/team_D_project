const userID = localStorage.getItem("userID");
const icecreamButton = document.querySelector('.icecream-button');
const candyButton = document.querySelector('.candy-button');
const jellyButton = document.querySelector('.jelly-button');
const chocolateButton = document.querySelector('.chocolate-button');
const favsnackButton = document.querySelector('.favoritesnack-button');

let numofstickers = 0;

icecreamButton.addEventListener('click', function() {checkAndDisplay(1);});
candyButton.addEventListener('click', function() {checkAndDisplay(2);});
jellyButton.addEventListener('click', function() {checkAndDisplay(3);});
chocolateButton.addEventListener('click', function() {checkAndDisplay(4);});
favsnackButton.addEventListener('click', function() {checkAndDisplay(5);});

function checkAndDisplay(item) {
  return fetch("youtube-reward-check.php?userID=" + userID)
    .then(response => response.text())
    .then(data => {
      numofstickers = parseInt(data); // Parse the response as an integer

      if (numofstickers >= 5) {


        numofstickers -= 5;

        return fetch("youtube-reward-deduct.php?userID=" + userID + "&numofstickers=" + numofstickers)
          .then(response => response.text())
          .then(updatedData => {
            // Verify if the update was successful
            if (updatedData === "success") {
              if (item === 1) {
                alert("아이스크림 교환권을 받았어요. 부모님께 아이스크림을 받으세요.");
              } else if (item === 2) {
                alert("사탕 교환권을 받았어요. 부모님께 사탕을 받으세요.");
              } else if (item === 3) {
                alert("젤리 교환권을 받았어요. 부모님께 젤리를 받으세요.");
              } else if (item === 4) {
                alert("초콜렛 교환권을 받았어요. 부모님께 초콜렛을 받으세요.");
              } else if (item === 5) {
                // Fetch the favorite snack from the database
                return fetch("fetch-favsnack.php?userID=" + userID)
                  .then(response => response.text())
                  .then(favsnack => {
                    alert(`${favsnack} 교환권을 받았어요. 부모님께 ${favsnack}을(를) 받으세요.`);
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
              }
            } else {
              alert("Failed to update the number of stickers in the database.");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        alert("보상을 받으려면 사과를 " + (5 - numofstickers) + "개 더 모아보세요.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
