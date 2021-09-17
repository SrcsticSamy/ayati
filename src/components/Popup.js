import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Popup({ show, setShow, ayahObj }) {

  const handleClose = () => setShow(false);
  
  console.log(ayahObj.audioUrl, 'here');
  return (
    <div>
      <Modal id="myModal" centered show={show} onHide={handleClose} className="p-0" scrollable>
        <Modal.Header >
          <Modal.Title className="fw-bolder">
            <h4 className="text-muted">
            سورة {ayahObj.chapterName}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-bold text-wrap text-center lh-lg">
          <mark className="fs-4" dangerouslySetInnerHTML={{__html: ayahObj.ayahText}}>
          </mark>
          <hr />
          <audio controls>
            <source src={`https://verses.quran.com/${ayahObj.audioUrl}`} />
          </audio>
          <hr />
          <q className="fw-bold text-muted">تفسير السعدي</q>
          <br />
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
