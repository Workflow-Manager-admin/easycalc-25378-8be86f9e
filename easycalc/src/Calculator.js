import React, { useState } from "react";

/**
 * Main container for the EasyCalc calculator.
 * Supports addition, subtraction, multiplication, and division.
 * Dark theme: primary (#ffffff), secondary (#f0f0f0), accent (#007bff).
 * UI: display at the top, button grid below.
 */
// PUBLIC_INTERFACE
function Calculator() {
  // State for input and result
  const [input, setInput] = useState(""); // Input string displayed
  const [result, setResult] = useState(""); // Computed result (shown after =)

  // Digits and operations - for button grid
  const buttonMap = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"],
  ];

  // Handle digit and operator button click
  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
      return;
    }
    if (value === "=") {
      computeResult();
      return;
    }
    // Prevent inputting two operators in a row
    const lastChar = input.slice(-1);
    if (
      isOperator(value) &&
      (input === "" || isOperator(lastChar))
    ) {
      // Don't allow operator as first char or repeated
      return;
    }
    setInput(input + value);
    setResult("");
  };

  // Check if a value is any operator
  function isOperator(val) {
    return ["+", "-", "×", "÷"].includes(val);
  }

  // Compute and set result safely
  function computeResult() {
    try {
      if (input === "" || isOperator(input.slice(-1))) return;
      // Replace × with * and ÷ with / for JS eval
      const sanitized = input.replace(/×/g, "*").replace(/÷/g, "/");
      // eslint-disable-next-line no-eval
      let evalResult = eval(sanitized);
      if (typeof evalResult === "number" && !isFinite(evalResult)) {
        setResult("Error");
      } else {
        setResult(evalResult.toString());
      }
    } catch {
      setResult("Error");
    }
  }

  // Render a calculator button
  function CalcButton({ text }) {
    // Decide style
    let style = {};
    if (isOperator(text)) {
      style = {
        backgroundColor: "var(--accent-color)",
        color: "#fff",
      };
    } else if (text === "C") {
      style = {
        backgroundColor: "#E87A41",
        color: "#fff",
      };
    } else if (text === "=") {
      style = {
        backgroundColor: "#10b981",
        color: "#fff",
      };
    } else {
      style = {
        backgroundColor: "var(--secondary-color)",
        color: "#111",
      };
    }
    return (
      <button
        className="easycalc-btn"
        style={style}
        onClick={() => handleButtonClick(text)}
        tabIndex={0}
        aria-label={text}
      >
        {text}
      </button>
    );
  }

  return (
    <div className="easycalc-main-container">
      <div className="easycalc-display" tabIndex={-1}>
        {/* Show result if computed, otherwise input */}
        <div className="easycalc-input">
          {input || <span style={{ color: "#444" }}>0</span>}
        </div>
        <div className="easycalc-result">
          {result !== "" ? result : ""}
        </div>
      </div>
      <div className="easycalc-btn-grid">
        {buttonMap.map((row, rIdx) => (
          <div className="easycalc-btn-row" key={"row" + rIdx}>
            {row.map((btnText) => (
              <CalcButton key={btnText} text={btnText} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
