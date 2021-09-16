import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Popup({ show, setShow, ayahObj }) {
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal id="myModal" size="lg" fullscreen="sm-down" centered show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>سورة {ayahObj.chapterName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-bold">{ayahObj.ayahText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Popup;
