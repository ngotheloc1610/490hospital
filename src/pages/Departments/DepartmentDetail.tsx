import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  API_GET_DEPARTMENT,
  API_GET_SPECIALTY_BY_DEPARTMENT,
} from "../../Contants/api.constant";
import { IDepartment } from "../../interface/general.interface";
import { defineConfigGet } from "../../components/Common/utils";

const DepartmentDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  const [department, setDepartment] = useState<IDepartment>();
  const [listSpecialty, setListSpecialty] = useState([]);

  const getDepartment = (id: string | undefined) => {
    const url = `${url_api}${API_GET_DEPARTMENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setDepartment(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const getListSpecialtyByDepartment = (id: string | undefined) => {
    const url = `${url_api}${API_GET_SPECIALTY_BY_DEPARTMENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setListSpecialty(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    getDepartment(params.departmentId);
    getListSpecialtyByDepartment(params.departmentId);
  }, [params.departmentId]);

  const _renderOurDepartment = () => {
    return (
      <section className="department-detail container p-5">
        <h3 className="mb-3 fs-1 fw-bold  pb-3 border-bottom">
          {department?.title}
        </h3>
        <p>{department?.titleDetail}</p>
        <div className="mt-5">
          <div className="general bg-linear color-white mb-5">
            <h3 className="color-white mb-3">GENERAL INTRODUCTION</h3>
            <p className="lh-base">{department?.describe}</p>
          </div>

          <div className="specialty-service bg-gray-light mb-5">
            <h3 className="mb-3">SPECIALTY SERVICES</h3>
            {listSpecialty &&
              listSpecialty.map((item: any) => {
                return <p>{item.detail}</p>;
              })}
          </div>

          <div className="specialist-tem bg-linear color-white mb-5">
            <h3 className="color-white mb-3">SPECIALIST TEAM</h3>
            <div className="row gy-3">
              {listSpecialty &&
                listSpecialty.map((item: any) => {
                  return (
                    <>
                      <div className="col-6">
                        <img src={item.specialistTeamPhoto} alt="img specialty team" />
                      </div>
                      <div className="col-6">
                        <p className="lh-base">
                          {item.specialistTeamDescription}
                        </p>
                        <button className="button button--large button--white text-uppercase fw-bold px-5 py-3 mt-3" onClick={() => navigate("/doctors")}>
                          Go to doctor list
                        </button>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <section className="department">{_renderOurDepartment()}</section>;
};

export default DepartmentDetail;
