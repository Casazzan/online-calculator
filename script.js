let currentOperator = "";
let currentFirstNum = "";
let currentSecondNum = "";
let justCalculated = false;
const OPERATORS = '+-÷x*/';

//basic functions
function add(a, b) {
    return a + b;
}

function divide(a, b) {
    if (b == 0) return 'ERROR: Divide by 0'; //do something
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}


//helper functions
function operate(a, operator, b) {
    if (operator == '+') return add(a, b);
    else if (operator == '-') return subtract(a, b);
    else if (operator == '÷' || operator == '/') return divide(a, b);
    else if (operator == 'x' || operator == '*') return multiply(a, b);
    return 'Invalid operate';
}

function updateDisplay(value) {
    document.querySelector('#display-value').textContent = value ? value : 0;
}

function calculate() {
    if (!(currentFirstNum && currentSecondNum && currentOperator)) return;
    let output = operate(+currentFirstNum, currentOperator, +currentSecondNum)
    output = output.toFixed(2) * 100 / 100;  //fixes toFixed making 1 round to 1.00
    updateDisplay(output);
    currentFirstNum = output;
    currentSecondNum = currentOperator = "";
    justCalculated = true;
}


//event listener functions
function operatorPressed(operator) {
    if (currentOperator && currentSecondNum) { //allows users to string operations with =l
        calculate();
        justCalculated = false;
    }
    currentOperator = operator;
}


//if selects operator right after a result is displayed, uses result as left operand
//precondition: operator is null after using equals.
function numberPressed(num) {
    if (justCalculated) { //resets screen
        currentFirstNum = num;
        updateDisplay(currentFirstNum);
        justCalculated = false;
    }
    else if (currentOperator) {
        currentSecondNum += num;
        updateDisplay(currentSecondNum);
    } else {
        currentFirstNum += num;
        updateDisplay(currentFirstNum);
    }
}

function clear() {
    currentFirstNum = currentSecondNum = currentOperator = "";
    updateDisplay(0);
}

function addDecimal() {
    if (justCalculated) {
        currentFirstNum = '.';
        updateDisplay(currentFirstNum);
        justCalculated = false;
    }
    else if (currentOperator) {
        if (!currentSecondNum.includes('.')) {
            updateDisplay(currentSecondNum += '.');
        }
    }
    else {
        if (!currentFirstNum.includes('.')) {
            updateDisplay(currentFirstNum += '.');
        }
    }
}

function backspace() {
    if (!justCalculated) {
        if (currentOperator) {
            if (currentSecondNum.length > 0) {
                currentSecondNum = currentSecondNum.substring(0, currentSecondNum.length - 1);
                updateDisplay(currentSecondNum);
            }
        }
        else {
            if (currentFirstNum.length > 0) {
                currentFirstNum = currentFirstNum.substring(0, currentFirstNum.length - 1);
                updateDisplay(currentFirstNum);
            }
        }
    }
}


//attaching event listeners
const numberBtns = document.querySelectorAll('.numeric-btn');
numberBtns.forEach(button => {
    button.addEventListener('click', function (e) {
        numberPressed(e.target.textContent);
    });
});

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach(button => {
    button.addEventListener('click', function (e) {
        operatorPressed(e.target.textContent);
    });
});

document.querySelector('.equals-btn').addEventListener('click', calculate);
document.querySelector('.clear-btn').addEventListener('click', clear);
document.querySelector('.decimal-btn').addEventListener('click', addDecimal);
document.querySelector('.backspace-btn').addEventListener('click', backspace);
