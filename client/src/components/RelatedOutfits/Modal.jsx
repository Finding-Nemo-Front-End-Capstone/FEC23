import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// figure out how to close modal if another button is clicked
function Modal({
  show, setShowModal, relFeat, relName, currFeat, currName,
}) {
  const [sharedFeat, setSharedFeat] = useState([]);
  useEffect(() => {
    if (relFeat && currFeat) {
      const combined = relFeat.concat(currFeat);
      const result = combined.map((prop) => (
        { prop: prop.feature,
          rel: relFeat.reduce((acc, i) => {
            if (i.feature === prop.feature) {
              return acc + (i.value === null ? acc : i.value);
            }
            return acc
          }, ''),
          curr: currFeat.reduce((acc, i) => {
            if (i.feature === prop.feature) {
              return acc + (i.value === null ? acc : i.value);
            }
            return acc
          }
          , ''),
        }));
      setSharedFeat(result);
      console.log(result);
    }
  }, [show]);

  function makeFeat() {
    return (
      sharedFeat.map((feat) => (
        <tr className={feat}>
          <td>{feat.curr === '' ? null : feat.curr} </td>
          <td className={modalProp}>{feat.prop}</td>
          <td>{feat.rel === '' ? null : feat.rel} </td>
        </tr>
      )));
  }
  function closeModal(e) {
    e.preventDefault();
    setShowModal(false);
  }
  document.addEventListener('click', closeModal);
  if (!show) {
    return null;
  }
  return createPortal(
    <table className="relatedModal" onClick={closeModal}>
      <tbody>
        <tr className="relatedModalComparing">COMPARING</tr>
        <tr>
          <td className="modalCurrHeader">{currName}</td>
          <td />
          <td className="modalCompHeader">{relName}</td>
        </tr>
        <br />
        {makeFeat()}
      </tbody>
    </table>,
    document.getElementById('app'),
  );
}

export default Modal;
