import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { API_GET_DOCTOR } from '../../Contants/api.constant';
import { defineConfigGet } from '../../components/Common/utils';


const DoctorDetail = () => {
    const params = useParams();
    const url_api = process.env.REACT_APP_API_URL;

    const [doctor, setDoctor] = useState<any>({});

    useEffect(() => {
        const id = params.doctorId;
        const url = `${url_api}${API_GET_DOCTOR}${id}`;

        axios.get(url, defineConfigGet({})).then((resp: any) => {
            if (resp) {
                console.log("resp:", resp)
                setDoctor(resp.data)
            }
        }).catch((err: any) => {
            console.log("err:", err)
        })
    }, [params.doctocId])

    return (
        <div className="container p-3">
            <div className='row gy-5'>
                <div className="col-4 pe-5">
                    <img src={doctor?.practitionerTarget?.photo[0].data} alt={doctor?.practitionerTarget?.photo[0].data} className='image-doctor' />
                    <button className='button button--primary w-100 mt-4 text-uppercase'>Make an Appointment Now!</button>
                </div>
                <div className="col-8">
                    <div className=''>
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>{doctor?.practitionerTarget?.nameFirstRep?.nameAsSingleString}</h3>
                        <div className='container'>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialty</p>
                                <ul className='col-10'>
                                    <li className='lh-base mb-2'>{doctor.specialty?.map((spec: any) => {
                                        return (
                                            <span>{spec.display}</span>
                                        )
                                    })}</li>
                                </ul>
                            </div>

                            <div className='row'>
                                <p className='col-2 fw-bold'>Education</p>
                                <ul className='col-10'>
                                    {doctor.educations && doctor.educations.map((edu: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'><span>{edu.year}</span>: {edu.detail}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialized activities</p>
                                <ul className='col-10'>
                                    {doctor.specialty && doctor.specialty.map((spec: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'>{spec.timeStart} - {spec.timeEnd}: <span>{spec.detail}</span>
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
                                {doctor.achievements && doctor.achievements.map((achi: any, idx: number) => {
                                    return (
                                        <li className='lh-base mb-2'>{achi.time}: {achi.detail}
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