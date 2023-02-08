import React, { useState } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';

function Question({ question }) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  const [showAddAnswer, setShowAddAnswer] = useState(false);
  function helpfulQuestion(q) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulquestion?question_id=${q.question_id}`)
      .catch((err) => { console.log('err marking question helpful', err); });
  }
  function reportQuestion(q) {
    setDisableReport(true);
    axios.put(`/db/reportquestion?question_id=${q.question_id}`)
      .catch((err) => { console.log('err reporting question', err); });
  }
  return (
    <div data-testid="question">
      Q:
      {' '}
      {question.question_body}
      {disableHelpful
        ? <span className="button-feedback" data-testid="helpful-question-button-feedback">Thanks for the feedback</span>
        : (
          <span className="question-feedback">
            <span>Helpful?</span>
            <button
              type="button"
              className="helpful-button"
              data-testid="helpful-question-button"
              disabled={disableHelpful}
              onClick={() => { helpfulQuestion(question); }}
            >
              <u>Yes</u>
            </button>
            <span className="button-feedback" id="helpfulness-score">{`(${question.question_helpfulness})`}</span>
            <span>|</span>
            {disableReport
              ? <span className="button-feedback" data-testid="report-question-button-feedback">Reported</span>
              : <button type="button" data-testid="report-question-button" disabled={disableReport} onClick={() => { reportQuestion(question); }}>Report</button>}
            <button type="button">Answer this question</button>
            <AnswersList question_id={question.question_id} />
          </span>
        )}
    </div>
  );
}

export default Question;
