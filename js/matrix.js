function createMatrix(w,h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    // Clear the canvas
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);

    // Draw grid lines
    const gridSize = 1; // Adjust the size of the grid squares

    context.strokeStyle = "rgba(225, 225, 225, 1)"; // Strong gray color for grid lines
    context.lineWidth = 0.01;

    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            context.beginPath();
            context.rect(x * gridSize, y * gridSize, gridSize, gridSize);
            context.stroke();
        }
    }
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}


function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                const color = colors[value];
                const gridSize = 1; // Adjust the size of the grid squares
                const squareSize = gridSize - 2; // Adjust the size of the colored square inside the grid square
                const squareX = x + offset.x;
                const squareY = y + offset.y;
 
                // Draw colored square
                context.fillStyle = color;
                context.fillRect(squareX * gridSize + 1, squareY * gridSize + 1, squareSize, squareSize);
                
                // Add shadow
                context.shadowColor = 'rgba(15, 15, 15, 1)';
                context.shadowBlur = 2;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.fillRect(squareX * gridSize + 1, squareY * gridSize + 1, squareSize, squareSize);

                // Reset shadow properties
                context.shadowColor = 'rgba(100, 100, 100, 1)';
                context.shadowBlur = 1;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
        });
    });
}

function drawNextPiece() {
    nextPieceContext.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);

    if (player.nextMatrix) {
        const gridSize = 24; // Adjust the size of the grid squares in the nextPieceCanvas
        const squareSize = gridSize - 2; // Adjust the size of the colored square inside the grid square

        const nextPieceWidth = player.nextMatrix[0].length * gridSize;
        const nextPieceHeight = player.nextMatrix.length * gridSize;
        const offsetX = (nextPieceCanvas.width - nextPieceWidth) / 2;
        const offsetY = (nextPieceCanvas.height - nextPieceHeight) / 2;

        player.nextMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const color = colors[value];
                    const squareX = offsetX + x * gridSize;
                    const squareY = offsetY + y * gridSize;

                    // Draw colored square
                    nextPieceContext.fillStyle = color;
                    nextPieceContext.fillRect(squareX + 1, squareY + 1, squareSize, squareSize);
                }
            });
        });
    }
}