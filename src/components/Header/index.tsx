import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LOGO } from "../../assets";

const NAV_LINK = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Services",
    url: "/services",
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
