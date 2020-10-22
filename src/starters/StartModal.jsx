import React, {useRef} from "react";
import Modal from "../ui-components/modal/Modal";

const StartModal = () => {
  const modalRef = useRef();

  const handlerModalAction = (type) => {
    modalRef.current.handlerModalAction(type);
  };

  return (
    <>
      <div>This is my modal</div>
      <p>https://www.youtube.com/watch?v=SmMZqh1xdB4&t=516s</p>
      <p>https://upmostly.com/tutorials/modal-components-react-custom-hooks</p>
      <button onClick={() => handlerModalAction("OPEN")}>btn</button>
      <Modal ref={modalRef} initialState={false}>
        <p onClick={() => handlerModalAction("CLOSE")}>Fecha isto</p>
      </Modal>
    </>
  );
};

export default StartModal;
