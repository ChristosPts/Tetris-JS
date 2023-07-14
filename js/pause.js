// pause.js

let gamePaused = false;
let animationId = null;

function pauseGame() {
  gamePaused = true;
  cancelAnimationFrame(animationId); // Stop the game loop
  const resumeButton = document.getElementById("resumeButton");
  const pauseMenu = document.querySelector(".pause-menu");

  resumeButton.style.display = "block";
  pauseMenu.style.display = "block";
}

function resumeGame() {
  gamePaused = false;
  animationId = requestAnimationFrame(update); // Resume the game loop
  const resumeButton = document.getElementById("resumeButton");
  const pauseMenu = document.querySelector(".pause-menu");

  resumeButton.style.display = "none";
  pauseMenu.style.display = "none";
}

// Add an event listener to the pause button
const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
  if (gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
});

// Add an event listener to the resume button
const resumeButton = document.getElementById("resumeButton");
resumeButton.addEventListener("click", resumeGame);
