/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsComp/QuestionsList.jsx';
import Search from './QuestionsComp/Search.jsx';

function Questions({ product }) {
  const [expanded, setExpanded] = useState(true);
  const [buttonText, setButtonText] = useState('Collapse');
  const [questions, setQuestions] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [numQuestions, setNumQuestions] = useState(4);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios({
      url: `/db/questions?product_id=${product.id}&page=${1}&count=${100}`,
      method: 'GET',
    })
      .then((response) => { setQuestions(response.data.results); setQuestionsCopy(response.data.results); });
  }, [product]);
  // handles button text change
  function handleAccordion() {
    buttonText === 'Collapse' ? setButtonText('Expand') : setButtonText('Collapse');
    setExpanded(!expanded);
  }
  return (
    <div>
      Questions
      <Search questions={questions} setQuestions={setQuestions} search={search} setSearch={setSearch} />
      <button onClick={handleAccordion} type="button">{buttonText}</button>
      {expanded && <QuestionsList product={product} questions={questions} displayed={displayed} setDisplayed={setDisplayed} numQuestions={numQuestions} setNumQuestions={setNumQuestions} search={search}/>}
      <button type="button">Add a question +</button>
    </div>
  );
}

export default Questions;
