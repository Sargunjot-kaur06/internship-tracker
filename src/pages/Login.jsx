import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function Login() {
  return (
   <>
    <NavBar />
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        <form>
          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
   </>
  );
}

export default Login;