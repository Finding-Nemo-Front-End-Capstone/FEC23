import React, { useState, useEffect } from 'react';

function Outfits({ product }) {
  const [saved, setSaved] = useState([]);
  const [hasCurrent, setHasCurrent] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('outfits')) {
      const getStorage = JSON.parse(localStorage.getItem('outfits'));
      setSaved(getStorage);
      if (getStorage.some((item) => item.id === product.id)) {
        setHasCurrent(true);
      }
    }
  }, [product]);
  function createItem(info) {
    const item = {
      id: info.id,
      category: info.category,
      name: info.name,
      price: info.default_price,
      rating: 5,
    };
    return item;
  }
  function clickHandler(e) {
    e.preventDefault();
    const newItem = createItem(product);
    const storage = JSON.parse(localStorage.getItem('outfits'));
    storage.push(newItem);
    localStorage.setItem('outfits', JSON.stringify(storage));
    setSaved(storage);
    setHasCurrent(true);
  }
  function createOutfitsCard(arr) {
    return arr.map((item) => (
      <div className="outfitCard">
        placeholder
      </div>
    ));
  }
  return (
    <div>
      { hasCurrent === true ? null : (
        <button type="submit" onClick={clickHandler}>
          Add to outfit
        </button>
      ) }
    </div>
  );
}

export default Outfits;
