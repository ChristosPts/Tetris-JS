const canvas = document.getElementById("tetris")
const context = canvas.getContext('2d');

const nextPieceCanvas = document.getElementById("nextPiece");
const nextPieceContext = nextPieceCanvas.getContext('2d');
let nextPiece = null;

const arenaWidth = 10;
const arenaHeight = 20;

// Calculate the scale factor based on the canvas size and the arena dimensions
const scale = Math.min(canvas.width / arenaWidth, canvas.height / arenaHeight);
 
context.scale(scale, scale);
 
const arena = createMatrix(10,20)
const player = {
    pos: {x:0, y:0},
    matrix: null,
    score: 0,
    level: 1
}
 
function collide(arena,player) {
    const [m, o] = [player.matrix, player.pos]
    for (let y = 0; y < m.length; ++y){
        for (let x = 0; x < m[y].length; ++x){
            if (m[y][x] !== 0 
                && (arena[y + o.y] 
                && arena[y + o.y][x + o.x])!== 0) {
                return true
            }
        }
    }
    return false
}

function merge (arena,player) {
    player.matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

let dropInterval = 1000;
let dropCounter = 0;
let lastTime = 0

let linesCleared = 0;
function arenaSweep () {
    let rowCount = 1
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if(arena[y][x] === 0) {
                continue outer
            }
        }
        //remove full row (fill it with 0)
        const row = arena.splice(y,1)[0].fill(0)
        // offset the blocks
        arena.unshift(row)
        ++y
        player.score += rowCount* 100;
        rowCount *= 2;
        linesCleared += 1; // Increase lines cleared counter

        if (linesCleared % 7 === 0) {
            player.level++;
            dropInterval -= 100;
            if (dropInterval < 200) {
                dropInterval = 200;
            }
        }
        updateLinesCleared();
        updateLevel();
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
      }, 10); 
      // Add a delay of 100 milliseconds before resetting the game
      // this way the final score can be shown before it resets
    }
  }

function update(time = 0.05) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    if (gamePaused) {
        return; // Exit the function if the game is paused
      }
    draw();
    drawNextPiece();
    requestAnimationFrame(update);
}

// Add the following code at the end of your existing script.js file
const startScreen = document.getElementById("startScreen");
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  resetGame();
});

const endScreen = document.getElementById("endScreen");
const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
    endScreen.style.display = "none";
    gamePaused = false; // Resume the game
    update(); // Start the game loop
    resetGame();
  });
 
  function resetGame() {
    playerReset();
    drawNextPiece();
    updateScore();
    updateLinesCleared()
    update();
  }

function updateLinesCleared() {
    document.getElementById('lines').innerText = linesCleared;
}
function updateLevel() {
    document.getElementById('level').innerText = player.level;
}
