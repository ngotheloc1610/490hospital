import { useEffect, useState } from "react";
import { _renderMakeAppointment } from "../../components/Common/utils-ui";
import PaginationComponent from "../../components/Common/Pagination";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { DOCTOR } from "../../assets";
import { defineConfigGet } from "../../components/Common/utils";
import { API_ALL_GET_SERVICE } from "../../Contants/api.constant";
import axios from "axios";
import { PAGE_SIZE_SERVICE, START_PAGE } from "../../Contants/general.constant";
import { IService } from "../../interface/general.interface";

const Services = () => {

  let navigate = useNavigate();
  const outlet = useOutlet();

  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(PAGE_SIZE_SERVICE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [listService, setListService] = useState<IService[]>([]);

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
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
        setListService(resp.data.content);
        setTotalItem(resp.data.totalElements);
      }
    }).catch((err: any) => {
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
            {listService.map((item: IService, idx: number) => {
              return (
                <div className="row gy-3 mb-5 py-3 cursor-pointer" onClick={() => navigate(item.id)}>
                  <div className={`${idx === 0 ? "col-6" : "col-4"}`}>
                    <img src={DOCTOR} alt={item.photo} />
                  </div>
                  <div className={`${idx === 0 ? "col-6" : "col-8"}`}>
                    <h5 className="title-service">{item.serviceName}</h5>
                    <p className="subtitle-service">
                      {item.serviceDescription}
                    </p>
                  </div>
                </div>
              )
            })}
            <PaginationComponent
              totalItem={totalItem}
              itemPerPage={itemPerPage}
              currentPage={currentPage === 0 ? 1 : currentPage + 1}
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
