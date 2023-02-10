/*eslint-disable*/
import React, { useState, useEffect } from 'react';

function Gallery({ currStyle, currPhotoIndex, setCurrPhotoIndex }) {
  const [mainPhoto, setMainPhoto] = useState(currStyle.photos[0].url);
  const [modal, setModal] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [firstThumIndex, setFirstThumIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState(currStyle.photos.slice(0, 7));
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);

  /*
  first = 0
  last = first + 7
  thumbnails = currStyle.photos.slice(first, last);
  */

  useEffect(() => {
    setMainPhoto(currStyle.photos[currPhotoIndex].url);
    setThumbnails(currStyle.photos.slice(0, 7))
  }, [currStyle]);

  useEffect(() => {
    setMainPhoto(currStyle.photos[currPhotoIndex + firstThumIndex].url);
    console.log('index: ', currPhotoIndex)
  }, [currPhotoIndex]);

  useEffect(() => {
    setThumbnails(currStyle.photos.slice(firstThumIndex, firstThumIndex + 7));
  }, [firstThumIndex])

  function prevClick() {
    // if (currPhotoIndex === 0) {
    //   // setCurrPhotoIndex(currPhotoIndex - 1);
    //   prevThumClick();
    // }
      setCurrPhotoIndex(currPhotoIndex - 1);
  }

  function nextClick() {
    console.log('index: ', currPhotoIndex)
    // setFirstThumIndex(firstThumIndex + 1);
    setCurrPhotoIndex(currPhotoIndex + 1);

    // if (currPhotoIndex === 6) {
    //   nextThumClick()
    // }
  }

  function prevThumClick() {
    setFirstThumIndex(firstThumIndex - 1);
    setCurrPhotoIndex(currPhotoIndex + 1);
  }
  function nextThumClick() {
    setFirstThumIndex(firstThumIndex + 1);
    setCurrPhotoIndex(currPhotoIndex - 1);
  }

  function handleZoom() { setZoomed(!zoomed); }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return (
      () => {window.removeEventListener('mousemove', handleMouseMove)}
    )
  }, [zoomed])

 // mainPhoto = src
  function handleMouseMove(e) {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setImageX(x);
    setImageY(y);
  }



  return (
    <>
      {modal && <div className="gallery-modal">
        <button className="close" onClick={() => setModal(!modal)}>X</button>
        {currPhotoIndex !== 0
        ? <a className="prev modal-prev" onClick={prevClick}>&#10094;</a>
        : null}
        <ul className="modal-radio">
          {thumbnails.map((photo, i) => {
            return <input type="radio" name="img-selector" id={i}
              onChange={() => setCurrPhotoIndex(i)}/>
          })}
        </ul>
        {currPhotoIndex !== currStyle.photos.length - 1
        ? <a className="next modal-next" onClick={nextClick}>&#10095;</a>
        : null}
         {zoomed
         ? <figure onMouseMove={handleMouseMove} onClick={handleZoom}
         style={{backgroundImage: `url(${mainPhoto})`, backgroundPosition: `${imageX}% ${imageY}%`, backgroundSize: '250%' }}>
           <img className="modal-img zoomed" src={mainPhoto} />
          </figure>
         : <img className="modal-img" src={mainPhoto} onClick={handleZoom}/>}
      </div>}

      <div className="gallery-wrap">

        {currPhotoIndex !== 0
        ? <a className="prev main-prev" onClick={prevClick}>&#10094;</a>
        : null}
        <img className="main-photo" data-testid="main" src={mainPhoto}
        onClick={() => setModal(!modal)}/>
        {currPhotoIndex !== currStyle.photos.length - 1
        ? <a className="next main-next" onClick={nextClick}>&#10095;</a>
        : null}

        <div className="thumbnail-wrap">
          {firstThumIndex > 0
          ? <a className="prev thum-prev" onClick={prevThumClick}>&#10224;</a>
          : null}

            {thumbnails.map((photo, i) => {
              return (
                <div className="thumbnail-ribbon">
                  <img className={ (currPhotoIndex === i)
                  ? "thumbnail selected" : "thumbnail"}
                  data-testid={currPhotoIndex === i ? "thumbnail" : null}
                  src={photo.thumbnail_url} key={photo.url} index={i}
                  onClick={() => {
                    setCurrPhotoIndex(i);
                    // console.log('i: ', i)
                    // console.log('first thum index: ', firstThumIndex)
                    // console.log('curr photo index: ', currPhotoIndex)
                  }}/>
                </div>
              )
            })}

          {(firstThumIndex + 7) < (currStyle.photos.length - 1)
          ? <a className="next thum-next" onClick={nextThumClick}>&#10225;</a>
          : null}
        </div>

      </div>
    </>
  );
}

export default Gallery;
