import { useEffect, useState } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Box } from "@mui/system";
import moment from "moment";

import { LIST_TIME } from "../../Contants";
import { FORMAT_DATE, TOTAL_STEP } from "../../Contants/general.constant";
import { DOCTOR } from "../../assets";

const Appointment = () => {
  const [step, setStep] = useState<number>(1);

  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);

  const [listDepartment, setListDepartment] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [listService, setListService] = useState([]);

  const [department, setDepartment] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [service, setService] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [appointmentTime, setAppointmentTime] = useState<string>(
    moment(`${date} ${time}`).format(FORMAT_DATE)
  );

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

  const handleChangeDepartment = (value: string) => {
    value ? setDepartment(value) : setDepartment("");
  };

  const handleKeyUpDepartment = (value: string) => {
    value ? setDepartment(value) : setDepartment("");
  };

  const handleChangeDoctor = (value: string) => {
    value ? setDoctor(value) : setDoctor("");
  };

  const handleKeyUpDoctor = (value: string) => {
    value ? setDoctor(value) : setDoctor("");
  };

  const handleChangeService = (value: string) => {
    value ? setService(value) : setService("");
  };

  const handleKeyUpService = (value: string) => {
    value ? setService(value) : setService("");
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
        <div className="row gx-5">
          <div className="col-6">
            <Autocomplete
              options={listDepartment}
              autoComplete
              onChange={(event: any) =>
                handleChangeDepartment(event.target.innerText)
              }
              onKeyUp={(event: any) =>
                handleKeyUpDepartment(event.target.value)
              }
              disablePortal
              renderInput={(params) => (
                <div>
                  <TextField
                    {...params}
                    placeholder="Select Department"
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

            <Autocomplete
              options={listDoctor}
              autoComplete
              onChange={(event: any) =>
                handleChangeDoctor(event.target.innerText)
              }
              onKeyUp={(event: any) => handleKeyUpDoctor(event.target.value)}
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
                    placeholder="Select Doctor"
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <VaccinesIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </div>
              )}
            />
            <Autocomplete
              options={listService}
              autoComplete
              onChange={(event: any) =>
                handleChangeService(event.target.innerText)
              }
              onKeyUp={(event: any) => handleKeyUpService(event.target.value)}
              disablePortal
              renderInput={(params) => (
                <div>
                  <TextField
                    {...params}
                    placeholder="Select Service"
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FavoriteBorderIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </div>
              )}
            />
          </div>
          <div className="col-6">
            <p className="fw-bold">Appointment time</p>
            <div>
              <p>Date</p>
              <div className="row"></div>
            </div>

            <div>
              <p>Time</p>
              <div className="row">
                {LIST_TIME.map((time: any) => {
                  return (
                    <div className="col-3" onClick={() => setTime(time.value)}>
                      <p className="text-center py-3 bg-light rounded text-dark fw-700">
                        {time.title}
                      </p>
                    </div>
                  );
                })}
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
              Your appointment has been successfully{" "}
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
