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
  const MAX_LENGTH = 14;

  if (num === ".") {
    if (currentValue.includes(".")) return;

    currentValue = currentValue === "0" ? "0." : currentValue + ".";
    return;
  }
  if (currentValue.length > MAX_LENGTH) return;

  currentValue = currentValue === "0" ? num : currentValue + num;
}

function handleOperator(op) {
  if (op === "+/-") return toggleSign();
  if (op === "=") return executeCalculation();

  // If we reach this point, it's a standard operator
  chainOperation(op);
}

function toggleSign() {
  currentValue = String(-parseFloat(currentValue));
}

function executeCalculation() {
  if (!operator) return;
  calculate();
  justCalculated = true;
  operator = "";
  previousValue = "";
}

function skipTrailingDecimal(value) {
  return value.endsWith(".") ? value.slice(0, -1) : value;
}

function chainOperation(nextOp) {
  if (previousValue && operator) {
    calculate();
  }

  if (currentValue !== "0" || previousValue === "") {
    previousValue = skipTrailingDecimal(currentValue);
    currentValue = "0";
  }

  operator = nextOp;
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
      result = prev / current;
      break;
    default:
      return;
  }

  currentValue = String(result);
}

function numberToFullString(num) {
  // Handle very small or very large numbers
  if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e14) {
    // Check if it fits when written out
    const fixed = num.toFixed(14).replace(/\.?0+$/, "");
    return fixed;
  }

  // Remove trailing zeros after decimal
  return parseFloat(num.toPrecision(14)).toString();
}

function formatForDisplay(value) {
  const hasTrailingDecimal = value.endsWith(".");

  const trailingDecimalNum = hasTrailingDecimal ? value.slice() : value;
  const num = parseFloat(value);

  // Force full decimal notation
  const fullValue = numberToFullString(num);
  const digits = fullValue.replace("-", "").replace(".", "");

  if (digits.length > 14) {
    return num.toExponential(8);
  }

  return hasTrailingDecimal ? trailingDecimalNum : fullValue;
}

function updateDisplay() {
  answerScreen.textContent = formatForDisplay(currentValue);
  currentInput.textContent =
    previousValue && operator
      ? `${formatForDisplay(previousValue)} ${operator}`
      : "";
}

function clear() {
  currentValue = "0";
  previousValue = "";
  operator = "";
  updateDisplay();
}
