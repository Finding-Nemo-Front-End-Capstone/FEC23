/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';

function QuestionsList({
  product, questions, displayed, setDisplayed, numQuestions, setNumQuestions,
}) {
  // console.log("these are questions", questions);
  // const list = questions.map((question) => <li>{question.</li>)
  // const [displayed, setDisplayed] = useState([]);
  // const [numQuestions, setNumQuestions] = useState(4);
  useEffect(() => {
    console.log('this is the qeustions length', questions.length);
    const arr = [];
    if (questions[0] && questions.length > numQuestions) {
      for (let i = 0; i < numQuestions; i++) {
        arr.push(
          <div>
            Q:
            {' '}
            {questions[i].question_body}
            <Answers question_id={questions[i].question_id} />
            <br />
          </div>,
        );
        setDisplayed(arr);
      }
    } else if (questions[0]) {
      for (let i = 0; i < questions.length; i++) {
        arr.push(
          <div>
            Q:
            {' '}
            {questions[i].question_body}
            <Answers question_id={questions[i].question_id} />
            <br />
          </div>,
        );
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
}

export default QuestionsList;
