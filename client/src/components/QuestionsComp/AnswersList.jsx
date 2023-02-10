import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

function AnswersList({ question_id, triggerReload }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [numAnswers, setNumAnswers] = useState(2);
  const [displayed, setDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);

  function renderAnswer(answer) {
    return (<Answer answer={answer} allAnswers={allAnswers} setAllAnswers={setAllAnswers} />);
  }
  useEffect(() => {
    if (question_id) {
      axios.get(`/db/answers/${question_id}?page=${page}&count=${count}`)
        .then((response) => { setAllAnswers(response.data.results); })
        .catch((err) => { console.log(err, 'from answerlist axios'); });
    }
  }, [triggerReload]);
  useEffect(() => {
    console.log(allAnswers, 'This should change after each submit');
    const sorted = [...allAnswers].sort((a, b) => {
      if (a.answerer_name.toLowerCase() === 'seller') {
        return -1;
      } if (b.answerer_name.toLowerCase() === 'seller') {
        return 1;
      }
      return 0;
    });
    const arr = [];
    if (sorted[0] && sorted.length < numAnswers) {
      for (let i = 0; i < sorted.length; i++) {
        arr.push(renderAnswer(sorted[i]));
      }
    } else if (sorted[0]) {
      for (let i = 0; i < numAnswers; i++) {
        arr.push(renderAnswer(sorted[i]));
      }
    }
    setDisplayed(arr);
  }, [allAnswers, numAnswers]);
  return (
    <div>
      {displayed[0] && <span data-testid="answers-list-meow">A:</span>}
      {displayed}
      {displayed.length < allAnswers.length && <button type="button" className="show-more-answers" data-testid="show-more-answers" onClick={() => { setNumAnswers(allAnswers.length); }}>Expand answers</button>}
      {displayed[0] && displayed.length > 2 && displayed.length === allAnswers.length && <button type="button" className="show-more-answers" onClick={() => { setNumAnswers(2); }}>Collapse answers</button>}
    </div>
  );
}

export default AnswersList;
