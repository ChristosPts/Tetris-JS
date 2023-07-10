const canvas = document.getElementById("tetris")
const context = canvas.getContext('2d');

const nextPieceCanvas = document.getElementById("nextPiece");
const nextPieceContext = nextPieceCanvas.getContext('2d');
let nextPiece = null;

const arenaWidth = 10; // Number of columns in the arena
const arenaHeight = 20; // Number of rows in the arena

// Calculate the scale factor based on the canvas size and the arena dimensions
const scale = Math.min(canvas.width / arenaWidth, canvas.height / arenaHeight);

context.scale(scale, scale);
 
const arena = createMatrix(10,20)
const player = {
    pos: {x:0, y:0},
    matrix: null,
    score: 0
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
    }
}

 
let dropInterval = 1000;
let dropCounter = 0;
let lastTime = 0

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    drawNextPiece();
    requestAnimationFrame(update);
}


function updateScore () {
    document.getElementById('score').innerText = player.score
}


playerReset();
drawNextPiece();
updateScore();
update();
