import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
    <NavBar />
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <form>
          <input
            type="text"
            placeholder="Enter Name"
          />

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
   </>
  );
}

export default Register;