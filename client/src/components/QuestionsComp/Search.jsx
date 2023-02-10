import React, { useEffect, useState } from 'react';

function Search({
  questions, setQuestions, search, setSearch,
}) {
  function handleChange(e) {
    setSearch(e.target.value.toLowerCase());
  }
  return (
    <div className="div-answers-search-bar">
      <input type="text" className="answers-search-bar" placeholder="Have a question? Search for answers…" onChange={(e) => { handleChange(e); }} />
    </div>
  );
}

export default Search;
