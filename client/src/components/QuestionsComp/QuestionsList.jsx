/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

function QuestionsList({
  product, questions, displayed, setDisplayed, numQuestions, setNumQuestions, search, filtered, setFiltered, bottomRef,
}) {
  // const bottomRef = useRef(null);
  // function handleButtonClick() {
  //   bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  // }
  function displayQuestion(question) {
    return (
      <div>
        <Question question={question} product={product} />
      </div>
    );
  }
  useEffect(() => {
    if (search.length > 2) {
      setFiltered(questions.filter((question) => (question.question_body.toLowerCase().includes(search))));
    } else {
      setFiltered(questions);
    }
  }, [search, questions, product]); // product was here
  useEffect(() => {
    const arr = [];
    if (filtered[0] && filtered.length > numQuestions) {
      for (let i = 0; i < numQuestions; i++) {
        arr.push(displayQuestion(filtered[i]));
      }
    } else if (filtered[0]) {
      for (let i = 0; i < filtered.length; i++) {
        arr.push(displayQuestion(filtered[i]));
      }
    }
    setDisplayed(arr);
  }, [numQuestions, filtered, questions]);


  return (
    <div className="questions-list" data-testid="question-list">
      {displayed}
      <div className="bottom-questions-list" ref={bottomRef} />
    </div>
  );
}

export default QuestionsList;
