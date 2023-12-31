import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import axios from "axios";

import { DEPARTMENT_BG } from "../../assets";
import { API_ALL_GET_DEPARTMENT } from "../../Contants/api.constant";
import { IDepartment } from "../../interface/general.interface";
import { defineConfigGet } from "../../components/Common/utils";
import { useAppSelector } from "../../redux/hooks";


const Departments = () => {
  let navigate = useNavigate();
  const outlet = useOutlet();
  const { isLogin } = useAppSelector((state) => state.authSlice)

  const url_api = process.env.REACT_APP_API_URL;

  const [listDepartment, setListDepartment] = useState<IDepartment[]>([]);

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_DEPARTMENT}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setListDepartment(resp.data);
      }
    }).catch(err => {
      console.log("err:", err)
    })
  }, [])

  const _renderButtonChat = () => {
    return (
      <div className='chat-icon cursor-pointer' onClick={() => navigate("/chat")}>
        <span>
          <i className="bi bi-chat-dots-fill text-white fs-3"></i>
        </span>
      </div>
    )
  }


  const _renderOurDepartment = () => {
    return (
      <section className="our-department">
        <div className="our-department-container">
          <h3 className="mb-3 fs-1 fw-bold">Our Departments</h3>
          <p className="color-primary mb-3">
            Experience Exceptional Medical Services Adhering to International Standards at SEP490 Hospital
          </p>
          <div className="mt- 5">
            <div className="row gy-3">
              {listDepartment && listDepartment.map((item: IDepartment, idx: number) => {
                return (
                  <div className="col-4" onClick={() => navigate(item.id)}>
                    <div className="d-flex">
                      <img src={item.photo} alt="img department" style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "100rem" }} />
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

      {isLogin && _renderButtonChat()}
    </section>
  );
};

export default Departments;
