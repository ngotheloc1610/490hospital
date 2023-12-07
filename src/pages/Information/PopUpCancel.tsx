import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { defineConfigPost } from "../../components/Common/utils";
import { API_CANCEL_APPOINTMENT } from "../../Contants/api.constant";
import { error, success } from "../../components/Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerCancel } from "../../redux/features/appointment/appointmentSlice";

interface IProps {
  handleShowPopUp: any;
  appointmentId: string;
}

const PopUpCancel = (props: IProps) => {

  const { handleShowPopUp, appointmentId } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerCancel } = useAppSelector(state => state.appointmentSlice);


  const cancelAppointment = () => {
    const url = `${url_api}${API_CANCEL_APPOINTMENT}${appointmentId}`;

    axios.post(url, defineConfigPost()).then(resp => {
      if (resp) {
        success("Cancel Successfully");
        dispatch(setTriggerCancel(!triggerCancel));
      }
    }).catch((err: any) => {
      console.log("error cancel appointment:", err)
      error(err.response.data.error || err.response.data.error.message)
    })
  }

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
            Are you sure to cancel？
          </span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--outline"
            onClick={() => {
              handleShowPopUp(false)
            }}
          >
            No
          </Button>
          <Button
            className="button button--primary"
            onClick={() => cancelAppointment()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpCancel;
