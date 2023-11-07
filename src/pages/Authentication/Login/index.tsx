import { Link, useNavigate } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";
import { useState } from "react";
import axios from "axios";
import { defineConfigPost } from "../../../components/Common/utils";
import { API_LOGIN } from "../../../Contants/api.constant";

const Login = () => {
  const navigate = useNavigate();

  const [gmail, setGmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const url_api = process.env.REACT_APP_API_URL;

  const handleLogin = () => {
    const url = `${url_api}${API_LOGIN}`;

    const params = {
      username: gmail,
      password: password
    }

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  return (
    <div className="contain">
      <div className="login-container">
        <div className="login-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Login</h3>
        </div>
        <div className="login-container-body">
          <div>
            <label htmlFor="gmail">
              <i className="bi bi-person-fill"></i> Gmail
            </label>
            <input type="text" id="gmail" autoComplete="new-password" value={gmail} onChange={(e: any) => setGmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">
              <i className="bi bi-lock-fill"></i> Password
            </label>
            <input type="password" id="password" autoComplete="new-password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          </div>
          <button className="button button--large button--large--primary w-100" onClick={() => handleLogin()}>Login</button>
          <p className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
        <div className="login-container-footer mt-5">
          <p className="text-center fw-700">------------------------or-------------------------</p>
          <button className="button w-100 button--large button--large--outline fw-bold" onClick={() => navigate("/register")}>
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
