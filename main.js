const result = document.querySelector(".display");
const buttons = document.querySelectorAll(".keys-buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateDisplay(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  }

  updateDisplay();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
}

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  percentageValue = null;
  updateDisplay();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateDisplay(true);
}

function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) {
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateDisplay();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});