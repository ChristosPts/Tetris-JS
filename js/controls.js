function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena,player)) {
        player.pos.x -= dir;
    }
}

function playerDrop () {
    player.pos.y++;
    if (collide(arena,player)) {
        player.pos.y--
        merge(arena, player);
        playerReset()
        arenaSweep() 
        updateScore()
    }
    dropCounter = 0;
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y){
        for (let x = 0; x < y; ++x){
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ]
        }
    }
    if (dir > 0) {
        matrix.forEach (row => row.reverse ())
    } else {
        matrix.reverse()
    }
}


function playerRotate(dir) {
    const pos = player.pos.x
    let offset = 1
    rotate (player.matrix, dir)
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1))

        if (offset > player.matrix[0].length){
            rotate(player.matrix, -dir)
            player.pos.x = pos
            return
        }
    }
}


document.addEventListener('keydown', event => {
        if (event.key === "ArrowLeft") {
            playerMove(-1)
        } else if (event.key === "ArrowRight") {
            playerMove(+1)
        } else if (event.key === "ArrowDown") {
            playerDrop()
        } else if (event.key === "ArrowUp") {
            playerRotate(1)
        }
    }
);