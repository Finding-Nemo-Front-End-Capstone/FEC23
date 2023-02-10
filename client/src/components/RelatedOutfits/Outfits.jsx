import React, { useState, useEffect } from 'react';
import OutfitCards from './OutfitCards.jsx';

function Outfits({ product, rating, currStyle }) {
  const [saved, setSaved] = useState([]);
  const [hasCurrent, setHasCurrent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('outfits')) {
      const getStorage = JSON.parse(localStorage.getItem('outfits'));
      setSaved(getStorage);
      if (getStorage.length > 4) { setDisplay ([0, 4]); }
      else { setDisplay([0, getStorage.length]); }
    }
  }, [localStorage, product]);
  useEffect(() => {
    if (saved.some((item) => item.id === product.id)) {
      setHasCurrent(true);
    } else {
      setHasCurrent(false);
    }
  }, [saved, product]);

  function createItem(info, rate, img) {
    const item = {
      id: info.id,
      category: info.category,
      name: info.name,
      price: info.price,
      rating: rate,
      thumbnail: img.results[0].photos[0].thumbnail_url
    };
    return item;
  }
  function clickAdd(e) {
    e.preventDefault();
    const newItem = createItem(product, rating, currStyle);
    const storage = JSON.parse(localStorage.getItem('outfits'));
    storage.unshift(newItem);
    setSaved(storage);
    localStorage.setItem('outfits', JSON.stringify(storage));
  }
  function arrowClick(e) {
    e.preventDefault();
    let copy = currentIndex;
    if (e.target.className === 'leftOutfit') { copy -= 1; }
    if (e.target.className === 'rightOutfit') { copy += 1; }
    setDisplay([copy, copy + 4 > saved.length
      ? saved.length
      : copy + 4]);
    setCurrentIndex(copy);
  }
  function createOutfitsCard() {
    return saved.slice(display[0], display[1]).map((item) => (
      <div className="outfitCard">
        <OutfitCards product={item} saved={saved} setHasCurrent={setHasCurrent} setSaved={setSaved} />
      </div>
    ));
  }

  return (
    <>
    { currentIndex !== 0 && saved.length >= 3 ?
      <button type="submit" className="leftOutfit" onClick={arrowClick} >
        {'<'}
      </button>
      : null }
      <div className="outfitsContainer">
      { hasCurrent === false ?
        (
          <button type="submit" className="addOutfit" onClick={clickAdd}>
            +
            <br />
            Add to my outfits
          </button>
        )
        : null }
        {createOutfitsCard()}
    </div>
      { currentIndex !== saved.length - 3 && saved.length >= 3
        ? <button type="submit" className="rightOutfit" onClick={arrowClick }>
          {'>'}
        </button>
        : null }
    </>
  );
}

export default Outfits;
