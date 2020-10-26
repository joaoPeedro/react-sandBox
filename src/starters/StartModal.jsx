import React, {useRef} from "react";
import Modal from "../ui-components/modal/Modal";

const StartModal = () => {
  const modalRef = React.useRef();
  const modalRef2 = React.useRef();

  const handlerModalAction = (type) => {
    modalRef.current.handlerModalAction(type);
  };

  const handlerModalAction2 = (type) => {
    modalRef2.current.handlerModalAction(type);
  };
  return (
    <>
      <button onClick={() => handlerModalAction("OPEN")}>open modal</button>
      <Modal ref={modalRef} initialState={false}>
        <img src="https://loremflickr.com/620/300/inspiration" />
        <div>
          <p>🆃🆁🆈 🅰🅶🅰🅸🅽. 🅵🅰🅸🅻 🅰🅶🅰🅸🅽. 🆃🆁🆈 🅰🅶🅰🅸🅽. 🅵🅰🅸🅻 🅱🅴🆃🆃🅴🆁.</p>
        </div>
      </Modal>

      <button onClick={() => handlerModalAction2("OPEN")}>open modal 2</button>
      <Modal
        ref={modalRef2}
        initialState={false}
        styles="small"
        preventClose={true}
      >
        <p> I intend to live🏄 forever. So far, so good✅.</p>
        <button
          className="color-2"
          onClick={() => handlerModalAction2("CLOSE")}
        >
          close
        </button>
      </Modal>
    </>
  );
};

export default StartModal;
