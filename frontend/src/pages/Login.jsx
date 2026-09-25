import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">
          <span className="brand-mark">✓</span>
          <span>TaskFlow</span>
        </div>

        <div className="auth-heading">
          <span className="section-eyebrow">
            WELCOME BACK
          </span>

          <h1>Sign in to your account</h1>

          <p>
            Manage your tasks and keep your work organized.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">
            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}

            {!loading && <span>→</span>}
          </button>

          {error && (
            <div className="alert error-alert">
              {error}
            </div>
          )}

        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <Link to="/register">
            Create an account
          </Link>
        </div>

      </div>

    </main>
  );
}

export default Login;