import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password
      });

      setMessage(data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-brand">
          <span className="brand-mark">✓</span>
          <span>TaskFlow</span>
        </div>

        <div className="auth-heading">
          <span className="section-eyebrow">
            GET STARTED
          </span>

          <h1>Create your account</h1>

          <p>
            Start organizing your work with TaskFlow.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">
            <label htmlFor="register-name">
              Full name
            </label>

            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-email">
              Email address
            </label>

            <input
              id="register-email"
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
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}

            {!loading && <span>→</span>}
          </button>

          {message && (
            <div className="alert success-alert">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="alert error-alert">
              {error}
            </div>
          )}

        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <Link to="/login">
            Sign in
          </Link>
        </div>

      </div>

    </main>
  );
}

export default Register;