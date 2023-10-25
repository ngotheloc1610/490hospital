import { useEffect } from "react";
import { DEPARTMENT_BG } from "../../assets";
import { LIST_DEPARTMENT } from "../../Contants";
import { Link, Outlet, useNavigate, useOutlet } from "react-router-dom";
import axios from "axios";
import { defineConfigGet } from "../../components/Common/utils";
import { API_ALL_GET_DEPARTMENT } from "../../Contants/api.constant";


const Departments = () => {
  let navigate = useNavigate();
  const outlet = useOutlet();

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


  const _renderOurDepartment = () => {
    return (
      <section className="our-department">
        <div className="our-department-container">
          <h3 className="mb-3 fs-1 fw-bold">Our Departments</h3>
          <p className="color-primary mb-3">
            Experience high quality medical services that meet international standards at SEP490 Hospital
          </p>
          <div className="mt- 5">
            <div className="row gy-3">
              {LIST_DEPARTMENT.map((item: any) => {
                return (
                  <div className="col-4" onClick={() => navigate("123123D")}>
                    <div className="d-flex">
                      <p className="department-icon">{item.icon}</p>
                      <span className="my-auto ms-3 color-gray-light">
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="department">
      <img src={DEPARTMENT_BG} alt="" className="w-100 image-global" />
      {outlet ? <Outlet /> : _renderOurDepartment()}
    </section>
  );
};

export default Departments;
