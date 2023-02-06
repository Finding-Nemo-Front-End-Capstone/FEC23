import React, { useState } from 'react';
import axios from 'axios';

function AddQuestion({ showAddQuestion, onClose }) {
  const [input, setInput] = useState({});
  if (!showAddQuestion) {
    return null;
  }
  function handleChange(e) {
    console.log(e.target.name);
    const { name } = e.target;
    const { value } = e.target;
    setInput({ ...input, [name]: value });
  }
  return (
    <div className="add-question-modal">
      <div className="add-question-content">
        <div className="add-question-header">
          <h4 className="add-question-title">Modal Title</h4>
        </div>
        <div className="add-question-body">
          Modal form goes here
          <form id="add-question-form">
            <input type="text" name="name" placeholder="John Doe" onChange={handleChange} />
            <input type="text" name="email" placeholder="john@gmail.com" />
            <textarea type="text" name="body" placeholder="Question" rows="3" cols="50" />
          </form>
        </div>
        <div className="add-question-footer">
          <button type="button" onClick={onClose} className="button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
