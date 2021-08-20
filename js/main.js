const customTip = document.querySelector('#custom-tip');
const hiddenRadio = document.querySelector('#hidden-radio');
const radiobtns = document.querySelectorAll('input[name=tip]');
const numberOfPeople = document.querySelector('#Number-of-People');
const bill = document.querySelector('#bill');
const errorMessage = document.querySelector('.error-message');



const total = document.querySelector('.total');
const tipAmount = document.querySelector('.tip-amount');
const btnReset = document.querySelector('.btn-reset');



function reset() {
    btnReset.disabled = true;
    total.textContent = '$0.00';
    tipAmount.textContent = '$0.00';

    customTip.value = null;
    numberOfPeople.value = null;
    bill.value = null;

    radiobtns.forEach(radiobtn => radiobtn.checked = false);

    if (customTip.parentElement.classList.contains('input-container-checked')) {
        customTip.parentElement.classList.remove('input-container-checked');
    }
}




numberOfPeople.addEventListener('change', function (event) {

    if (event.target.value == '0') {
        errorMessage.classList.add('error-message--show');
        errorMessage.textContent = "Can't be zero";
        return
    }

    if (event.target.value == "") {
        errorMessage.classList.add('error-message--show');
        errorMessage.textContent = "It should not be empty";
        return
    }

    if (event.target.value != '0') {

        if (errorMessage.classList.contains('error-message--show')) {
            errorMessage.classList.remove('error-message--show')
        }

        for (const item of radiobtns) {
            if (item.checked) {

                const _numberOfPeople = Number(numberOfPeople.value);
                const _bill = Number(bill.value);
                const tip = Number(item.value) / 100;

                const totalAmount = _bill * (tip + 1);

                const totalPerson = totalAmount / _numberOfPeople;

                const tipPerson = (totalAmount - _bill) / _numberOfPeople;

                total.textContent = `\$${totalPerson.toFixed(2)}`;
                tipAmount.textContent = `\$${tipPerson.toFixed(2)}`;
                btnReset.disabled = false;
                return;
            }
        }

    }

})


btnReset.addEventListener('click', reset)


radiobtns.forEach(radiobtn =>
    radiobtn.addEventListener('click', (event) => {
        if (event.target !== customTip && customTip.parentElement.classList.value.includes('input-container-checked')) {
            customTip.parentElement.classList.remove('input-container-checked');
        }
    })
)


customTip.addEventListener('click', function () {

    if (!hiddenRadio.checked || !customTip.parentElement.classList.contains('input-container-checked')) {
        customTip.parentElement.classList.add('input-container-checked');
    }
    hiddenRadio.checked = true;
})

customTip.addEventListener('focus', function () {

    if (!hiddenRadio.checked || !customTip.parentElement.classList.contains('input-container-checked')) {
        customTip.parentElement.classList.add('input-container-checked');
    }
    hiddenRadio.checked = true;
})




customTip.addEventListener('blur', function (event) {
    if (!event.target.value) {
        customTip.parentElement.classList.remove('input-container-checked');
    }
})

customTip.addEventListener('change', function () {
    hiddenRadio.value = customTip.value;
})











