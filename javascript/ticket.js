const seats = document.getElementsByClassName('seat-btn');
let seatCount = parseInt(document.getElementById('seat-counts').innerText);
let seatRemain = parseInt(document.getElementById('remaining-seat').innerText);
const ticketPrice = parseInt(document.getElementById('ticket-price').innerText);
let TotalPrice = 0;
const selectedSeatArray = [];

for (const seat of seats) {
    seat.addEventListener('click', function (e) {
        const seatNumber = e.target.innerText;
        if (!selectedSeatArray.includes(seatNumber)) {
            if (selectedSeatArray.length >= 4) {
                alert('At a time you can select Maximum 4 Seat.');
                return;
            }
            selectedSeatArray.push(seatNumber);
            e.target.classList.add('bg-color');
            seatCount = selectedSeatArray.length;
            setInnerText('seat-counts', seatCount);
            seatRemain = 40 - selectedSeatArray.length;
            setInnerText('remaining-seat', seatRemain);

            const ticketDisplayElement = document.createElement('tr');
            const ticketDisplay = document.getElementById('price-display');
            ticketDisplayElement.innerHTML = `<tr class="border-b-2 border-black">
            <td class="px-0">${seatNumber}</td>
            <td>Economy</td>
            <td class="text-right px-0" id="selected-price">${ticketPrice}</td>
          </tr>`
            ticketDisplay.appendChild(ticketDisplayElement);
            const selectedPrice = parseInt(document.getElementById('selected-price').innerText);
            TotalPrice = TotalPrice + selectedPrice;
        }
        else if (selectedSeatArray.includes(seatNumber)) {
            if (selectedSeatArray.length >= 4) {
                alert('At a time you can select Maximum 4 Seat.');
                return;
            }
            selectedSeatArray.pop(seatNumber);
            e.target.classList.remove('bg-color');
            seatCount = selectedSeatArray.length;
            setInnerText('seat-counts', seatCount);
            seatRemain = 40 - selectedSeatArray.length;
            setInnerText('remaining-seat', seatRemain);
            const ticketDisplayElement = document.createElement('tr');
            const ticketDisplay = document.getElementById('price-display');
            ticketDisplay.removeChild(ticketDisplayElement);
            const selectedPrice = parseInt(document.getElementById('selected-price').innerText);
            TotalPrice = TotalPrice + selectedPrice;
        }
        else {
            e.target.classList.toggle('bg-color');
        }

        setInnerText('total-price', TotalPrice);
        setInnerText('grand-price', TotalPrice);

        const newCoupon = document.getElementById('new-coupon').innerText;
        const coupleCoupon = document.getElementById('couple-coupon').innerText;
        const couponInput = document.getElementById('coupon-input');
        couponInput.addEventListener('input', function () {
            const inputText = couponInput.value;
            if (inputText == newCoupon && parseInt(seatCount) >= 4) {
                const applyButton = document.getElementById('coupon-btn');
                applyButton.removeAttribute('disabled');
                applyButton.addEventListener('click', function () {
                    const discountPrice = (TotalPrice * 15) / 100;
                    const grandPrice = TotalPrice - discountPrice;
                    setInnerText('grand-price', grandPrice);
                    document.getElementById('coupon-apply').classList.add('hidden');
                })
            
            }
            else if (inputText == coupleCoupon && parseInt(seatCount) >= 4) {
                const applyButton = document.getElementById('coupon-btn');
                applyButton.attributes.removeNamedItem('disabled');
                applyButton.addEventListener('click', function () {
                    const discountPrice = (selectedTotalPrice * 20) / 100;
                    const grandPrice = selectedTotalPrice - discountPrice;
                    setInnerText('grand-price', grandPrice);
                    document.getElementById('coupon-apply').classList.add('hidden');
                })
            }
            else {
                document.getElementById('coupon-btn').disabled = true;
            }
        })

        if (selectedSeatArray.length > 0) {
            const phoneNumberInputField = document.getElementById('phone-number');
            phoneNumberInputField.addEventListener('input', function () {
                let phoneNumber = parseInt(phoneNumberInputField.value);
                if (typeof phoneNumber === 'number') {
                    document.getElementById('next-btn').attributes.removeNamedItem('disabled');
                }
                else {
                    document.getElementById('next-btn').disabled = true;
                }
            })
        }
    })
}

function setInnerText(idName, value) {
    const element = document.getElementById(idName);
    element.innerText = value;
}