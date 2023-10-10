import Sidebar from "../../components/Sidebar";
import { DOCTOR } from "../../assets";
import { useEffect } from "react";
import axios from "axios";
import { API_GET_SERVICE } from "../../Contants/api.constant";
import { defineConfigGet } from "../../components/Common/utils";
import { useParams } from "react-router-dom";

interface IPropServiceDetail { }

const ServiceDetail = (props: IPropServiceDetail) => {
  const params = useParams();
  const url_api = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const url = `${url_api}${API_GET_SERVICE}`;

    axios.get(url, defineConfigGet({ id: params.serviceId })).then((resp: any) => {
      if (resp) {

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
            <h3 className="mb-3 fs-1 fw-bold">Premium general health check package</h3>
            <div className="image-content">
              <img src={DOCTOR} alt="" />
            </div>
            <div className="detail-content">
              <p>The Premium Comprehensive Health Checkup Package offers a comprehensive examination and screening for various cancer conditions such as stomach and colon cancer by experienced doctors and specialists at Vinmec, aiming to develop a healthcare plan accordingly.</p>
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
