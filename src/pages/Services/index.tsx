import { useEffect, useState } from "react";
import { _renderMakeAppointment } from "../../components/Common/utils-ui";
import PaginationComponent from "../../components/Common/Pagination";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { DOCTOR } from "../../assets";
import { defineConfigGet } from "../../components/Common/utils";
import { API_ALL_GET_SERVICE } from "../../Contants/api.constant";
import axios from "axios";

interface IPropServices { }

const Services = (props: IPropServices) => {

  let navigate = useNavigate();
  const outlet = useOutlet();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [totalItem, setTotalItem] = useState<number>(0);

  const getCurrentPage = (item: number) => {
    setCurrentPage(item);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_SERVICE}`;

    axios.get(url, defineConfigGet({ page: currentPage, size: itemPerPage })).then((resp: any) => {
      if (resp) {

      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [currentPage, itemPerPage])

  return (
    <section className="service">
      {
        outlet ? <Outlet /> : <div className="container p-5">
          <h3 className="mb-3 fs-1 fw-bold">Our Service</h3>
          <p className="color-primary pb-3 border-bottom">
            Experience high quality medical services that meet international
            standards at SEP490 Hospital
          </p>
          <div className="service-container">
            <div className="row gy-3 mb-5 py-3 cursor-pointer" onClick={() => navigate("123123123")}>
              <div className="col-6">
                <img src={DOCTOR} alt="" />
              </div>
              <div className="col-6">
                <h5 className="title-service">Premium general health check package</h5>
                <p className="subtitle-service">
                  The 2021 Premium general health examination package provides a
                  comprehensive examination and screening solution for some cancer
                  diseases such as stomach, colon... with senior doctors and experts
                  at Vinmec, thereby providing direction in developing a health care
                  plan.
                </p>
              </div>
            </div>

            <div className="row gy-3 py-3" onClick={() => navigate("123123123")}>
              <div className="col-4">
                <img src={DOCTOR} alt="" />
              </div>
              <div className="col-8">
                <h5>Premium general health check package</h5>
                <p>
                  The 2021 Premium general health examination package provides a
                  comprehensive examination and screening solution for some cancer
                  diseases such as stomach, colon... with senior doctors and experts
                  at Vinmec, thereby providing direction in developing a health care
                  plan.
                </p>
              </div>
            </div>
            <PaginationComponent
              totalItem={totalItem}
              itemPerPage={itemPerPage}
              currentPage={currentPage}
              getItemPerPage={getItemPerPage}
              getCurrentPage={getCurrentPage}
            />
          </div>
        </div>
      }

      {_renderMakeAppointment()}
    </section>
  );
};

export default Services;
