import { useReducer } from "react";
import "./assets/style.css";
import Display from "./Display";
import Keypad from "./Keypad";

function App() {

  const sanitizeDecimal = () => {
    // split the screen display
    // then check if the decimal part is not zero
    // if yes keep the integer part
    // else reassemble them 

    // whatever happens, return the sanitized input
  }

  const mainReducer = (state, action) => {
    switch (action.type) {
      case "NUMBER":
        if(state.clear) {
          state.screen = action.payload;
        } else {
          state.screen += action.payload;
        }
        return state;

      case "OPERATOR":
        state.operator = action.payload;
        state.clear = true;
        if(state.decimal) {
          sanitizeDecimal();
        }
        state.operand1 = state.screen;
        state.decimal = false;
        return state;

      case "DEL":
        if(state.screen !== "0" && !state.clear) {
          if(state.screen.length === 1) {
            state.screen = "0";
            state.clear = true;
          } else {
            state.screen.pop();
          }
        }
        return state;

      case "C":
        state = {
          operand1: "",
          operator: "",
          screen: "0",
          decimal: false,
          clear: true,
        }
        return state;

      case "EQUALS":
        if(state.operator !== "") {
          let result = state.operand1 + state.operator + state.screen;
          state.screen = result;
          state.clear = true;
          state.operator = "";
          state.decimal = false;
        }
        return state;

      case "DECIMAL":
        if(!state.decimal && !state.clear) {
          state.screen += ",";
          state.decimal = true;
        }
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
    console.log(e.target.value);
    let key = e.target.value;

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      dispatch({ type: "OPERATOR", payload: key });
    } else {
      if (key === "=" || key === "," || key === "del" || key === "C") {
        switch (key) {
          case "EQUALS":
            dispatch({ type: "EQUALS", payload: "" });
            break;
          case "DECIMAL":
            dispatch({ type: "DECIMAL", payload: ""});
            break;
          case "DEL":
            dispatch({ type: "DEL", payload: ""});
            break;
          case "C":
            dispatch({ type: "C", payload: ""});
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
