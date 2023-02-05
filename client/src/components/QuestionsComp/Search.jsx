import React, { useEffect, useState } from 'react';

function Search({
  questions, setQuestions, search, setSearch,
}) {
  function handleChange(e) {
    setSearch(e.target.value.toLowerCase());
  }
  return (
    <div>
      <input type="text" placeholder="Have a question? Search for answers…" onChange={(e) => { handleChange(e); }} />
    </div>
  );
}

export default Search;
