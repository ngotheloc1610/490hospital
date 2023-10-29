import { useEffect, useState } from 'react'
import { DOCTOR } from '../../assets'
import { API_GET_DOCTOR } from '../../Contants/api.constant';
import axios from 'axios';
import { defineConfigGet } from '../../components/Common/utils';
import { useParams } from 'react-router-dom';


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
                    <img src={DOCTOR} alt="" className='image-doctor' />
                    <button className='button button--primary w-100 mt-4 text-uppercase'>Make an Appointment Now!</button>
                </div>
                <div className="col-8">
                    <div className=''>
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>{doctor?.practitionerTarget?.nameFirstRep?.nameAsSingleString}</h3>
                        <div className='container'>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Department</p>
                                <ul className='col-10'>
                                    <li className='lh-base mb-2'>General Surgery Department,</li>
                                </ul>
                            </div>

                            <div className='row'>
                                <p className='col-2 fw-bold'>Education</p>
                                <ul className='col-10'>
                                    {doctor.education && doctor.education.map((edu: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'>2014: Graduated as General Practitioner at Thai Binh University of Medicine and Pharmacy</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialized activities</p>
                                <ul className='col-10'>
                                    {doctor.specialty && doctor.specialty.map((spec: any, idx: number) => {
                                        return (
                                            <li className='lh-base mb-2'>2014 - 2020: General surgery doctor, specializing in orthopedic trauma, Department of General Surgery, Y Yen General Hospital
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
                                        <li className='lh-base mb-2'>2016: Certificate of practice in surgical examination and treatment
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