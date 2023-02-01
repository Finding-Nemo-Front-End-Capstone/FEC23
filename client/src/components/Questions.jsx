/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsComp/QuestionsList.jsx';

function Questions({product}) {
  const [expanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState('Expand');
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    // console.log('product id', product);
    axios({
      url: `/db/questions/40349`, // change this back to ${product.id}
      method: 'GET',
    })
      .then((response) => { setQuestions(response.data.results); });
  }, [product]);
  // handles button text change
  function handleAccordion() {
    buttonText === 'Expand' ? setButtonText('Collapse') : setButtonText('Expand');
    setExpanded(!expanded);
  }
  return (
    <div>
      Questions
      <button onClick={handleAccordion} type="button">{buttonText}</button>
      {expanded && <QuestionsList product={product} questions={questions} />}
    </div>
  );
}

export default Questions;
