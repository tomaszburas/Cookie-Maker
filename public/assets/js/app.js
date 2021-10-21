const addBaseElements = document.querySelectorAll('.base-add');

const addGlazeElements = document.querySelectorAll('.glaze-add');

const addAddonsElements = document.querySelectorAll('.addon-add');
const removeAddonsElements = document.querySelectorAll('.addon-remove');

const pulseBadge = document.querySelector('.pulse1-badge');

const cookiePreviewDiv = document.querySelector('.cookie-preview');


// Functions

function configureCookie() {
    const cookie = {
        base: '',
        glaze: '',
        addons: [],
    };

        // add base
    [...addBaseElements].forEach(el => {
        el.addEventListener('click', e => {
            cookie.base = e.target.dataset.name;

            pulseBadge.style.display = 'flex';

            cookiePreview(cookie);

            // add Glaze
            addGlaze(cookie);

            [...addBaseElements].forEach(ele => {
                if (e.target === ele){
                    ele.style.color = 'var(--secondary-color)';
                } else {
                    ele.style.color = 'lightgray';
                }
            })
        })
    })
}

function addGlaze(cookie) {
    [...addGlazeElements].forEach(el => {
        el.style.cursor = "pointer";

        el.addEventListener('click', e => {
            cookie.glaze = e.target.dataset.name;

            cookiePreview(cookie);

            //Add addons
            addAddons(cookie);

            [...addGlazeElements].forEach(ele => {
                if (e.target === ele){
                    ele.style.color = 'var(--secondary-color)';
                } else {
                    ele.style.color = 'lightgray';
                }
            })
        });
    })
}

function addAddons(cookie) {
    [...addAddonsElements].forEach(el => {
        el.style.cursor = "pointer";

        el.addEventListener('click', e => {

            if (cookie.addons.length === 2) {
                console.log('bag');
            }

            if (!cookie.addons.includes(e.target.dataset.name) && cookie.addons.length <= 1) {
                cookie.addons.push(e.target.dataset.name);

                cookiePreview(cookie);

                removeAddons(cookie, e.target.dataset.name);
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

function removeAddons(cookie, nameAddon) {

    [...removeAddonsElements].forEach((el, i) => {
        if (el.dataset.name === nameAddon) {
            el.style.color = 'var(--primary-color)';
            el.style.cursor = 'pointer';
        }

        el.addEventListener('click', e => {
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

            cookiePreview(cookie);
        })

    })

}

function cookiePreview(obj) {
    const {base, glaze, addons} = obj;
    const bg = [];

    cookiePreviewDiv.innerText = '';
    cookiePreviewDiv.style.border = 'none';

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

    cookiePreviewDiv.style.backgroundImage = bg.join(',');

}

configureCookie();


