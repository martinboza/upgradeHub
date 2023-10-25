document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const startBtn = document.getElementById('startBtn');
    const turnoDisplay = document.getElementById('turno');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    
    function handleCellClick(index) {  
        if (gameBoard[index] === '' && gameActive) { // Si hay un ganador entonces...
            //(Aqui estoy verificando, si la celda está vacía y el juego está activo)
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
            gameActive = false;
            alert(`¡Jugador ${currentPlayer} gana!`);  // Lleva `` porque se esta nombrando la sintexis ${currentPlayer} Consultar en clase
            } 

        else if (!gameBoard.includes('')) {   // Si no hay un ganador entonces...
            gameActive = false;
            alert('¡Empate: No hay ganador!');
            }
            
        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Cambia el jugador actual (X a O o viceversa).
            turnoDisplay.textContent = `Turno del Jugador ${currentPlayer}`;
            }
        }
    }


    function checkWinner (){
        
        //Combinaciones ganadoras poniendo un número a cada celda.
        const combinacionesGanadoras = [  
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combinacion of combinacionesGanadoras) {

         //Combinacion poniendo a, b, c en las 3 primeras filas.
        const [a, b, c] = combinacion;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            return true;
        }
    }

    return false; //Si no encuentra ninguna combinación ganadora en el tablero. 
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement('div'); // CreateElement: reemplaza el contenido de un html <div>
        cellDiv.classList.add('cell'); // Aqui agregue la clase 'cell' al elemento de celda
        cellDiv.textContent = cell; // Aqui establecí el contenido de la celda con el símbolo del jugador
        cellDiv.addEventListener('click', () => handleCellClick(index)); // Aqui estoy agregando un evento click
        board.appendChild(cellDiv); // Aqui estoy agregando la celda al tablero
    });
}

function startGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    turnoDisplay.textContent = `Turno del Jugador ${currentPlayer}`;
    renderBoard();
}

startBtn.addEventListener('click', startGame);
});
