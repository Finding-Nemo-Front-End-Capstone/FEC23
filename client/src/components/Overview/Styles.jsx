import React, { useState, useEffect } from 'react';

const Styles = ({ styles, currStyle, setCurrStyle }) => {

  // const handleClick = (e) => {

  //   setCurrStyle(styles[e.target.getAttribute('index')]);
  // }

  return (
    <div className="style-wrapper">
      <p>STYLE > {currStyle.name}</p>
      {/* <ul>
        <li> */}
        <div>
          {styles.map((style, i) => {
            return (
              <span>
                <img src={style.photos[0].thumbnail_url} key={style.style_id} index={i}
                onClick={e => {setCurrStyle(styles[e.target.getAttribute('index')])}}/>
                {currStyle === styles[i] ? <i className="fa fa-check-circle"></i> : null }
              </span>
            )
          })}
        </div>
        {/* </li>
      </ul> */}
    </div>
  )
}

export default Styles;
