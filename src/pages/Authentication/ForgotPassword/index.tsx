import React, { useState } from "react";
import { defineConfigPost } from "../../../components/Common/utils";
import axios from "axios";
import { API_FORGOT_PASSWORD, API_SEND_MAIL, API_VERIFY_CODE } from "../../../Contants/api.constant";
import { error, success, warn } from "../../../components/Common/notify";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [cfPassword, setCfPassword] = useState<string>("")

  const [isSendMail, setIsSendMail] = useState<boolean>(false)
  const [isCreateNewPass, setIsCreateNewPass] = useState<boolean>(false)
  const [isVerifyCode, setIsVerifyCode] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleSendMail = () => {
    if (!email) {
      warn("Please enter email!");
      return;
    }
    sendMail()
  }

  const handleCreateNewPass = () => {
    if (!password || !cfPassword) {
      warn("Please enter password!");
      return;
    }
    if (password !== cfPassword) {
      warn("Passwords do not match!");
      return;
    }
    forgotPassword()
  }

  const sendMail = () => {
    const url = `${url_api}${API_SEND_MAIL}`;

    const params = {
      email: email.trim(),
      newPass: null,
      oldPass: null
    }

    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          if (resp.data === "successful") {
            setIsSendMail(true);
            success(resp.data)

          } else {
            error(resp.data)
          }

        }
      })
      .catch((err: any) => {
        setIsLoading(false)
        console.log("err:", err);
      });
  }

  const verifyCode = () => {
    const url = `${url_api}${API_VERIFY_CODE}`;

    const params = {
      email: email.trim(),
      newPass: OTP.trim(),
      oldPass: null
    }
    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          if (resp.data === "successful") {
            setIsVerifyCode(true);
            setIsSendMail(true);
            success(resp.data)
          } else {
            error(resp.data)
          }
        }
      })
      .catch((err: any) => {
        console.log("error Login:", err);
        setIsLoading(false)
        error(err.message || err.response.data.error || err.response.data.error.message)
      });
  }

  const forgotPassword = () => {
    const url = `${url_api}${API_FORGOT_PASSWORD}`;

    const params = {
      email: email.trim(),
      newPass: password.trim(),
      oldPass: null
    }

    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          if (resp.data === "change pass successful") {
            setIsCreateNewPass(true);
            setIsVerifyCode(true);
            setIsSendMail(true);
            success(resp.data)
          } else {
            error(resp.data)
          }
        }
      })
      .catch((err: any) => {
        setIsLoading(false)
        console.log("err:", err);
      });
  }

  const _renderForgotYourPw = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Forgot Your Password?</h3>
          <p>Enter your email we will send you confirmation code</p>
          <div className="w-100 title-email mb-4">
            <p>Email</p>
          </div>
          <div className="input-group mb-4">
            <label htmlFor="email" className="icon-email">
              <i className="bi bi-envelope fs-4"></i>
            </label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <span className="icon-check">
              <i className="bi bi-check-lg fs-4"></i>
            </span>
          </div>
          <button className="w-100 button button--large button--large--primary" onClick={() => handleSendMail()}>
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Send code</span>
          </button>
        </div>
      </div>
    );
  };

  const _renderCreateNewPw = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Create New Password</h3>
          <p>Create your new password to login</p>
          <div className="input-group mb-4 mt-4">
            <label htmlFor="password" className="m-auto">
              <i className="bi bi-lock-fill fs-5"></i>
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="btn-hidden"
            >
              <i
                className={`bi ${isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5`}
              />
            </button>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="cfPassword" className="m-auto">
              <i className="bi bi-lock-fill fs-5"></i>
            </label>
            <input
              type={isShowCfPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              id="cfPassword"
              value={cfPassword}
              onChange={(e: any) => setCfPassword(e.target.value)}
            />
            <button
              onClick={() => setIsShowCfPassword(!isShowCfPassword)}
              className="btn-hidden"
            >
              <i
                className={`bi ${isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5`}
              />
            </button>
          </div>
          <button className="button button--large button--large--primary w-100" onClick={() => handleCreateNewPass()}>
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Create password</span>
          </button>
        </div>
      </div>
    );
  };

  const _renderSuccess = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <p className="icon-success mb-4">
            <i className="bi bi-check-lg fs-1"></i>
          </p>
          <h3 className="text-center mb-3">Success</h3>
          <p className="text-center mb-5">
            You have successfully reset your
            <span className="text-center d-block mt-2">password.</span>
          </p>
          <p className="text-center fw-bold" onClick={() => navigate("/")}>Re-directing to your homepage...</p>
        </div>
      </div>
    );
  };

  const handleVerifyCode = () => {
    verifyCode();
  }

  const _renderVerifyCode = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Enter Verification Code</h3>
          <p>Enter code that we have sent to your Email</p>
          <OTPInput inputClassName="custom-otp-input" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
          <button className="button button--large button--large--primary w-100 mt-3" onClick={() => handleVerifyCode()}>
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Verify</span>
          </button>
          <p className="mt-3 text-center text-reset cursor-pointer" onClick={() => handleSendMail()}>
            Resend code
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isSendMail && !isCreateNewPass && !isVerifyCode && _renderForgotYourPw()}
      {isSendMail && !isVerifyCode && _renderVerifyCode()}
      {isSendMail && isVerifyCode && !isCreateNewPass && _renderCreateNewPw()}
      {isSendMail && isCreateNewPass && isVerifyCode && _renderSuccess()}
    </>
  );
};

export default ForgotPassword;
