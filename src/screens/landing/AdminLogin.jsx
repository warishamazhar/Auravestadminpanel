import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { MainContent } from "../../constants/mainContent";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { adminLogin } from "../../api/admin.api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialData = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initialData);

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await adminLogin(payload);
      console.log(response, "response");
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data, 
          })
        );
        localStorage.setItem("adminId", response?.data?._id);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have logged in successfully",
          timer: 3000,
        }).then(() => {
          navigate(AuthenticatedUserRouters.DASHBOARD);
        });
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setPayload({
      ...payload,
      [field]: value,
    });
  };
  return (
    <>
      <div
        className="bg-slate-900 rounded-md text-white min-h-screen flex items-center justify-around p-4 main-bg-image"
        style={{ "--bg-image-url": `url(/bg.webp)` }}
      >
        <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl text-center space-y-5">
          <div className="flex justify-center mb-6">
            <img src={MainContent.appLogo} alt="App Logo" className="h-12 cursor-pointer" onClick={() => navigate(LandingRouters.DASHBOARD)} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <div className="space-y-5">
            <div>
              <label className="text-sm text-start text-slate-400 mb-2 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={payload.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div>
              <label className=" text-start text-sm text-slate-400 mb-2 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={payload.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 md:col-span-2 mt-2"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
        <div className="hidden w-1/3 md:flex justify-end">
            <img src={MainContent.appLogo} alt="" />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
