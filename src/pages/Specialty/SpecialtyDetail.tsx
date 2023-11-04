import Sidebar from "../../components/Sidebar";
import { DOCTOR, ICON_GRADUATION, ICON_PEOPLE_TEAM } from "../../assets";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_GET_DOCTOR_FOR_SPECIALTY, API_GET_SPECIALTY } from "../../Contants/api.constant";
import { defineConfigGet } from "../../components/Common/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ISpecialty } from "../../interface/general.interface";

const SpecialtyDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  const [specialty, setSpecialty] = useState<ISpecialty>({
    serviceName: "",
    photo: "",
    serviceDescription: "",
    departments: null,
    rankServices: [],
    vouchers: [],
    id: ""
  });

  const [listDoctor, setListDoctor] = useState<any>([]);



  useEffect(() => {
    getSpecialtyDetail(params.specialtyId);
    getDoctorForSpecialty(params.specialtyId);
  }, [params.specialtyId])

  const getSpecialtyDetail = (id: any) => {
    const url = `${url_api}${API_GET_SPECIALTY}${id}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setSpecialty(resp.data)
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }

  const getDoctorForSpecialty = (id: any) => {
    const url = `${url_api}${API_GET_DOCTOR_FOR_SPECIALTY}${id}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setListDoctor(resp.data)
      }
    }).catch((err: any) => {
      console.log("err:", err)

    })
  }

  return (
    <section className="detail-service">
      <div className="container p-5">
        <div className="row gy-3">
          <div className="col-8">
            <h3 className="mb-3 fs-1 fw-bold">{specialty.serviceName}</h3>
            <div className="image-content">
              <img src={DOCTOR} alt={specialty.photo} />
            </div>
            <div className="detail-content">
              <p>{specialty.serviceDescription}</p>
            </div>

            <div className='doctor-specialty'>
              <div className="mb-5 doctor-specialty-header">
                <h3 className="text-uppercase text-white">specialist team</h3>
              </div>
              <div>
                <p className="border-bottom color-primary pb-3">Experience high quality medical services that meet international standards at SEP490 Hospital</p>

                {listDoctor?.map((doctor: any, idx: number) => {
                  const name = doctor.practitionerTarget.nameFirstRep.nameAsSingleString;
                  const specialty = doctor.specialty[0].coding[0].display;

                  return (
                    <div className='row gy-3 py-3 mb-3' onClick={() => navigate(doctor.id)}>
                      <div className='col-4'>
                        <img src={DOCTOR} alt="" />
                      </div>
                      <div className='col-8'>
                        <h3 className='mb-3'>{name}</h3>
                        <p className='ms-3'><span><ICON_GRADUATION /></span>  Level II specialist, Meritorious Doctor</p>
                        <p className='ms-3'><span><ICON_PEOPLE_TEAM /></span> {specialty}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtyDetail;
