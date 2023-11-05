import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

import { LIST_TIME, TYPE_OF_APPOINTMENT } from "../../Contants";
import { FORMAT_DATE, FORMAT_DATE_TIME, TOTAL_STEP } from "../../Contants/general.constant";
import { DOCTOR, ICON_GRADUATION, ICON_PEOPLE_TEAM } from "../../assets";
import { API_CREATE_APPOINTMENT, API_GET_DOCTOR_APPOINTMENT, API_GET_PATIENT_APPOINTMENT, API_GET_SLOT, API_GET_SPECIALTY_APPOINTMENT } from "../../Contants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../components/Common/utils";
import { ISpecialty } from "../../interface/general.interface";
import { warn } from "../../components/Common/notify";

const Appointment = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [step, setStep] = useState<number>(1);

  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);
  const [triggerTime, setTriggerTime] = useState<boolean>(false);

  const [listSpecialty, setListSpecialty] = useState<ISpecialty[]>([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [listPatient, setListPatient] = useState([]);

  const [date, setDate] = useState<string>(moment().format(FORMAT_DATE));
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")

  const [startDate, setStartDate] = useState<string>(
    moment(`${date} ${startTime}`).format(FORMAT_DATE_TIME)
  );
  const [endDate, setEndDate] = useState<string>(
    moment(`${date} ${endTime}`).format(FORMAT_DATE_TIME)
  );

  const [timeBusy, setTimeBusy] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [typeOfAppointment, setTypeOfAppointment] = useState<string>("");
  const [doctor, setDoctor] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [namePatient, setNamePatient] = useState<string>("");

  useEffect(() => {
    getSpecialty();
  }, [])

  useEffect(() => {
    getDoctor(specialty);
  }, [specialty])

  useEffect(() => {
    getSlot(doctor?.id, date);
  }, [date, doctor])

  useEffect(() => {
    setStartDate(moment(`${date} ${startTime}`).format(FORMAT_DATE_TIME));
    setEndDate(moment(`${date} ${endTime}`).format(FORMAT_DATE_TIME));
  }, [startTime, endTime, date]);

  const getPatient = () => {
    const url = `${url_api}${API_GET_PATIENT_APPOINTMENT}`;

    axios.get(url, defineConfigGet({ namePatient: namePatient })).then((resp: any) => {
      if (resp) {
        setListPatient(resp.data);
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }

  const getSpecialty = () => {
    const url = `${url_api}${API_GET_SPECIALTY_APPOINTMENT}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        setListSpecialty(resp.data);
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }

  const getDoctor = (specialty: string) => {
    const url = `${url_api}${API_GET_DOCTOR_APPOINTMENT}`;

    axios.get(url, defineConfigGet({ specialtyName: specialty })).then((resp: any) => {
      if (resp) {
        setListDoctor(resp.data);
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }

  const getSlot = (doctorId: any, date: string) => {
    const url = `${url_api}${API_GET_SLOT}`;

    axios.get(url, defineConfigGet({ doctorID: doctorId, date: date })).then((resp: any) => {
      if (resp) {
        console.log("resp:", resp)
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  }

  const createAppointment = () => {
    const url = `${url_api}${API_CREATE_APPOINTMENT}`;

    const params = {
      identifier: "",
      cancellationReason: "",
      cancellationDate: "",
      serviceCategory: "",
      serviceType: "",
      specialty: "",
      appointmentType: typeOfAppointment,
      reasonCode: "",
      reasonReference: "",
      priority: "",
      description: description,
      supportingInformation: "",
      start: startDate,
      end: endDate,
      minutesDuration: "",
      created: "",
      comment: "",
      patientInstruction: "",
      basedOn: "",
    }

    axios.post(url, params, defineConfigPost()).then((resp: any) => {
      if (resp) {
        console.log("resp:", resp)
        setIsBooking(true);
      }
    }).catch((err: any) => {
      setIsBooking(false);
      console.log("err:", err)
    })
  }

  const handleNext = () => {
    if (typeOfAppointment && specialty && doctor && date && startTime && endTime) {
      setIsPassStep1(true);
      setStep(step + 1);
    } else {

      warn("Chưa điền hết thông tin!");
    }
  };

  const handleBook = () => {
    createAppointment();
  };

  const handleCancel = () => {
    setIsPassStep1(false);
    setStep(step - 1);
  };

  const handleSearchPatient = () => {
    getPatient()
  }

  const _renderTimeBook = useCallback(
    () => {
      return (
        <div className="col-9">
          <label className="mb-3 fw-bold">Select a timeslot</label>
          <span className="ms-3 fw-light fst-italic">Duration 60 mins</span>
          <div className="row g-3">
            {LIST_TIME.map((item: any, idx: number) => {
              return (
                <div className="col-4">
                  <button type="button" className={`w-100 p-3 ${startTime === item.startTime && endTime === item.endTime ? "time-selected" : ""}`}
                    onClick={() => { setStartTime(item.startTime); setEndTime(item.endTime); setTriggerTime(!triggerTime) }}>
                    {item.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    [triggerTime],
  )

  const _renderListSpecialty = () => {
    return (
      <>
        <option hidden>Select Specialty</option>
        {listSpecialty?.length > 0 ? (
          listSpecialty?.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.code}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListTypeOfAppointment = () => {
    return (
      <>
        <option hidden>Type of appointment</option>
        {
          TYPE_OF_APPOINTMENT.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.display}
            </option>
          ))
        }
      </>
    )
  }

  const _renderAppointmentHeader = () => {
    return (
      <div className="appointment-container-header">
        <p>
          <span className="appointment-step">
            STEP {step}/{TOTAL_STEP}
          </span>
          <span className="fw-bold">
            - {step === 2 ? "CONFIRMATION" : "APPOINTMENT INFORMATION"}
          </span>
        </p>
      </div>
    );
  };

  const _renderAppointmentFooter = () => {
    return (
      <div className="appointment-container-footer">
        {step === TOTAL_STEP ? (
          <div className="d-flex justify-content-center align-item-center">
            <button
              className="button button--primary me-3"
              onClick={() => handleBook()}
            >
              Book
            </button>
            <button
              className="button button--gray"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="button button--primary d-block m-auto"
            onClick={() => handleNext()}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const _renderStep1 = () => {
    return (
      <div className="container">
        <div className="patient-detail border-bottom pb-3">
          <h5 className="mb-3 fw-bold">Patient Details</h5>
          <div className="row m-auto" style={{ width: "70%" }}>
            <div className="col-8 d-flex">
              <label htmlFor="patient" className="form-label">Select Patient </label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" id="patient" placeholder="Enter patient name or patient email" value={namePatient} onChange={(e: any) => setNamePatient(e.target.value)} />
              </div>
            </div>
            <div className="col-4">
              <button className="button-apply" onClick={() => handleSearchPatient()}>Apply</button>
            </div>
          </div>

          <div>
            {listPatient.length > 0 && <table className="table table-striped">
              <thead className="table-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {listPatient?.map((item: any, idx: number) => {
                  const email = item.telecom?.find(
                    (i: any) => i?.system === "email"
                  )?.value;
                  const phone = item.telecom?.find(
                    (i: any) => i?.system === "phone"
                  )?.value;

                  return (
                    <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                      <td >
                        {item.nameFirstRep.nameAsSingleString}
                      </td>
                      <td >{item.gender}</td>
                      <td >{item.birthDate}</td>
                      <td >
                        {phone}
                      </td>
                      <td >{email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>}

          </div>
        </div>

        <div className="mt-3">
          <h5 className="mb-3 fw-bold">Booking details</h5>
          <div className="m-auto" style={{ width: "70%" }}>
            <div className="d-flex mb-4">
              <label htmlFor="typeOfAppointment">Type of appointment</label>
              <select
                className="form-select"
                id="typeOfAppointment"
                onChange={(e: any) => setTypeOfAppointment(e.target.value)}
                value={typeOfAppointment}
              >
                {_renderListTypeOfAppointment()}
              </select>
            </div>

            <div className="d-flex">
              <label htmlFor="specialty">Select specialty</label>
              <select
                id="specialty"
                className="form-select"
                onChange={(e: any) => {
                  setSpecialty(e.target.value)
                }}
                value={specialty}
              >
                {_renderListSpecialty()}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <h5 className="fw-bold mb-3">Select Doctor</h5>
            <div className="row">
              {listDoctor?.map((item: any, idx: number) => {
                const name = item.practitionerTarget.nameFirstRep.nameAsSingleString;
                const specialty = item.specialty[0].coding[0].display;
                return (

                  <div className={`col-6 row ${item.id === doctor?.id ? "doctor-selected" : ""}`} onClick={() => setDoctor(item)}>
                    <div className='col-4'>
                      <img src={DOCTOR} alt="" />
                    </div>
                    <div className='col-8'>
                      <h3 className='mb-3'>{name}</h3>
                      <p className='ms-3'><span><ICON_GRADUATION /></span>  Level II specialist, Meritorious Doctor</p>
                      <p className='ms-3'><span><ICON_PEOPLE_TEAM /></span> {specialty}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3">
            <h5 className="mb-3 fw-bold">Select date and time</h5>

            <div className="row gx-5">
              <div className="col-3">
                <label htmlFor="date" className="mb-3 fw-bold">Choose a date </label>
                <div className="input-group">
                  <input
                    id="date"
                    type="date"
                    className="form-control"
                    autoComplete="new-password"
                    value={date}
                    max="9999-12-31"
                    onChange={(e: any) => setDate(moment(e.target.value).format(FORMAT_DATE))}
                  />
                </div>
                <p className="fw-light fst-italic text-center pt-3">See next 7 days</p>
              </div>

              {_renderTimeBook()}

              <div className="col-12 mt-3">
                <label htmlFor="description" className="fw-bold mb-3">Description</label>
                <div className="form-floating">
                  <textarea className="w-100 p-3 rounded" cols={10} rows={10} placeholder="Enter description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderStep2 = () => {
    const specialtyCode = listSpecialty.find(item => item.code === specialty)?.code;
    const specialtyDisplay = listSpecialty.find(item => item.code === specialty)?.display;

    return (
      <div className="border border-3 rounded p-3">
        <div className="border-bottom">
          <p className="fw-bold text-uppercase">patient details</p>
          <div className="row">
            <div className="col-3">
              <img src={DOCTOR} alt="" />
            </div>
            <div className="col-9">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Jonathan Hudson</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>Male</td>
                  </tr>
                  <tr>
                    <td>Date of birth</td>
                    <td>01/01/1999</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>534 Erewhon St PeasantVille, Rainbow, Vic  3999</td>
                  </tr>
                  <tr>
                    <td>Citizen identification</td>
                    <td>[CCCD] 12345678910</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>0987654321</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>jonathan123@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-5 border-bottom">
          <p className="fw-bold text-uppercase">booking details</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Appointment Date</td>
                <td>{moment(startDate).format("ddd, DD MMM YYYY")}</td>
              </tr>
              <tr>
                <td>Appointment time</td>
                <td>
                  <span>{moment(startDate).format("HH:mm")}</span> - <span>{moment(endDate).format("HH:mm")}</span>
                </td>
              </tr>
              <tr>
                <td>Doctor</td>
                <td>{doctor?.practitionerTarget?.nameFirstRep?.nameAsSingleString}</td>
              </tr>
              <tr>
                <td>Type of appointment</td>
                <td>{TYPE_OF_APPOINTMENT.find(item => item.code === typeOfAppointment)?.display}</td>
              </tr>
              <tr>
                <td>Specialty</td>
                <td>
                  {"["}<span className="text-info">{specialtyCode}</span>{"]"} {specialtyDisplay && "-"}
                  {specialtyDisplay}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td><span className="text-warning">No Show</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="mb-3 fw-bold">Description</label>
          <div className="form-floating">
            <textarea className="w-100 p-3 rounded" cols={5} rows={5} placeholder="Enter description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    );
  };

  const _renderBookingSuccess = () => {
    return (
      <div className="container booking-success">
        <div className="w-50 m-auto">
          <p className="icon-success mb-3">
            <i className="bi bi-check-lg fs-1"></i>
          </p>
          <h3 className="text-center mb-3">Booking Success</h3>
          <p className="text-center mb-5 text-gray">
            <span className="d-block mb-1">
              Your appointment has been successfully
            </span>
            <span className="d-block mb-1">
              booked, please regularly check your
            </span>
            <span className="d-block mb-1">schedule to keep up with the</span>
            <span className="d-block">appointment time</span>
          </p>
          <button className="button button--large button--primary d-block m-auto">
            Return to Appointment list
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="appointment-page container p-5">
      <h3 className="mx-5 mb-5">Book an appointment</h3>
      <div className="appointment-container">
        {isBooking ? (
          _renderBookingSuccess()
        ) : (
          <>
            {_renderAppointmentHeader()}
            <div className="appointment-container-body">
              {isPassStep1 ? _renderStep2() : _renderStep1()}
            </div>
            {_renderAppointmentFooter()}
          </>
        )}
      </div>
    </section>
  );
};

export default Appointment;
