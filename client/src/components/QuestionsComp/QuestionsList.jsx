/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import Answers from './QuestionsComp/Answers.jsx';

function QuestionsList({ product, questions }) {
  // console.log("these are questions", questions);
  // const list = questions.map((question) => <li>{question.</li>)
  const [displayed, setDisplayed] = useState([]);
  const [numQuestions, setNumQuestions] = useState(4);
  useEffect(() => {
    const arr = [];
    if (questions[0] && questions.length > 4) {
      for (let i = 0; i < 4; i++) {
        arr.push(
          <div>
            Q:
            {' '}
            {questions[i].question_body}
            <Answers question_id={questions[i].question_id} />
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
          </div>,
        );
      }
      setDisplayed(arr);
    }
  }, [numQuestions, questions]);
  return (
    <div>
      {displayed}
    </div>
  );
}

export default QuestionsList;
