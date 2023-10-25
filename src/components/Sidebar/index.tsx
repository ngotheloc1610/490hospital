import { useEffect, useState } from "react";
import { DOCTOR, SIDEBAR } from "../../assets";
import { API_ALL_GET_SERVICE } from "../../Contants/api.constant";
import axios from "axios";
import { defineConfigGet } from "../Common/utils";
import { IService } from "../../interface/general.interface";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const url_api = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [listService, setListService] = useState<IService[]>([]);

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_SERVICE}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setListService(resp.data.content);
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }, [])

  return (
    <section className="sidebar">
      <h5 className="heading-title pt-5">You may be interested</h5>

      <div className="sidebar-contain">
        {listService.map((item: IService) => {
          return (
            <div className="row gy-3 py-3 mb-3" onClick={() => navigate(`/services/${item.id}`)}>
              <div className="col-6">
                <img src={DOCTOR} alt="" />
              </div>
              <div className="col-6">
                <p className="title">{item.serviceName}</p>
              </div>
            </div>
          )
        })}
      </div>

      <img src={SIDEBAR} alt="" className="image-sidebar" />
    </section>
  );
};

export default Sidebar;
