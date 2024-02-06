import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Page Not Found</h1>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleLogout}
            disabled={loading}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
