import axios from "axios";
import { useState } from "react";
import { defineConfigPost } from "../../../components/Common/utils";
import { API_CHANGE_PASSWORD } from "../../../Contants/api.constant";
import { useAppSelector } from "../../../redux/hooks";
import { warn } from "../../../components/Common/notify";


const ChangePassword = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cfPassword, setCfPassword] = useState<string>("");

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { id } = useAppSelector((state) => state.authSlice)

    const changePassword = (id: string) => {
        const url = `${url_api}${API_CHANGE_PASSWORD}${id}`;

        const params = {
            oldPass: oldPassword.trim(),
            newPass: password.trim()
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setIsSuccess(true);
                }
            })
            .catch((err: any) => {

                console.log("err:", err);
            });
    }

    const handleChangePassword = () => {
        if (password !== cfPassword) {
            warn("Mật khẩu không trùng khớp!");
            return;
        }
        changePassword(id)
    }

    const _renderChangePassword = () => {
        return (
            <div className="forgot">
                <div className="forgot-container">
                    <h3>Change Password</h3>
                    <p>Change your new password to login</p>
                    <div className="input-group mb-4 mt-4">
                        <label htmlFor="old-password" className="m-auto">
                            <i className="bi bi-lock-fill fs-5"></i>
                        </label>
                        <input
                            type={isShowOldPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Old Password"
                            id="old-password"
                            value={oldPassword}
                            onChange={(e: any) => setOldPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setIsShowOldPassword(!isShowOldPassword)}
                            className="btn-hidden"
                        >
                            <i
                                className={`bi ${isShowOldPassword ? "bi-eye-slash" : "bi-eye-fill"
                                    } fs-5`}
                            />
                        </button>
                    </div>

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
                    <button className="button button--large button--large--primary w-100" onClick={() => handleChangePassword()}>
                        Change password
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
                        You have successfully change your
                        <span className="text-center d-block mt-2">password.</span>
                    </p>
                    <p className="text-center">Re-directing to your homepage...</p>
                </div>
            </div>
        );
    };

    return (
        <>
            {_renderChangePassword()}
            {isSuccess && _renderSuccess()}
        </>
    );
};

export default ChangePassword;
