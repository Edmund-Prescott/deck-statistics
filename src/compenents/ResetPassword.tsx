export default function ResetPassword() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Password Reset Email Sent!</h4>
            <p>
              An email with instructions to reset your password has been sent to
              your email address. Please check your inbox and follow the
              provided link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
