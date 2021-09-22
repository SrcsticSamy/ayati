import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Popup({ show, setShow, ayahObj }) {
  const handleClose = () => {
    setShow(false);
    setCopied(false);
  };
  const [copied, setCopied] = useState(false);
  
  return (
    <div>
      <Modal
        dir="rtl"
        centered
        show={show}
        onHide={handleClose}
        className="p-0"
        scrollable
      >
        <Modal.Header>
          <Modal.Title className="fw-bolder">
            <h4 className="text-muted">سورة {ayahObj.chapterName}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-bold text-wrap text-center lh-lg">
          <mark
            className="fs-4 d-block mb-1"
            dangerouslySetInnerHTML={{ __html: ayahObj.ayahText }}
          ></mark>
          <Button
            variant={copied ? "success" : "primary"}
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(ayahObj.textToCopy);
              setCopied(true);
            }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </Button>

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
