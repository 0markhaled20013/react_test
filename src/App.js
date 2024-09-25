import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main_";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import Questions_List from "./Questions_List";
import NextQuestion from "./component/NextQuestion";
import Progress from "./component/Progress";
import FinishedScreen from "./component/FinishedScreen";
import Timer from "./component/Timer";

let sec_per_question = 30;

const initial_state = {
  questions: [],
  status: "loading_state", // loading | error | ready | active | finished states
  current_index: 0,
  answer_index: null,
  points: 0,
  seconds_remaining: null,
};
function reducer(current_state, action) {
  // al action dah aly bb3to mn al dispatch
  switch (action.type) {
    case "dataReceived":
      return { ...current_state, questions: action.value, status: "ready" };
    case "dataFailed":
      return { ...current_state, status: "error" };
    case "start":
      return {
        ...current_state,
        status: "active",
        seconds_remaining: current_state.questions.length * sec_per_question,
      };
    case "newAnswer":
      let q = current_state.questions.at(current_state.current_index);
      console.log(q.points);
      return {
        ...current_state,
        answer_index: action.value,
        points:
          action.value === q.correctOption
            ? current_state.points + q.points
            : current_state.points,
      };
    case "NextQuestion":
      return {
        ...current_state,
        current_index: current_state.current_index + 1,
        answer_index: null,
      };
    case "finished":
      return {
        ...current_state,
        status: "finished",
      };
    case "restart":
      return {
        ...initial_state,
        status: "ready",
        questions: current_state.questions,
      };
    case "timeOut":
      return {
        ...current_state,
        seconds_remaining: current_state.seconds_remaining - 1,
      };
    default:
      throw new Error("error");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const {
    questions,
    status,
    current_index,
    answer_index,
    points,
    seconds_remaining,
  } = state; // 3mlt destructuring
  console.log(questions, status);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", value: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    // <div>
    //   <DateCounter />
    // </div>
    <div className="app">
      <Header />

      <Main>
        {status === "loading_state" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen num_questions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              current_index={current_index}
              points={points}
              questions={questions}
              answer_index={answer_index}
            />
            <Questions_List
              question={questions[current_index]}
              dispatch={dispatch}
              answer_index={answer_index}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                seconds_remaining={seconds_remaining}
              />
              <NextQuestion
                dispatch={dispatch}
                answer_index={answer_index}
                questions={questions}
                current_index={current_index}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            questions={questions}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
