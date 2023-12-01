const btnSubmit = document.getElementById('btn-submit');
const playerContainer = document.querySelector('#player-container');

var counter = 0;
var mySet = new Set();

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const newPlayer = document.createElement('tr');
  const name = document.getElementById('name').value.toUpperCase();
  const newPlayerNumber = document.createElement('td');
  const newPlayerName = document.createElement('td');

 if (mySet.has(name)) {
  alert("Ya estas inscrito!");
 } else {
   // Inscripción
   counter++;
   newPlayerNumber.textContent = counter;
   newPlayerName.textContent = name;
  
   newPlayer.appendChild(newPlayerNumber);
   newPlayer.appendChild(newPlayerName);
  
   playerContainer.appendChild(newPlayer);

   mySet.add(name);
   alert ('Apuntado para la clase!');
 }

});

const btnGanador = document.getElementById('btn-ganador');
btnGanador.addEventListener('click', (e) => {
  // Función para manejar los mensajes y nombres
  const handleWinnerMessages = () => {
    const messages = [
      'Comienzo del sorteo!',
      '3 ...',
      '2 ...',
      '1 ...',
      'GO!'
    ];

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const winnerContainer = document.getElementById('winner');
      winnerContainer.textContent = messages[currentIndex];

      currentIndex++;

      // Después de mostrar los mensajes, mostrar los nombres
      if (currentIndex === messages.length) {
        clearInterval(intervalId);

        let arrayFromSet = Array.from(mySet);

        // Mostrar nombres cada 0.25s hasta 2s
        let namesInterval = setInterval(() => {
          if (arrayFromSet.length > 0) {
            const randomIndex = Math.floor(Math.random() * arrayFromSet.length);
            winnerContainer.textContent = arrayFromSet[randomIndex];
            arrayFromSet.splice(randomIndex, 1);
          } else {
            // Intervalo de 1.5s antes de mostrar los dos últimos nombres
            setTimeout(() => {
              let penultimateName = winnerContainer.textContent;
              setTimeout(() => {
                // Mostrar el último nombre
                winnerContainer.textContent = penultimateName;
                const winnerParagraph = document.createElement('p');
                winnerParagraph.setAttribute('id', 'winnerPlayer');
                winnerParagraph.textContent = `¡El ganador es ${penultimateName}!`;
                document.body.appendChild(winnerParagraph);
              }, 500);
            }, 1500);

            clearInterval(namesInterval);
          }
        }, 250);
      }
    }, 1000);
  };

  // Llamar a la función
  handleWinnerMessages();
});

