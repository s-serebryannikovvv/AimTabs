const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0 //время
let score = 0 //финальный счёт

startBtn.addEventListener('click', event => {
	//обработка событий на первом экране, добавление класса up
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	//делегирование событий на родителе
	if (event.target.classList.contains('time-btn')) {
		//отслеживаем кнопки для выбора времени игры
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame() //запускаем игру
	}
})

board.addEventListener('click', event => {
	//делегирование событий на доске, для отслеживания клика по кругам
	if (event.target.classList.contains('circle')) {
		score++ //увеличиваем счёт на 1
		event.target.remove() //удаляем нажатый круг
		createRandomCircle() // добавляем круг с рандомными размерами
	}
})

function startGame() {
	//функция начала игры
	setInterval(decriseTime, 1000) //отсчитываем время, вызываем функцию раз в 1сек
	createRandomCircle()
	setTime(time)
}

function decriseTime() {
	//уменьшаем значение времени
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}` //добавляем 0 перед цифрой, если значение меньше 10
		}
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	// функция окончания игры
	timeEl.parentNode.classList.add('hide') //убираем значение времени
	board.innerHTML = `<h1>Cчёт: <span class = "primary">${score}</span></h1>` //выводим счёт игры
}

function createRandomCircle() {
	// функция для формирования рандомных значений размера круга
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60) // создаём рандомные значения
	const {
		width,
		height
	} = board.getBoundingClientRect() //деструктуризация значений высоты и ширины поля
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	board.append(circle)
}

function getRandomNumber(min, max) {
	//функция создания рандомных значений
	return Math.round(Math.random() * (max - min) + min)
}