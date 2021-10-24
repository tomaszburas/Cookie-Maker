import {alertMessage} from "./app.js";

const inputCoupon = document.querySelector('.class-input');
const btnCoupon = document.querySelector('.class-button');
const totalPrice = document.querySelector('.total-price');

function coupon() {
    btnCoupon.addEventListener('click', async () => {
        const inputValue = inputCoupon.value;
        const summaryBox = document.querySelector('.summary-box');
        const couponsActive = document.querySelectorAll('.coupon-active');

        if (inputValue !== '') {
            const res = await fetch('/order/coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({coupon: inputValue}),
            })
            const data = await res.json();

            if (data) {
                inputCoupon.value = '';

                [...couponsActive].forEach(e => {
                    summaryBox.removeChild(e)
                })

                summaryBox.appendChild(addCouponFront('🎁 Discount', `- ${data.findCoupon[1]}%`))
                summaryBox.appendChild(addCouponFront('🎉 New price', `${data.newPrice} $`))

                alertMessage('🎉 Coupon activated', 'positive')
            } else {
                alertMessage('📣 There is no such coupon', 'negative')
            }

        }
    })
}

function addCouponFront(value1, value2) {
    const tr = document.createElement('tr');
    tr.classList.add('coupon-active');

    const tdFirst = document.createElement('td');
    const tdSecond = document.createElement('td');

    tdFirst.classList.add('fixed-width-column');
    tdFirst.innerText = value1;

    tdSecond.innerText = value2;

    tr.appendChild(tdFirst)
    tr.appendChild(tdSecond)

    return tr
}

if(btnCoupon) {
    coupon();
}
