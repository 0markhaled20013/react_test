import Options from "./component/Options";

function Questions_List({ question, dispatch, answer_index }) {
  console.log(question);
  console.log(question.question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer_index={answer_index}
      />
    </div>
  );
}

export default Questions_List;
