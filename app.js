const state = require('./state.js')

const dieContainer = document.querySelector('.die-container')

function resetGame() {
  player1.style.left = '10px'
  player1.style.top = '160px'
  player2.style.left = '10px'
  player2.style.top = '250px'

  state.player1.count = 0
  state.player2.count = 0

  player1.classList.remove('winner')
  player2.classList.remove('winner')

state.currentPlayer = (Math.random() > .5) ? 'player1' : 'player2'

roll.textContent = '?'

}

function moveWinner() {
  const winnerCirclePosition = document.querySelector('#winner-circle').getBoundingClientRect()

  state[state.currentPlayer].element.style.top = winnerCirclePosition.top + 'px'
  state[state.currentPlayer].element.style.left = winnerCirclePosition.left + 'px'

  state[state.currentPlayer].element.classList.add('winner')

setTimeout(function() {
  alert(`${state.currentPlayer} Is the winner`)
  if (confirm('Reset the game?')) {
    resetGame()
  }
}, 401)


}

function movePlayer(tileNumber) {
  state[state.currentPlayer].count += tileNumber

  if (state[state.currentPlayer].count > 10) {
    moveWinner()
    return
  }

  const tilePosition = document.querySelector('#tile' + state[state.currentPlayer].count).getBoundingClientRect()

  state[state.currentPlayer].element.style.top = tilePosition.top + 'px'
  state[state.currentPlayer].element.style.left = tilePosition.left + 'px'

  if (state.currentPlayer === 'player1') {
    state.currentPlayer = 'player2'
  } else {
    state.currentPlayer = 'player1'
  }
}

dieContainer.addEventListener('click', function() {
  die.setAttribute('src', 'img/Dodecahedron3.gif')
  const num = Math.floor(Math.random() * 10) + 1

  roll.textContent = '?'
  setTimeout(function() {
    roll.textContent = num
    movePlayer(num)
  }, 1800)
})
