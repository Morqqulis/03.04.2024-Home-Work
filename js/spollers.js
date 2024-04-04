'use strict'

const spollers = document.querySelectorAll('.spoller')

spollers.forEach((item, index) => {
	item.addEventListener('click', () => {
		item.classList.toggle('active')
	})
})

// Eger sadece bir aktiv spoller laazimdirsa

// spollers.forEach(spoller => {
//     spoller.classList.remove('active')
// })
