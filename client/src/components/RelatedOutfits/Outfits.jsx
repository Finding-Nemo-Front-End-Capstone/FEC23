import React, { useState, useEffect } from 'react';
import OutfitCards from './OutfitCards.jsx';

function Outfits({ product, ratings, currStyle }) {
  const [saved, setSaved] = useState([]);
  const [hasCurrent, setHasCurrent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('outfits')) {
      const getStorage = JSON.parse(localStorage.getItem('outfits'));
      setSaved(getStorage);
    }
  }, [localStorage, product]);
  useEffect(() => {
    if (saved.some((item) => item.id === product.id)) {
      setHasCurrent(true);
    }
  }, [saved]);
  function createItem(info, img) {
    const item = {
      id: info.id,
      category: info.category,
      name: info.name,
      price: info.default_price,
      rating: 5,
      thumbnail: img.results[0].photos[0].thumbnail_url
    };
    return item;
  }
  function clickHandler(e) {
    e.preventDefault();
    const newItem = createItem(product, currStyle);
    const storage = JSON.parse(localStorage.getItem('outfits'));
    storage.unshift(newItem);
    setSaved(storage);
    localStorage.setItem('outfits', JSON.stringify(storage));
  }
  function arrowClick(e) {
    e.preventDefault();
    let copy = currentIndex;
    if (e.target.className === 'leftOutfit') { copy += 1; }
    if (e.target.className === 'rightOutfit') { copy -= 1; }
    setCurrentIndex(copy);
  }
  function createOutfitsCard(arr) {
    return arr.map((item) => (
      <div className="outfitCard">
        <OutfitCards product={item} rating={ratings} saved={saved} setHasCurrent={setHasCurrent} setSaved={setSaved} />
      </div>
    ));
  }
  return (
    <div className="outfitsContainer">
      { currentIndex !== 0 && saved.length >= 3
        ? <input type="submit" className="leftOutfit" onClick={arrowClick} value="left" />
        : null}
      { hasCurrent === false
        ? (
          <button type="submit" className="addOutfit" onClick={clickHandler}>
            <h1>+</h1>
            <br />
            Add to my outfits
          </button>
        )
        : null }
      { currentIndex !== saved.length - 3 && saved.length >= 3
        ? <input type="submit" className="rightOutfit" onClick={arrowClick} value="right" />
        : null}
      {createOutfitsCard(saved)}
    </div>
  );
}

export default Outfits;
