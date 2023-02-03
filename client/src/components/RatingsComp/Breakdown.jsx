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
    console.log('this is', e.target.name)
  }
  const click4 = (e) => {
    reviewFilter("4")
  }
  const click3 = (e) => {
    reviewFilter("3")
  }
  const click2 = (e) => {
    reviewFilter("2")
  }
  const click1 = (e) => {
    reviewFilter("1")
  }
  return (
    <div className="breakdownBar">
        <div class="row">
          <button name="5"className="eachBarBreakdown" onClick={click5} style={{cursor: 'pointer'}}>
            <div class="side">
              <div>5 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-5" style={{width:bar5}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star5}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click4}>
            <div class="side">
              <div>4 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-4" style={{width:bar4}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star4}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click3}>
            <div class="side">
              <div>3 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-3" style={{width:bar3}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star3}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click2}>
            <div class="side">
              <div>2 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-2" style={{width:bar2}}></div>
              </div>
            </div>
            <div class="side right">
              <div>{star2}</div>
            </div>
          </button>
          <br/>
          <button className="eachBarBreakdown" onClick={click1}>
            <div class="side">
              <div>1 star</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div class="bar-1" style={{width:bar1}}></div>
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
