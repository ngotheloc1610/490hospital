import { useEffect, useState } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { Box } from "@mui/system";
import moment from "moment";

import { LIST_TIME } from "../../Contants";
import { FORMAT_DATE, TOTAL_STEP } from "../../Contants/general.constant";
import { DOCTOR, ICON_GRADUATION, ICON_PEOPLE_TEAM } from "../../assets";

const Appointment = () => {
  const [step, setStep] = useState<number>(1);

  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);

  const [listTypeOfAppointment, setListTypeOfAppointment] = useState([]);
  const [listSpecialty, setListSpecialty] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  
  const [appointmentTime, setAppointmentTime] = useState<string>(
    moment(`${date} ${time}`).format(FORMAT_DATE)
    );
  const [specialty, setSpecialty] = useState<string>("");
  const [typeOfAppointment, setTypeOfAppointment] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
    
  useEffect(() => {
    setAppointmentTime(moment(`${date} ${time}`).format(FORMAT_DATE));
  }, [time, date]);

  const handleNext = () => {
    setIsPassStep1(true);
    setStep(step + 1);
  };

  const handleBook = () => {
    setIsBooking(true);
  };

  const handleCancel = () => {
    setIsPassStep1(false);
    setStep(step - 1);
  };

  const handleChangeTypeOfAppointment = (value: string) => {
    value ? setTypeOfAppointment(value) : setTypeOfAppointment("");
  };

  const handleKeyUpTypeOfAppointment = (value: string) => {
    value ? setTypeOfAppointment(value) : setTypeOfAppointment("");
  };

  const handleChangeSpecialty = (value: string) => {
    value ? setSpecialty(value) : setSpecialty("");
  };

  const handleKeyUpSpecialty = (value: string) => {
    value ? setSpecialty(value) : setSpecialty("");
  };

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
          <div className="m-auto">
            <button
              className="button button--primary me-3"
              onClick={() => handleBook()}
            >
              Book
            </button>
            <button
              className="button button--primary"
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
        <div>
          <h3>Patient Details</h3>
          <label htmlFor="" className="form-label">Select Patient </label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="" />
          </div>
          <button className="button-apply">Apply</button>
        </div>

        <div>
          <h3>Booking details</h3>
          <div>
            <label htmlFor="">Type of appointment</label>
            <Autocomplete
              options={listTypeOfAppointment}
              autoComplete
              onChange={(event: any) =>
                handleChangeTypeOfAppointment(event.target.innerText)
              }
              onKeyUp={(event: any) =>
                handleKeyUpTypeOfAppointment(event.target.value)
              }
              disablePortal
              renderInput={(params) => (
                <div>
                  <TextField
                    {...params}
                    placeholder="Type of appointment"
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </div>
              )}
            />
          </div>

          <div>
            <label htmlFor="">Select specialty</label>
            <Autocomplete
              options={listSpecialty}
              autoComplete
              onChange={(event: any) =>
                handleChangeSpecialty(event.target.innerText)
              }
              onKeyUp={(event: any) => handleKeyUpSpecialty(event.target.value)}
              disablePortal
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  className="d-flex"
                  {...props}
                >
                  <img src={DOCTOR} alt="" />
                  <div>
                    <h4>Doctor</h4>
                    <p>sub doctor</p>
                  </div>
                </Box>
              )}
              renderInput={(params) => (
                <div>
                  <TextField
                    {...params}
                    placeholder="Select specialty"
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div>
          <h3>Select Doctor</h3>
          <div className="row">
            {listDoctor.map((doctor:any, idx:number)=>{
              const name = doctor.practitionerTarget.nameFirstRep.nameAsSingleString;
              const specialty = doctor.specialty[0].coding[0].display;
              return (
                  <div className='col-6 row gy-3 py-3 mb-3'>
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

        <div>
          <h3>Select date and time</h3>
          <div className="row">
            <div className="col-4">
              <label htmlFor="">Choose a date </label>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  autoComplete="new-password"
                />
              </div>
              <span>See next 7 days</span>
            </div>
            <div className="col-8">
              <label htmlFor="">Select a timeslot</label>
              <span>Duration 60 mins</span>
              <div className="row">
              {LIST_TIME.map((item: any, idx: number) => {
                return (
                    <div className="col-4">
                      <p>{item.title}</p>
                    </div>
                );
              })}
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="description">Description</label>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="description"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderStep2 = () => {
    return (
      <div className="container" style={{ width: "50%" }}>
        <div className="mb-5">
          <p className="fw-bold">Customer</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td width="50%">Full name</td>
                <td>Jonathan Hudson</td>
              </tr>
              <tr>
                <td>Date of birth</td>
                <td>01/01/1999</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>jonathan123@gmail.com</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>Male</td>
              </tr>
              <tr>
                <td>Phone number</td>
                <td>0987654321</td>
              </tr>
              <tr>
                <td>Problem:</td>
                <td>Regular check-up</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="fw-bold">Hospital</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td width="50%">Doctor</td>
                <td>Dr. Arturo Sellers</td>
              </tr>
              <tr>
                <td>Appointment time</td>
                <td>13:00. 22/09/2023</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>jonathan123@gmail.com</td>
              </tr>
              <tr>
                <td>Department</td>
                <td>General Surgery</td>
              </tr>
            </tbody>
          </table>
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
