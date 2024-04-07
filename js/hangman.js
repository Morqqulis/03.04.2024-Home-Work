// ============Slider Splide================

const splide = new Splide('.splide', {
	arrows: false,
	pagination: false,
	perPage: 1,
	rewind: true,
	drag: false,
})
splide.mount()

//   ====================================

const moviesData = [
	{ id: 0, name: 'matrix' },
	{ id: 1, name: 'titanic' },
	{ id: 2, name: 'terminator' },
	{ id: 3, name: 'mask' },
]

const rightLettersElem = document.querySelector('.right-letters')
const wrongLettersElem = document.querySelector('.wrong-letters')
const chansesElem = document.querySelector('.chanses')

const pressedKeys = []
let chanses = 10
let movieLetters
let previousMovie, movie
const setRandomMovie = () => {
	do {
		previousMovie = movie
		movie = moviesData[Math.floor(Math.random() * moviesData.length)].name
		console.log(movie)
	} while (movie === previousMovie)

	splide.go(moviesData.find(item => item.name === movie).id)
	movieLetters = movie.split('')
	pressedKeys.length = 0
	chanses = 10
	rightLettersElem.textContent = '-'.repeat(movieLetters.length)
	wrongLettersElem.textContent = ''
	chansesElem.textContent = chanses

	console.log(movie, previousMovie)
}

const checkWin = () => {
	if (chanses === 0) {
		alert('Siz Uduzduz')
		setRandomMovie()
	} else if (rightLettersElem.textContent === movieLetters.join('')) {
		alert('Siz Udduz')
		setRandomMovie()
	}
}

const handleKeydown = e => {
	const pressedKey = e.key.toLowerCase()

	if (/^[a-z]$/.test(pressedKey) && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
		pressedKeys.push(pressedKey)

		if (movieLetters.includes(pressedKey)) {
			movieLetters.forEach((letter, index) => {
				if (letter === pressedKey) {
					rightLettersElem.textContent = rightLettersElem.textContent.slice(0, index) + letter + rightLettersElem.textContent.slice(index + 1)
				}
			})
		}

		if (chanses > 0) {
			chansesElem.textContent = --chanses
			wrongLettersElem.textContent += `${pressedKey}, `
		}

		setTimeout(() => {
			checkWin()
		}, 100)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('keydown', handleKeydown)
	setRandomMovie()
})
