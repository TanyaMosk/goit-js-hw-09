import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartChangeColorBtn);
refs.stopBtn.addEventListener('click', onStopChangeColorBtn);

refs.startBtn.classList.add('active-bth');
refs.stopBtn.classList.add('active-bth');

function onStartChangeColorBtn() {
  timerId = setInterval(() => {
    const backgroundColor = getRandomHexColor();
    document.body.style.backgroundColor = backgroundColor;
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    console.log('Вибраний колір:', backgroundColor);
  }, 1000);
}

function onStopChangeColorBtn() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  Notiflix.Notify.success('Все погралися і хватить))');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
