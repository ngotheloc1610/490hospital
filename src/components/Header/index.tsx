import { Link, NavLink, useNavigate } from "react-router-dom";
import { ICON_USER, LOGO } from "../../assets";
import { KEY_LOCAL_STORAGE } from "../../Contants/general.constant";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setId, setLogin } from "../../redux/features/auth/authSlice";
import { API_PROFILE_PATIENT } from "../../Contants/api.constant";
import axios from "axios";
import { defineConfigPost } from "../Common/utils";
import { useEffect, useState } from "react";

const NAV_LINK = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Specialty",
    url: "/specialty",
  },
  {
    title: "Departments",
    url: "/departments",
  },
  {
    title: "Doctors",
    url: "/doctors",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
  {
    title: "Make an appointment",
    url: "/appointment",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const account = localStorage.getItem(KEY_LOCAL_STORAGE.SUB || "");
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authSlice)

  const url_api = process.env.REACT_APP_API_URL;

  const [imageURL, setImageURL] = useState<any>("");

  useEffect(() => {
    getPatientDetail()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(KEY_LOCAL_STORAGE.AUTHEN)
    localStorage.removeItem(KEY_LOCAL_STORAGE.IAT)
    localStorage.removeItem(KEY_LOCAL_STORAGE.EXP)
    localStorage.removeItem(KEY_LOCAL_STORAGE.SUB)

    dispatch(setLogin(false));
    dispatch(setId(""));

    navigate("/login")
  }

  const getPatientDetail = () => {
    const url = `${url_api}${API_PROFILE_PATIENT}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setImageURL(resp.data?.photo)
        }
      })
      .catch((err) => {
        console.log("error get info patient:", err);
      });
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <Link to="/">
            <img src={LOGO} alt="" className="header-logo" />
          </Link>
          <ul className="menu">
            {NAV_LINK.map((item: any) => {
              return (
                <li className="menu-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "menu-link active" : "menu-link"
                    }
                    to={item.url}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {isLogin ? <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle m-auto" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: "transparent", border: "none" }}>
              <div className="d-flex mt-3">
                <img src={imageURL ? imageURL : ICON_USER} alt="img" style={{ width: "40px", height: "40px", borderRadius: "100rem" }} />
                <span className="m-auto ms-2 text-dark">{account} <i className="bi bi-caret-down-fill"></i></span>
              </div>
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li className="p-1 cursor-pointer">
                <span onClick={() => navigate("/information")}>Information</span>
              </li>
              <li className="p-1 cursor-pointer"><span onClick={() => handleLogout()}>Log out</span></li>
            </ul>
          </div> : <div className="header-auth">
            <Link to="/patient/verify" className="header-signin">
              Sign up
            </Link>
            <Link to="/login" className="button button--primary">
              Login <i className="bi bi-arrow-right-short fs-5"></i>
            </Link>
          </div>}

        </div>
      </div>
    </header>
  );
};

export default Header;
