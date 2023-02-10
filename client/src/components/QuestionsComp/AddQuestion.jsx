import React, { useState } from 'react';
import axios from 'axios';

function AddQuestion({ showAddQuestion, onClose, product }) {
  const [input, setInput] = useState({});
  if (!showAddQuestion) {
    return null;
  }
  function handleChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setInput({ ...input, product_id: product.id, [name]: value });
  }
  function submitQuestion() {
    axios({
      url: '/db/question',
      method: 'POST',
      data: input,
    })
      .catch((err) => { console.log('error adding question', err); });
    onClose();
  }
  return (
    <div className="add-question-modal">
      <div className="add-question-content">
        <div className="add-question-header">
          <h4 className="add-question-title">Add a Question</h4>
        </div>
        <div className="add-question-body">
          <span>
            Ask a question about
            {' '}
            {product.name}
          </span>
          <form id="add-question-form">
            <input type="text" name="name" placeholder="Name" onChange={(e) => handleChange(e)} />
            <input type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)} />
            <textarea type="text" name="body" placeholder="Question" rows="3" cols="50" onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <div className="add-question-footer">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={submitQuestion}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
