import { basketIcon } from './app.js';

(function () {
  const spanTime = document.querySelector('.time-span');

  basketIcon.style.display = 'none';
  let startTime = 4;

  const timer = setInterval(() => {
    spanTime.innerText = ` ${startTime} s.`;
    startTime--;

    if (startTime === 0) {
      clearInterval(timer);
      window.location.href = '/';
    }
  }, 1000);
}());
