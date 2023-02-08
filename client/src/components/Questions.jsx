/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsComp/QuestionsList.jsx';
import Search from './QuestionsComp/Search.jsx';
import AddQuestion from './QuestionsComp/AddQuestion.jsx';

function Questions({ product }) {
  const [expanded, setExpanded] = useState(true);
  const [buttonText, setButtonText] = useState('Collapse');
  const [questions, setQuestions] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [numQuestions, setNumQuestions] = useState(4);
  const [search, setSearch] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  useEffect(() => {
    axios({
      url: `/db/questions?product_id=${product.id}&page=${1}&count=${100}`,
      method: 'GET',
    })
      .then((response) => { setQuestions(response.data.results); });
  }, [product]);
  // handles button text change
  function handleAccordion() {
    buttonText === 'Collapse' ? setButtonText('Expand') : setButtonText('Collapse');
    setExpanded(!expanded);
  }
  return (
    <div id="questions-and-answers" data-testid="questions-and-answers">
      <div>Product Q&A</div>
      <span>Questions</span>
      <button type="button" onClick={() => setShowAddQuestion(true)}>Ask a question +</button>
      <Search questions={questions} setQuestions={setQuestions} search={search} setSearch={setSearch} />
      <button onClick={handleAccordion} type="button" data-testid="expand-collapse">{buttonText}</button>
      {expanded && <QuestionsList product={product} questions={questions} displayed={displayed} setDisplayed={setDisplayed} numQuestions={numQuestions} setNumQuestions={setNumQuestions} search={search} />}
      <AddQuestion onClose={() => setShowAddQuestion(false)} showAddQuestion={showAddQuestion} product={product} />
    </div>
  );
}

export default Questions;
