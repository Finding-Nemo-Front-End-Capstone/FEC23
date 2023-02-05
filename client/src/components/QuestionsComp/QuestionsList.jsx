/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question.jsx'

function QuestionsList({
  product, questions, displayed, setDisplayed, numQuestions, setNumQuestions, search
}) {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    if(search.length > 2) {
      setFiltered(questions.filter((question) => (question.question_body.toLowerCase().includes(search))));
    } else {
      setFiltered(questions);
    }
  },[search, questions])
  useEffect(() => {
    const arr = [];
    if (filtered[0] && filtered.length > numQuestions) {
      for (let i = 0; i < numQuestions; i++) {
        arr.push(displayQuestion(filtered[i]));
      }
    } else if (filtered[0]) {
      for (let i = 0; i < filtered.length; i++) {
        arr.push(displayQuestion(filtered[i]));
      }
    }
    setDisplayed(arr);
  }, [numQuestions, filtered, questions]);
  function displayQuestion (question) {
    return (
      <div>
        <Question question={question} />
        <br />
      </div>
    )
  }
  return (
    <div>
      {displayed}
      {displayed.length < filtered.length && <button type="button" onClick={() => { setNumQuestions(numQuestions + 2); }}>Show more questions</button>}
    </div>
  );
}

export default QuestionsList;
