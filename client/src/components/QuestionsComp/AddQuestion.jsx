import React from 'react';
import axios from 'axios';

function AddQuestion({ showAddQuestion, onClose }) {
  if (!showAddQuestion) {
    return null;
  }

  return (
    <div className="add-question-modal">
      <div className="add-question-content">
        <div className="add-question-header">
          <h4 className="add-question-title">Modal Title</h4>
        </div>
        <div className="add-question-body">
          Modal form goes here
          <form>
            <input type="text" placeholder="John Doe" />
            <input type="text" placeholder="john@gmail.com" />
            <input type="text" placeholder="Question" />
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
