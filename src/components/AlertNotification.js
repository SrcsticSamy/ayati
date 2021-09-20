import Alert from 'react-bootstrap/Alert'
function AlertNotification({ setAlert, alert }) {

  return (
    <Alert className="my-3" variant={alert.bg} onClose={() => setAlert({...alert, show: false})} show={alert.show} dismissible>
        <p>
          {alert.message} 
          <br />
          ¯\_(ツ)_/¯
        </p>
      </Alert>
  );
}

export default AlertNotification;
