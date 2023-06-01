var preferencesForm = document.querySelector(".preferences-form");
var saveButton = document.querySelector(".save-button");

const userID = localStorage.getItem('userID');

saveButton.addEventListener("click", setPreferences);

function setPreferences() {
  var selectedCharacter = document.querySelector("input[name='favorite']:checked");
  var favoriteSnack = document.querySelector("input[name='favoritesnack']").value;

  if (!selectedCharacter) {
    alert("캐릭터를 골라주세요.");
    return;
  }
  else if (!favoriteSnack) {
    alert("간식을 입력해주세요.");
    return;

  }

  var xhr = new XMLHttpRequest();
  var url = 'setting.php';
  var method = 'POST';

  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  var requestBody = 'favcharacter=' + encodeURIComponent(selectedCharacter.value) + '&favsnack=' + encodeURIComponent(favoriteSnack) + '&userID=' + encodeURIComponent(userID);

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

}

function handleResponse(response) {
    // Display alert message
    alert("설정이 완료되었어요.");
  
    // Redirect to main.html
    window.location.href = "main.html";
  }
  
