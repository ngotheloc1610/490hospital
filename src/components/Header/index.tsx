import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DOCTOR, LOGO } from "../../assets";

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

            <li className="menu-item menu-item--auth">
              <Link to="/register" className="header-signin">
                Sign up
              </Link>
              <Link to="/login" className="button button--primary">
                Login <i className="bi bi-arrow-right-short fs-5"></i>
              </Link>
            </li>

            {/* <div className="dropdown">
              <a className="btn btn-secondary dropdown-toggle m-auto" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: "transparent", border: "none" }}>
                <div className="d-flex mt-3">
                  <img src={DOCTOR} alt="" style={{ width: "40px", height: "40px", borderRadius: "100rem" }} />
                  <span className="m-auto ms-2 text-dark">Name <i className="bi bi-caret-down-fill"></i></span>
                </div>
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" href="/information">Information</a></li>
                <li><a className="dropdown-item" href="#">Log out</a></li>
              </ul>
            </div> */}
          </ul>
          <div className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="header-auth">
            <Link to="/register" className="header-signin">
              Sign up
            </Link>
            <Link to="/login" className="button button--primary">
              Login <i className="bi bi-arrow-right-short fs-5"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
