import { useReducer, useState } from "react";

function reducer_func(current_state, action_taken) {
  console.log(current_state, action_taken);
  // if (action_taken.type === "inc") return current_state + 1;
  // if (action_taken.type === "dec") return current_state - 1;
  // if (action_taken.type === "setCount") return action_taken.payload;
  switch (action_taken.type) {
    case "inc":
      return {
        ...current_state,
        count: current_state.count + current_state.step,
      };
    case "dec":
      return {
        ...current_state,
        count: current_state.count - current_state.step,
      };
    case "setCount":
      return { ...current_state, count: action_taken.payload };
    case "setStep":
      return { ...current_state, step: action_taken.payload };
    case "reset":
      return initial_state;
    default:
      throw new Error("Unknown action");
  }
}

let initial_state = { count: 0, step: 1 };

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer_func, initial_state);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
