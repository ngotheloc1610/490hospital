import { DEPARTMENT_BG } from "../../assets"

const ContactUs = () => {
    return (
        <section className="contact-us bg-light">
            <img src={DEPARTMENT_BG} alt="" className="w-100 image-global" />
            <div className="container mt-5 pb-5">
                <div className="d-flex justify-content-between box">
                    <div className="w-40 bg--primary rounded mt-0 text-white">
                        <div className="p-5 h-100">
                            <h3 className="fw-bold text-white mb-5">Contact Information</h3>
                            <div style={{ marginTop: "200px" }}>
                                <p className="mb-5"><i className="bi bi-telephone-inbound-fill"></i><span className="ms-2">+1012 3456 789</span></p>
                                <p className="mb-5"><i className="bi bi-envelope-paper-fill"></i><span className="ms-2">hospital490@gmail.com</span></p>
                                <p className="mb-5"><i className="bi bi-geo-alt-fill"></i><span className="ms-2">132 ABC Street, Vietnam</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="w-40 mt-0">
                        <div style={{ paddingTop: "80px", paddingBottom: "80px", width: "80%" }}>
                            <h3 className="fw-bold mb-3 text-center">Contact Us</h3>
                            <p className="text-center">We’d love to hear from you. Please fill out this form.</p>
                            <div>
                                <label htmlFor="name" className="form-label d-block">
                                    Name
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="name"
                                    />
                                </div>
                                <label htmlFor="email" className="form-label d-block">
                                    Email Address
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="email"
                                    />
                                </div>
                                <label htmlFor="phone" className="form-label d-block">
                                    Phone Number
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder="phone"
                                    />
                                </div>
                                <label htmlFor="message" className="form-label d-block">
                                    Message
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="message"
                                        placeholder="message"
                                    />
                                </div>
                                <button className="button button-small button--primary w-100">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs