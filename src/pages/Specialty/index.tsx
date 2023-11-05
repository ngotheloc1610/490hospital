import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

import { API_ALL_GET_SPECIALTY } from "../../Contants/api.constant";
import { PAGE_SIZE_SERVICE, START_PAGE } from "../../Contants/general.constant";
import { ISpecialty } from "../../interface/general.interface";

import PaginationComponent from "../../components/Common/Pagination";
import { defineConfigGet } from "../../components/Common/utils";
import MakeAppointment from "../../components/Common/MakeAppointment";

const Specialty = () => {
  let navigate = useNavigate();
  const outlet = useOutlet();

  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(PAGE_SIZE_SERVICE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [listSpecialty, setListSpecialty] = useState<ISpecialty[]>([]);

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          setListSpecialty(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        console.log("err:", err)
      });
  }, [currentPage, itemPerPage]);

  return (
    <section className="service">
      {outlet ? (
        <Outlet />
      ) : (
        <div className="container p-5">
          <h3 className="mb-3 fs-1 fw-bold">Our Specialty</h3>
          <p className="color-primary pb-3 border-bottom">
            Experience high quality medical services that meet international standards at SEP490 Hospital
          </p>
          <div className="service-container">
            {listSpecialty.map((item: ISpecialty, idx: number) => {
              return (
                <div
                  className="row gy-3 mb-5 py-3 cursor-pointer"
                  onClick={() => navigate(item.id)}
                >
                  <div className={`${idx === 0 ? "col-6" : "col-4"}`}>
                    <img src={item.photo} alt={item.photo} />
                  </div>
                  <div className={`${idx === 0 ? "col-6" : "col-8"}`}>
                    <h5 className="title-service">{item.detail}</h5>
                    <p className="subtitle-service">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
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
      )}

      <MakeAppointment />
    </section>
  );
};

export default Specialty;
