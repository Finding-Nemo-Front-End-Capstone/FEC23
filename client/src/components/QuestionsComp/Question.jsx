import React, {useState} from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';

function Question ({question}) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  function helpfulQuestion (q) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulquestion?question_id=${q.question_id}`)
    .catch((err) => {console.log('err marking question helpful', err)})
  }
  function reportQuestion (q) {
    setDisableReport(true);
    axios.put(`/db/reportquestion?question_id=${q.question_id}`)
    .catch((err) => {console.log('err reporting question', err)})
  }
  return (
    <div>
      Q:
      {' '}
      {question.question_body}
      <button type="button" disabled={disableHelpful} onClick={() => {helpfulQuestion(question);}}>Helpful?</button>
      <button type="button" disabled={disableReport} onClick={() => {reportQuestion(question);}}>Report</button>
      {/* <Answer question_id={question.question_id} /> */}
      <AnswersList question_id={question.question_id} />
    </div>
  )
}

export default Question;