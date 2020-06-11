let currentOperator = "";
let currentFirstNum = "";
let currentSecondNum = "";
let justCalculated = false;


function add(a, b) {
    return a + b;
}

function divide(a,b) {
    if(b == 0) return 'ERROR: Divide by 0'; //do something
    return a/b;
}

function multiply(a,b) {
    return a*b;
}

function subtract(a,b) {
    return a - b;
}

function operate(a, operator, b) {
    if(operator == '+') return add(a,b);
    else if(operator == '-') return subtract(a,b);
    else if(operator == '÷') return divide(a,b);
    else if(operator == 'x') return multiply(a,b);
    return 'Invalid operate';
}

function updateDisplay(value) {
    document.querySelector('#display-value').textContent = value;
}

function operatorPressed(e) {
    if(currentOperator && currentSecondNum) { //allows users to string operations with =l
        calculate();
    }
    currentOperator = e.target.textContent;
}

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach( button => {
    button.addEventListener('click', operatorPressed);
});

//if selects operator right after a result is displayed, uses result as left operand
//precondition: operator is null after using equals.

function numberPressed(e) {
    if(justCalculated) { //resets screen
        currentFirstNum = e.target.textContent;
        updateDisplay(currentFirstNum);
    }
    else if(currentOperator) {
        currentSecondNum += e.target.textContent;
        updateDisplay(currentSecondNum);
    } else {
        currentFirstNum += e.target.textContent;
        updateDisplay(currentFirstNum);
    }
}

const numberBtns = document.querySelectorAll('.numeric-btn');
numberBtns.forEach( button => {
    button.addEventListener('click', numberPressed);
});

function calculate() {
    const output = operate(+currentFirstNum, currentOperator, +currentSecondNum).toFixed(2) * 100 / 100;  //fixes toFixed making 1 round to 1.00
    updateDisplay(output);
    currentFirstNum = output;
    currentSecondNum = currentOperator = "";
}

document.querySelector('.equals-btn').addEventListener('click', calculate);
