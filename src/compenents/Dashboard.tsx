import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { logout, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setError("");
      setLoading(true);
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    try {
      setError("");
      setLoading(true);
      await resetPassword(currentUser!.email!);
      navigate("/resetpassword");
    } catch {
      setError("Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 border p-3">
          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}
          <strong>Email: {currentUser && currentUser.email}</strong>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handlePasswordReset}
            disabled={loading}
          >
            Reset Password
          </button>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleLogout}
            disabled={loading}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
