import { useState } from "react";
import { defineConfigGet } from "../../../components/Common/utils";
import axios from "axios";
import { API_FORGOT_PASSWORD, API_SEND_MAIL } from "../../../Contants/api.constant";
import { warn } from "../../../components/Common/notify";

// import OTPInput, { ResendOTP } from "otp-input-react";
// import 'otp-input-react/build/style.css'; 

const customInputStyle = {
  width: '2rem', // Adjust the width as needed
  height: '2rem', // Adjust the height as needed
  margin: '0.5rem', // Adjust the margin as needed
  fontSize: '1.5rem', // Adjust the font size as needed
  borderRadius: '4px', // Adjust the border radius as needed
  border: '1px solid #ccc', // Adjust the border style and color as needed
};

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

  const handleSendMail = () => {
    if (!email) {
      warn("Vui lòng nhập email!");
      return;
    }
    sendMail()
  }

  const handleCreateNewPass = () => {
    if (!password || !cfPassword) {
      warn("Vui lòng nhập mật khẩu!");
      return;
    }
    if (password !== cfPassword) {
      warn("Mật khẩu không trùng khớp!");
      return;
    }
    forgotPassword()
  }

  const sendMail = () => {
    const url = `${url_api}${API_SEND_MAIL}`;

    const params = {
      email: email,
      newPass: password
    }

    axios
      .post(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setIsCreateNewPass(true);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const forgotPassword = () => {
    const url = `${url_api}${API_FORGOT_PASSWORD}`;

    axios
      .post(url, defineConfigGet({ email: email }))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setIsSendMail(true);
        }
      })
      .catch((err: any) => {
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
            Send code
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
            Create password
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
          <p className="text-center">Re-directing to your homepage...</p>
        </div>
      </div>
    );
  };

  const _renderVerifyCode = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Enter Verification Code</h3>
          <p>Enter code that we have sent to your Email</p>
          {/* <OTPInput inputClassName="custom-otp-input"  inputStyle={customInputStyle} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure /> */}
          <button className="button button--large button--large--primary w-100">
            Verify
          </button>
          {/* <p className="mt-5 text-center ">
            Didn’t receive the code? <ResendOTP onResendClick={() => console.log("Resend clicked")} />
          </p> */}
        </div>
      </div>
    );
  };

  return (
    <>
      {_renderForgotYourPw()}
      {/* {_renderVerifyCode()} */}
      {isSendMail && _renderCreateNewPw()}
      {isSendMail && isCreateNewPass && _renderSuccess()}
    </>
  );
};

export default ForgotPassword;
