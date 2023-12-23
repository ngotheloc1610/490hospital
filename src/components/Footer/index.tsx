import { Link } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../assets";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="container">
            <div className="row">
              <div className="col">
                <Link to="/" className="footer-logo">
                  <img src={LOGO_HOSPITAL} alt="" />
                </Link>
                <p className="footer-desc text">
                  132 ABC Street, Vietnam.
                </p>

                <p className="copyright">490Hospital 2023</p>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">Quick access</h3>
                <ul className="footer-links">
                  <li className="footer-item">
                    <Link to="/specialty" className="footer-link">
                      Specialty
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/departments" className="footer-link">
                      Department
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/doctors" className="footer-link">
                      Doctor
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/about" className="footer-link">
                      About Us
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/contact" className="footer-link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/appointment" className="footer-link">
                      Appointment
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">Specialty</h3>
                <ul className="footer-links">
                  <li className="footer-item">
                    <Link to="/specialty/6549f663b0a45441aec61dd8" className="footer-link">
                      General medicine
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/specialty/6549f744b0a45441aec61ddc" className="footer-link">
                      General pathology
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/specialty/6549f880b0a45441aec61de4" className="footer-link">
                      Cardiology
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="/specialty/654fb57916b2b552c4d50dfc" className="footer-link">
                      Surgery-Breast surgery
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">WORK SCHEDULE</h3>
                <ul className="footer-links">
                  <li className="footer-item d-flex justify-content-between">
                    <span>Monday:</span> <span>9:00 - 18:00</span>
                  </li>
                  <li className="footer-item d-flex justify-content-between">
                    <span>Tuesday:</span> <span>9:00 - 18:00</span>
                  </li>
                  <li className="footer-item d-flex justify-content-between">
                    <span>Wednesday:</span> <span>9:00 - 18:00</span>
                  </li>
                  <li className="footer-item d-flex justify-content-between">
                    <span>Thursday:</span> <span>9:00 - 18:00</span>
                  </li>
                  <li className="footer-item d-flex justify-content-between">
                    <span>Friday:</span> <span>9:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
