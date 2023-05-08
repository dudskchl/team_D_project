const appleContainer = document.getElementById("apple-container");
const userID = localStorage.getItem("userID");
const displayRewardButton = document.querySelector(".displayreward-button");

displayRewardButton.addEventListener("click", displayNumOfApples);

let numofapples = 0;
let favcharacter = '';

function fetchNumOfApples() {
  return fetch("tree.php?userID=" + userID)
    .then(response => response.text())
    .then(responseText => {
      const responseData = responseText.split(",");
      numofapples = parseInt(responseData[0]);
      favcharacter = responseData[1];
      
      // Update the favcharacter value in your code
      // You can use it wherever needed

      for (let i = 0; i < numofapples; i++) {
        const apple = document.createElement("img");
        apple.src = "apple.png";
        apple.classList.add("apple");
        appleContainer.appendChild(apple);
      }
    })
    .catch(error => {
      console.error("Error fetching number of apples:", error);
    });
}



function displayNumOfApples() {
  if (numofapples < 5) {
    alert("보상을 받으려면 사과를 " + (5 - numofapples) + "개 더 모아보세요.");
  } else if (numofapples == 5) {
    alert("축하합니다! 보상을 받을 수 있습니다.");


    if (favcharacter === '뽀로로') {
      var videoId = 'E0W5sJZ2d64';
    } else if (favcharacter === '타요') {
      var videoId = 'tVU53nGuPGw';
    } else if (favcharacter === '펭수') {
      var videoId = 'c2PCPX8vOLA';
    } else if (favcharacter === '아기상어') {
      var videoId = '761ae_KDg_Q';
    }
  
    
    if (videoId) {
      // Check if the video container already exists
      var existingVideoContainer = document.getElementById("video-container");
      if (existingVideoContainer) {
        return; // Video is already displayed, exit the function
      }
    
      // Embed the YouTube video
      var videoContainer = document.createElement("div");
      videoContainer.id = "video-container";
      videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    
      // Append the video container to the document body or a specific element
      document.body.appendChild(videoContainer);
    }
    

  }
}








fetchNumOfApples();
