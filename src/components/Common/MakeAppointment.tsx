import { useNavigate } from "react-router-dom";

function MakeAppointment() {
  const navigate = useNavigate();

  return (
    <section className="appointment">
      <div>
        <h3 className="mb-3 fs-2 fw-bold color-white">
          Ready to get started ?
        </h3>
        <p className="color-white fs-4">
          Pellentesque ac bibendum tortor. Nulla eget lobortis lacus.
        </p>
      </div>
      <button onClick={() => navigate("appointment")}>
        Make an Appointment Now!
      </button>
    </section>
  );
}
export default MakeAppointment;
