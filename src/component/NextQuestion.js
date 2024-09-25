function NextQuestion({ dispatch, answer_index, questions, current_index }) {
  if (answer_index === null) return null;
  if (current_index < questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        Next
      </button>
    );
  if (current_index === questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finished
      </button>
    );
}

export default NextQuestion;
