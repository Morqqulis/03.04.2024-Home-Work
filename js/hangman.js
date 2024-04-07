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
	{
		id: 0,
		name: 'matrix',
	},
	{
		id: 1,
		name: 'titanic',
	},
	{
		id: 2,
		name: 'terminator',
	},
	{
		id: 3,
		name: 'mask',
	},
]

const rightLettersElem = document.querySelector('.right-letters')
const wrongLettersElem = document.querySelector('.wrong-letters')
const chansesElem = document.querySelector('.chanses')

const pressedKeys = []
let chanses = 10
let movieLetters

const setRandomMovie = () => {
	const movie = moviesData[Math.floor(Math.random() * moviesData.length)]
	splide.go(movie.id)
	console.log(movie.name)
	movieLetters = movie.name.split('')
	pressedKeys.length = 0
	chanses = 10
	rightLettersElem.textContent = '-'.repeat(movieLetters.length)
	wrongLettersElem.textContent = ''
	chansesElem.textContent = chanses
}

const decreaseChanses = () => {
	chansesElem.textContent = chanses
	chanses--
}

const handleKeydown = e => {
	const pressedKey = e.key.toLowerCase()
	pressedKeys.push(pressedKey)

	if (movieLetters.includes(pressedKey)) {
		movieLetters.forEach((letter, index) => {
			if (letter === pressedKey) {
				rightLettersElem.textContent = rightLettersElem.textContent.slice(0, index) + letter + rightLettersElem.textContent.slice(index + 1)
			}
		})
	} else {
		chansesElem.textContent = --chanses
		wrongLettersElem.textContent += `${pressedKey},`
	}

	checkWin()
}

const checkWin = () => {
	if (chanses === 0) {
		alert('You lose')
		setRandomMovie()
	} else if (rightLettersElem.textContent === movieLetters.join('')) {
		console.log('You win')
		setRandomMovie()
	}
}

document.addEventListener('keydown', handleKeydown)
setRandomMovie()
