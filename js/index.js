'use strict'
let currentStep = 0

document.querySelector('.actions').addEventListener('click', e => {
	const target = e.target
	const buttons = document.querySelectorAll('.btn')
	const steps = document.querySelectorAll('.step')
	const circles = document.querySelectorAll('.number')

	currentStep = Math.min(Math.max(currentStep, 0), steps.length - 1)

	if (target.closest('.btn.next')) {
		steps[currentStep].classList.add('active')
		circles[currentStep + 1].style.borderColor = '#000'
		currentStep++
	}

	if (target.closest('.btn.prev')) {
		currentStep--
		steps[currentStep].classList.remove('active')
		circles[currentStep + 1].style.borderColor = '#ccc'
	}

	currentStep == 0 ? (buttons[0].disabled = true) : (buttons[0].disabled = false)
	currentStep == steps.length - 1 ? (buttons[1].disabled = true) : (buttons[1].disabled = false)
})

// Modal


