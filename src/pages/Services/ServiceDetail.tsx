import Sidebar from "../../components/Sidebar";
import { DOCTOR } from "../../assets";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_GET_SERVICE } from "../../Contants/api.constant";
import { defineConfigGet } from "../../components/Common/utils";
import { useParams } from "react-router-dom";
import { IService } from "../../interface/general.interface";

const ServiceDetail = () => {
  const params = useParams();
  const url_api = process.env.REACT_APP_API_URL;

  const [service, setService] = useState<IService>({
    serviceName: "",
    photo: "",
    serviceDescription: "",
    departments: null,
    rankServices: [],
    vouchers: [],
    id: ""
  });

  useEffect(() => {
    const id = params.serviceId;
    const url = `${url_api}${API_GET_SERVICE}${id}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setService(resp.data)
      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [params.serviceId])

  return (
    <section className="detail-service">
      <div className="container p-5">
        <div className="row gy-3">
          <div className="col-8">
            <h3 className="mb-3 fs-1 fw-bold">{service.serviceName}</h3>
            <div className="image-content">
              <img src={DOCTOR} alt={service.photo} />
            </div>
            <div className="detail-content">
              <p>{service.serviceDescription}</p>
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

export default ServiceDetail;
