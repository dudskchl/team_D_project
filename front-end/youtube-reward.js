const userID = localStorage.getItem("userID");
const pororoshortButton = document.querySelector('.displaypororoshort-button');
const pororolongButton = document.querySelector('.displaypororolong-button');
const tayoshortButton = document.querySelector('.displaytayoshort-button');
const tayolongButton = document.querySelector('.displaytayolong-button');
const pengsushortButton = document.querySelector('.displaypengsushort-button');
const pengsulongButton = document.querySelector('.displaypengsulong-button');
const babysharkshortButton = document.querySelector('.displaybabysharkshort-button');
const babysharklongButton = document.querySelector('.displaybabysharklong-button');

let numofstickers = 0;

pororoshortButton.addEventListener('click', function() {checkAndDisplayshort('E0W5sJZ2d64');});
pororolongButton.addEventListener('click', function() {checkAndDisplaylong('Jx0yKgbrCDs');});
tayoshortButton.addEventListener('click', function() {checkAndDisplayshort('tVU53nGuPGw');});
tayolongButton.addEventListener('click', function() {checkAndDisplaylong('swxG0l9Pon4');});
pengsushortButton.addEventListener('click', function() {checkAndDisplayshort('c2PCPX8vOLA');});
pengsulongButton.addEventListener('click', function() {checkAndDisplaylong('wSw7Dpoc3rI');});
babysharkshortButton.addEventListener('click', function() {checkAndDisplayshort('761ae_KDg_Q');});
babysharklongButton.addEventListener('click', function() {checkAndDisplaylong('VmL104H-rKc');});



  
function checkAndDisplayshort(videoId) {

    return fetch("youtube-reward-check.php?userID=" + userID)
      .then(response => response.text())
      .then(data => {
        numofstickers = parseInt(data); // Parse the response as an integer
      
        if (numofstickers >= 5) {
            alert("축하합니다! 내가 좋아하는 캐릭터 영상을 볼 수 있어요!");

            numofstickers -= 5;

            return fetch("youtube-reward-deduct.php?userID=" + userID + "&numofstickers=" + numofstickers)
            .then(response => response.text())
            .then(updatedData => {
              // Verify if the update was successful
              if (updatedData === "success") {
                playVideo(videoId);
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
    .catch(error => {console.error('Error:', error);});
}

function checkAndDisplaylong(videoId) {

  return fetch("youtube-reward-check.php?userID=" + userID)
    .then(response => response.text())
    .then(data => {
      numofstickers = parseInt(data); // Parse the response as an integer
    
      if (numofstickers >= 5) {
          alert("축하합니다! 내가 좋아하는 캐릭터 영상을 볼 수 있어요!");

          numofstickers -= 8;

          return fetch("youtube-reward-deduct.php?userID=" + userID + "&numofstickers=" + numofstickers)
          .then(response => response.text())
          .then(updatedData => {
            // Verify if the update was successful
            if (updatedData === "success") {
              playVideo(videoId);
            } else {
              alert("Failed to update the number of stickers in the database.");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
          alert("보상을 받으려면 사과를 " + (8 - numofstickers) + "개 더 모아보세요.");
      }
  })
  .catch(error => {console.error('Error:', error);});
}

function playVideo(videoId) {
  var player = new YT.Player('youtube-reward', {
    height: '360',
    width: '640',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      fs: 0,
    },
  });
}
    
  