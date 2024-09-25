function Progress({ current_index, points, questions, answer_index }) {
  let total_points = 0;
  questions.map((op) => {
    total_points += op.points;
  });
  return (
    <header className="progress">
      {/* dah html element 3ady hwa be3ml progress bar anta bs btdelo al max kam w al current val kam */}
      <progress
        max={questions.length}
        value={current_index + Number(answer_index !== null)}
      />

      <p>
        Question <strong>{current_index + 1}</strong> / {questions.length}{" "}
      </p>
      <p>
        <strong>{points}</strong> / {total_points}
      </p>
    </header>
  );
}

export default Progress;
