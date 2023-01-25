import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Questions from './Questions.jsx';
import Overview from './Overview.jsx';
import Ratings from '.Ratings.jsx';


const App = () => {





  return (
    <div>
      This is a placeholder being served
      <Questions />
      <Overview />
      <Ratings />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
