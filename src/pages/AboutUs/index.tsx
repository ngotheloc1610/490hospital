import { BG_ABOUT_US, DEPARTMENT_BG } from "../../assets"


const AboutUs = () => {
    const _renderExperienceOfBusiness = () => {
        return (
            <section className="experience py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-center">
                            <p className="bg-color-linear fs-1 fw-bold">10</p>
                            <span className="color-dark fw-bold">Years of establishment</span>
                        </div>
                        <div className="col-4 text-center">
                            <p className="bg-color-linear fs-1 fw-bold">15K</p>
                            <span className="color-dark fw-bold">Happy patients</span>
                        </div>
                        <div className="col-4 text-center">
                            <p className="bg-color-linear fs-1 fw-bold">100</p>
                            <span className="color-dark fw-bold">Experts</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <section className="about-us">
            <img src={DEPARTMENT_BG} alt="" className="w-100 image-global" />
            <div className="container mt-5">
                <h3 className="text-uppercase border-bottom pb-3">About us</h3>
                {_renderExperienceOfBusiness()}
                <div className="mb-3">
                    <div className="p-3 bg-light text-dark">
                        <p>SEP490 is a Capstone Project Hospital.</p>
                        <p>SEP490 Hospital is a Capstone Project under the FPT University (Registered Charity No. 20000490) and is administered and managed in accordance with a Hospital Constitution approved by the FPT University. The current Hospital Constitution was approved in 2013. The property is vested in Vietnam.</p>
                        <p>
                            The Hospital has a total of 50 experts and has served 15 thousand happy patients. The In-Patient specialties are General Medicine, General Surgery and Gynaecology. We also have an Urgent Care Centre incorporating a Local Injuries Unit and Medical Assessment Unit.</p>
                    </div>
                </div>
                <img src={BG_ABOUT_US} alt="object-fit-cover" />
                <div className="mt-3 mb-5">
                    <div className="p-3 bg-light text-dark">
                        <p>SEP490 is a Capstone Project Hospital.</p>
                        <p>SEP490 Hospital is a Capstone Project under the FPT University (Registered Charity No. 20000490) and is administered and managed in accordance with a Hospital Constitution approved by the FPT University. The current Hospital Constitution was approved in 2013. The property is vested in Vietnam.</p>
                        <p>
                            The Hospital has a total of 50 experts and has served 15 thousand happy patients. The In-Patient specialties are General Medicine, General Surgery and Gynaecology. We also have an Urgent Care Centre incorporating a Local Injuries Unit and Medical Assessment Unit.</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AboutUs