import React, { useEffect } from "react";
import { DOCTOR } from "../../assets";
import { useParams } from "react-router-dom";
import { API_GET_DEPARTMENT } from "../../Contants/api.constant";
import axios from "axios";
import { defineConfigGet } from "../../components/Common/utils";

const DepartmentDetail = () => {

  const params = useParams();
  const url_api = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const url = `${url_api}${API_GET_DEPARTMENT}`;

    axios.get(url, defineConfigGet({ id: params.departmentId })).then((resp: any) => {
      if (resp) {

      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [params.departmentId])

  const _renderOurDepartment = () => {
    return (
      <section className="department-detail container p-5">
        <h3 className="mb-3 fs-1 fw-bold  pb-3 border-bottom">OBSTETRICS AND GYNECOLOGY</h3>
        <p>
          The Obstetrics Department is considered one of the most spearhead at
          SEP490 Hospital. With sincere care, compassion, and responsibility,
          the medical team at SEP490 is always ready to accompany and serve as a
          solid foundation, so that parents can rest assured to receive precious
          moments in the most perfect way.
        </p>
        <div className="mt-5">
          <div className="general bg-linear color-white mb-5">
            <h3 className="color-white mb-3">GENERAL INTRODUCTION</h3>
            <p className="lh-base">
              Accompanying SEP490 General Hospital since the early days of its
              establishment, the Obstetrics Department has continuously improved
              its team of experienced doctors, developed modern equipment and
              comprehensive innovation to provide obstetric services. High
              quality for customers.
            </p>
            <p className="lh-base">
              During 10 years of operation, SEP490 Obstetrics Department has
              always been a close and trusted companion of many pregnant
              mothers, helping to make the pregnancy journey and the moment of
              labor easier. With unremitting efforts, SEP490 Obstetrics
              Department is proud to have welcomed more than thousands of babies
              into the world, successfully implementing the skin-to-skin method
              - slow clamping of the umbilical cord and many other modern
              methods.
            </p>
          </div>

          <div className="specialty-service bg-gray-light mb-5">
            <h3 className="mb-3">SPECIALTY SERVICES</h3>
            <p>
              1. Examination and treatment of gynecological diseases such as
              vaginal infections, irregular menstruation, menorrhagia...
            </p>
            <p>
              2. Examination and medical/surgical treatment of gynecological
              diseases such as ovarian cysts, uterine fibroids, endometriosis...
            </p>
            <p>
              3. Early screening for gynecological cancers such as breast
              cancer, uterine cancer, cervical cancer, ovarian cancer, vaginal
              cancer, vulva cancer...
            </p>
            <p>
              4. Provide comprehensive pregnancy care services for pregnant
              mothers and fetuses - Full maternity and childbirth services -
              Free prenatal classes - Prenatal screening service, helping to
              early detect the risk of fetal defects. - Care for high-risk
              pregnant women
            </p>
            <p>
              5. Comprehensive newborn care - Skin to skin: - Delayed clamping
              of the umbilical cord after birth - Postpartum screening – heel
              blood test - Tympanometric audiometry - Measure jaundice for
              newborns - Baby bath service at home - Vaccinate your baby
            </p>
            <p>
              6. Providing contraceptive services: IUD insertion, implantation.
            </p>
          </div>

          <div className="specialist-tem bg-linear color-white mb-5">
            <h3 className="color-white mb-3">SPECIALIST TEAM</h3>
            <div className="row gy-3">
              <div className="col-6">
                <img src={DOCTOR} alt="" />
              </div>
              <div className="col-6">
                <p className="lh-base">
                  One of the most important things that has built the brand of
                  SEP490 Hospital's Obstetrics Department for more than 10 years
                  is the team of leading reputable experts and doctors in the
                  obstetrics industry in Vietnam. Obstetricians are good medical
                  experts, highly qualified and experienced with decades of
                  training at home and abroad. Currently, all doctors at SEP490
                  Obstetrics Department have held important positions in large
                  hospitals such as Central Obstetrics, Hanoi Obstetrics, Viet
                  Duc, Viet Phap, Pediatrics... ensuring to bring Patients have
                  the most peace of mind every time they are examined and
                  treated.
                </p>
                <button className="button button--large button--white text-uppercase fw-bold px-5 py-3 mt-3">
                  Go to doctor list
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <section className="department">{_renderOurDepartment()}</section>;
};

export default DepartmentDetail;
