/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';


function Breakdown({rating, reviewFilter}) {
  const [bar5, setBar5] = useState('');
  const [bar4, setBar4] = useState('');
  const [bar3, setBar3] = useState('');
  const [bar2, setBar2] = useState('');
  const [bar1, setBar1] = useState('');
  const [star5, setStar5] = useState ('');
  const [star4, setStar4] = useState ('');
  const [star3, setStar3] = useState ('');
  const [star2, setStar2] = useState ('');
  const [star1, setStar1] = useState ('');
  const [hoverColor5, setHoverColor5] = useState('')
  const [hoverColor4, setHoverColor4] = useState('')
  const [hoverColor3, setHoverColor3] = useState('')
  const [hoverColor2, setHoverColor2] = useState('')
  const [hoverColor1, setHoverColor1] = useState('')
  const [before5, setBefore5] = useState('')
  const [before4, setBefore4] = useState('')
  const [before3, setBefore3] = useState('')
  const [before2, setBefore2] = useState('')
  const [before1, setBefore1] = useState('')

  const percentage = (num) => {
    const totalRev = Number(rating.recommended.false) + Number(rating.recommended.true)
    const result = JSON.stringify((num/totalRev)*100) + '%'
    return result
  }

  useEffect(() => {
    if (rating.product_id) {
      setBar5(percentage(Number(rating.ratings[5])))
      setBar4(percentage(Number(rating.ratings[4])))
      setBar3(percentage(Number(rating.ratings[3])))
      setBar2(percentage(Number(rating.ratings[2])))
      setBar1(percentage(Number(rating.ratings[1])))
      setStar5(rating.ratings[5])
      setStar4(rating.ratings[4])
      setStar3(rating.ratings[3])
      setStar2(rating.ratings[2])
      setStar1(rating.ratings[1])
    }
  }, [rating])
  const click5 = (e) => {
    reviewFilter("5")
    if (before5 === 'orange') {
      setBefore5('');
    } else {
      setBefore5('orange');
    }
  }
  const hoverOn5 = (e) => {
    if (hoverColor5 === 'purple') {
      setHoverColor5(before5);
    } else {
      setHoverColor5('purple');
    }
  }
  const click4 = (e) => {
    reviewFilter("4")
    if (before4 === 'orange') {
      setBefore4('');
    } else {
      setBefore4('orange');
    }
  }
  const hoverOn4 = (e) => {
    if (hoverColor4 === 'purple') {
      setHoverColor4(before4);
    } else {
      setHoverColor4('purple');
    }
  }
  const click3 = (e) => {
    reviewFilter("3")
    if (before3 === 'orange') {
      setBefore3('');
    } else {
      setBefore3('orange');
    }
  }
  const hoverOn3 = (e) => {
    if (hoverColor3 === 'purple') {
      setHoverColor3(before3);
    } else {
      setHoverColor3('purple');
    }
  }
  const click2 = (e) => {
    reviewFilter("2")
    if (before2 === 'orange') {
      setBefore2('');
    } else {
      setBefore2('orange');
    }
  }
  const hoverOn2 = (e) => {
    if (hoverColor2 === 'purple') {
      setHoverColor2(before2);
    } else {
      setHoverColor2('purple');
    }
  }
  const click1 = (e) => {
    reviewFilter("1")
    if (before1 === 'orange') {
      setBefore1('');
    } else {
      setBefore1('orange');
    }
  }
  const hoverOn1 = (e) => {
    if (hoverColor1 === 'purple') {
      setHoverColor1(before1);
    } else {
      setHoverColor1('purple');
    }
  }
  const allRating = (e) => {
    reviewFilter('all');
    setBefore5('');
    setBefore4('');
    setBefore3('');
    setBefore2('');
    setBefore1('');
    setHoverColor5('');
    setHoverColor4('');
    setHoverColor3('');
    setHoverColor2('');
    setHoverColor1('');

  }
  return (
    <div className="breakdownBar">
        <div class="row">
          <button onClick={allRating}>Show all rating</button>
          <button name="5"className="eachBarBreakdown" onClick={click5} style={{cursor: 'pointer', 'color':hoverColor5}} onMouseEnter={hoverOn5} onMouseLeave={hoverOn5}>
            <div class="side">
              <div>5 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-5" style={{width:bar5, 'background-color':hoverColor5}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star5}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click4} style={{cursor: 'pointer', 'color':hoverColor4}} onMouseEnter={hoverOn4} onMouseLeave={hoverOn4}>
            <div class="side">
              <div>4 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-4" style={{width:bar4, 'background-color':hoverColor4}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star4}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click3} style={{cursor: 'pointer', 'color':hoverColor3}} onMouseEnter={hoverOn3} onMouseLeave={hoverOn3}>
            <div class="side">
              <div>3 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-3" style={{width:bar3, 'background-color':hoverColor3}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star3}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click2} style={{cursor: 'pointer', 'color':hoverColor2}} onMouseEnter={hoverOn2} onMouseLeave={hoverOn2}>
            <div class="side">
              <div>2 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-2" style={{width:bar2, 'background-color':hoverColor2}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star2}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click1} style={{cursor: 'pointer', 'color':hoverColor1}} onMouseEnter={hoverOn1} onMouseLeave={hoverOn1}>
            <div class="side">
              <div>1 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-1" style={{width:bar1, 'background-color':hoverColor1}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star1}</div>
            </div>
          </button>
        </div>
      </div>
  )
}

export default Breakdown;
