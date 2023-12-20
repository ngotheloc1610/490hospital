import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  API_ALL_GET_DEPARTMENT,
  API_ALL_GET_DOCTOR,
  API_ALL_GET_SPECIALTY,
} from "../../Contants/api.constant";
import { START_PAGE } from "../../Contants/general.constant";
import { IDepartment, ISpecialty } from "../../interface/general.interface";
import { BANNER, WHOWEARE } from "../../assets";

import {
  chunkArraySplice,
  defineConfigGet,
} from "../../components/Common/utils";
import MakeAppointment from "../../components/Common/MakeAppointment";
import { useAppSelector } from "../../redux/hooks";

const Dashboard = () => {
  const [listDepartment, setListDepartment] = useState<IDepartment[]>([]);
  const [listSpecialty, setListSpecialty] = useState<ISpecialty[]>([]);
  const [listDoctor, setListDoctor] = useState<any>([]);

  const [isChuckDoctor, setIsChuckDoctor] = useState<boolean>(false);
  const [isChuckSpecialty, setIsChuckSpecialty] = useState<boolean>(false);

  const url_api = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { isLogin } = useAppSelector((state) => state.authSlice);

  //Get all doctor
  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_DOCTOR}`;

    axios
      .get(url, defineConfigGet({ page: START_PAGE, size: 1000 }))
      .then((resp: any) => {
        if (resp) {
          const data = resp.data.content;
          if (data.length > 9) {
            const dataChuck = chunkArraySplice(data, 9);
            if (dataChuck.length > 3) {
              const newData = dataChuck.slice(0, 3);
              setListDoctor(newData);
            } else {
              setListDoctor(dataChuck);
            }
            setIsChuckDoctor(true);
            return;
          }
          setListDoctor(data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }, []);

  //Get all specialty
  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ page: START_PAGE, size: 9 }))
      .then((resp: any) => {
        if (resp) {
          const data = resp.data.content;
          if (data.length > 3) {
            const dataChuck = chunkArraySplice(data, 3);
            setListSpecialty(dataChuck);
            setIsChuckSpecialty(true);
            return;
          }
          setListSpecialty(data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }, []);

  //Get all department
  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_DEPARTMENT}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setListDepartment(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }, []);

  const _renderBanner = () => {
    return (
      <section className="banner">
        <div
          id="carouselBannerControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row gx-5">
                <div className="col-6 m-auto">
                  <h3 className="mb-5 fs-large">Meet Our Experts</h3>
                  <p className="mb-3 color-gray">
                    <span className="d-block mb-1">
                      Problems trying to resolve the conflict between{" "}
                    </span>
                    <span className="d-block mb-1">
                      the two major realms of Classical physics:
                    </span>
                    <span className="d-block mb-1">Newtonian mechanics</span>
                  </p>
                  <button className="color-primary mt-3 bg-transparent fw-bold">
                    Lear More <i className="bi bi-arrow-right-short fs-4"></i>
                  </button>
                </div>
                <div className="col-6">
                  <img src={BANNER} alt="" />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row gx-5">
                <div className="col-6 m-auto">
                  <h3 className="mb-5 fs-large">
                    A Great Place to{" "}
                    <span className="d-block">Receive Care</span>
                  </h3>
                  <p className="mb-5 color-gray">
                    <span className="d-block mb-1">
                      SEP490 Hospital- Dental department is most
                    </span>
                    <span className="d-block mb-1">
                      focused is helping you discover your most
                    </span>
                    <span className="d-block mb-1">beautiful smile</span>
                  </p>
                  <button className="button button--primary button--large me-1">
                    Get Quote Now
                  </button>
                  <button className="button button--outline button--large">
                    Learn More
                  </button>
                </div>
                <div className="col-6">
                  <img src={BANNER} alt="" />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row gx-5">
                <div className="col-6 m-auto">
                  <h3 className="mb-5 fs-large">
                    Protecting you{" "}
                    <span className="d-block">and your family</span>
                  </h3>
                  <p className="mb-5 color-gray">
                    <span className="mb-1 d-block">
                      Your health and wellbeing
                    </span>{" "}
                    <span className="mb-1 d-block">is important for</span>
                  </p>
                  <button className="button button--primary button--large">
                    Lear More
                  </button>
                </div>
                <div className="col-6">
                  <img src={BANNER} alt="" />
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselBannerControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselBannerControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    );
  };

  const _renderExperienceOfBusiness = () => {
    return (
      <section className="experience py-5">
        <div className="container">
          <div className="row">
            <div className="col-4 text-center">
              <p className="bg-color-linear fs-1 fw-bold">10</p>
              <span className="color-dark fw-bold">Years of establishment</span>
            </div>
            <div className="col-4 text-center">
              <p className="bg-color-linear fs-1 fw-bold">15K</p>
              <span className="color-dark fw-bold">Happy patients</span>
            </div>
            <div className="col-4 text-center">
              <p className="bg-color-linear fs-1 fw-bold">100</p>
              <span className="color-dark fw-bold">Experts</span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const _renderOurTopSpecialty = () => {
    return (
      <section className="our-top-service">
        <div className="mx-auto heading-title">
          <h3 className="mb-3 fs-1 fw-bold">Our Top Specialty</h3>
          <p className="color-dark">
            Experience high quality medical services that meet international
            standards at SEP490 Hospital
          </p>
        </div>

        <div
          id="carouselServicesIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselServicesIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselServicesIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselServicesIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            {isChuckSpecialty ? (
              listSpecialty &&
              listSpecialty.map((specialty: any, idxSpecialty: number) => {
                return (
                  <div
                    className={`carousel-item ${idxSpecialty === 0 ? "active" : ""
                      }`}
                  >
                    <div className="row">
                      {specialty?.map((item: ISpecialty, idx: number) => {
                        return (
                          <div
                            className="col-4"
                            onClick={() => navigate(`/specialty/${item.id}`)}
                          >
                            <div className="box-item">
                              <img
                                className="d-block w-100"
                                src={item.photo}
                                alt="img specialty"
                              />
                              <p>{item.name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`carousel-item active`}>
                <div className="row">
                  {listSpecialty &&
                    listSpecialty.map(
                      (specialty: any) => {
                        return (
                          <div
                            className="col-4"
                            onClick={() =>
                              navigate(`/specialty/${specialty.id}`)
                            }
                          >
                            <div className="box-item">
                              <img
                                className="d-block w-100"
                                src={specialty.photo}
                                alt="img specialty"
                              />
                              <p>{specialty.name}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselServicesIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselServicesIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    );
  };

  const _renderOurDepartment = () => {
    return (
      <section className="our-department">
        <div className="our-department-container">
          <h3 className="mb-3 fs-1 fw-bold">Our Departments</h3>
          <p className="color-primary mb-3 pb-3 border-bottom">
            Experience high quality medical services that meet international
            standards at SEP490 Hospital
          </p>
          <div className="mt-5">
            <div className="row g-3">
              {listDepartment &&
                listDepartment.map((item: IDepartment, idx: number) => {
                  return (
                    <div className="col-4">
                      <Link to={`departments/${item.id}`} className="d-flex">
                        <img src={item.photo} alt="img department" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100rem" }} />
                        <span className="my-auto ms-3 color-gray-light">
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const _renderOurDoctor = () => {
    return (
      <section className="our-doctor">
        <h3 mb-3 fs-1 fw-bold>
          Our Doctors
        </h3>

        <div
          id="carouselDoctorIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselDoctorIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselDoctorIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselDoctorIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            {isChuckDoctor ? (
              listDoctor &&
              listDoctor.map((doctors: any, idxDoctor: number) => {
                return (
                  <div
                    className={`carousel-item ${idxDoctor === 0 ? "active" : " "
                      }`}
                  >
                    <div className="row g-5">
                      {doctors?.map((item: any, idx: number) => {
                        const src = item.practitionerTarget?.photo[0]?.url;

                        return (
                          <div
                            className="col-4 d-flex"
                            onClick={() => navigate(`/doctors/${item.id}`)}
                          >
                            <img src={src} alt="img doctor" />
                            <div className="ms-3">
                              <p className="color-dark fw-bold">
                                {item.practitioner.display}
                              </p>
                              <span className="text-small">
                                {item.specialty &&
                                  item.specialty.map((spec: any) => {
                                    return (
                                      <span>{spec.coding[0].display} {item.specialty.length > 1 && <span>, </span>}</span>
                                    );
                                  })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`carousel-item active`}>
                <div className="row g-5">
                  {listDoctor &&
                    listDoctor.map((doctor: any) => {
                      const src = doctor.practitionerTarget?.photo[0].url;
                      return (
                        <div
                          className="col-4 d-flex"
                          onClick={() => navigate(`/doctors/${doctor.id}`)}
                        >
                          <img src={src} alt="img doctor" />
                          <div className="ms-3">
                            <p className="color-dark fw-bold">
                              {doctor.practitioner.display}
                            </p>
                            <span className="text-small">
                              {doctor.specialty &&
                                doctor.specialty.map((spec: any) => {
                                  return (
                                    <span>{spec.coding[0].display} {doctor.specialty.length > 1 && <span>, </span>}</span>
                                  );
                                })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselDoctorIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselDoctorIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    );
  };

  const _renderAboutUs = () => {
    return (
      <section className="about-us">
        <div className="row gx-5">
          <div className="col-6">
            <img src={WHOWEARE} alt="" className="h-100 w-100" />
          </div>
          <div className="col-6">
            <p className="heading-title">About us</p>
            <h3 className="mb-3 fs-1 fw-bold">Who We Are</h3>
            <p>
              Lorem Media is a full-service social media agency. We offer
              businesses innovative solutions that deliver the right type of
              audience to you in the most effective strategies possible. We
              strive to develop a community around your business, polishing your
              branding, and improving your public relations.
            </p>
            <p>
              Social Media is now one of the most powerful marketing tools with
              the ability to communicate with a target audience in real time.
            </p>
            <p className="mt-3">It's 2019: time to sink o r swim.</p>
            <p className="mt-3">We are your Social Media Marketing Agency.</p>

            <button
              className="button button--primary button--large mt-3"
              onClick={() => navigate("/about")}
            >
              See More
            </button>
          </div>
        </div>
      </section>
    );
  };

  const _renderButtonChat = () => {
    return (
      <div
        className="chat-icon cursor-pointer"
        onClick={() => navigate("/chat")}
      >
        <span>
          <i className="bi bi-chat-dots-fill text-white fs-3"></i>
        </span>
      </div>
    );
  };

  return (
    <section className="dashboard">
      {_renderBanner()}
      {_renderExperienceOfBusiness()}
      {_renderOurTopSpecialty()}
      {_renderOurDepartment()}
      {_renderOurDoctor()}
      <MakeAppointment />
      {_renderAboutUs()}
      {isLogin && _renderButtonChat()}
    </section>
  );
};

export default Dashboard;
