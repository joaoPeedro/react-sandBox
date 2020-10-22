import React, {forwardRef, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";

const Modal = forwardRef((props, ref) => {
  const {modalRoot = document.body, initialState = false} = props;
  const [showModal, setShowModal] = useState(initialState);

  useImperativeHandle(
    ref,
    () => {
      return {handlerModalAction: (type) => handlerModalAction(type)};
    },
    []
  );

  const handlerModalAction = (type) => {
    switch (type) {
      case "OPEN":
        setShowModal(true);
        break;
      case "CLOSE":
        setShowModal(false);
        break;
      default:
        setShowModal(!showModal);
    }
  };

  if (showModal) {
    return createPortal(
      <section className={`block-overlay${showModal && " active"}`}>
        <div className="part">
          <div className="content-holder">
            {props.children}
            <span className="close-overlay" onClick={handlerModalAction}>
              <i className="icon-close-thin">X</i>
            </span>
          </div>
        </div>
      </section>,
      modalRoot
    );
  }

  return null;
});

export default Modal;
