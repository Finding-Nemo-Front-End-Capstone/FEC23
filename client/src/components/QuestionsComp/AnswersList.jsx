/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

function AnswersList({ question_id }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [numAnswers, setNumAnswers] = useState(2);
  const [displayed, setDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);
  useEffect(() => {
    if (question_id) {
      axios({
        url: `/db/answers/${question_id}?page=${page}&count=${count}`,
        method: 'GET',
      })
      .then((response) => { setAllAnswers(response.data.results); });
    }
  }, []);
  useEffect(() => {
    const arr = [];
    if (allAnswers[0] && allAnswers.length < numAnswers) {
      for (let i = 0; i < allAnswers.length; i++) {
        arr.push(displayAnswer(allAnswers[i]));
      }
    } else if (allAnswers[0]) {
      for (let i = 0; i < numAnswers; i++) {
        arr.push(displayAnswer(allAnswers[i]));
      }
    }
    setDisplayed(arr);
  }, [allAnswers, numAnswers]);
  function displayAnswer(answer) {
    return (<Answer answer={answer} allAnswers={allAnswers} setAllAnswers={setAllAnswers} />);
  }
  return (
    <div>
      {displayed[0] && <span>A:</span>}
      {displayed}
      {displayed.length < allAnswers.length && <button type="button" onClick={() => { setNumAnswers(numAnswers + 2); }}>Show more answers</button>}
    </div>
  );
}

export default AnswersList;
