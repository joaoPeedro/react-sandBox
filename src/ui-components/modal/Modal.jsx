import React, {forwardRef, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";

/**
 * create Modal container
 * modalRoot // root element to append modal
 * initialState // true || false
 * preventClose // to prevent user action // true false
 * preventCloseOutside // to prevent click on overlay to close modal
 * styles // String with class styles
 * ref // to have access to handlerModalAction from outside
 */

const Modal = forwardRef((props, ref) => {
  const {
    modalRoot = document.body,
    initialState = false,
    preventClose = false,
    preventCloseOutside = false,
    styles = "",
  } = props;

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
      <section className={`modal ${styles}`}>
        <div
          className="overlay"
          onClick={!preventClose && !preventCloseOutside && handlerModalAction}
        ></div>
        <div className="content">
          {props.children}
          {!preventClose && (
            <span className="close-modal" onClick={handlerModalAction}>
              X
            </span>
          )}
        </div>
      </section>,
      modalRoot
    );
  }

  return null;
});

export default Modal;
