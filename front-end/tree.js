const appleContainer = document.getElementById("apple-container");
const userID = localStorage.getItem("userID");

async function fetchNumOfApples() {
  try {
    const response = await fetch("tree.php?userID=" + userID);
    const numofapples = await response.text();

    for (let i = 0; i < numofapples; i++) {
      const apple = document.createElement("img");
      apple.src = "apple.png";
      apple.classList.add("apple");
      appleContainer.appendChild(apple);
    }
  } catch (error) {
    console.error("Error fetching number of apples:", error);
  }
}

fetchNumOfApples();
