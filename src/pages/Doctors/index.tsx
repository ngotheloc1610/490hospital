import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';

import { DOCTOR, DOCTOR_BG, ICON_GRADUATION, ICON_PEOPLE_TEAM } from '../../assets'
import { API_ALL_GET_DOCTOR, API_ALL_GET_SPECIALTY, API_SEARCH_DOCTOR } from '../../Contants/api.constant'
import { PAGE_SIZE_DOCTOR, START_PAGE } from '../../Contants/general.constant'

import Sidebar from '../../components/Sidebar'
import PaginationComponent from '../../components/Common/Pagination'
import { defineConfigGet } from '../../components/Common/utils'

const Doctors = () => {
    let navigate = useNavigate();
    const outlet = useOutlet();

    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");

    const [specialtyList, setSpecialtyList] = useState([]);
    const [doctorList, setDoctorList] = useState([]);

    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [itemPerPage, setItemPerPage] = useState<number>(PAGE_SIZE_DOCTOR);
    const [totalItem, setTotalItem] = useState<number>(0);

    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getSpecialty();
    }, [])

    useEffect(() => {
        getDoctor()
    }, [currentPage, itemPerPage])

    const getDoctor = () => {
        const url = `${url_api}${API_ALL_GET_DOCTOR}`;

        axios.get(url, defineConfigGet({ page: currentPage, size: itemPerPage })).then((resp: any) => {
            if (resp) {
                console.log("resp:", resp)
                setDoctorList(resp.data.content);
                setTotalItem(resp.data.totalElements);
            }
        }).catch((err: any) => {
            console.log("err:", err)
        })
    }

    const getSpecialty = () => {
        const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

        axios.get(url, defineConfigGet({})).then((resp: any) => {
            if (resp) {
                setSpecialtyList(resp.data.content);
            }
        }).catch((err: any) => {
            console.log("err:", err)
        })
    }

    const handleSearch = () => {
        const url = `${url_api}${API_SEARCH_DOCTOR}`;

        const param = { nameDoctor: name, nameSpecialty: specialty, page: currentPage, size: itemPerPage }

        axios.get(url, defineConfigGet(param)).then((resp: any) => {
            if (resp) {
                console.log("resp:", resp)
            }
        }).catch((err: any) => {
            console.log("err:", err)
        })
    }

    const getCurrentPage = (item: number) => {
        setCurrentPage(item - 1);
    };

    const getItemPerPage = (item: number) => {
        setItemPerPage(item);
        setCurrentPage(0);
    };

    const _renderListSpecialty = () => {
        return (
            <>
                <option hidden>Specialty</option>
                {specialtyList.length > 0 ? (
                    specialtyList.map((item: any) => (
                        <option value={item.code} key={item.code}>
                            {item.display}
                        </option>
                    ))
                ) : (
                    <option disabled>No option</option>
                )}
            </>
        );
    };

    const _renderListDoctor = () => {
        return (
            <div className='container'>
                {doctorList?.map((doctor: any, idx: number) => {
                    const name = doctor.practitionerTarget.nameFirstRep.nameAsSingleString;
                    const photo = doctor.practitionerTarget.photo[0].data;

                    return (
                        <div className='row gy-3 py-3 mb-3' onClick={() => navigate(doctor.id)}>
                            <div className='col-4'>
                                <img src={photo} alt={photo} />
                            </div>
                            <div className='col-8'>
                                <h3 className='mb-3'>{name}</h3>
                                <p className='ms-3'><span><ICON_GRADUATION /></span> {doctor.educations?.map((edu: any) => {
                                    return (
                                        <span>{edu.detail}</span>
                                    )
                                })}</p>
                                <p className='ms-3'><span><ICON_PEOPLE_TEAM /></span> {doctor.specialty?.map((spec: any) => {
                                    return (
                                        <span>{spec.display}</span>
                                    )
                                })}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const _renderSearchDoctor = () => {
        return (
            <div className='search-doctor mb-3 py-3 container'>
                <div className="row">
                    <div className="col-4">
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={(e: any) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                        />
                    </div>
                    <div className="col-4">
                        <select
                            className="form-select"
                            onChange={(e: any) => setSpecialty(e.target.value)}
                            value={specialty}
                        >
                            {_renderListSpecialty()}
                        </select>
                    </div>
                    <div className="col-4">
                        <button className="button-apply" onClick={() => handleSearch()}>Apply</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className='doctor'>
            <img src={DOCTOR_BG} alt="" className='image-global' />
            <section className='container p-5 '>
                {outlet ? <Outlet /> : <div className="doctor-container row gy-3">
                    <div className="col-8">
                        <h3 className='mb-3 fs-1 fw-bold'>Doctor</h3>
                        <p className='pb-3 border-bottom color-primary'>Experience high quality medical services that meet international standards at SEP490 Hospital</p>
                        <div>
                            {_renderSearchDoctor()}
                            {_renderListDoctor()}
                            <PaginationComponent
                                totalItem={totalItem}
                                itemPerPage={itemPerPage}
                                currentPage={currentPage === 0 ? 1 : currentPage + 1}
                                getItemPerPage={getItemPerPage}
                                getCurrentPage={getCurrentPage}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <Sidebar />
                    </div>
                </div>}

            </section>
        </section>
    )
}

export default Doctors