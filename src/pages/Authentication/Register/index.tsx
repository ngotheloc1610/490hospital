import { useState } from "react";
import { LOGO_HOSPITAL } from "../../../assets";
import { GENDER_ALL } from "../../../Contants";
import { defineConfigPost } from "../../../components/Common/utils";
import axios from "axios";
import { API_CREATE_PATIENT } from "../../../Contants/api.constant";
import { error, success, warn } from "../../../components/Common/notify";
import { useNavigate } from "react-router-dom";

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

  const url_api = process.env.REACT_APP_API_URL;

  const registerPatient = () => {
    const url = `${url_api}${API_CREATE_PATIENT}`;

    const params = {
      username: gmail.trim(),
      password: password.trim(),
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: birthday,
      gender: gender
    }

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          if (resp.status === 200) {
            success("Register successfully!");
            navigate("/login")
          }
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
        error(err.response.data.error.message);
      });
  }

  const handleRegister = () => {
    if (gmail && password && cfPassword && birthday && name && phoneNumber && gender) {
      if (password === cfPassword) {
        registerPatient()
      } else {
        warn("Mật khẩu không trùng khớp!");
      }
    } else {
      warn("Bạn chưa điền hết thông tin!");
    }

  }


  return (
    <div className="register">
      <div className="register-container">
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
                    className="form-control"
                    id="gmail"
                    placeholder="Gmail"
                    autoComplete="new-password"
                    value={gmail}
                    onChange={(e: any) => setGmail(e.target.value)}
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
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="register-container-footer">
          <button className="button button--large button--large--primary w-100" onClick={() => handleRegister()}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
