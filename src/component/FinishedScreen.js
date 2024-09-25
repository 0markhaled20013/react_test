function FinishedScreen({ points, questions, dispatch }) {
  let total_points = 0;
  questions.map((op) => {
    total_points += op.points;
  });
  let per = (points / total_points) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {total_points} (
        {Math.ceil(per)} %){" "}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
