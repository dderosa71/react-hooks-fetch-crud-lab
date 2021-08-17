import React from "react";

function QuestionItem({ question, handleDelete, updateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  return (
    <li key={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(event)=>updateAnswer(id, event.target.value)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={()=>handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
