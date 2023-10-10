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
                  Nam posuere accumsan porta. Integer id tincidunt sit amet sed
                  libero.
                </p>

                <p className="copyright">© Skyrev Theme 2021</p>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">Quick access</h3>
                <ul className="footer-links">
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Donec dignissim
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Curabitur egestas
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Nam posuere
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Aenean facilisis
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">Services</h3>
                <ul className="footer-links">
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Cras convallis
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Vestibulum faucibus
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Quisque lacinia purus
                    </Link>
                  </li>
                  <li className="footer-item">
                    <Link to="" className="footer-link">
                      Aliquam nec ex
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3 className="footer-heading heading-small">Earn Money</h3>
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
            <div className="footer-social">
              <Link to="#" className="footer-social-item">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="#" className="footer-social-item">
                <i className="bi bi-linkedin"></i>
              </Link>
              <Link to="#" className="footer-social-item">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link to="#" className="footer-social-item">
                <i className="bi bi-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
