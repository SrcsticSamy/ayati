import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Popup({ show, setShow, ayahObj }) {
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal id="myModal" centered show={show} onHide={handleClose} className="p-0" scrollable>
        <Modal.Header >
          <Modal.Title className="fw-bolder">
            <span className="text-muted">
            سورة {ayahObj.chapterName}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-bold text-wrap text-center lh-lg">
          <mark className="fs-1">
            {ayahObj.ayahText}
          </mark>
          <hr />
          {ayahObj.tafsir}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Popup;
