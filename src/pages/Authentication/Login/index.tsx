import { Link, useNavigate } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";
import { useState } from "react";
import axios from "axios";
import { defineConfigPost } from "../../../components/Common/utils";
import { API_LOGIN, API_PROFILE_PATIENT } from "../../../Contants/api.constant";
import { KEY_LOCAL_STORAGE } from "../../../Contants/general.constant";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../../redux/hooks";
import { setLogin } from "../../../redux/features/auth/authSlice";
import { error } from "../../../components/Common/notify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [gmail, setGmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const url_api = process.env.REACT_APP_API_URL;

  const requestLogin = () => {
    const url = `${url_api}${API_LOGIN}`;

    const params = {
      username: gmail.trim(),
      password: password.trim()
    }

    setIsLoading(true)
    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          const accessToken = resp.data.accessToken;

          localStorage.setItem(KEY_LOCAL_STORAGE.AUTHEN, accessToken);
          getPatientDetail()
          const decoded: any = jwtDecode<JwtPayload>(accessToken);
          localStorage.setItem(KEY_LOCAL_STORAGE.EXP, decoded.exp);
          localStorage.setItem(KEY_LOCAL_STORAGE.IAT, decoded.iat);
          localStorage.setItem(KEY_LOCAL_STORAGE.SUB, decoded.sub);
          dispatch(setLogin(true));
          navigate("/")
        }
      })
      .catch((err: any) => {
        error(err?.response?.data?.error?.message)
        setIsLoading(false)
        console.log("error Login:", err);
      });
  }

  const getPatientDetail = () => {
    const url = `${url_api}${API_PROFILE_PATIENT}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(KEY_LOCAL_STORAGE.IMAGE, resp.data?.photo)
        }
      })
      .catch((err) => {
        console.log("error get info patient:", err);
      });
  }


  const handleKeyEnter = (event: any) => {
    if (gmail !== '' && password !== '') {
      if (event.key === 'Enter') {
        requestLogin();
      }
    }
  }

  return (
    <div className="contain" onKeyDown={handleKeyEnter}>
      <div className="login-container">
        <div className="login-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Login</h3>
        </div>
        <div className="login-container-body">
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
          <button className="button button--large button--large--primary w-100" onClick={() => requestLogin()}>
            {isLoading && <span className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </span>} <span className="ms-2">Login</span>
          </button>
          <p className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
        <div className="login-container-footer mt-5">
          <p className="text-center fw-700">------------------------or-------------------------</p>
          <button className="button w-100 button--large button--large--outline fw-bold" onClick={() => navigate("/patient/verify")}>
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
