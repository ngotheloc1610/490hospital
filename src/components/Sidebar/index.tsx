import { useEffect } from "react";
import { DOCTOR, SIDEBAR } from "../../assets";
import { API_ALL_GET_SERVICE } from "../../Contants/api.constant";
import axios from "axios";
import { defineConfigGet } from "../Common/utils";

interface IPropSidebar { }

const Sidebar = (props: IPropSidebar) => {
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_SERVICE}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {

      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [])

  return (
    <section className="sidebar">
      <h5 className="heading-title pt-5">You may be interested</h5>

      <div className="sidebar-contain">
        <div className="row gy-3 py-3 mb-3">
          <div className="col-6">
            <img src={DOCTOR} alt="" />
          </div>
          <div className="col-6">
            <p className="title">Advanced general health examination package</p>
          </div>
        </div>
        <div className="row gy-3 py-3 mb-3">
          <div className="col-6">
            <img src={DOCTOR} alt="" />
          </div>
          <div className="col-6">
            <p>Advanced general health examination package</p>
          </div>
        </div>
        <div className="row gy-3 py-3 mb-3">
          <div className="col-6">
            <img src={DOCTOR} alt="" />
          </div>
          <div className="col-6">
            <p>Advanced general health examination package</p>
          </div>
        </div>
      </div>

      <img src={SIDEBAR} alt="" className="image-sidebar" />
    </section>
  );
};

export default Sidebar;
