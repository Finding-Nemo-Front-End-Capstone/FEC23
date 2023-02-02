/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Answers({ question_id }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [numAnswers, setNumAnswers] = useState(2);
  const [displayed, setDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);
  function answerItem(answer) {
    return (
      <div>
        <li>
          {answer.body}
        </li>
        <div>
          {`by ${answer.answerer_name} ${answer.date}`}
        </div>
      </div>
    );
  }
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
    const arr = [<span>A:</span>];
    if (allAnswers[0] && allAnswers.length < numAnswers) {
      for (let i = 0; i < allAnswers.length; i++) {
        arr.push(answerItem(allAnswers[i]));
      }
      setDisplayed(arr);
    } else if (allAnswers[0] && allAnswers.length > numAnswers) {
      for (let i = 0; i < numAnswers; i++) {
        arr.push(answerItem(allAnswers[i]));
      }
      setDisplayed(arr);
    }
  }, [allAnswers]);
  return (
    <div>
      {displayed}
    </div>
  );
}

export default Answers;