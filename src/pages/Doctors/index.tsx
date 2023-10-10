import { useEffect, useState } from 'react'
import { DOCTOR, DOCTOR_BG, ICON_GRADUATION, ICON_PEOPLE_TEAM } from '../../assets'
import Sidebar from '../../components/Sidebar'
import PaginationComponent from '../../components/Common/Pagination'
import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { defineConfigGet } from '../../components/Common/utils'
import { API_ALL_GET_DEPARTMENT, API_ALL_GET_DOCTOR, API_GET_DOCTOR, API_SEARCH_DOCTOR } from '../../Contants/api.constant'

interface IPropDoctors {

}

const Doctors = (props: IPropDoctors) => {
    let navigate = useNavigate();
    const outlet = useOutlet();

    const [name, setName] = useState("")
    const [department, setDepartment] = useState("")

    const [departmentList, setDepartmentList] = useState([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemPerPage, setItemPerPage] = useState<number>(5);
    const [totalItem, setTotalItem] = useState<number>(0);

    const [paramSearch, setParamSearch] = useState({
        nameDoctor: "",
        department: ""
    })

    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const url = `${url_api}${API_ALL_GET_DEPARTMENT}`;

        axios.get(url, defineConfigGet({})).then((resp: any) => {
            if (resp) {

            }
        }).catch(err => {
            console.log("err:", err)

        })
    }, [])

    useEffect(() => {
        const url = `${url_api}${API_ALL_GET_DOCTOR}`;

        axios.get(url, defineConfigGet({ page: currentPage, size: itemPerPage })).then((resp: any) => {
            if (resp) {

            }
        }).catch(err => {
            console.log("err:", err)

        })
    }, [currentPage, itemPerPage])

    useEffect(() => {
        const url = `${url_api}${API_SEARCH_DOCTOR}`;

        axios.get(url, defineConfigGet(paramSearch)).then((resp: any) => {
            if (resp) {

            }
        }).catch(err => {
            console.log("err:", err)

        })
    }, [paramSearch])

    const getCurrentPage = (item: number) => {
        setCurrentPage(item);
    };

    const getItemPerPage = (item: number) => {
        setItemPerPage(item);
        setCurrentPage(0);
    };

    const handleChangeName = (value: string) => {
        setName(value);
    };

    const handleChangeDepartment = (event: any, values: any) => {
        setDepartment(values);
    };


    const _renderListDepartment = () => {
        return (
            <>
                <option hidden>Department</option>
                {departmentList.length > 0 ? (
                    departmentList.map((item: any) => (
                        <option value={item.code} key={item.code}>
                            {item.name}
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
                <div className='row gy-3 py-3 mb-3' onClick={() => navigate("123123")}>
                    <div className='col-4'>
                        <img src={DOCTOR} alt="" />
                    </div>
                    <div className='col-8'>
                        <h3 className='mb-3'>Dr. Ivan Good</h3>
                        <p className='ms-3'><span><ICON_GRADUATION /></span>  Level II specialist, Meritorious Doctor</p>
                        <p className='ms-3'><span><ICON_PEOPLE_TEAM /></span> General Surgery Department</p>
                    </div>
                </div>

                <div className='row gy-3 py-3 mb-3'>
                    <div className='col-4'>
                        <img src={DOCTOR} alt="" />
                    </div>
                    <div className='col-8'>
                        <h3>Dr. Ivan Good</h3>
                        <p><span><ICON_GRADUATION /></span>  Level II specialist, Meritorious Doctor</p>
                        <p><span><ICON_PEOPLE_TEAM /></span> General Surgery Department</p>
                    </div>
                </div>

                <div className='row gy-3 py-3 mb-3'>
                    <div className='col-4'>
                        <img src={DOCTOR} alt="" />
                    </div>
                    <div className='col-8'>
                        <h3>Dr. Ivan Good</h3>
                        <p><span><ICON_GRADUATION /></span>  Level II specialist, Meritorious Doctor</p>
                        <p><span><ICON_PEOPLE_TEAM /></span> General Surgery Department</p>
                    </div>
                </div>
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
                            onChange={(e) => handleChangeName(e.target.value)}
                            value={name}
                            className="form-control"
                        />
                    </div>
                    <div className="col-4">
                        <select
                            className="form-select"
                            onChange={(e) => handleChangeDepartment(e, e.target.value)}
                            value={department}
                        >
                            {_renderListDepartment()}
                        </select>
                    </div>
                    <div className="col-4">
                        <button className="button-apply">Apply</button>
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
                                currentPage={currentPage}
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