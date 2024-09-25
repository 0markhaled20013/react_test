function Options({ question, dispatch, answer_index }) {
  let hasAnswer = answer_index != null; // true or false
  return (
    <div className="options">
      {" "}
      {question.options.map((op, index) => (
        <button
          className={`btn btn-option ${answer_index == index ? "answer" : ""} ${
            hasAnswer // lw al hasAnswer== true 5o4ly 3la al 3 stor aly b3do w lw = false mt7ot4 7aga ""
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          key={op}
          onClick={() => {
            dispatch({ type: "newAnswer", value: index });
          }}
        >
          {op}
        </button>
      ))}{" "}
    </div>
  );
}

export default Options;
