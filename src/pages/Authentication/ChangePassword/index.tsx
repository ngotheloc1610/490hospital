import { useState } from "react";


const ChangePassword = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState(false);

    const _renderChangePassword = () => {
        return (
            <div className="forgot">
                <div className="forgot-container">
                    <h3>Change Password</h3>
                    <p>Change your new password to login</p>
                    <div className="input-group mb-4 mt-4">
                        <label htmlFor="cfPassword" className="m-auto">
                            <i className="bi bi-lock-fill fs-5"></i>
                        </label>
                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            id="cfPassword"
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
                    <button className="button button--large button--large--primary w-100">
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
            {_renderSuccess()}
        </>
    );
};

export default ChangePassword;
