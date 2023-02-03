import React, { useState, useEffect } from 'react';

const Gallery = ({ product, currStyle, currPhotoIndex, setCurrPhotoIndex }) => {

  const [mainPhoto, setMainPhoto] = useState(currStyle.photos[0].url);
  const [slideNumber, setSlideNumer] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setMainPhoto(currStyle.photos[currPhotoIndex].url)
      // .then((data) => { console.log(data.data); })
      // .catch((err) => { console.log('meta did not work'); });
  }, [currStyle]);

  let galleryPhotos = currStyle.photos;

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

  return(
    <div className="gallery-wrap">
      <img className="main-photo" src={mainPhoto}/>
      {/* <p>{product.description}</p> */}
      <div className="gallery-ribbon">
        {galleryPhotos && galleryPhotos.map((photo, i) => {
          return (
            // <div className="single" key={i} onClick={ () => handleOpenModal(i)}>
              <img className="gallery-photo"
              src={photo.thumbnail_url} key={photo.url} index={i}
              onClick={() => {
                setMainPhoto(currStyle.photos[i].url);
                setCurrPhotoIndex(i);
              }}
              />
            // </div>
          )
        })}
      </div>
    </div>
  )
}

export default Gallery;