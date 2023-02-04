import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Answer({answer, setTrigger, trigger}) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  function helpfulAnswer(a) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulanswer?answers_id=${a.answer_id}`)
    .catch((err) => {console.log('err marking answer helpful', err)})
  }
  function reportAnswer(a) {
    setDisableReport(true);
    setTrigger(!trigger);
    axios.put(`/db/reportanswer?answers_id=${a.answer_id}`)
    .catch((err) => {console.log('err reporting answer', err)})
  }
  return (
    <div>
      <li>
        {answer.body}
      </li>
      <div>
        {`by ${answer.answerer_name} ${answer.date}`}
        <button type="button" disabled={disableHelpful} onClick={() => {helpfulAnswer(answer)}}>Helpful?</button>
        <button type="button" disabled={disableReport} onClick={() => {reportAnswer(answer)}}>Report</button>
      </div>
    </div>
  )
}

export default Answer;