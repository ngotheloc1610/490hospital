import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { defineConfigPost } from "../../components/Common/utils";
import { API_CANCEL_APPOINTMENT } from "../../Contants/api.constant";
import { success } from "../../components/Common/notify";

interface IProps {
    handleShowPopUp: any;
    appointmentId: string;
}

const PopUpCancel = (props: IProps) => {

    const {handleShowPopUp, appointmentId} = props;

  const url_api = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();


  const cancelAppointment = () => {
    const url = `${url_api}${API_CANCEL_APPOINTMENT}${appointmentId}`;
    
    axios.post(url, defineConfigPost()).then(resp => {
      if (resp) {
        success("Cancel Successfully");
        navigate("/information");
      }
    }).catch((err: any) => {
      console.log("error cancel appointment:", err)
    })
  }

  const handleCancel = () => {
    cancelAppointment()
  };

  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
            handleShowPopUp(true)
        }}
      >
        <Modal.Body className="mt-2 mb-2">
          <span>
            <i className="bi bi-exclamation-circle text-warning"></i>
          </span>
          <span className="ms-3 fs-18 fw-600 text-center">
            Are you sure to cancel <span className="fw-bold">{appointmentId}</span>？
          </span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {handleShowPopUp(false)
            }}
          >
            No
          </Button>
          <Button
            className="button button--small button--primary"
            onClick={() => handleCancel()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpCancel;
