function startScreen({ num_questions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz !</h2>
      <h3>{num_questions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}

export default startScreen;
