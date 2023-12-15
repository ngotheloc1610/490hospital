import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { defineConfigPost } from "../../components/Common/utils";
import { error, success, warn } from "../../components/Common/notify";
import { API_PROFILE_PATIENT, API_UPDATE_PATIENT, API_MEDIA_UPLOAD } from "../../Contants/api.constant";
import { GENDER } from "../../Contants";
import { USER } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTrigger } from "../../redux/features/profile/profileSlice";
import { KEY_LOCAL_STORAGE } from "../../Contants/general.constant";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Required"),
    dateOfBirth: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    identifier: Yup.string().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    email: Yup.string().email().required("Required"),
});

const defaultValue = {
    name: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    identifier: "",
    phoneNumber: "",
    email: "",
};

const EditPatient = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const inputRef = useRef<any>(null);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [patientInfo, setPatientInfo] = useState<any>(defaultValue);
    const [isPickImage, setIsPickImage] = useState<boolean>(false);
    const { trigger } = useAppSelector(state => state.profileSlice);
    const dispatch = useAppDispatch()

    useEffect(() => {
        getPatientInfo()
    }, [])

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    const uploadImage = async () => {
        const url = `${url_api}${API_MEDIA_UPLOAD}`;

        if (!selectedFile) {
            warn('Please select an image file before uploading.');
            return;
        }

        const formData: FormData = new FormData();
        formData.append('file', selectedFile);

        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}`,
                    "Content-Type": "multipart/form-data",
                },
            }

            const { data } = await axios.post(url, formData, config)
            if(data){
                
            }
        } catch (err: any) {
            console.log(err);
            error(err.response.data.error)
        }
    }

    const getPatientInfo = () => {
        const url = `${url_api}${API_PROFILE_PATIENT}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    const data = resp.data;
                    const patientDetail = {
                        name: data?.name,
                        dateOfBirth: data?.dateOfBirth,
                        gender: data?.gender,
                        phoneNumber: data?.phoneNumber,
                        email: data?.email,
                        address: data?.address,
                        identifier: data?.identifier,
                        photo: data?.photo
                    }
                    setPatientInfo(patientDetail);
                }
            })
            .catch((err: any) => {
                console.log("error get profile patient:", err);
            });
    }

    const updatePatient = (values: any, actions: any) => {
        const url = `${url_api}${API_UPDATE_PATIENT}`;

        const param = {
            username: "",
            email: values.email,
            password: null,
            name: values.name,
            identifier: values.identifier,
            phoneNumber: values.phoneNumber,
            dateOfBirth: values.dateOfBirth,
            address: values.address,
            gender: values.gender,
        }

        axios
            .put(url, param, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    actions.setSubmitting(false);
                    actions.resetForm();
                    dispatch(setTrigger(!trigger))
                    success("Update Successfully!!!");
                    navigate("/information");
                }
            })
            .catch((err: any) => {
                error(err.response.data.error || err.response.data.error.message)
                console.log("error update profile patient:", err);
            });
    }

    const handleChangeImage = (event: any) => {
        const file = event.target.files[0];

        // Check if the selected file is an image
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setIsPickImage(true);
        } else {
            warn('Please select a valid image file.');
        }
    };

    const handlePickImage = () => {
        inputRef.current.click();
    };

    const _renderBasicInfo = (props: any) => {
        const { errors, touched } = props;

        return (
            <div>
                <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
                <div className="row">
                    <div className="col-12 mb-3">
                        <label htmlFor="name">
                            Name <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="name"
                            id="name"
                            className={`form-control ${errors?.name && touched?.name ? "is-invalid" : ""}`}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="dateOfBirth">
                            Date of birth <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="dateOfBirth"
                            id="dateOfBirth"
                            className="form-control"
                            render={({ field }: any) => (
                                <input
                                    {...field}
                                    type="date"
                                    className={`form-control input-select ${errors?.dateOfBirth && touched?.dateOfBirth ? "is-invalid" : ""
                                        }`}
                                    max="9999-12-31"
                                />
                            )}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="gender">
                            Gender <span className="text-danger">*</span>
                        </label>
                        <Field
                            as="select"
                            name="gender"
                            id="gender"
                            className={`form-select ${errors?.gender && touched?.gender ? "is-invalid" : ""
                                }`}
                        >
                            {GENDER.map((item: any) => (
                                <option value={item.value} key={item.value}>
                                    {item.title}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="address">
                            Address <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="address"
                            type="text"
                            id="address"
                            className={`form-control ${errors?.address && touched?.address ? "is-invalid" : ""
                                }`}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="identifier">
                            Citizen identification <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="identifier"
                            type="text"
                            id="identifier"
                            className={`form-control ${errors?.identifier && touched?.identifier ? "is-invalid" : ""
                                }`}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="phoneNumber">
                            Phone number <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="phoneNumber"
                            id="phoneNumber"
                            className={`form-control ${errors?.phoneNumber && touched?.phoneNumber ? "is-invalid" : ""
                                }`}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="email">
                            Email address <span className="text-danger">*</span>
                        </label>
                        <Field
                            name="email"
                            type="email"
                            id="email"
                            className={`form-control ${errors?.email && touched?.email ? "is-invalid" : ""
                                }`}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const _renderImage = () => {
        return (
            <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
                <div className="h-100">
                {!isPickImage ?  <img
            src={patientInfo?.photo ? patientInfo?.photo : USER}
            alt="img patient"
            className={`${patientInfo?.photo ? "" : "bg-image"} w-100 h-100 object-fit-cover`}
          /> :  <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : USER}
          alt="img patient"
          className={`${selectedFile ? "" : "bg-image"} w-100 h-100 object-fit-cover`}
        />}
                    <input
                        type="file"
                        className="d-none"
                        ref={inputRef}
                        onChange={handleChangeImage}
                    />
                </div>
                {/* <button className="button button--small button--primary w-90 mx-auto mt-3">
          {patientInfo?.photo ? "Edit" : "Add"} profile picture
        </button> */}
            </div>
        );
    };

    return (
        <Formik
            initialValues={patientInfo}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                updatePatient(values, actions);
            }}
        >
            {({ errors, touched, submitForm }) => (
                <div className="mb-5">
                    <Form>
                        <div className="overview-container">
                            <div className="div">
                                <div className="row">
                                    <div className="col-4">{_renderImage()}</div>
                                    <div className="col-8">
                                        <h3 className="fw-bold text-uppercase text-dark">
                                            edit information
                                        </h3>
                                        {_renderBasicInfo({ errors, touched })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <div className="mt-3 d-flex justify-content-end">
                        <button
                            className="button button--danger me-3"
                            onClick={() => navigate("/information")}
                        >
                            Cancel
                        </button>

                        <button
                            className="button button--primary"
                            onClick={submitForm}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default EditPatient;
