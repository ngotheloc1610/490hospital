import { useEffect, useState } from "react";
import { LOGO_HOSPITAL } from "../../../assets";
import { GENDER_ALL } from "../../../Contants";
import { defineConfigGet, defineConfigPost } from "../../../components/Common/utils";
import axios from "axios";
import { API_CREATE_PATIENT } from "../../../Contants/api.constant";
import { error, warn } from "../../../components/Common/notify";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const [gmail, setGmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cfPassword, setCfPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const url_api = process.env.REACT_APP_API_URL;

  const paramStr = window.location.search;
  const queryParam = queryString.parse(paramStr);

  useEffect(() => {
    verifyCode();
  }, [queryParam.code])

  const verifyCode = () => {
    const url = `${url_api}${API_CREATE_PATIENT}`;

    axios
      .get(url, defineConfigGet({ code: queryParam.code }))
      .then((resp: any) => {
        if (resp) {
          resp.include("verify_success") ? setIsVerify(true) : setIsVerify(false);
        }
      })
      .catch((err: any) => {
        console.log("error verify code:", err);
        error(err.response?.data?.error || err.response?.data?.error?.message || err.response?.data?.error?.code);
      });
  }

  const registerPatient = () => {
    const url = `${url_api}${API_CREATE_PATIENT}`;

    const params = {
      username: gmail.trim(),
      password: password.trim(),
      confirmPassword: cfPassword.trim(),
      name: name,
      gender: gender,
      phoneNumber: phoneNumber,
      dateOfBirth: birthday,
    };

    setIsLoading(true);

    axios
      .post(url, params, defineConfigGet({ code: "" }))
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          if (resp.status === 200) {
            warn("Please go to your email to verify!");
          }
        }
      })
      .catch((err: any) => {
        console.log("error create patient:", err);
        setIsLoading(false)
        error(err.response?.data?.error || err.response?.data?.error?.message || err.response?.data?.error?.code);
      });
  };

  const handleRegister = () => {
    if (
      gmail &&
      password &&
      cfPassword &&
      birthday &&
      name &&
      phoneNumber &&
      gender &&
      isValidEmail
    ) {
      if (password === cfPassword) {
        registerPatient();
      } else {
        warn("Mật khẩu không trùng khớp!");
      }
    } else {
      warn("Bạn chưa điền hết thông tin!");
    }
  };

  const handleKeyEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleRegister()
    }
  }

  const handleChangeGmail = (event: any) => {
    setGmail(event.target.value);

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(event.target.value));
  }

  return (
    <div className="register" onKeyDown={handleKeyEnter}>
      {isVerify ? <div className="forgot">
        <div className="forgot-container">
          <p className="icon-success mb-4">
            <i className="bi bi-check-lg fs-1"></i>
          </p>
          <h3 className="text-center mb-3">Success</h3>
          <p className="text-center mb-5">
            You have successfully register account
          </p>
          <p className="text-center cursor-pointer text-reset" onClick={() => navigate("/login")}>Re-directing to login...</p>
        </div>
      </div> : <div className="register-container">
        <div className="register-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Register</h3>
        </div>

        <div className="register-container-body">
          <div className="container">
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="gmail">
                    <i className="bi bi-person-fill fs-5"></i>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${!isValidEmail ? "is-invalid" : ""}`}
                    id="gmail"
                    placeholder="Gmail"
                    autoComplete="new-password"
                    value={gmail}
                    onChange={handleChangeGmail}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    autoComplete="new-password"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="password">
                    <i className="bi bi-lock-fill fs-5"></i>
                  </label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <button onClick={() => setIsShowPassword(!isShowPassword)}>
                    <i
                      className={`bi ${isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                        } fs-5`}
                    />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date of birth"
                    autoComplete="new-password"
                    value={birthday}
                    onChange={(e: any) => setBirthday(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="cfPassword">
                    <i className="bi bi-lock-fill fs-5"></i>
                  </label>
                  <input
                    type={isShowCfPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    id="cfPassword"
                    autoComplete="new-password"
                    value={cfPassword}
                    onChange={(e: any) => setCfPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setIsShowCfPassword(!isShowCfPassword)}
                  >
                    <i
                      className={`bi ${isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                        } fs-5`}
                    />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    autoComplete="new-password"
                    value={phoneNumber}
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-6"></div>
              <div className="col-6 radio-group">
                {GENDER_ALL.map((item: any) => {
                  return (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id={item.value}
                        value={item.value}
                        onChange={(e: any) => setGender(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor={item.value}>
                        {item.title}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="register-container-footer">
          <button
            className="button button--large button--large--primary w-100"
            onClick={() => handleRegister()}
          >
            {isLoading && <span className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </span>} <span className="ms-2">Register</span>
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Register;
