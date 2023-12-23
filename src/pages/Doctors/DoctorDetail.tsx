import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { API_GET_DOCTOR } from '../../Contants/api.constant';
import { defineConfigGet } from '../../components/Common/utils';
import { useAppSelector } from '../../redux/hooks';
import { warn } from '../../components/Common/notify';
import moment from 'moment';
import { FORMAT_DATE_MONTH_YEAR } from '../../Contants/general.constant';


const DoctorDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const url_api = process.env.REACT_APP_API_URL;

    const { isLogin } = useAppSelector((state) => state.authSlice)

    const [doctor, setDoctor] = useState<any>({});

    const [listEducation, setListEducation] = useState<any>([]);
    const [listSpecialized, setListSpecialized] = useState<any>([]);
    const [listAchievement, setListAchievement] = useState<any>([]);

    useEffect(() => {
        const id = params.doctorId;
        const url = `${url_api}${API_GET_DOCTOR}${id}`;

        axios.get(url, defineConfigGet({})).then((resp: any) => {
            if (resp) {
                const data = resp.data;

                const educations = data.practitionerTarget?.qualification.filter((item: any) => item.code.coding[0].code === "Edu")
                const specActivities = data.practitionerTarget?.qualification.filter((item: any) => item.code.coding[0].code === "SpecActivities")
                const achievement = data.practitionerTarget?.qualification.filter((item: any) => item.code.coding[0].code === "Achieve")

                setListEducation(educations)
                setListSpecialized(specActivities)
                setListAchievement(achievement)

                setDoctor(data)
            }
        }).catch((err: any) => {
            console.log("error get doctor detail:", err)
        })
    }, [params.doctocId])

    const handleBookAppointment = () => {
        if (isLogin) {
            navigate("/appointment");
        } else {
            warn("You need to log in before booking!");
        }
    }


    return (
        <div className="container p-3">
            <div className='row gy-5'>
                <div className="col-4 pe-5">
                    <img src={doctor?.practitionerTarget?.photo[0]?.url} alt="img doctor" className='image-doctor' />
                    <button className='button button--primary w-100 mt-4 text-uppercase' onClick={() => handleBookAppointment()}>Make an Appointment Now!</button>
                </div>
                <div className="col-8">
                    <div className=''>
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>{doctor?.practitioner?.display}</h3>
                        <div className='container'>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialty</p>
                                <ul className='col-10'>
                                    <li className='lh-base mb-2'>{doctor.specialty && doctor.specialty.map((item: any) => {
                                        return (
                                            <span>{item.display}</span>
                                        )
                                    })}</li>
                                </ul>
                            </div>

                            <div className='row'>
                                <p className='col-2 fw-bold'>Education</p>
                                <ul className='col-10'>
                                    {listEducation.length > 0 && listEducation.map((item: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'>
                                                <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                                <span> - </span>
                                                <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                                <span>: {item.code.display}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialized activities</p>
                                <ul className='col-10'>
                                    {listSpecialized.length > 0 && listSpecialized.map((item: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'>
                                                <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                                <span> - </span>
                                                <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                                <span>: {item.code.display}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>Achievement</h3>
                        <div>
                            <ul>
                                {listAchievement.length > 0 && listAchievement.map((item: any, idx: number) => {
                                    return (
                                        <li className='lh-base mb-2'>
                                            <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                            <span> - </span>
                                            <span>{item.period.start ? moment(item.period.start).format(FORMAT_DATE_MONTH_YEAR) : ""}</span>
                                            <span>: {item.code.display}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default DoctorDetail