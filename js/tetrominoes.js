// tetrominoes.js

const colors = [
    null,
    '#fad35f',
    '#e83357',
    '#036aae',
    '#d66565',
    '#6fcb9f',
    '#2aaac3',
    '#e082b4',
]

function createPiece (type) {
    if (type === "T") {
        return [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ]
    } else if (type === "O") {
        return [
            [2,2],
            [2,2],
        ]
    } else if (type === "L") {
        return [
            [0,3,0],
            [0,3,0],
            [0,3,3],
        ]
    } else if (type === "J") {
        return [
            [0,4,0],
            [0,4,0],
            [4,4,0],
        ]
    } else if (type === "S") {
        return [
            [0,5,5],
            [5,5,0],
            [0,0,0],
        ]
    } else if (type === "Z") {
        return [
            [6,6,0],
            [0,6,6],
            [0,0,0],
        ]
    } else if (type === "I") {
        return [
            [0,7,0,0],
            [0,7,0,0],
            [0,7,0,0],
            [0,7,0,0],
        ]
    }
}

function playerReset() {
    const pieces = "ILJOTSZ";
    player.matrix = player.nextMatrix || createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  
    // Generate the upcoming piece
    player.nextMatrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  
    if (collide(arena, player)) {
      gameEnded = true;
      setTimeout(() => {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        linesCleared = 0; // Reset lines cleared counter
        updateLinesCleared();
        dropInterval = 1000;
        endScreen.style.display = "flex";
        gamePaused = true;
        gameEnded = false;
        return;
      }, 100); // Add a delay of 100 milliseconds before resetting the game
    }
  }
  