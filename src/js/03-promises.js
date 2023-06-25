import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'), 
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  formBtn: document.querySelector('.form button'),
};
// Деструктуризація змінних 
const { inputDelay, inputStep, inputAmount } = refs;

refs.formBtn.addEventListener('click', onFormBtnClick);

document.body.style.backgroundColor = '#303238';

function onFormBtnClick(evt) {
  evt.preventDefault();
  // зчитуємо значення полів input та перетворюємо їх на число
  const delay = Number(inputDelay.value);
  const steps = Number(inputStep.value);
  const amount = Number(inputAmount.value);
 
  for (let i = 1; i <= amount; i += 1) {
    //Визначаємо значення затримки - генер. послід. значення затримки promise
    const delayValueGener = delay + (i - 1) * steps;
    
    createPromise(i, delayValueGener)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

// Інший варіант onFormBtnClick
// 
// function onFormBtnClick(evt) {
//   evt.preventDefault();
//   const delay = Number(inputDelay.value);
//   const steps = Number(inputStep.value);
//   const amount = Number(inputAmount.value);

//   const promises = [];

//   // Створення масиву Promise
//   Array.from({ length: amount }, (_, index) => index + 1).forEach(position => {
//     const promise = createPromise(position, delay + (position - 1) * steps);
//     promises.push(promise);
//   });

//   // Обробка кожного Promise
//   promises.forEach(promise => {
//     promise
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//   });
// }