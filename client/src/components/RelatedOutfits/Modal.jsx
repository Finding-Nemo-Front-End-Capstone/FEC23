import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// figure out how to close modal if another button is clicked
function Modal({show, setShowModal, relFeat, relName, currFeat, currName}) {
  const [sharedFeat, setSharedFeat] = useState([]);
  useEffect(() => {
    if (relFeat && currFeat) {
      let combined = relFeat.concat(currFeat);
      combined = combined.reduce((res, item) => {
        if (!res.includes(item.feature)) {
          return [...res, item.feature];
        }
        return res;
      }, []);
      const result = combined.map((prop) => (
        { prop: prop,
          rel: relFeat.reduce((acc, i) => {
            if (i.feature === prop) {
              return acc + (i.value === null ? acc : i.value);
            }
            return acc
          }, ''),
          curr: currFeat.reduce((acc, i) => {
            if (i.feature === prop) {
              return acc + (i.value === null ? acc : i.value);
            }
            return acc
          }
          , ''),
        }));
      document.addEventListener('click', closeModal);
      setSharedFeat(result);
    }
  }, [show]);

  function makeFeat() {
    return (
      sharedFeat.map((feat) => (
        <tr className={feat}>
          <td className="modalCurr">
            {feat.curr === '' ? null :
            typeof feat.curr === 'boolean' ? '✓'
            : feat.curr}
          </td>
          <td className="modalProp">{feat.prop}</td>
          <td className="modalRel">
            {feat.rel === '' ? null :
            typeof feat.rel === 'boolean' ? '✓'
            : feat.rel}
            </td>
        </tr>
      )));
  }
  function closeModal(e) {
    e.preventDefault();
    document.removeEventListener('click', closeModal);
    setShowModal(false);
  }
  if (!show) {
    return null;
  }
  return createPortal(
    <table className="relatedModal" onClick={closeModal}>
      <tbody>
        <tr>
          <td className="relatedModalComparing">COMPARING</td>
        </tr>
        <tr>
          <td className="modalCurrHeader">{currName}</td>
          <td />
          <td className="modalCompHeader">{relName}</td>
        </tr>
        <tr>
          <td><br /></td>
        </tr>
        {makeFeat()}
      </tbody>
    </table>,
    document.querySelector('#app .RelatedOutfits .modalPortal')
  );
}

export default Modal;
