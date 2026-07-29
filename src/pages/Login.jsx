import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import api from "../api/api";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await api.post("/auth/login", formData);

            login(
                response.data.user,
                response.data.token
            );

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
  <div className="login-container">

    <div className="login-wrapper">

      {/* Left Panel */}

      <div className="left-panel">

        <h1>
    📊 Telecom Call
    <br />
    Analytics
</h1>

<div className="portal-badge">
    Dashboard Portal
</div>
<div className="status-badge">
    ● System Online
</div>

        <p>
Monitor telecom performance, analyse call detail records,
track key metrics, and generate real-time insights through
a secure analytics platform.
</p>

        <div className="features">

          <div className="feature-item">
          <span className="feature-icon">📞</span>
          <span>Real-time Call Analytics</span>
         </div>
       <div className="feature-item">
          <span className="feature-icon">📊</span>
          <span>Interactive Dashboards</span>
       </div>
  <div className="feature-item">
          <span className="feature-icon">🔒</span>
          <span>Secure JWT Authentication</span>
  </div>
  <div className="feature-item">
          <span className="feature-icon">👥</span>
          <span>Role-Based Access Control</span>
  </div>
  <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <span>Live API Integration</span>
  </div>

         

        </div>

      </div>

      {/* Right Panel */}

      <div className="right-panel">

        <h2>Welcome Back 👋</h2>

        <p className="subtitle">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit}>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit">
            {loading ? "Signing In..." : "Sign In →"}
          </button>

        </form>

        <div className="login-footer">
          © 2026 Telecom Call Analytics Dashboard
          <br />
          <small>Built with React • Express • MongoDB • JWT</small>
        </div>
        <div className="version">
    Version 1.0
</div>

      </div>

    </div>

  </div>
);
};

export default Login;