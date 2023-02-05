import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Answer({answer, allAnswers, setAllAnswers}) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  function helpfulAnswer(a) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulanswer?answers_id=${a.answer_id}`)
    .catch((err) => {console.log('err marking answer helpful', err)})
  }
  function reportAnswer(a) {
    axios.put(`/db/reportanswer?answers_id=${a.answer_id}`)
    .then(() => {setAllAnswers(allAnswers.filter((answer) => {
      return (a.answer_id !== answer.answer_id )
    }))})
    .catch((err) => {console.log('err reporting answer', err)})

  }
  return (
    <div>
      <li>
        {answer.body}
      </li>
      <div>
        <span class="button-feedback">{`by ${answer.answerer_name} ${answer.date}`}</span>
        <span>|</span>
        {/* <span class="button-feedback">{`Helpful?`}</span> */}
        {disableHelpful ?
        <span class="button-feedback">Thanks for the feedback</span> :
        <span class="button-feedback">
          <span>{`Helpful?`}</span>
          <button type="button" class="helpful-button" onClick={() => {helpfulAnswer(answer)}}><u>Yes</u></button>
          {console.log(answer)}
          <span class="button-feedback" id="helpfulness-score">{`(${answer.helpfulness})`}</span>
        </span>
        }
        <span>|</span>
        <button type="button" disabled={disableReport} onClick={() => {reportAnswer(answer)}}>Report</button>
      </div>
    </div>
  )
}

export default Answer;