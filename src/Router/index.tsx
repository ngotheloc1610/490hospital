import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import Register from "../pages/Authentication/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DoctorDetail from "../pages/Doctors/DoctorDetail";
import DepartmentDetail from "../pages/Departments/DepartmentDetail";
import Specialty from "../pages/Specialty";
import SpecialtyDetail from "../pages/Specialty/SpecialtyDetail";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Appointment = lazy(() => import("../pages/Appointment"));
const Doctors = lazy(() => import("../pages/Doctors"));
const Departments = lazy(() => import("../pages/Departments"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));

const RouterDom = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/appointment" element={<Appointment />} />

          <Route path="/doctors" element={<Doctors />}>
            <Route path=":doctorId" element={<DoctorDetail />} />
          </Route>

          <Route path="/departments" element={<Departments />} >
            <Route path=":departmentId" element={<DepartmentDetail />} />
          </Route>

          <Route path="/specialty" element={<Specialty />} >
            <Route path=":specialtyId" element={<SpecialtyDetail />} />
          </Route>

          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default RouterDom;
