import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
function ToastNotification({ toast, setToast }) {
  return (
    <ToastContainer id="myToast" position="bottom-center" className="mb-5">
      <Toast
        bg={toast.bg}
        onClose={() => setToast({ show: false, message: "" })}
        delay={4000}
        autohide
        show={toast.show}
      >
        <Toast.Header>
          <strong className="me-auto">¯\_(ツ)_/¯</strong>
        </Toast.Header>
        <Toast.Body className="fw-bold">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNotification;
