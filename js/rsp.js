'use strict'

const scores = {
	player: 0,
	computer: 0,
	draw: 0,
}

const scoreElems = document.querySelectorAll('.score')

const changeScore = () => {
	Object.entries(scores).forEach(([scoreType, score], i) => {
		scoreElems[i].textContent = `${scoreType.charAt(0).toUpperCase() + scoreType.slice(1)} Score: ${score}`
	})
}

const hideStart = e => {
	if (e.target.closest('.start-btn')) document.querySelector('.start-bg').classList.add('hidden')
}

const winningMoves = {
	Stone: 'Scissors',
	Scissors: 'Paper',
	Paper: 'Stone',
}

const checkResult = (player, computer) => {
	if (player === computer) return 'draw'
	return winningMoves[player] === computer ? 'player' : 'computer'
}

const setContent = e => {
	const winnerElem = document.querySelector('.winner')
	const result = checkResult(playerChose(e), computerChose())

	const classInfo = {
		draw: { classToRemove: ['win', 'lose'], classToAdd: 'draw', text: 'Draw' },
		player: { classToRemove: ['draw', 'lose'], classToAdd: 'win', text: 'You win !' },
		computer: { classToRemove: ['win', 'draw'], classToAdd: 'lose', text: 'You lose' },
	}

	const info = classInfo[result]

	winnerElem.classList.remove(...info.classToRemove)
	winnerElem.classList.add(info.classToAdd)
	winnerElem.textContent = info.text

	scores[result]++
	changeScore()
}

const computerChose = () => {
	const computerChoseBtns = document.querySelectorAll('.computer-choses .chose-btn')
	const random = Math.floor(Math.random() * computerChoseBtns.length)
	const chosenBtn = computerChoseBtns[random]

	document.querySelectorAll('.computer-choses .chose-btn').forEach(btn => btn.classList.remove('chose-btn--active'))
	chosenBtn.classList.add('chose-btn--active')
	document.querySelector('.computer-chose p').textContent = chosenBtn.dataset.chose

	return chosenBtn.dataset.chose
}

const playerChose = e => {
	const t = e.target
	const closestBtn = t.closest('.chose-btn')

	if (closestBtn && closestBtn.dataset.chose) {
		const playerChoseBtns = document.querySelectorAll('.player-choses .chose-btn')
		playerChoseBtns.forEach(btn => btn.classList.remove('chose-btn--active'))
		closestBtn.classList.add('chose-btn--active')
		document.querySelector('.player-chose p').textContent = closestBtn.dataset.chose

		return closestBtn.dataset.chose
	}
}

document.querySelector('.hero').addEventListener('click', e => {
	hideStart(e)
	if (playerChose(e)) {
		setTimeout(() => {
			computerChose()
			setContent(e)
		}, 100)
	}
})
