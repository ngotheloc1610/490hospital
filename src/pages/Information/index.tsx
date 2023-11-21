import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutlet } from "react-router-dom";

import { convertToDate, convertToTime, defineConfigGet, defineConfigPost } from "../../components/Common/utils";
import PaginationComponent from "../../components/Common/Pagination";
import { API_GET_LIST_APPOINTMENT_PATIENT, API_PROFILE_PATIENT } from "../../Contants/api.constant";
import { USER } from "../../assets";
import EditPatient from "./EditPatient";
import { setId } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Information = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemPerPage, setItemPerPage] = useState<number>(3);
    const [totalItem, setTotalItem] = useState<number>(0);

    const [patient, setPatient] = useState<any>({});
    const [listAppointment, setListAppointment] = useState<any>([]);

    const outlet = useOutlet();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getPatientDetail()
    }, []);

    useEffect(() => {
        getListAppointment(patient?.id)
    }, [patient?.id, currentPage, itemPerPage]);

    const getPatientDetail = () => {
        const url = `${url_api}${API_PROFILE_PATIENT}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
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

    return (
        <section className="patient-detail container">
            {outlet ? <EditPatient /> :
                <>
                    <div>
                        <div className="pb-3 mb-3 d-flex justify-content-between">
                            <h3 className="fw-bold text-uppercase">{patient?.nameFirstRep?.text}</h3>
                            <div>
                                <button className="button button--info button--small me-3" onClick={() => {
                                    navigate("/change-password");
                                    dispatch(setId(patient?.id));
                                }}>Change Password</button>
                                <button className="button button--primary button--small" onClick={() => { navigate(`/information/edit`); dispatch(setId(patient?.id)); }}>Edit</button>
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
                                            <td>{patient?.birthDate}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>{patient?.address}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Citizen identification</th>
                                            <td>{patient?.postalCode}</td>
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
                                            src={patient?.photo ? `data:${patient?.photo[0]?.contentType};base64,${patient.photo[0]?.data}` : USER}
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
                                </tr>
                            </thead>
                            <tbody>
                                {listAppointment && listAppointment.map((item: any, idx: number) => {
                                    return (
                                        <tr className={`${idx % 2 === 1 ? "table-light" : ""}`} onClick={() => navigate(`appointment/${item.id}`)}>
                                            <td >
                                                {item.patientName}
                                            </td>

                                            <td >{convertToDate(item.appointDate)}</td>
                                            <td >
                                                <span>{convertToTime(item.appointmentTimeStart)} </span> -
                                                <span>{convertToTime(item.appointmentTimeEnd)}</span>
                                            </td>
                                            <td >{item.doctorName}</td>
                                            <td >{item.status}</td>
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
        </section>
    )
}

export default Information