import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Answer({ answer, allAnswers, setAllAnswers }) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  function helpfulAnswer(a) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulanswer?answers_id=${a.answer_id}`)
      .catch((err) => { console.log('err marking answer helpful', err); });
  }
  function reportAnswer(a) {
    axios.put(`/db/reportanswer?answers_id=${a.answer_id}`)
      .then(() => { setAllAnswers(allAnswers.filter((x) => (a.answer_id !== x.answer_id))); })
      .catch((err) => { console.log('err reporting answer', err); });
  }
  return (
    <div>
      <li>
        {answer.body}
      </li>
      <div>
        <span className="button-feedback">{`by ${answer.answerer_name} ${answer.date}`}</span>
        <span>|</span>
        {disableHelpful
          ? <span className="button-feedback">Thanks for the feedback</span>
          : (
            <span className="button-feedback">
              <span>Helpful?</span>
              <button type="button" className="helpful-button" onClick={() => { helpfulAnswer(answer); }}><u>Yes</u></button>
              <span className="button-feedback" id="helpfulness-score">{`(${answer.helpfulness})`}</span>
            </span>
          )}
        <span>|</span>
        <button type="button" disabled={disableReport} onClick={() => { reportAnswer(answer); }}>Report</button>
      </div>
    </div>
  );
}

export default Answer;
