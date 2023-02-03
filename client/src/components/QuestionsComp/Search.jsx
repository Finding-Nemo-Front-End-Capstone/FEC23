import React, { useEffect, useState } from 'react';

function Search ({questions, setQuestions, search, setSearch}) {
  function handleChange(e) {
    setSearch(e.target.value);
  }
  return (
    <div>
      <input type="text" placeholder="Have a question? Search for answers…" onChange={(e) => {handleChange(e);}}></input>
    </div>
  )
}

export default Search;