// const playerOption = '✕'
// const botOption = '◯'
// const boxes = Array.from({ length: 9 })

// document.addEventListener('click', e => {
// 	const target = e.target

// 	if (target.closest('.game-board')) {
// 		const id = target.id
// 		target.textContent = playerOption
// 		boxes[id] = playerOption

// 		const emptyBoxes = boxes.filter(box => box !== playerOption && box !== botOption)

// 		if (emptyBoxes.length) {
// 			const botId = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
// 			const bot = document.getElementById(botId)
// 			bot.textContent = botOption
// 			boxes[botId] = botOption
// 			console.log(boxes)
// 		}
// 	}
// })

// ============================
const playerOption = '✕'
const botOption = '◯'
const boxes = Array.from({ length: 9 })

document.querySelector('.game-board').addEventListener('click', handlePlayerMove)

function handlePlayerMove(e) {
	const target = e.target

	if (!target.matches('.game-board div')) return

	const id = parseInt(target.id)
	if (!boxes[id]) {
		target.textContent = playerOption
		boxes[id] = playerOption

		if (checkWin(playerOption)) {
			alert('Siz Udduz!')
			resetGame()
			return
		}

		if (checkTie()) {
			alert('Seka !')
			resetGame()
			return
		}

		setTimeout(botMove, 500)
	}
}

function botMove() {
	const emptyBoxes = boxes.map((box, index) => (!box ? index : -1)).filter(index => index !== -1)
	const randomIndex = Math.floor(Math.random() * emptyBoxes.length)
	const botId = emptyBoxes[randomIndex]
	document.getElementById(botId).textContent = botOption
	boxes[botId] = botOption

	if (checkWin(botOption)) {
		alert('Bot Uddu!')
		resetGame()
		return
	}

	if (checkTie()) {
		alert('Seka!')
		resetGame()
		return
	}
}

function checkWin(player) {
	const winningCombos = [
		// vertical
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		// Horizontal
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		// Diagonal
		[0, 4, 8],
		[2, 4, 6],
	]

	return winningCombos.some(combo => combo.every(index => boxes[index] === player))
}

function checkTie() {
	return boxes.every(box => box)
}

function resetGame() {
	boxes.fill(null)
	document.querySelectorAll('.game-board div').forEach(div => (div.textContent = ''))
}
