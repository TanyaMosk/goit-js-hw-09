import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('input#datetime-picker'), 
  dataDay: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};
const { inputDate, dataDay, dataHours, dataMinutes, dataSeconds } = refs;

refs.startBtn.addEventListener('click', onClickStartTimerBtn);
refs.startBtn.disabled = true;
refs.startBtn.classList.add('active-bth');
refs.inputDate.classList.add('input-date');
document.body.style.backgroundColor = 'blueviolet';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // Виконуємо перевірку вибраної та поточної дати   
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('PLEASE CHOOSE A DATE IN THE FUTURE', {
        timeout: 2000,
        position: 'center-top',
        width: '460px',
        fontSize: '18px',
        cssAnimationStyle: 'from-top',
      });
    }
  },
};

flatpickr('input#datetime-picker', options);

let timerId = null;

Notiflix.Notify.info('CHOOSE A DATE IN THE FUTURE AND START THE TIMER', {
  timeout: 4000,
  position: 'center-top',
  width: '520px',
  fontSize: '18px',
  cssAnimationStyle: 'from-top',
});

function onClickStartTimerBtn() {
  Notiflix.Notify.success('THE TIME COUNTDOWN HAS STARTED', {
    timeout: 2000,
    position: 'center-top',
    width: '460px',
    fontSize: '18px',
    cssAnimationStyle: 'from-top',
  });

  timerId = setInterval(() => {
    // отримуємо різницю між вибраною датою та поточною
    const timerDate = new Date(inputDate.value) - Date.now();
    
    if (timerDate > 0) {
      refs.startBtn.disabled = false;
      startTimer(timerDate);
    } else {
      stopTimer();
      Notiflix.Notify.info(
        'THE TIMER HAS ENDED.THANK YOU FOR USING OUR TIMER',
        {
          timeout: 3000,
          position: 'center-top',
          width: '560px',
          fontSize: '18px',
          cssAnimationStyle: 'from-top',
        }
      );
    }
  }, 1000);
}
function startTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  setTimeTextContent({ days, hours, minutes, seconds });
}

function stopTimer() {
  clearInterval(timerId);
  refs.startBtn.disabled = true;
}

function setTimeTextContent({ days, hours, minutes, seconds }) {
  dataDay.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}
// Якщо тільки 1 число то додаємо 0 перед ним
function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


