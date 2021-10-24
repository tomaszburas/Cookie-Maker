import { basketIcon } from './app.js';

(function () {
  const spanTime = document.querySelector('.time-span');

  basketIcon.style.display = 'none';

  // const div = document.createElement('div');
  // div.classList.add('go-home');

  // const spanMain = document.createElement('span');
  // spanMain.innerText = 'Transfer to the home page will take place in';
  // div.appendChild(spanMain);

  // const spanTime = document.createElement('span');
  // spanTime.innerText = ' 5 s.';
  // div.appendChild(spanTime);
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
