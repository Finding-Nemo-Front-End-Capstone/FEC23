import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Characteristic({ click, status }) {
  return (
    <div>
      <div>
        <label>
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
        <label>
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
        <label>
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
        <label>
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
        <label>
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
        <label>
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
