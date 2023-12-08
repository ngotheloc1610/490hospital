import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

import { convertToDate, convertToTime, defineConfigGet, defineConfigPost, styleStatus } from "../../components/Common/utils";
import PaginationComponent from "../../components/Common/Pagination";
import { API_GET_LIST_APPOINTMENT_PATIENT, API_PROFILE_PATIENT } from "../../Contants/api.constant";
import { USER } from "../../assets";
import { setId } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { FORMAT_DATE_MONTH_YEAR } from "../../Contants/general.constant";
import PopUpCancel from "./PopUpCancel";

const Information = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemPerPage, setItemPerPage] = useState<number>(3);
    const [totalItem, setTotalItem] = useState<number>(0);
  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
    const [patient, setPatient] = useState<any>({});
    const [listAppointment, setListAppointment] = useState<any>([]);
    const [appointmentId, setAppointmentId] = useState<any>();

    const outlet = useOutlet();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const url_api = process.env.REACT_APP_API_URL;
    const { triggerCancel } = useAppSelector(state => state.appointmentSlice);
    const { trigger } = useAppSelector(state => state.profileSlice);

    useEffect(() => {
        getPatientDetail()
    }, [trigger]);

    useEffect(() => {
        if (patient?.id) {
            getListAppointment(patient.id)
        }
    }, [patient?.id, currentPage, itemPerPage, triggerCancel]);

    const getPatientDetail = () => {
        const url = `${url_api}${API_PROFILE_PATIENT}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setPatient(resp.data);
                }
            })
            .catch((err) => {
                console.log("error get info patient:", err);
            });
    }

    const getListAppointment = (id: any) => {
        const url = `${url_api}${API_GET_LIST_APPOINTMENT_PATIENT}${id}`;

        axios
            .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
            .then((resp: any) => {
                if (resp) {
                    setListAppointment(resp.data.content);
                    setTotalItem(resp.data.totalElements);
                }
            })
            .catch((err) => {
                console.log("error get appointment for patient:", err);
            });
    }

    const getCurrentPage = (item: number) => {
        setCurrentPage(item - 1);
    };

    const getItemPerPage = (item: number) => {
        setItemPerPage(item);
        setCurrentPage(0);
    };

    const handleCancel = (id:string) => {
        setIsShowPopUp(true);
        setAppointmentId(id);
    }

    return (
        <section className="patient-detail container">
            {outlet ? <Outlet/> :
                <>
                    <div>
                        <div className="pb-3 mb-3 d-flex justify-content-between">
                            <h3 className="fw-bold text-uppercase">{patient?.nameFirstRep?.text}</h3>
                            <div>
                                <button className="button button--info me-3" onClick={() => {
                                    navigate("/change-password");
                                    dispatch(setId(patient?.id));
                                }}>Change Password</button>
                                <button className="button button--primary" onClick={() => { navigate(`/information/edit`); dispatch(setId(patient?.id)); }}>Edit</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Gender</th>
                                            <td>{patient?.gender}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Date of birth</th>
                                            <td>{patient.dateOfBirth ? moment(patient.dateOfBirth).format(FORMAT_DATE_MONTH_YEAR) : ""}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>{patient?.address}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Citizen identification</th>
                                            <td>{patient?.identifier}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone number</th>
                                            <td>{patient?.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{patient?.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-4">
                                <div className="h-100 d-flex flex-column" >
                                    <div className="h-100">
                                        <img
                                            src={patient.photo ? patient.photo : USER}
                                            alt="img patient"
                                            className={`d-block m-auto ${patient?.photo ? "" : "bg-image"}`}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-5">
                        <h3 className="fw-bold border-top pt-3 ">
                            List Appointment
                        </h3>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Appointment Date</th>
                                    <th scope="col">Appointment Time</th>
                                    <th scope="col">Doctor</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAppointment && listAppointment.length > 0 && listAppointment.map((item: any, idx: number) => {
                                    return (
                                        <tr className={`${idx % 2 === 1 ? "table-light" : ""}`} >
                                            <td onClick={() => navigate(`/information/diagnostic/${item.idEncounter}`)}>
                                                {item.patientName}
                                            </td>

                                            <td onClick={() => navigate(`/information/diagnostic/${item.idEncounter}`)}>{convertToDate(item.appointDate)}</td>
                                            <td onClick={() => navigate(`/information/diagnostic/${item.idEncounter}`)}>
                                                <span>{convertToTime(item.appointmentTimeStart)} </span>
                                                <span> - </span>
                                                <span>{convertToTime(item.appointmentTimeEnd)}</span>
                                            </td>
                                            <td onClick={() => navigate(`/information/diagnostic/${item.idEncounter}`)}>{item.doctorName}</td>
                                            <td onClick={() => navigate(`/information/diagnostic/${item.idEncounter}`)}>
                                                <span className={styleStatus(item.status)}>{item.status}</span>
                                            </td>
                                            <td>
                                                {item.status.trim() === "Pending" && <button className="button button--small button--danger m-auto d-block" onClick={() => handleCancel(item.idEncounter)}>Cancel</button>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <PaginationComponent
                            totalItem={totalItem}
                            itemPerPage={itemPerPage}
                            currentPage={currentPage === 0 ? 1 : currentPage + 1}
                            getItemPerPage={getItemPerPage}
                            getCurrentPage={getCurrentPage}
                        />
                    </div>
                </>
            }

      {isShowPopUp && <PopUpCancel handleShowPopUp={setIsShowPopUp} appointmentId={appointmentId} />}

        </section>
    )
}

export default Information