import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ICON_GRADUATION, ICON_PEOPLE_TEAM } from "../../assets";
import {
  API_GET_DOCTOR_FOR_SPECIALTY,
  API_GET_SPECIALTY,
} from "../../Contants/api.constant";
import { ISpecialty } from "../../interface/general.interface";
import { defineConfigGet } from "../../components/Common/utils";

import Sidebar from "../../components/Sidebar";

const SpecialtyDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  const [specialty, setSpecialty] = useState<ISpecialty>({
    id: "",
    department: {
      coding: "",
      display: "",
    },
    code: "",
    name: "",
    photo: "",
    description: "",
    detail: "",
    specialistTeamPhoto: "",
    specialistTeamDescription: "",
  });

  const [listDoctor, setListDoctor] = useState<any>([]);

  useEffect(() => {
    getSpecialtyDetail(params.specialtyId);
    getDoctorForSpecialty(params.specialtyId);
  }, [params.specialtyId]);

  const getSpecialtyDetail = (id: any) => {
    const url = `${url_api}${API_GET_SPECIALTY}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setSpecialty(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  };

  const getDoctorForSpecialty = (id: any) => {
    const url = `${url_api}${API_GET_DOCTOR_FOR_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ code: id }))
      .then((resp: any) => {
        if (resp) {
          setListDoctor(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  };

  return (
    <section className="detail-service">
      <div className="container p-5">
        <div className="row gy-3">
          <div className="col-8">
            <h3 className="mb-3 fs-1 fw-bold">{specialty.name}</h3>
            <div className="image-content">
              <img src={specialty.photo} alt={specialty.photo} />
            </div>
            <div className="detail-content">
              <p>{specialty.description}</p>
            </div>

            <div className="doctor-specialty">
              <div className="mb-5 doctor-specialty-header">
                <h3 className="text-uppercase text-white">specialist team</h3>
              </div>
              <div>
                <p className="border-bottom color-primary pb-3">
                  Experience high quality medical services that meet
                  international standards at SEP490 Hospital
                </p>

                {listDoctor && listDoctor.length > 0 &&
                  listDoctor.map((doctor: any, idx: number) => {
                    const name = doctor.practitioner.display;
                    const src = doctor?.practitionerTarget?.photo[0]?.url;

                    return (
                      <div
                        className="row gy-3 py-3 mb-3"
                        onClick={() => navigate(doctor.id)}
                      >
                        <div className="col-4">
                          <img src={src} alt="img doctor" />
                        </div>
                        <div className="col-8">
                          <h3 className="mb-3">{name}</h3>
                          <p className="ms-3">
                            <span>
                              <ICON_GRADUATION />
                            </span>
                            {doctor.educations &&
                              doctor.educations.map((edu: any) => {
                                return <span>{edu.detail}</span>;
                              })}
                          </p>
                          <p className="ms-3">
                            <span>
                              <ICON_PEOPLE_TEAM />
                            </span>
                            {doctor.specialty &&
                              doctor.specialty.map((spec: any) => {
                                return <span>{spec.display}, </span>;
                              })}
                          </p>
                        </div>
                      </div>
                    );
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
