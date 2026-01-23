# Development Log

A record of bugs, fixes, and improvements made to the simple-calculator project.

---

## Bug Fixes

### Operator Switching Reset Bug

- **Issue:** When changing operators after already selecting one (e.g., pressing `×` then `÷`), the display value would reset to zero.

- **Cause:** `currentValue` was always being reset to `"0"` in the operator handler, even when just switching operators.

- **Fix:** Only reset `currentValue` if a new number has actually been entered.

### Trailing Decimal in Previous Value

- **Issue:** If you entered a decimal but no digits after it (e.g., `5.`), the trailing decimal would still appear in the `previousValue` display bar.

- **Fix:** Added `stripTrailingDecimal()` helper function to remove trailing decimals before storing to `previousValue`.

### Decimal Not Displaying Visually

- **Issue:** When entering a decimal point, it worked internally but didn't update on the screen until another number was typed.

- **Cause:** `parseFloat("0.")` returns `0`, losing the decimal point during formatting.

- **Fix:** Updated `formatForDisplay()` to check for and preserve trailing decimals before parsing.

### Exponential Notation Not Reverting

- **Issue:** Once a number converted to exponential notation (e.g., `1.23456e+10`), it wouldn't revert to normal notation even when the result was back in displayable range.

- **Fix:** Added `numberToFullString()` function to force conversion back to regular decimal notation when the number fits within the display limit.

### Precision Loss with Large Numbers

- **Issue:** Very large numbers would have trailing digits replaced with zeros due to JavaScript's floating-point precision limits.

- **Cause:** JavaScript uses 64-bit IEEE 754 format, which only provides ~15-17 significant digits of precision.

- **Fix:** Set display threshold to 14 digits and use `toFixed(14)` for calculations to stay within accurate precision range.

---

## Improvements

### Input Length Validation

- **Addition:** Added `MAX_LENGTH` constant (14 characters) in `handleNumber()` to prevent input overflow.

### Display Formatting

- **Addition:** Created `formatForDisplay()` function to handle number formatting for display only, keeping underlying values at full precision.

### Result Formatting for Large Numbers

- **Addition:** Numbers exceeding 14 digits automatically convert to exponential notation (e.g., `1.23456789e+8`) for display.

---

## Code Cleanup

### Removed Unused CSS

- Removed grid properties in `#display-area` that were not affecting layout
- Removed unused `word-wrap: break-word` property

### Reduced Display Gap

- Changed `line-height` values to reduce spacing between `current-input` and `answer-screen` for a cleaner look

### Refactored Operator Handler

- Split `handleOperator()` into smaller, focused functions:
  - `executeCalculation()` - handles the equals button logic
  - `chainOperation()` - manages operator switching and chaining calculations
  - `toggleSign()` - handles the +/- toggle