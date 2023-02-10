import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnswerPhotoEntry from './AnswerPhotoEntry.jsx';

function Answer({ answer, allAnswers, setAllAnswers }) {
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  const [photoList, setPhotoList] = useState([]);
  function helpfulAnswer(a) {
    setDisableHelpful(true);
    axios.put(`/db/helpfulanswer?answers_id=${a.answer_id}`)
      .catch((err) => { console.log('err marking answer helpful', err); });
  }
  function reportAnswer(a) {
    setDisableReport(true);
    axios.put(`/db/reportanswer?answers_id=${a.answer_id}`)
      .catch((err) => { console.log('err reporting answer', err); });
  }
  function displayUsername() {
    if (answer.answerer_name.toLowerCase() === 'seller') {
      return (<b>Seller</b>);
    }
    return answer.answerer_name;
  }
  function formatDate(x) {
    const date = new Date(x);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  return (
    <div className="answer">

      <span className="answer-body" data-testid="answer-body">
        {answer.body}
        <br />
        {answer.photos.map((photo) => (
          <AnswerPhotoEntry photo={photo} />
        ))}
      </span>
      <div>
        <span className="button-feedback">
          by
          {' '}
          {displayUsername()}
          {' '}
          on
          {' '}
          {formatDate(answer.date)}
        </span>
        <span>|</span>
        {disableHelpful
          ? <span className="button-feedback" data-testid="helpful-button-feedback">Thanks for the feedback</span>
          : (
            <span className="button-feedback">
              <span>Helpful?</span>
              <button type="button" className="helpful-button" data-testid="helpful-button" onClick={() => { helpfulAnswer(answer); }}><u>Yes</u></button>
              <span className="button-feedback" id="helpfulness-score">{`(${answer.helpfulness})`}</span>
            </span>
          )}
        <span>|</span>
        {disableReport
          ? <span className="button-feedback" data-testid="report-button-feedback">Reported</span>
          : <button type="button" className="report-button" data-testid="answer-report-button" disabled={disableReport} onClick={() => { reportAnswer(answer); }}>Report</button>}
      </div>
    </div>
  );
}

export default Answer;
