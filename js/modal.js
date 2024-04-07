'use strict'

const modal = document.querySelector('.modal')

document.addEventListener('click', function (event) {
	const target = event.target

	if (target.closest('.open-modal')) {
		modal.showModal()
	}

	if (target.closest('.close-modal') || target === modal) {
		modal.close()
	}

	if (target.closest('.modal__inner')) {
		event.stopPropagation()
	}
})
