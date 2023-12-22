import { useEffect, useState } from "react";
import { USER } from "../../assets";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_DIAGNOSTIC_BOOK_DETAIL, API_DIAGNOSTIC_CONDITION_BY_PATIENT, API_DIAGNOSTIC_ENCOUNTER_HISTORY, API_DIAGNOSTIC_OBSERVATION, API_DIAGNOSTIC_PATIENT_PROFILE, API_DIAGNOSTIC_UPCOMING } from "../../Contants/api.constant";
import { convertToDate, convertToTime, defineConfigPost, styleStatus } from "../../components/Common/utils";
import axios from "axios";
import moment from "moment";
import { FORMAT_DATE_MONTH_YEAR } from "../../Contants/general.constant";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientMonitorDetail = () => {
  const url_api = process.env.REACT_APP_API_URL;
  const params = useParams();

  const [bookingDetail, setBookingDetail] = useState<any>({
    appointmentDate: "",
    time: "",
    typeOfAppointment: "",
    nameDoctor: "",
    specialty: "",
    room: "",
    appointmentStatus: ""
  })
  const [patientDetail, setPatientDetail] = useState<any>(null);
  const [listPreviousEncounter, setListPreviousEncounter] = useState<any>([]);
  const [listUpcomingAppointment, setListUpcomingAppointment] = useState<any>([]);
  const [listEncounterHistory, setListEncounterHistory] = useState<any>([]);
  const [indexHeartRate, setIndexHeartRate] = useState<any>(null);
  const [indexBloodPressure, setIndexBloodPressure] = useState<any>(null);
  const [indexBloodGlucose, setIndexBloodGlucose] = useState<any>(null);
  const [indexTemperature, setIndexTemperature] = useState<any>(null);
  const [indexBMI, setIndexBMI] = useState<any>(null);

  const { idAppointment } = useAppSelector(state => state.appointmentSlice);

  useEffect(() => {
    if (idAppointment) {
      getProfilePatient(idAppointment)
      getBookingDetail(idAppointment)
      getUpcomingAppointment(idAppointment)
      getEncounterHistory(idAppointment)
    }
  }, [idAppointment])


  useEffect(() => {
    if (params.encounterId && params.encounterId !== "null") {
      getObservations(params.encounterId)
      getPreviousEncounter(params.encounterId)
    }
  }, [params.encounterId])

  const getProfilePatient = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_PATIENT_PROFILE}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setPatientDetail(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get patient detail:", err);
      });
  }

  const getBookingDetail = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_BOOK_DETAIL}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setBookingDetail(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get booking detail:", err);
      });
  }

  const getPreviousEncounter = (encounterId: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_CONDITION_BY_PATIENT}${encounterId}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListPreviousEncounter(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get previous encounter:", err);
      });
  }

  const getUpcomingAppointment = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_UPCOMING}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListUpcomingAppointment(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get upcoming appointment:", err);
      });
  }

  const getEncounterHistory = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_ENCOUNTER_HISTORY}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListEncounterHistory(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get encounter history:", err);
      });
  }

  const getObservations = (encounterId: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_OBSERVATION}${encounterId}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;
          setIndexHeartRate(data?.filter((item: any) => item?.name === "Heart rate")?.[0])
          setIndexBMI(data?.filter((item: any) => item?.name === "BMI")?.[0])
          setIndexBloodGlucose(data?.filter((item: any) => item?.name === "Blood Glucose")?.[0])
          setIndexBloodPressure(data?.filter((item: any) => item?.name === "Blood Pressure")?.[0])
          setIndexTemperature(data?.filter((item: any) => item?.name === "Temperature")?.[0])
        }
      })
      .catch((err: any) => {
        console.log("error get encounter by appointment:", err);
      });
  }

  const _renderReportedConditions = () => {
    return (
      <div className="box p-3 mt-3">
        <div className="d-flex justify-content-between">
          <p className="fw-bold">
            Reported conditions (Problem list and Previous Encounter)
          </p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Condition Name</th>
              <th scope="col">Body site</th>
              <th scope="col">Severity</th>
              <th scope="col">Recorded date</th>
              <th scope="col">Note</th>
              <th scope="col">Encounter</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listPreviousEncounter && listPreviousEncounter.map((item: any, idx: number) => {
              return (
                <tr>
                  <td>{item?.conditionName}</td>
                  <td>{item?.bodySite}</td>
                  <td>{item?.severity}</td>
                  <td>{item.recordedDate ? moment(item.recordedDate).format(FORMAT_DATE_MONTH_YEAR) : ""}</td>
                  <td>{item?.note}</td>
                  <td>{item.encounterDate ? moment(item.encounterDate).format(FORMAT_DATE_MONTH_YEAR) : ""}</td>
                  {/* <td>
                      <span className="ms-1 cursor-pointer">
                        <ICON_PENCIL />
                      </span>
                      <span className="ms-1 cursor-pointer">
                        <ICON_TRASH />
                      </span>
                    </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="container patient-monitor mb-5">
      <div className="row g-3">
        <div className="col-9 ">
          <div className="row g-3">
            <div className="col-6 g-3">
              <div className="box p-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Patient details</h5>
                </div>
                <div className="d-flex g-3">
                  <div className="me-3">
                    <img src={patientDetail?.photo ? patientDetail?.photo?.[0]?.url : USER} alt="" style={{ borderRadius: "10px" }} />
                  </div>
                  <div>
                    <p><span className="fw-bold">Name: </span><span>{patientDetail && patientDetail?.nameFirstRep?.text}</span></p>
                    <p><span className="fw-bold">Gender: </span><span>{patientDetail && patientDetail?.gender}</span></p>
                    <p><span className="fw-bold">Date of birth: </span><span>{patientDetail && moment(patientDetail?.birthDate).format(FORMAT_DATE_MONTH_YEAR)}</span></p>
                    <p><span className="fw-bold">Address: </span><span>{patientDetail && patientDetail?.addressFirstRep?.text}</span></p>
                    <p><span className="fw-bold">Citizen identification: </span><span>{patientDetail && patientDetail?.identifierFirstRep?.value}</span></p>
                    <p><span className="fw-bold">Phone number: </span><span>{patientDetail && patientDetail?.telecom.filter((item: any) => item.system === "phone")[0]?.value}</span></p>
                    <p><span className="fw-bold">Email: </span><span>{patientDetail && patientDetail?.telecom.filter((item: any) => item.system === "email")[0]?.value}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="box p-3 h-100">
                <div>
                  <h5 className="fw-bold">Booking details</h5>
                </div>
                <div>
                  <p><span className="fw-bold">Appointment Date: </span><span>{bookingDetail.appointmentDate}</span></p>
                  <p><span className="fw-bold">Appointment Time: </span><span>{bookingDetail.time}</span></p>
                  <p><span className="fw-bold">Doctor: </span><span>{bookingDetail.nameDoctor}</span></p>
                  <p><span className="fw-bold">Specialty: </span><span>{bookingDetail.specialty}</span></p>
                  <p><span className="fw-bold">Room: </span><span>{bookingDetail.room}</span></p>
                  <p><span className="fw-bold">Appointment Type: </span><span>{bookingDetail.typeOfAppointment}</span></p>
                  <p><span className="fw-bold">Appointment Status: </span><span>{bookingDetail.appointmentStatus}</span></p>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="col-3">
          <div className="box h-100 p-3">
            <p className="fw-bold">Upcoming Appointment</p>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Appointment Time</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listUpcomingAppointment && listUpcomingAppointment.length > 0 ? listUpcomingAppointment.map((item: any, idx: number) => {
                    return (
                      <tr className={`${idx % 2 === 1 ? "table-light" : ""}`} >
                        <td >
                          {item.patientName}
                        </td>

                        <td >{convertToDate(item.appointDate)}</td>
                        <td >
                          <span>{convertToTime(item.appointmentTimeStart)} </span>
                          <span> - </span>
                          <span>{convertToTime(item.appointmentTimeEnd)}</span>
                        </td>
                        <td >{item.doctorName}</td>
                        <td >
                          <p className={`${styleStatus(item.status)} text-center d-inline-block mb-0`}>{item.status}</p>
                        </td>
                      </tr>
                    );
                  }) : <span>Không có dữ liệu.</span>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="box p-3">
            <div>
              <h2 className="fw-bold">Vital Signs</h2>
            </div>
            <div>
              <div className="d-flex mb-3">
                <div
                  className="box box-item p-3 text-center"
                >
                  <h6 className="fw-bold">Heart rate</h6>
                  <p>
                    <i
                      className="bi bi-heart-pulse-fill fs-1"
                      style={{ color: "#FF0000" }}
                    ></i>
                  </p>
                  <p className="fw-bold mb-1">{indexHeartRate?.value ? indexHeartRate?.value : "N/A"}</p>
                  <p className="mb-1">BPM</p>
                  <p className="mb-0">{indexHeartRate?.interpretations ? indexHeartRate?.interpretations : "N/A"}</p>
                </div>
                <div
                  className="box box-item p-3 text-center"
                >
                  <h6 className="fw-bold">Blood pressure</h6>
                  <p>
                    <i
                      className="bi bi-droplet-fill fs-1"
                      style={{ color: "#FF0000" }}
                    ></i>
                  </p>
                  <p className="fw-bold mb-1">{indexBloodPressure?.value ? indexBloodPressure?.value : "N/A"}</p>
                  <p className="mb-1">mmHg</p>
                  <p className="mb-0">{indexBloodPressure?.interpretations ? indexBloodPressure?.interpretations : "N/A"}</p>
                </div>
                <div
                  className="box box-item p-3 text-center"
                >
                  <h6 className="fw-bold">Blood glucose</h6>
                  <p>
                    <i
                      className="bi bi-capsule fs-1"
                      style={{ color: "#FF0000" }}
                    ></i>
                  </p>
                  <p className="fw-bold mb-1">{indexBloodGlucose?.value ? indexBloodGlucose?.value : "N/A"}</p>
                  <p className="mb-1">mmol/L</p>
                  <p className="mb-0">{indexBloodGlucose?.interpretations ? indexBloodGlucose?.interpretations : "N/A"}</p>
                </div>
                <div
                  className="box box-item p-3 text-center"
                >
                  <h6 className="fw-bold">Temperature</h6>
                  <p>
                    <i className="bi bi-thermometer-high fs-1"></i>
                  </p>
                  <p className="fw-bold mb-1">{indexTemperature?.value ? indexTemperature?.value : "N/A"}</p>
                  <p className="mb-1">&deg;C</p>
                  <p className="mb-0">{indexTemperature?.interpretations ? indexTemperature?.interpretations : "N/A"}</p>
                </div>
                <div
                  className="box box-item p-3 text-center"
                >
                  <h6 className="fw-bold">BMI</h6>
                  <p>
                    <i className="bi bi-person-fill fs-1"></i>
                  </p>
                  <p className="fw-bold mb-1">{indexBMI?.value ? indexBMI?.value : "N/A"}</p>
                  <p className="mb-1">N/A</p>
                  <p className="mb-0">{indexBMI?.interpretations ? indexBMI?.interpretations : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="box h-100 p-3">
            <p className="fw-bold">Encounter History</p>
            <div>
              {listEncounterHistory.length > 0 ? listEncounterHistory.map((item: any) => {
                return (
                  <div className="border-bottom">
                    <div className="d-flex">
                      <div className="me-3">
                        <img src={USER} alt="" style={{ height: "40px", width: "40px", borderRadius: "100rem" }} />
                      </div>
                      <div>
                        <p className="fw-bold">{item?.nameDoctor}</p>
                        <p>{item?.specialty}</p>
                        <span>Appt.date: {item.date ? moment(item.date).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                      </div>
                    </div>
                    <p className="mt-2"><span className="fw-bold color-primary">Final diagnosis: </span> <span>{item?.finalDiagnosis}</span></p>
                  </div>
                )
              }) : <span>Không có dữ liệu.</span>}

            </div>

          </div>
        </div>
      </div>

      {_renderReportedConditions()}
    </section>
  );
};

export default PatientMonitorDetail;
