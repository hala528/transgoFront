import { useState } from "react";
import { LOGIN } from "../../api/api";
import { Axios } from "../../api/axios";
import LoadingSubmit from "../../components/laoding/loading";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const cookie = new Cookies();

  // handle change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
      setSuccess("");

    try {
      const res = await Axios.post(`/${LOGIN}`, form);

      const token = res.data.data.token;
      const user = res.data.data.user;
     const role = res.data.data.role;
      
      cookie.set("transtop", token, { path: "/" });
   cookie.set("role", role, { path: "/" });
    
      cookie.set("user", user, { path: "/" });

      setLoading(false);
      setSuccess(res.data.message || "تم تسجيل الدخول");



if (user.must_change_password) {
  navigate("/first", { replace: true } ,  { email: user.email });
} else {
  navigate("/dashboard/driver", { replace: true } );
}
    
   
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 422) {
        setErr("email or password failed");
      } else {
        setErr("internet server error");
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
              <h2>Welcome Back</h2>
              <p className="subtitle">Login to continue your journey</p>

              <div className="form-custom">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email :"
                  required
                />
              </div>

              <div className="form-custom">
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

              <Link to="/forgetPassword" className="forgot" > Forgot Password? </Link>

              <button className="btn-login">Login →</button>
{success && <span className="success">{success}</span>}
              {err !== "" && <span className="error">{err}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}