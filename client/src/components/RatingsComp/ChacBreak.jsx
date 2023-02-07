/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

function ChacBreak({ rating }) {
  const [sizeDis, setSizeDis] = useState('none');
  const [widthDis, setWidthDis] = useState('none');
  const [comfortDis, setComfortDis] = useState('none');
  const [qualityDis, setQualityDis] = useState('none');
  const [lengthDis, setLengthDis] = useState('none');
  const [fitDis, setFitDis] = useState('none');
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');

  useEffect(() => {
    const chacFunc = (input) => {
      const { value } = rating.characteristics[input];
      const percentage = ((Number(value) / 5) * 100) - 1;
      const percentageString = `${JSON.stringify(percentage)}%`;
      return percentageString;
    };
    if (rating.characteristics) {
      const chac = rating.characteristics;
      const arrChac = Object.keys(chac);
      console.log('check this', arrChac);
      const referenceArr = ['Fit', 'Length', 'Comfort', 'Quality', 'Width', 'Size'];
      for (let i = 0; i < arrChac.length; i++) {
        if (referenceArr.indexOf(arrChac[i]) !== -1) {
          if (arrChac[i] === 'Fit') {
            setFitDis('');
            setFit(chacFunc('Fit'));
          }
          if (arrChac[i] === 'Length') {
            setLengthDis('');
            setLength(chacFunc('Length'));
          }
          if (arrChac[i] === 'Comfort') {
            setComfortDis('');
            setComfort(chacFunc('Comfort'));
          }
          if (arrChac[i] === 'Quality') {
            setQualityDis('');
            setQuality(chacFunc('Quality'));
          }
          if (arrChac[i] === 'Width') {
            setWidthDis('');
            setWidth(chacFunc('Width'));
          }
          if (arrChac[i] === 'Size') {
            setSizeDis('');
            setSize(chacFunc('Size'));
          }
        }
      }
    }
  }, [rating]);

  return (
    <div className="chacBreak">
      <div className="chac" style={{ display: comfortDis }}>
        <text>Comfort:</text>
        <br />
        <div className="comfyDesc">
          <text className="uncomfortableFONT"> Uncomfortable</text>
          <text className="sUncomfortableFONT">Slightly uncomfortable</text>
          <text className="ok">OK</text>
          <text className="comfortable">Comfortable</text>
          <text className="perfect">Perfect</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container1" />
          <span className="arrow-comfort" data-testid="arrow-comfort" style={{ 'margin-left': comfort }}>&#8679;</span>
        </div>
      </div>
      <div className="chac" style={{ display: qualityDis }}>
        <text>Quality:</text>
        <br />
        <div className="comfyDesc">
          <text className="poorFONT"> Poor</text>
          <text className="belowavgFONT">Below average</text>
          <text className="whatiexpect">What I expected</text>
          <text className="prettygreat">Pretty great</text>
          <text className="perfectQ">Perfect</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container1" />
          <span
            data-testid="arrow-quality"
            className="arrow-quality"
            style={{ 'margin-left': quality }}
          >
            &#8679;

          </span>
        </div>
      </div>
      <div className="chac" style={{ display: sizeDis }}>
        <text>Size:</text>
        <br />
        <div className="comfyDesc">
          <text className="smallFONT"> Small</text>
          <text className="perfectS">Perfect</text>
          <text className="sizeWide">A size too wide</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container2" />
          <span className="arrow-size" style={{ 'margin-left': size }}>&#8679;</span>
        </div>
      </div>
      <div className="chac" style={{ display: widthDis }}>
        <text>Width:</text>
        <br />
        <div className="comfyDesc">
          <text className="toonarrowFONT"> Too narrow</text>
          <text className="perfectS">Perfect</text>
          <text className="toowide">Too wide</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container2" />
          <span className="arrow-width" style={{ 'margin-left': width }}>&#8679;</span>
        </div>
      </div>
      <div className="chac" style={{ display: lengthDis }}>
        <text>Length:</text>
        <br />
        <div className="comfyDesc">
          <text className="runshort"> Runs short</text>
          <text className="perfectS">Perfect</text>
          <text className="runslong">Runs long</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container2" />
          <span data-testid="arrow-length" className="arrow-length" style={{ 'margin-left': length }}>&#8679;</span>
        </div>
      </div>
      <div className="chac" style={{ display: fitDis }}>
        <text>Fit:</text>
        <br />
        <div className="comfyDesc">
          <text className="runshort"> Runs tight</text>
          <text className="perfectS">Perfect</text>
          <text className="runslong">Runs long</text>
        </div>
        <div className="bar-containerCB">
          <div className="bar-container2" />
          <span data-testid="arrow-fit" className="arrow-fit" style={{ 'margin-left': fit }}>&#8679;</span>
        </div>
      </div>
    </div>
  );
}

export default ChacBreak;
