import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerPhoto from './AddAnswerPhoto.jsx';

function AddAnswer({
  showAddAnswer, onClose, question, product,
}) {
  const [input, setInput] = useState({});
  const [formIsValid, setFormIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [validEmail, setValidEmail] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  if (!showAddAnswer) {
    return null;
  }
  function validateEmail(email) {
    if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) return true;
    return false;
  }
  function handleChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setInput({ ...input, [name]: value });
  }
  function submitQuestion() {
    setValidEmail(validateEmail(input.email));
    const photos = [];
    Promise.all(imageFiles.map((eachFile) => {
      const formData = new FormData();
      formData.append('file', eachFile);
      formData.append('upload_preset', 'o9exuyqa');
      // console.log(imageFiles)
      return axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
        .then((res) => {
          // console.log('IneedTHIIIIIS', res.data.secure_url);
          photos.push(res.data.secure_url);
          // console.log(params.photos);
        })
        .catch((err) => console.log(err));
    }))
      .then(() => {
        axios({
          url: `/db/answers/${question.question_id}`,
          method: 'POST',
          data: { ...input, photos },
        })
          .then(() => {
            onClose();
            setErrors([]);
            setFormIsValid(true);
            setInput({});
          })
          .catch((err) => { console.log('error adding question', err); });
      });
  }
  function handleValidation() {
    const fields = input;
    let valid = true;
    const error = [];
    if (!input.body) {
      error.push(<div className="form-error">Answer is required</div>);
      valid = false;
    }
    if (!input.name) {
      error.push(<div className="form-error">Nickname is required</div>);
      valid = false;
    }
    if (!input.email) {
      error.push(<div className="form-error">Email is required</div>);
      valid = false;
    }
    setErrors(error);
    setFormIsValid(valid);
    if (valid) {
      submitQuestion();
    }
  }
  return (
    <div className="add-answer-modal">
      <div className="add-answer-content">
        <div className="add-answer-header">
          <h4 className="add-answer-title">
            Submit your Answer
          </h4>
          <hr className="solid" />
          <div className="add-answer-subtitle">
            <b>{product.name}</b>
            <br />
            Q:
            {' '}
            {question.question_body}
          </div>
        </div>
        <div className="add-answer-body">
          <form id="add-answer-form">
            Answer:
            <textarea type="text" name="body" maxLength="1000" rows="3" cols="50" required onChange={(e) => handleChange(e)} />
            <span>Nickname: </span>
            <input type="text" name="name" placeholder="Example: jack543!" maxLength="60" required onChange={(e) => handleChange(e)} />
            <div id="nickname-notice">For privacy reasons, do not use your full name or email address</div>
            <div>
              <span>Email: </span>
              <input type="text" name="email" placeholder="Example: jack@email.com" maxLength="60" required onChange={(e) => handleChange(e)} />
              {!validEmail && <span className="invalid-email">Invalid Email</span>}
              <div id="email-notice">For authentication reasons, you will not be emailed</div>
            </div>
            <div>
              <AddAnswerPhoto imageUrls={imageUrls} setImageUrls={setImageUrls} imageFiles={imageFiles} setImageFiles={setImageFiles} />
            </div>
          </form>
        </div>
        <div className="add-answer-footer">
          {!formIsValid && <div>{errors}</div>}
          <button type="button" onClick={() => { onClose(); setErrors([]); setFormIsValid(true); setInput({}); }}>Cancel</button>
          <button type="button" onClick={handleValidation}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddAnswer;
