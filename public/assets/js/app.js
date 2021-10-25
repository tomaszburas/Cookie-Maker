const addBaseElements = document.querySelectorAll('.base-add');
const addGlazeElements = document.querySelectorAll('.glaze-add');
const removeGlazeElements = document.querySelectorAll('.glaze-remove');
const addAddonsElements = document.querySelectorAll('.addon-add');
const removeAddonsElements = document.querySelectorAll('.addon-remove');

const pulseBadge = document.querySelector('.pulse1-badge');
const baseCookiePreviewDiv = document.querySelector('.base-cookie-preview');
const cookiePreviewDiv = document.querySelector('.cookie-preview');
const body = document.querySelector('.header-section');

const basketIcon = document.querySelector('.bx-basket');

(async function () {
  let cookie = {};
  let savedCookie;

  async function init() {
    const res = await fetch('/get-cookie');
    const data = await res.json();

    basketIcon.addEventListener('click', async () => {
      await fetch('order/basket/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cookie),
      });

      window.location.href = '/order/basket';
    });

    // COOKIE SAVED
    if (data.base !== null) {
      cookie = { ...data };
      savedCookie = true;

      // BASE
      [...addBaseElements].forEach((el) => {
        pulseBadge.style.display = 'flex';

        if (el.dataset.name === cookie.base) {
          el.style.color = 'var(--secondary-color)';
        } else {
          el.style.color = 'lightgray';
        }
        addBase(el);
      });

      // ADD GLAZE
      addGlaze(cookie, savedCookie);
      [...addGlazeElements].forEach((el) => {
        el.style.cursor = 'pointer';

        if (el.dataset.name === cookie.glaze) {
          el.style.color = 'var(--secondary-color)';
        } else {
          el.style.color = 'lightgray';
        }
      });

      // REMOVE GLAZE
      removeGlaze(cookie.glaze);
      [...removeGlazeElements].forEach((el) => {
        if (el.dataset.name === cookie.glaze) {
          el.style.color = 'var(--primary-color)';
          el.style.cursor = 'pointer';
        } else {
          el.style.color = 'lightgray';
          el.style.cursor = 'not-allowed';
        }
      });

      // ADD ADDONS
      addAddons();
      [...addAddonsElements].forEach((el) => {
        el.style.cursor = 'pointer';
        if (cookie.addons.includes(el.dataset.name)) {
          el.style.color = 'var(--secondary-color)';
        } else {
          el.style.color = 'lightgray';
        }
      });

      // REMOVE ADDONS
      [...removeAddonsElements].forEach((el) => {
        removeAddons(el.dataset.name);
        if (cookie.addons.includes(el.dataset.name)) {
          el.style.color = 'var(--primary-color)';
          el.style.cursor = 'pointer';
        } else {
          el.style.color = 'lightgray';
          el.style.cursor = 'not-allowed';
        }
      });

      // COOKIE NOT SAVED
    } else {
      cookie = {
        base: '',
        glaze: '',
        addons: [],
      };

      [...addBaseElements].forEach((el) => {
        addBase(el);
      });
    }
  }

  function addBase(element) {
    element.addEventListener('click', addBaseItem);
  }

  function addBaseItem(e) {
    cookie.base = e.target.dataset.name;
    if (!savedCookie) {
      pulseBadge.style.display = 'flex';
      addGlaze();
    }
    cookiePreview(cookie);

    [...addBaseElements].forEach((ele) => {
      if (e.target === ele) {
        ele.style.color = 'var(--secondary-color)';
      } else {
        ele.style.color = 'lightgray';
      }
    });
  }

  function addGlaze() {
    if (savedCookie) {
      [...addGlazeElements].forEach((el) => {
        el.addEventListener('click', addGlazeItem);
      });
    } else {
      addAddons();
      [...addGlazeElements].forEach((el) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', addGlazeItem);
      });
    }
  }

  function addGlazeItem(e) {
    cookie.glaze = e.target.dataset.name;

    cookiePreview(cookie);

    [...addGlazeElements].forEach((ele) => {
      if (e.target === ele) {
        ele.style.color = 'var(--secondary-color)';
        removeGlaze(e.target.dataset.name);
      } else {
        ele.style.color = 'lightgray';
      }
    });
  }

  function removeGlaze(nameAddon) {
    [...removeGlazeElements].forEach((el) => {
      if (el.dataset.name === nameAddon) {
        el.style.color = 'var(--primary-color)';
        el.style.cursor = 'pointer';
      } else {
        el.style.color = 'lightgray';
        el.style.cursor = 'not-allowed';
      }
      el.addEventListener('click', removeGlazeItem);
    });
  }

  function removeGlazeItem(e) {
    e.target.style.color = 'lightgrey';
    e.target.style.cursor = 'not-allowed';

    const addElement = [...addGlazeElements].find((el) => el.dataset.name === e.target.dataset.name);

    addElement.style.color = 'lightgrey';

    cookie.glaze = '';

    cookiePreview(cookie);
  }

  function addAddons() {
    [...addAddonsElements].forEach((el) => {
      if (!savedCookie) {
        el.style.cursor = 'pointer';
      }

      el.addEventListener('click', addAddonsItem);
    });
  }

  function addAddonsItem(e) {
    if (!cookie.addons.includes(e.target.dataset.name) && cookie.addons.length <= 1) {
      cookie.addons.push(e.target.dataset.name);

      cookiePreview(cookie);
      removeAddons(e.target.dataset.name);
    } else {
      alertMessage('📣 You have already added 2 addons', 'negative');
    }

    [...addAddonsElements].forEach((ele) => {
      if (cookie.addons.includes(ele.dataset.name)) {
        ele.style.color = 'var(--secondary-color)';
      } else {
        ele.style.color = 'lightgray';
      }

      if (cookie.addons.length === 2) {
        if (cookie.addons.indexOf(ele.dataset.name) === -1) {
          ele.style.cursor = 'not-allowed';
        } else {
          ele.style.cursor = 'pointer';
        }
      }
    });
  }

  function removeAddons(nameAddon) {
    [...removeAddonsElements].forEach((el) => {
      if (el.dataset.name === nameAddon) {
        el.style.color = 'var(--primary-color)';
        el.style.cursor = 'pointer';
      }

      el.addEventListener('click', removeAddonsItem);
    });
  }

  function removeAddonsItem(e) {
    e.target.style.color = 'lightgrey';
    e.target.style.cursor = 'not-allowed';

    const addElement = [...addAddonsElements].find((el) => el.dataset.name === e.target.dataset.name);

    addElement.style.color = 'lightgrey';

    const index = cookie.addons.indexOf(e.target.dataset.name);

    if (index !== -1) {
      cookie.addons.splice(index, 1);
    }

    [...addAddonsElements].forEach((ele) => {
      if (cookie.addons.length === 2) {
        if (cookie.addons.indexOf(ele.dataset.name) === -1) {
          ele.style.cursor = 'not-allowed';
        } else {
          ele.style.cursor = 'pointer';
        }
      } else {
        ele.style.cursor = 'pointer';
      }
    });

    cookiePreview(cookie);
  }

  function cookiePreview(obj) {
    const { base, glaze, addons } = obj;
    const bg = [];

    checkIngredients();

    if (glaze) {
      bg.push(`url('/assets/images/cookies/${glaze}.png')`);
    }

    if (base) {
      bg.push(`url('/assets/images/cookies/empty-${base}.png')`);
    }

    if (addons) {
      addons.forEach((e) => {
        bg.unshift(`url('/assets/images/cookies/${e}.png')`);
      });
    }

    if (!savedCookie) {
      baseCookiePreviewDiv.style.backgroundImage = bg.join(',');
      baseCookiePreviewDiv.innerText = '';
      baseCookiePreviewDiv.style.border = 'none';
    } else {
      cookiePreviewDiv.style.backgroundImage = bg.join(',');
    }
  }

  function checkIngredients() {
    if (!cookie.glaze) {
      [...addGlazeElements].forEach((e) => {
        e.style.color = 'var(--secondary-color)';
      });
    }

    if (!cookie.addons.length) {
      [...addAddonsElements].forEach((e) => {
        e.style.color = 'var(--secondary-color)';
      });
    }
  }

  await init();

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}());

function alertMessage(string, importance) {
  const div = document.createElement('div');
  div.classList.add('alert');

  const p = document.createElement('p');

  if (importance === 'negative') {
    p.classList.add('alert-text-negative', 'animate__animated', 'animate__fadeInDown');
  }
  if (importance === 'positive') {
    p.classList.add('alert-text-positive', 'animate__animated', 'animate__fadeInDown');
  }

  p.innerText = string;

  div.appendChild(p);
  body.appendChild(div);

  setTimeout(() => {
    p.classList.add('animate__fadeOutUp');
  }, 2000);

  setTimeout(() => {
    body.removeChild(div);
  }, 3000);
}

export { basketIcon, alertMessage };
