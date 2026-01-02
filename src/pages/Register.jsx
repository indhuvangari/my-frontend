
// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

// App auth context (your own)
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // ----- Form fields -----
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ----- Email OTP state -----
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpTxId, setEmailOtpTxId] = useState(null); // optional transaction id from backend

  // ----- UI state -----
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  // -------------------------
  // Email OTP: Backend stubs
  // -------------------------
  async function sendEmailOtpBackend(emailAddr) {
    // TODO: Replace with your backend call, e.g.:
    // const res = await fetch("/api/email-otp/send", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: emailAddr }),
    // });
    // const data = await res.json();
    // return { txId: data.txId };
    throw new Error("sendEmailOtpBackend not implemented. Hook this to your backend.");
  }

  async function verifyEmailOtpBackend({ emailAddr, code, txId }) {
    // TODO: Replace with your backend call, e.g.:
    // const res = await fetch("/api/email-otp/verify", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: emailAddr, code, txId }),
    // });
    // const data = await res.json();
    // return { verified: data.verified === true };
    throw new Error("verifyEmailOtpBackend not implemented. Hook this to your backend.");
  }

  // ----- Send Email OTP -----
  const onSendEmailOtp = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    try {
      setLoadingEmail(true);
      setEmailOtpVerified(false);

      const { txId } = await sendEmailOtpBackend(email);
      setEmailOtpTxId(txId || null);
      setEmailOtpSent(true);
      setMsg("Email OTP sent. Please check your inbox (and spam).");
    } catch (err) {
      console.error("Send Email OTP error:", err);
      setMsg(err?.message || "Failed to send email OTP. Try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // ----- Verify Email OTP -----
  const onVerifyEmailOtp = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!emailOtp || emailOtp.length < 4) {
      setMsg("Please enter the email OTP.");
      return;
    }

    try {
      setLoadingEmail(true);
      const { verified } = await verifyEmailOtpBackend({
        emailAddr: email,
        code: emailOtp,
        txId: emailOtpTxId,
      });

      if (!verified) throw new Error("Invalid email OTP.");

      setEmailOtpVerified(true);
      setMsg("Email verified.");
    } catch (err) {
      console.error("Verify Email OTP error:", err);
      setMsg(err?.message || "Invalid email OTP. Please try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // ----- Create account and redirect -----
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // Basic validations
    if (!username || username.trim().length < 3) {
      setMsg("Username must be at least 3 characters.");
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Password and Confirm Password do not match.");
      return;
    }
    if (!emailOtpVerified) {
      setMsg("Please verify your email with OTP before creating the account.");
      return;
    }

    try {
      setSubmitting(true);

      // Persist the account in your app/backend
      await register({
        username,
        email,
        password,
        isEmailVerified: true,
      });

      // Redirect to shopping app home
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setMsg(err?.message || "Failed to create account. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">Register</h2>

        <form className="auth-form" onSubmit={onSubmit}>
          {/* Username */}
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Reset email verification state if email changes
                setEmailOtp("");
                setEmailOtpSent(false);
                setEmailOtpVerified(false);
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Email verification (OTP) */}
          <div className="form-field">
            <label htmlFor="email-otp">Email Verification (OTP)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                id="email-otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                disabled={!emailOtpSent || emailOtpVerified}
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onSendEmailOtp}
                disabled={loadingEmail || emailOtpSent || !email || !/^\S+@\S+\.\S+$/.test(email)}
                title={
                  !email
                    ? "Enter email first"
                    : emailOtpSent
                    ? "Email OTP already sent"
                    : "Send Email OTP"
                }
              >
                {emailOtpSent ? "OTP Sent" : loadingEmail ? "Sending..." : "Send Email OTP"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onVerifyEmailOtp}
                disabled={loadingEmail || !emailOtp || emailOtpVerified}
                title={!emailOtp ? "Enter email OTP first" : "Verify Email OTP"}
              >
                {emailOtpVerified ? "Verified ✓" : loadingEmail ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>

          {/* Message banner */}
          {msg && <div className="auth-message">{msg}</div>}

          {/* Actions */}
          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={
                submitting ||
                loadingEmail ||
                !emailOtpVerified ||
                !username ||
                !email ||
                !password ||
                password !== confirmPassword
              }
              title={
                !emailOtpVerified
                  ? "Verify your email first"
                  : password !== confirmPassword
                  ? "Passwords do not match"
                  : "Create Account"
              }
            >
              {submitting ? "Creating..." : "Create Account"}
            </button>
            <Link className="btn btn-secondary" to="/login">
              Back to Login
            </Link>
          </div>
        </form>

        <div className="auth-extra">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </section>
    </main>
  );
}
