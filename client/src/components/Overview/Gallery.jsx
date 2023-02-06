import React, { useState, useEffect } from 'react';

const Gallery = ({ product, currStyle, currPhotoIndex, setCurrPhotoIndex }) => {

  const [mainPhoto, setMainPhoto] = useState(currStyle.photos[0].url);
  const [slideIndex, setSlideIndex] = useState(1);
  const [modal, setModal] = useState(false);
  let slides = currStyle.photos;

  useEffect(() => {
    setMainPhoto(currStyle.photos[currPhotoIndex].url)

      // .then((data) => { console.log(data.data); })
      // .catch((err) => { console.log('meta did not work'); });
  }, [currStyle]);

  useEffect(() => {
    setMainPhoto(currStyle.photos[currPhotoIndex].url)
  }, [currPhotoIndex])

  function prevClick() {setCurrPhotoIndex(currPhotoIndex - 1)}
  function nextClick() {setCurrPhotoIndex(currPhotoIndex + 1)}

  return(
    <>
      {modal && <div className="gallery-modal">
        <button className="close" onClick={() => setModal(!modal)}>X</button>
        {currPhotoIndex !== 0
        ? <a className="prev modal" onClick={prevClick}>&#10094;</a>
        : null}
        <ul className="modal-radio">
          {slides.map((photo, i) => {
            return <input type="radio" name="img-selector" id={i}
              onChange={() => setCurrPhotoIndex(i)}/>
          })}
        </ul>
        {currPhotoIndex !== slides.length - 1
        ? <a className="next modal" onClick={nextClick}>&#10095;</a>
        : null}
        <img className="modal-img" src={mainPhoto}/>
      </div>}

      <div className="gallery-wrap">
          {currPhotoIndex !== 0
          ? <a className="prev" onClick={prevClick}>&#10094;</a>
          : null}
          <img className="main-photo" src={mainPhoto}
          onClick={() => setModal(!modal)}/>
          {currPhotoIndex !== slides.length - 1
          ? <a className="next" onClick={nextClick}>&#10095;</a>
          : null}
        <div className="gallery-ribbon">
          {slides.map((photo, i) => {
            return (
              <>
                <img className={currPhotoIndex === i ? "gallery-photo selected" : "gallery-photo"}
                src={photo.thumbnail_url} key={photo.url} index={i}
                onClick={() => {
                  setMainPhoto(currStyle.photos[i].url);
                  setCurrPhotoIndex(i);
                }}/>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Gallery;

// onclick="plusSlides(1)"



  // const handleOpenModal = (index) => {
  //   setSlideNumer(index);
  //   setOpenModal(true);
  // }
  // {openModal &&
  //   <div className="slider-wrap">
  //     {/* <FontAwesomeIcon icon={faCircleXmark} className="btnClose"/> */}
  //     {/* <FontAwesomeIcon icon={faCircleChevronLeft} className="btnPrev"/> */}
  //     <i class="fal fa-times-circle"></i>
  //     <i class="fas fa-chevron-left"></i>
  //     <i class="fas fa-chevron-right"></i>
  //     <div>
  //       <img src={gallerPhotos[slideNumber]} />
  //     </div>
  //   </div>
  // }
