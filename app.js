const grid = document.querySelector(".button-grid");
const currentInput = document.querySelector(".current-input");
const answerScreen = document.querySelector(".answer-screen");

let currentValue = "0";
let previousValue = "";
let operator = "";
let justCalculated = false;

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const value = btn.textContent.trim();

  if (btn.id === "clear") {
    clear();
    return;
  }

  if (btn.classList.contains("number-button")) {
    if (justCalculated) {
      clear();
      justCalculated = false;
    }
    handleNumber(value);
  } else if (btn.classList.contains("operator-button")) {
    handleOperator(value);
  }

  updateDisplay();
});

function handleNumber(num) {
  if (num === ".") {
    if (!currentValue.includes(".")) {
      currentValue = currentValue === "0" ? "0." : currentValue + ".";
    }
    return;
  }
  currentValue = currentValue === "0" ? num : currentValue + num;
}

function handleOperator(op) {
  if (op === "+/-") {
    if (currentValue !== "0") {
      currentValue = currentValue.startsWith("-")
        ? currentValue.slice(1)
        : "-" + currentValue;
    }
    return;
  }

  if (op === "=") {
    calculate();
    justCalculated = true;
    operator = "";
    previousValue = "";
    return;
  }

  if (previousValue !== "" && operator !== "") {
    calculate();
  }

  previousValue = currentValue;
  currentValue = "0";
  operator = op;
  justCalculated = false;
}

function calculate() {
  if (previousValue === "" || currentValue === "0") return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
    case "÷":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
}

function updateDisplay() {
  answerScreen.textContent = currentValue;
  currentInput.textContent =
    previousValue && operator ? `${previousValue} ${operator}` : "";
}

function clear() {
  currentValue = "0";
  previousValue = "";
  operator = "";
  updateDisplay();
}
