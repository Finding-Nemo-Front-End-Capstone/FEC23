/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsComp/QuestionsList.jsx';
import Search from './QuestionsComp/Search.jsx';
import AddQuestion from './QuestionsComp/AddQuestion.jsx';

function Questions({ product }) {
  const [expanded, setExpanded] = useState(true);
  // const [buttonText, setButtonText] = useState('Collapse');
  const [questions, setQuestions] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [numQuestions, setNumQuestions] = useState(4);
  const [search, setSearch] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [questionReload, setQuestionReload] = useState(true);

  const bottomRef = React.useRef();
  useEffect(() => {
    axios({
      url: `/db/questions?product_id=${product.id}&page=${1}&count=${100}`,
      method: 'GET',
    })
      .then((response) => { setQuestions(response.data.results); });
  }, [product]);
  // handles button text change
  function handleAccordion(e) {
    // console.log("THIS", e.target.id);
    !expanded ? e.target.id = 'expand-collapse-down' : e.target.id = 'expand-collapse-up';
    setExpanded(!expanded);
  }
  return (
    <div id="questions-and-answers" data-testid="questions-and-answers">
      <div className="qna-title">Product Q&A</div>
      <div className="div-trouble">
        <Search questions={questions} setQuestions={setQuestions} search={search} setSearch={setSearch} />
        <button type="button" id="ask-question" onClick={() => { setShowAddQuestion(true); }}>Ask a question +</button>
        <button onClick={(e) => { handleAccordion(e); }} type="button" id="expand-collapse-down" data-testid="expand-collapse" />
      </div>
      <div id="questions-header">Questions</div>
      <div hidden={!expanded}>
        <QuestionsList product={product} questions={questions} displayed={displayed} setDisplayed={setDisplayed} numQuestions={numQuestions} setNumQuestions={setNumQuestions} search={search} filtered={filtered} setFiltered={setFiltered} bottomRef={bottomRef} />

      </div>
      <div id="questions-button-footer">
        {displayed.length < filtered.length && <button type="button" data-testid="show-more-questions" id="show-more-questions" onClick={() => { setNumQuestions(numQuestions + 2); bottomRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"}); }}>Show more questions</button>}
        {/* <button type="button" id="ask-question" onClick={() => { setShowAddQuestion(true); }}>Ask a question +</button> */}
        <AddQuestion onClose={() => setShowAddQuestion(false)} showAddQuestion={showAddQuestion} product={product} questionReload={questionReload} setQuestionReload={setQuestionReload} />
      </div>
    </div>
  );
}

export default Questions;
