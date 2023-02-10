import React, { useState, useEffect } from 'react';

const Styles = ({ styles, currStyle, setCurrStyle }) => {

  return (
    <div className="style-wrapper">
      <p>STYLE > {currStyle.name}</p>
        <div>
          {styles.map((style, i) => {
            return (
              <span>
                <img src={style.photos[0].thumbnail_url} key={style.style_id} index={i} data-testid="style"
                onClick={e => {setCurrStyle(styles[e.target.getAttribute('index')])}}/>
                {currStyle === styles[i] ? <i className="fa fa-check-circle"></i> : null }
              </span>
            )
          })}
        </div>
    </div>
  )
}

export default Styles;
