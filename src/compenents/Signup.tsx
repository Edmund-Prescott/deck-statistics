import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const confirmPasswordRef = useRef<HTMLInputElement>(null!);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("@" + error + "@");
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please use a different email.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else {
        setError("Failed to create an account. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border p-3" onSubmit={handleSubmit}>
            <h1 className="text-center">Sign Up</h1>
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
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                ref={confirmPasswordRef}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center mt-2">
              Already have an account? <Link to={"/login"}>Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
