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
        {
          prop: prop.feature,
          rel: relFeat.reduce((char, i) => {
            if (i.feature === prop.feature) {
              return i.value;
            }
            return null;
          }, [prop]),
          curr: currFeat.reduce((char, i) => {
            if (i.feature === prop.feature) {
              return i.value;
            }
            return null;
          }, [prop]),
        }));
      setSharedFeat(result);
    }
  }, [show]);

  function makeFeat() {
    return (
      sharedFeat.map((feat) => (
        <tr className={feat}>
          <td>{feat.rel}</td>
          <td>{feat.prop}</td>
          <td>{feat.curr}</td>
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
          <td>{currName}</td>
          <td />
          <td>{relName}</td>
        </tr>
        {makeFeat()}
      </tbody>
    </table>,
    document.getElementById('app'),
  );
}

export default Modal;
