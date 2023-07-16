let gameEnded = false;
function updateScore() {
  const scoreElements = document.getElementsByClassName('score');
  Array.from(scoreElements).forEach((element) => {
    element.innerText = player.score;
  });

  if (gameEnded) {
    const scores = getScores();
    scores.push(player.score);
    scores.sort((a, b) => b - a);
    scores.splice(5);
    localStorage.setItem('scores', JSON.stringify(scores));
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

// Call updateScore when the page loads
window.addEventListener('load', () => {
  const scores = getScores();
  updateScoreBoard(scores);
});