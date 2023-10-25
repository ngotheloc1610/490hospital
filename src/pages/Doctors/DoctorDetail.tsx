import { useEffect } from 'react'
import { DOCTOR } from '../../assets'
import { API_GET_DOCTOR } from '../../Contants/api.constant';
import axios from 'axios';
import { defineConfigGet } from '../../components/Common/utils';
import { useParams } from 'react-router-dom';


const DoctorDetail = () => {
    const params = useParams();
    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const url = `${url_api}${API_GET_DOCTOR}`;

        axios.get(url, defineConfigGet({ id: params.doctorId })).then((resp: any) => {
            if (resp) {

            }
        }).catch(err => {
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
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>Dr. Ivan Good</h3>
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
                                    <li className='lh-base mb-2'>2014: Graduated as General Practitioner at Thai Binh University of Medicine and Pharmacy</li>
                                    <li className='lh-base mb-2'>Year 2022: Graduated from Level I Specialist in Surgery specializing in Orthopedics, Hanoi Medical University</li>
                                </ul>
                            </div>
                            <div className='row'>
                                <p className='col-2 fw-bold'>Specialized activities</p>
                                <ul className='col-10'>
                                    <li className='lh-base mb-2'>2014 - 2020: General surgery doctor, specializing in orthopedic trauma, Department of General Surgery, Y Yen General Hospital
                                    </li>
                                    <li className='lh-base mb-2'>2015: Surgeon treating hand and foot fractures, Department of Orthopedics, Nam Dinh Provincial General Hospital
                                    </li>
                                    <li className='lh-base mb-2'>2016: Surgeon treating femur and lower leg fractures, Department of Lower Limb Trauma, Viet Duc Hospital
                                    </li>
                                    <li className='lh-base mb-2'>2017: Basic laparoscopic surgeon, Viet Duc Hospital
                                    </li>
                                    <li className='lh-base mb-2'>Year 2020 - 2022: Level I specialist in trauma surgery, Viet Duc Hospital, Hanoi Medical University Hospital, Saint Paul Hospital,...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='pb-3 mb-3 fw-bold text-uppercase border-bottom'>Achievement</h3>
                        <div>
                            <ul>
                                <li className='lh-base mb-2'>2016: Certificate of practice in surgical examination and treatment
                                </li>
                                <li className='lh-base mb-2'>2 grassroots scientific topics: Forearm fusion surgery in 2019 and skin flap surgery to treat polydactyly in 2022</li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default DoctorDetail