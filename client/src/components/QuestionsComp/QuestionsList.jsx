/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import axios from 'axios';

function QuestionsList({
  product, questions, displayed, setDisplayed, numQuestions, setNumQuestions,
}) {
  useEffect(() => {
    const arr = [];
    if (questions[0] && questions.length > numQuestions) {
      for (let i = 0; i < numQuestions; i++) {
        arr.push(displayQuestion(questions[i]));
        setDisplayed(arr);
      }
    } else if (questions[0]) {
      for (let i = 0; i < questions.length; i++) {
        arr.push(displayQuestion(questions[i]));
      }
      setDisplayed(arr);
    }
  }, [numQuestions, questions]);
  return (
    <div>
      {displayed}
      {displayed.length < questions.length && <button type="button" onClick={() => { setNumQuestions(numQuestions + 2); }}>Show more questions</button>}
    </div>
  );
  function displayQuestion (question) {
    return (
      <div>
        Q:
        {' '}
        {question.question_body}
        <button type="button" onClick={() => {helpfulQuestion(question)}}>Helpful?</button>
        <Answers question_id={question.question_id} />
        <br />
      </div>
    )
  }
  function helpfulQuestion (q) {
    console.log(q.question_id);
    axios.put(`/db/helpfulquestion?question_id=${q.question_id}`)
      .then((response) => {console.log('question marked successful:', response)})
      .catch((err) => {console.log('err marking question helpful', err)})
  }
}

export default QuestionsList;
