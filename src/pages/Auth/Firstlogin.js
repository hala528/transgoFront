
import { useState } from "react";
import { Axios } from "../../api/axios";
import { beasURL ,FIRSTLOGIN } from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FirstLogin() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setErr("");
  setSuccess("");

  if (form.new_password !== form.new_password_confirmation) {
    setErr(t("auth.passwordMismatch"));
    setLoading(false);
    return;
  }

  try {
    const data = new FormData();
    data.append("email", form.email);
    data.append("current_password", form.current_password);
    data.append("new_password", form.new_password);
    data.append("new_password_confirmation", form.new_password_confirmation);

    const res = await Axios.post(`${beasURL}/${FIRSTLOGIN}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setLoading(false);

    if (res.data.success) {
      setSuccess(res.data.message || t("auth.passwordChangedSuccess"));
      console.log("Success Response:", res.data);
      setTimeout(() => navigate("/login"), 1500);
    }
  } catch (error) {
    setLoading(false);
    console.log("Full Error Object:", error);
    if (error.response) {
      console.log("Error Response Data:", error.response.data);
      setErr(
        error.response.data.message ||
        (error.response.data.errors
          ? Object.values(error.response.data.errors).flat().join(", ")
          : t("addDriver.serverError"))
      );
    } else {
      setErr(t("auth.networkError"));
    }
  }
}

  return (
    <>
      {loading && <LoadingSubmit />}

      <div className="login-page">
        <div className="login-card">
          {/* LEFT SIDE */}
          <div className="logo-box"></div>

          {/* RIGHT SIDE */}
          <div className="login-right">
            <form className="form" onSubmit={handleSubmit}>
              <h2>{t("auth.updatePassword")}</h2>

              <div className="form-custom">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("auth.emailPlaceholder")}
                  required
                />
              </div>

              <div className="form-custom">
                <input
                  name="current_password"
                  type="password"
                  value={form.current_password}
                  onChange={handleChange}
                  placeholder={t("auth.oldPassword")}
                  required
                />
              </div>

              <div className="form-custom">
                <input
                  name="new_password"
                  type="password"
                  value={form.new_password}
                  onChange={handleChange}
                  placeholder={t("auth.newPassword")}
                  required
                />
              </div>

              <div className="form-custom">
                <input
                  name="new_password_confirmation"
                  type="password"
                  value={form.new_password_confirmation}
                  onChange={handleChange}
                  placeholder={t("auth.confirmNewPassword")}
                  required
                />
              </div>

              <button className="btn-login">{t("auth.updatePasswordBtn")} →</button>

              {err && <span className="error">{err}</span>}
              {success && <span className="success">{success}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}