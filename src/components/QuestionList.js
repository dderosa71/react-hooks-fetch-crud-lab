import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then((data) => { setQuestions(data) })
  }, []
  )

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(setQuestions((currentQuestions) => currentQuestions.filter((question) =>
        question.id !== id)
      ))
  }

  function updateAnswer(id, answerIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        "correctIndex": parseInt(answerIndex)
      })
    })
      .then((resp) => resp.json())
      .then((json) => setQuestions(currentQuestions => currentQuestions
        .map((question) => {
          if (question.id === id) {
            return json
          } else {
            return question
          }
        })
      ))
  }

  const questionList = questions.map((question) => (
    <QuestionItem updateAnswer={updateAnswer} handleDelete={handleDelete} key={question.id} question={question} />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
