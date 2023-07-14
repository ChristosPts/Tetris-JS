// scores.js
let gameEnded = false;
function updateScore() {
  const scoreElements = document.getElementsByClassName('score');
  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].innerText = player.score;
  }

  if (gameEnded) {
    const scores = getScores();
    scores.push(player.score);
    scores.sort((a, b) => b - a); // Sort scores in descending order
    scores.splice(5); // Keep only the top 5 scores
    saveTopScores(scores);
    updateScoreBoard(scores);
  }
}


function updateScoreBoard(scores) {
  const scoreBoards = document.getElementsByClassName('scoreBoard');

  for (let i = 0; i < scoreBoards.length; i++) {
    const scoreBoard = scoreBoards[i];
    scoreBoard.innerHTML = ''; // Clear existing score board

    for (let j = 0; j < scores.length; j++) {
      const scoreItem = document.createElement('li');
      scoreItem.innerText = scores[j];
      scoreBoard.appendChild(scoreItem);
    }
  }
}

function getScores() {
  const scores = localStorage.getItem('scores');
  return scores ? JSON.parse(scores) : Array(5).fill(0);
}

function saveTopScores(scores) {
  const existingScores = getScores();
  const updatedScores = [];

  for (let i = 0; i < existingScores.length; i++) {
    if (existingScores[i] !== player.score) {
      updatedScores.push(existingScores[i]);
    }
  }

  updatedScores.push(player.score);
  updatedScores.sort((a, b) => b - a); // Sort scores in descending order
  updatedScores.splice(5); // Keep only the top 5 scores

  localStorage.setItem('scores', JSON.stringify(updatedScores));
}

// Call updateScore when the page loads
window.addEventListener('load', () => {
  const scores = getScores();
  updateScoreBoard(scores);
});

 