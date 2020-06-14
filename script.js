let currentOperator = "";
let currentFirstNum = "";
let currentSecondNum = "";
let justCalculated = false;
const OPERATORS = '-÷x/*+';

//basic functions
function add(a, b) {
    return a + b;
}

function divide(a, b) {
    if (b == 0) return 'Illegal/0';
    return a / b;
    //test 12345
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

function round(num) {
    if(isNaN(num)) return num; //if error message
    return num.toFixed(3) * 1000 / 1000;
}

function updateDisplay(value) {
    //console.log(value);
    if(!value) {
        document.querySelector('.display-value').textContent = 0;
    }
    else if(value.length > 10) {
        document.querySelector('.display-value').textContent = value.substring(0,10);
    }
    else {
        document.querySelector('.display-value').textContent = value;
    }
}

function calculate() {
    if (!(currentFirstNum && currentSecondNum && currentOperator)) return;
    const output = round(operate(+currentFirstNum, currentOperator, +currentSecondNum));
    updateDisplay(output);
    currentFirstNum = output;
    currentSecondNum = currentOperator = "";
    justCalculated = true;
}


//event listener functions
function operatorPressed(operator) {
    if (currentOperator && currentSecondNum) { //allows users to string operations with =l
        calculate();
    }
    currentOperator = operator;
    justCalculated = false;
}


//if selects operator right after a result is displayed, uses result as left operand
//precondition: operator is null after using equals.
function numberPressed(num) {
    if(isNaN(num)) return;
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

function negate() {
    if (currentOperator) {
        currentSecondNum = -currentSecondNum;
        updateDisplay(currentSecondNum);
    }
    else {
        currentFirstNum = -currentFirstNum;
        updateDisplay(currentFirstNum);
    }
}

function percent() {
    if (currentOperator) {
        currentSecondNum = round(currentSecondNum / 100);
        updateDisplay(currentSecondNum);
    }
    else {
        currentFirstNum = round(currentFirstNum / 100);
        updateDisplay(currentFirstNum);
    }
    justCalculated = true;
}


//keyboard handler
function keyPressed(e) {
    if (!isNaN(e.key)) { //numpad support
        numberPressed(e.key);
        //highlightKey('.numeric-btn', e.key);
    }
    else if (OPERATORS.includes(e.key)) {
        operatorPressed(e.key);
    }
    else {
        switch (e.key) {
            case 'Backspace':
                backspace();
                break;
            case 190:
            case '.':
                addDecimal();
                break;
            case 'c':
                clear();
                break;
            case 'Enter':
                calculate();
                break;
        }
    }
}

// function highlightKey(tag, key) {
//     const numberBtns = document.querySelectorAll(tag);
//     const cl = tag.substring(1)+'-pressed';
//     numberBtns.forEach(button => {
//         if(key == button.textContent) {
//             button.classList.add(cl);
//             button.addEventListener()
//         }
//     });
// }

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
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('.decimal-btn').addEventListener('click', addDecimal);
document.querySelector('#backspace').addEventListener('click', backspace);
document.querySelector('.negate-btn').addEventListener('click', negate);
document.querySelector('#percent').addEventListener('click', percent);

document.addEventListener('keydown', keyPressed);

