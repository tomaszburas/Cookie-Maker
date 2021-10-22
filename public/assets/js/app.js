const addBaseElements = document.querySelectorAll('.base-add');
const addGlazeElements = document.querySelectorAll('.glaze-add');
const addAddonsElements = document.querySelectorAll('.addon-add');
const removeAddonsElements = document.querySelectorAll('.addon-remove');

const pulseBadge = document.querySelector('.pulse1-badge');
const baseCookiePreviewDiv = document.querySelector('.base-cookie-preview');
const cookiePreviewDiv = document.querySelector('.cookie-preview');
const body = document.querySelector('body');

const basketIcon = document.querySelector('.bx-basket');

async function init() {
    const res = await fetch('/get-cookie');
    const data = await res.json();

    let cookie = {};
    let savedCookie;

    basketIcon.addEventListener('click', async () => {

        await fetch('order/basket/set-cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(cookie),
        })
    })

    // COOKIE NOT SAVED
    if (data.base !== null) {
        cookie = {...data};
        savedCookie = true;

        // BASE
        [...addBaseElements].forEach(el => {
            pulseBadge.style.display = 'flex';

            if (el.dataset.name === cookie.base){
                    el.style.color = 'var(--secondary-color)';
                } else {
                    el.style.color = 'lightgray';
            }
            addBase(cookie, el, savedCookie)
        });

        //GLAZE
        addGlaze(cookie, savedCookie);
        [...addGlazeElements].forEach(el => {
            el.style.cursor = "pointer";

            if (el.dataset.name === cookie.glaze){
                el.style.color = 'var(--secondary-color)';
            } else {
                el.style.color = 'lightgray';
            }
        });

        // ADD ADDONS
        addAddons(cookie, savedCookie);
        [...addAddonsElements].forEach(el => {
            el.style.cursor = "pointer";
            if (cookie.addons.includes(el.dataset.name)){
                el.style.color = 'var(--secondary-color)';
            } else {
                el.style.color = 'lightgray';
            }
        });

        // REMOVE ADDONS
        [...removeAddonsElements].forEach(el => {
            removeAddons(cookie, el.dataset.name, savedCookie);
            if (cookie.addons.includes(el.dataset.name)){
                el.style.color = 'var(--primary-color)';
                el.style.cursor = "pointer";
            } else {
                el.style.color = 'lightgray';
            }
        });

    // COOKIE SAVED
    } else {
        cookie = {
            base: '',
            glaze: '',
            addons: [],
        };

        [...addBaseElements].forEach(el => {
            addBase(cookie, el, savedCookie)
        });
    }
}

function addBase(cookies, element, savedCookie) {
        element.addEventListener('click', e => {
            cookies.base = e.target.dataset.name;
            if (!savedCookie){
                pulseBadge.style.display = 'flex';
                addGlaze(cookies, savedCookie);
            }
            cookiePreview(cookies, savedCookie);

            [...addBaseElements].forEach(ele => {
                if (e.target === ele){
                    ele.style.color = 'var(--secondary-color)';
                } else {
                    ele.style.color = 'lightgray';
                }
            })
        })
}

function addGlaze(cookie, savedCookie) {
    if (savedCookie) {
        [...addGlazeElements].forEach(el => {
            addGlazeItem(el, cookie, savedCookie);
        })
    } else {
        [...addGlazeElements].forEach(el => {
            el.style.cursor = "pointer";
            addGlazeItem(el, cookie, savedCookie);
        })
    }
}

function addGlazeItem(el, cookie, savedCookie) {
    el.addEventListener('click', e => {
        cookie.glaze = e.target.dataset.name;

        cookiePreview(cookie, savedCookie);

        if (!savedCookie) {
            addAddons(cookie, savedCookie);
        }

        [...addGlazeElements].forEach(ele => {
            if (e.target === ele){
                ele.style.color = 'var(--secondary-color)';
            } else {
                ele.style.color = 'lightgray';
            }
        })
    });
}

function addAddons(cookie, savedCookie) {
        [...addAddonsElements].forEach(el => {

            if (!savedCookie) {
                el.style.cursor = 'pointer';
            }

            el.addEventListener('click', e => {

                if (cookie.addons.length === 2) {
                    alertMessage('📣 You have already added 2 addons')
                }

                if (!cookie.addons.includes(e.target.dataset.name) && cookie.addons.length <= 1) {
                    cookie.addons.push(e.target.dataset.name);

                    cookiePreview(cookie, savedCookie);
                    removeAddons(cookie, e.target.dataset.name, savedCookie);
                }

                [...addAddonsElements].forEach(ele => {
                    if (cookie.addons.includes(ele.dataset.name)){
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
                })
            });
        })
}

function removeAddons(cookie, nameAddon, savedCookie) {
    [...removeAddonsElements].forEach((el, i) => {
        if (el.dataset.name === nameAddon) {
            el.style.color = 'var(--primary-color)';
            el.style.cursor = 'pointer';
        }
        el.addEventListener('click', () => {
            el.style.color = 'lightgrey';
            el.style.cursor = 'not-allowed';

            [...addAddonsElements][i].style.color = 'lightgrey';

            const index = cookie.addons.indexOf(el.dataset.name);

            if (index !== -1) {
                cookie.addons.splice(index, 1);
            }

                [...addAddonsElements].forEach(ele => {
                    if (cookie.addons.length === 2) {
                        if (cookie.addons.indexOf(ele.dataset.name) === -1) {
                            ele.style.cursor = 'not-allowed';
                        } else {
                            ele.style.cursor = 'pointer';
                        }
                    } else {
                        ele.style.cursor = 'pointer';
                    }
                })

            cookiePreview(cookie, savedCookie);
        })
    })
}

function cookiePreview(obj, savedCookie) {
    const {base, glaze, addons} = obj;
    const bg = [];

    if (glaze) {
        bg.push(`url('/assets/images/cookies/${glaze}.png')`)
    }

    if (base) {
        bg.push(`url('/assets/images/cookies/empty-${base}.png')`)
    }

    if (addons) {
        addons.forEach(e => {
            bg.unshift(`url('/assets/images/cookies/${e}.png')`)
        })
    }

    if (!savedCookie) {
        baseCookiePreviewDiv.style.backgroundImage = bg.join(',');
        baseCookiePreviewDiv.innerText = '';
        baseCookiePreviewDiv.style.border = 'none';
    } else {
        cookiePreviewDiv.style.backgroundImage = bg.join(',');
    }
}

function alertMessage(string) {
    const div = document.createElement('div');
    div.classList.add('alert');

    const p = document.createElement('p');
    p.classList.add('alert-text', 'animate__animated', 'animate__fadeInDown')
    p.innerText = string;

    div.appendChild(p);
    body.appendChild(div);

    setTimeout(() => {
        p.classList.add('animate__fadeOutUp');
    }, 2000)

    setTimeout(() => {
        body.removeChild(div);
    }, 3000)
}

init();


