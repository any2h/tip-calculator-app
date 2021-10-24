const main = document.querySelector('.container'),
      bill = main.querySelector('#input-bill'),
      people = main.querySelector('#input-people'),
      custom = main.querySelector('#input-custom'),
      btns = main.querySelectorAll('.btn'),
      errorMsg = main.querySelector('.error-msg'),
      result = main.querySelectorAll('.value'),
      resetBtn = main.querySelector('.reset');

let billValue = 0.0,
    tipValue = 0.10,
    peopleValue = 1;

function calcTip() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;

        result[0].textContent = '$' + tipAmount.toFixed(2);
        result[1].textContent = '$' + total.toFixed(2);
    }
}

function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        btns.forEach(btn => {
            btn.classList.remove('active');
        });

        if (e.target === custom) {return false;}

        if (e.target.textContent == btn.textContent) {
            e.target.classList.add('active');
            tipValue = parseFloat(e.target.textContent) / 100;
        }

        custom.value = null;
        calcTip();
    });
});

bill.addEventListener('input', () => {
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if (!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
    
    billValue = +(bill.value);

    calcTip();
});

people.addEventListener('input', () => {
    if (!validateFloat(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    if (people.value <= 0) {
        errorMsg.classList.add('show');
        people.classList.add('error');
        
        setTimeout(() => {
            errorMsg.classList.remove('show');
            people.classList.remove('error');
        }, 3000);
    }

    peopleValue = Number(people.value);

    calcTip();
});

custom.addEventListener('input', e => {
    btns.forEach(btn => {
        btn.classList.remove('active');
    });

    if (!validateInt(custom.value)) {
        custom.value = custom.value.substring(0, custom.value.length-1);
    }

    tipValue = custom.value / 100;

    calcTip();
});

resetBtn.addEventListener('click', () => {
    bill.value = null;
    custom.value = null;
    people.value = null;
    btns[1].click();
    bill.focus();
    result[0].textContent = "$0.00";
    result[1].textContent = "$0.00";
});
