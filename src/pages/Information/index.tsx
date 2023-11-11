import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutlet, useParams } from "react-router-dom";
import { convertToDate, convertToTime, defineConfigGet } from "../../components/Common/utils";
import PaginationComponent from "../../components/Common/Pagination";
import { API_GET_LIST_APPOINTMENT_PATIENT, API_PROFILE_PATIENT } from "../../Contants/api.constant";
import { DOCTOR } from "../../assets";
import EditPatient from "./EditPatient";
import { setId } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Information = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemPerPage, setItemPerPage] = useState<number>(3);
    const [totalItem, setTotalItem] = useState<number>(0);

    const inputRef = useRef<any>(null);
    const [patient, setPatient] = useState<any>({});
    const [listAppointment, setListAppointment] = useState<any>([]);
    const [image, setImage] = useState<any>("");

    const outlet = useOutlet();
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getPatientDetail(patient?.id)
    }, [patient?.id]);

    useEffect(() => {
        getListAppointment(patient?.id)
    }, [patient?.id, currentPage, itemPerPage]);

    const getPatientDetail = (id: any) => {
        const url = `${url_api}${API_PROFILE_PATIENT}`;

        axios
            .get(url, defineConfigGet({}))
            .then((resp: any) => {
                if (resp) {
                    setPatient(resp.data);
                }
            })
            .catch((err) => {
                console.log("err:", err);
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
                console.log("err:", err);
            });
    }
    const handleChangeImage = (event: any) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handlePickImage = () => {
        inputRef.current.click();
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
                                <button className="button button--primary button--small" onClick={() => navigate(`/information/edit`)}>Edit</button>
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
                                            <td>{patient?.addressFirstRep?.text}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Citizen identification</th>
                                            <td>{patient?.addressFirstRep?.city}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone number</th>
                                            <td>{patient?.telecom?.find((i: any) => i?.system === "phone")
                                                ?.value}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>
                                                {
                                                    patient?.telecom?.find((i: any) => i?.system === "email")
                                                        ?.value
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-4">
                                <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
                                    <div className="h-100">
                                        <img
                                            src={image ? URL.createObjectURL(image) : DOCTOR}
                                            alt=""
                                            className={`h-100 w-100 d-block m-auto ${image ? "" : "bg-image"}`}
                                            style={{ objectFit: "cover" }}
                                        />
                                        <input
                                            type="file"
                                            className="d-none"
                                            ref={inputRef}
                                            onChange={handleChangeImage}
                                        />
                                    </div>
                                    <button className="button button--small button--primary w-90 mx-auto mt-3">
                                        {image ? "Edit" : "Add"} profile picture
                                    </button>
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
                                {listAppointment?.map((item: any, idx: number) => {
                                    return (
                                        <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
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