import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddQuestion({ showAddQuestion, onClose, product }) {
  const [input, setInput] = useState({});
  const [formIsValid, setFormIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [validEmail, setValidEmail] = useState(true);
  if (!showAddQuestion) {
    return null;
  }
  function validateEmail(email) {
    if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) return true;
    return false;
  }
  function handleChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setInput({ ...input, product_id: product.id, [name]: value });
    // if (name === 'email') {
    //   console.log(value);
    //   setValidEmail(validateEmail(value));
    //   console.log('is the email valid', validEmail);
    // }
  }
  function submitQuestion() {
    setValidEmail(validateEmail(input.email));
    axios({
      url: '/db/question',
      method: 'POST',
      data: input,
    })
      .then(() => {
        onClose();
        setErrors([]);
        setFormIsValid(true);
        setInput({});
      })
      .catch((err) => { console.log('error adding question', err); });
  }
  function handleValidation() {
    const fields = input;
    let valid = true;
    const error = [];
    if (!input.name) {
      error.push(<div className="form-error">Username is required</div>);
      valid = false;
    }
    if (!input.email) {
      error.push(<div className="form-error">Email is required</div>);
      valid = false;
    }
    if (!input.body) {
      error.push(<div className="form-error">Question is required</div>);
      valid = false;
    }
    setErrors(error);
    setFormIsValid(valid);
    if (valid) {
      submitQuestion();
    }
  }
  return (
    <div className="add-question-modal">
      <div className="add-question-content">
        <div className="add-question-header">
          <h4 className="add-question-title">Ask your question</h4>
        </div>
        <div className="add-question-body">
          <span>
            About the
            {' '}
            {product.name}
          </span>
          <form id="add-question-form">
            <span>Username: </span>
            <input type="text" name="name" placeholder="Example: jackson11!" maxLength="60" required onChange={(e) => handleChange(e)} />
            <div>
              <span>Email: </span>
              <input type="text" name="email" placeholder="Example: jack@email.com" maxLength="60" required onChange={(e) => handleChange(e)} />
              {!validEmail && <span>Invalid Email</span>}
            </div>
            <div id="email-notice">For authentication reasons, you will not be emailed</div>
            <textarea type="text" name="body" placeholder="Question" maxLength="1000" rows="3" cols="50" required onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <div className="add-question-footer">
          {!formIsValid && <div>{errors}</div>}
          <button type="button" onClick={() => { onClose(); setErrors([]); setFormIsValid(true); setInput({}); }}>Cancel</button>
          <button type="button" onClick={handleValidation}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
