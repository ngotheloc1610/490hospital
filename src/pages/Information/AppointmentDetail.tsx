import { useEffect, useState } from "react";
import { API_GET_DETAIL_APPOINTMENT } from "../../Contants/api.constant";
import { defineConfigPost } from "../../components/Common/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DOCTOR } from "../../assets";
import { FORMAT_DATE_MONTH_YEAR } from "../../Contants/general.constant";
import PopUpCancel from "./PopUpCancel";


const AppointmentDetail = () => {
  const url_api = process.env.REACT_APP_API_URL;
  const params = useParams();

  const [appointment, setAppointment] = useState<any>();

  useEffect(() => {
    getAppointment(params.appointmentId)
  }, [params.appointmentId])

  const getAppointment = (id: string | undefined) => {
    const url = `${url_api}${API_GET_DETAIL_APPOINTMENT}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setAppointment(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get appointment detail:", err);
      });
  }

  return (
    <div>
      <div className="border border-3 rounded p-3">
        <div className="border-bottom">
          <p className="fw-bold text-uppercase">patient details</p>
          <div className="row">
            <div className="col-3">
              <img src={DOCTOR} alt="img patient" />
            </div>
            <div className="col-9">
              {/* <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{patient.name}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{patient.gender}</td>
                  </tr>
                  <tr>
                    <td>Date of birth</td>
                    <td>{moment(patient.dateOfBirth).format(FORMAT_DATE_MONTH_YEAR)}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{patient.address}</td>
                  </tr>
                  <tr>
                    <td>Citizen identification</td>
                    <td>{patient.city}</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>{patient.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{patient.email}</td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>

        <div className="mt-5 border-bottom">
          <p className="fw-bold text-uppercase">booking details</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Appointment Date</td>
                <td>{moment(appointment?.created).format("ddd, DD MMM YYYY")}</td>
              </tr>
              <tr>
                <td>Appointment time</td>
                <td>
                  <span>{moment(appointment?.startDate).format("HH:mm")}</span> - <span>{moment(appointment?.endDate).format("HH:mm")}</span>
                </td>
              </tr>
              <tr>
                <td>Doctor</td>
                {/* <td>{appointment.participant && appointment.participant.map((item:any) => {
                    return (

                    )
                })}</td> */}
              </tr>
              <tr>
                <td>Type of appointment</td>
                {/* <td>{appointment?.appointmentType.}</td> */}
              </tr>
              <tr>
                <td>Specialty</td>
                <td>
                  {appointment.specialty && appointment.specialty.map((item: any) => {
                    return (
                      <p>{"["}<span className="text-info">{item.coding[0].code}</span>{"]"} {item.coding[0].display && "-"}
                        {item.coding[0].display}</p>
                    )
                  })
                  }
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td><span className="text-warning">{appointment?.status}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="mb-3 fw-bold">Description</label>
          <div className="form-floating">
            {appointment?.comment}
          </div>
        </div>

        <div>
          <button className="button button--primary me-2">Back</button>
        </div>
      </div>

    </div>
  )
}

export default AppointmentDetail