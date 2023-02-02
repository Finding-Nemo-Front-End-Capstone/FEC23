import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Characteristic({ click, status, rating, setCharacteristicList, setIdChacList }) {
  const [sizeDis, setSizeDis] = useState('none');
  const [widthDis, setWidthDis] = useState('none');
  const [comfortDis, setComfortDis] = useState('none');
  const [qualityDis, setQualityDis] = useState('none');
  const [lengthDis, setLengthDis] = useState('none');
  const [fitDis, setFitDis] = useState('none');

  useEffect(() => {
    if (rating) {
      const chacList = Object.keys(rating.characteristics);
      setCharacteristicList(chacList);
      const keyList = Object.values(rating.characteristics);
      const idList = keyList.map((each) => each.id);
      setIdChacList(idList);
      chacList.forEach((chac) => {
        if (chac === 'Size') {
          setSizeDis('');
        }
        if (chac === 'Width') {
          setWidthDis('');
        }
        if (chac === 'Comfort') {
          setComfortDis('');
        }
        if (chac === 'Quality') {
          setQualityDis('');
        }
        if (chac === 'Length') {
          setLengthDis('');
        }
        if (chac === 'Fit') {
          setFitDis('');
        }
      });
    }
  }, [rating]);
  return (
    <div>
      <div>
        <label className="eachChacForm" style={{display:sizeDis}}>
          {'Size: '}
          <text>{status.sizeStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" id="size1" name="size" value="1" onClick={click.clickSize} />
            <input className="radioButReviewForm" type="radio" id="size1" name="size" value="2" onClick={click.clickSize} />
            <input className="radioButReviewForm" type="radio" id="size3" name="size" value="3" onClick={click.clickSize} />
            <input className="radioButReviewForm" type="radio" id="size3" name="size" value="4" onClick={click.clickSize} />
            <input className="radioButReviewForm" type="radio" id="size3" name="size" value="5" onClick={click.clickSize} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
        <label className="eachChacForm" style={{display:widthDis}}>
          {'Width: '}
          <text>{status.widthStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" id="width1" name="width" value="1" onClick={click.clickWidth} />
            <input className="radioButReviewForm" type="radio" id="width2" name="width" value="2" onClick={click.clickWidth} />
            <input className="radioButReviewForm" type="radio" id="width3" name="width" value="3" onClick={click.clickWidth} />
            <input className="radioButReviewForm" type="radio" id="width4" name="width" value="4" onClick={click.clickWidth} />
            <input className="radioButReviewForm" type="radio" id="width5" name="width" value="5" onClick={click.clickWidth} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
        <label className="eachChacForm" style={{display:comfortDis}}>
          {'Comfort: '}
          <text>{status.comfortStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" name="comfort" value="1" onClick={click.clickComfort} />
            <input className="radioButReviewForm" type="radio" name="comfort" value="2" onClick={click.clickComfort} />
            <input className="radioButReviewForm" type="radio" name="comfort" value="3" onClick={click.clickComfort} />
            <input className="radioButReviewForm" type="radio" name="comfort" value="4" onClick={click.clickComfort} />
            <input className="radioButReviewForm" type="radio" name="comfort" value="5" onClick={click.clickComfort} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
        <label className="eachChacForm" style={{display:qualityDis}}>
          {'Quality: '}
          <text>{status.qualityStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" name="quality" value="1" onClick={click.clickQuality} />
            <input className="radioButReviewForm" type="radio" name="quality" value="2" onClick={click.clickQuality} />
            <input className="radioButReviewForm" type="radio" name="quality" value="3" onClick={click.clickQuality} />
            <input className="radioButReviewForm" type="radio" name="quality" value="4" onClick={click.clickQuality} />
            <input className="radioButReviewForm" type="radio" name="quality" value="5" onClick={click.clickQuality} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
        <label className="eachChacForm" style={{display:lengthDis}}>
          {'Length: '}
          <text>{status.lengthStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" name="length" value="1" onClick={click.clickLength} />
            <input className="radioButReviewForm" type="radio" name="length" value="2" onClick={click.clickLength} />
            <input className="radioButReviewForm" type="radio" name="length" value="3" onClick={click.clickLength} />
            <input className="radioButReviewForm" type="radio" name="length" value="4" onClick={click.clickLength} />
            <input className="radioButReviewForm" type="radio" name="length" value="5" onClick={click.clickLength} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
        <label className="eachChacForm" style={{display:fitDis}}>
          {'Fit: '}
          <text>{status.fitStatus}</text>
          <div className="radioDivReviewForm">
            <input className="radioButReviewForm" type="radio" name="fit" value="1" onClick={click.clickFit} />
            <input className="radioButReviewForm" type="radio" name="fit" value="2" onClick={click.clickFit} />
            <input className="radioButReviewForm" type="radio" name="fit" value="3" onClick={click.clickFit} />
            <input className="radioButReviewForm" type="radio" name="fit" value="4" onClick={click.clickFit} />
            <input className="radioButReviewForm" type="radio" name="fit" value="5" onClick={click.clickFit} />
          </div>
          <div className="reviewLabel">
            <text className="review1">1</text>
            <text className="review2">2</text>
            <text className="review2">3</text>
            <text className="review2">4</text>
            <text className="review2">5</text>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Characteristic;
