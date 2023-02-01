import React from 'react';
import QuestionsList from './QuestionsList.jsx';

function Questions({ product }) {
  return (
    <div>
      <QuestionsList product={product} />
    </div>
  );
}

export default Questions;
