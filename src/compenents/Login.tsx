import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many unsuccessful login attempts. Please try again later."
        );
      } else {
        setError("Failed to sign in. Please try again later.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border p-3" onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            {error && (
              <div className="alert alert-danger mt-2" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="input-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="input-email"
                aria-describedby="emailHelp"
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="input-password"
                ref={passwordRef}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center mt-2">
              <Link to={"/resetpassword"}>Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              Need an account? <Link to={"/signup"}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
