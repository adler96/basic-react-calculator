import { useReducer } from "react";
import "./assets/style.css";
import Display from "./Display";
import Keypad from "./Keypad";

function App() {
  const calculate = (operand1, operator, screen) => {
    let result = 0;
    operand1 = operand1.replace(",", ".");
    screen = screen.replace(",", ".");

    // dot notation to calculate, results will be strings
    let op1 = parseFloat(operand1);
    let op2 = parseFloat(screen);

    switch (operator) {
      case "+":
        result = op1 + op2;
        break;
      case "-":
        result = op1 - op2;
        break;
      case "*":
        result = op1 * op2;
        break;
      case "/":
        if (op2 !== 0) {
          result = op1 / op2;
        } else {
          return "error";
        }
        break;
      default:
        break;
    }

    return result.toString().replace(".", ",");
  };

  const sanitizeDecimal = (display) => {
    // split the screen display
    let parts = display.split(",");

    if (parts[1] === "" || parseInt(parts[1]) === 0) {
      // if the decimal part is empty or zero
      // return the integer part only
      return parts[0];
    } else {
      return display;
    }
  };

  const popScreen = (display) => {
    const length = display.length;
    let newStr = display.slice(0, length - 1);

    return newStr;
  };

  const mainReducer = (state, action) => {
    switch (action.type) {
      case "NUMBER":
        if (state.clear) {
          // state.screen = action.payload;
          state = { ...state, screen: action.payload, clear: false };
        } else {
          // state.screen += action.payload;
          state = { ...state, screen: state.screen + action.payload };
        }
        console.log("number typed");
        return state;

      case "OPERATOR":
        // state.operator = action.payload;
        // state.clear = true;
        if (state.decimal) {
          state = { ...state, screen: sanitizeDecimal(state.screen) };
        }
        // PROBLEM, NOT CALCULATING AFTER 2ND OPERATOR IN A ROW
        // if an operator was already typed and the screen is not zero
        // calculate first
        if (state.operator !== "" && state.screen !== "0") {
          if (
            calculate(state.operand1, state.operator, state.screen) !== "error"
          ) {
            console.log(
              calculate(state.operand1, state.operator, state.screen)
            );
            state = {
              ...state,
              screen: calculate(state.operand1, state.operator, state.screen),
            };
          } else {
            state = { ...state, ...initialState };
          }
        }
        // state.operand1 = state.screen;
        // state.decimal = false;
        state = {
          ...state,
          operator: action.payload,
          clear: true,
          operand1: state.screen,
          decimal: false,
        };
        console.log("operator typed");
        return state;

      case "DEL":
        if (state.screen !== "0" && !state.clear) {
          if (state.screen.length === 1) {
            // state.screen = "0";
            // state.clear = true;
            state = { ...state, screen: "0", clear: true };
          } else {
            // state.screen.pop();
            state = { ...state, screen: popScreen(state.screen) };
          }
        }
        console.log("del typed");
        return state;

      case "C":
        state = {
          operand1: "",
          operator: "",
          screen: "0",
          decimal: false,
          clear: true,
        };
        console.log("C typed");
        return state;

      case "EQUALS":
        if (state.operator !== "") {
          let result = calculate(state.operand1, state.operator, state.screen);
          state = {
            ...state,
            screen: result,
            clear: true,
            operator: "",
            decimal: false,
          };
          // state.screen = result;
          // state.clear = true;
          // state.operator = "";
          // state.decimal = false;
        }
        console.log("equals typed");
        return state;

      case "DECIMAL":
        if (!state.decimal && !state.clear) {
          state = { ...state, screen: state.screen + "," };
          state.decimal = true;
        }
        console.log("decimal typed");
        return state;

      default:
        return state;
    }
  };

  const initialState = {
    operand1: "",
    operator: "",
    screen: "0",
    decimal: false,
    clear: true,
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);

  let keys = [];

  const initKeys = () => {
    // on top
    keys.push("C");
    keys.push("del");

    // 1 to 9
    for (let i = 1; i <= 9; i++) {
      keys.push(i.toString());
    }

    // last row
    keys.push(",");
    keys.push("0");
    keys.push("=");

    // second column
    keys.push("+");
    keys.push("-");
    keys.push("*");
    keys.push("/");
  };

  initKeys();

  const buttonClick = (e) => {
    // console.log(e.target.value);
    let key = e.target.value;

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      dispatch({ type: "OPERATOR", payload: key });
    } else {
      if (key === "=" || key === "," || key === "del" || key === "C") {
        switch (key) {
          case "=":
            dispatch({ type: "EQUALS", payload: "" });
            break;
          case ",":
            dispatch({ type: "DECIMAL", payload: "" });
            break;
          case "del":
            dispatch({ type: "DEL", payload: "" });
            break;
          case "C":
            dispatch({ type: "C", payload: "" });
            break;
          default:
            alert("error!");
        }
      } else {
        dispatch({ type: "NUMBER", payload: key });
      }
    }
  };

  return (
    <div className="app">
      <Display
        screenContent={state.screen}
        operator={state.operator}
        top={state.operand1}
      />
      <Keypad keysArray={keys} clickCallback={buttonClick} />
    </div>
  );
}

export default App;
