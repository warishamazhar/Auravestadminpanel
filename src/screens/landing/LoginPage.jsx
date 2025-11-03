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
import { getWalletAddress } from "../../utils/additionalFunc";
import { setLoading } from "../../redux/slices/loadingSlice";
import { loginUserApi } from "../../api/auth.api";
import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
import { toast } from "react-toastify";
import { Wallet, Mail, Lock, Sparkles } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const initialData = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initialData);

  const getWalletAddressConnect = async (type) => {
    try {
      dispatch(setLoading(true));
      const response = await getWalletAddress(type);
      handleLogin(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Wallet Connect Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
      dispatch(setLoading(false));
    }
  };
  const handleLogin = async (walletAddress) => {
    try {
      dispatch(setLoading(true));
      const response = await loginUserApi({ walletAddress });
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data, // Save other details if required
          })
        );
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

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await loginUserApi(payload);
      console.log(response, "response");
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data, // Save other details if required
          })
        );
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
      <WalletOptionModal
        hide={() => setShowWalletModal(false)}
        connectWallet={(wallet) => getWalletAddressConnect(wallet)}
        show={showWalletModal}
      />
      <div
        className="bg-rich-black rounded-md text-ecru pt-24 min-h-screen flex items-center justify-center p-4 main-bg-image"
        style={{ "--bg-image-url": `url(/bg.webp)` }}
      >
        <div className="w-full max-w-md hero-glass rounded-2xl p-8 shadow-2xl text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img src={MainContent.appLogo} alt="App Logo" className="h-20" />
              <div className="absolute -top-2 -right-2">
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-ecru">Welcome Back</h1>
            <p className="text-beaver text-sm">
              Sign in to access your AURAVEST account
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-start text-beaver mb-2 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20 transition-all duration-300"
                value={payload.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-start text-sm text-beaver mb-2 block flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20 transition-all duration-300"
                value={payload.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>

            {/* Login Button */}
            <button
              className="w-full cursor-pointer btn-primary flex items-center justify-center gap-2 mt-4 duration-300"
              onClick={handleSubmit}
            >
              <Sparkles className="w-5 h-5" />
              Login to Account
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-delft-blue"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-space-cadet text-beaver">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Wallet Connect */}
          <div className="space-y-4">
            <p className="text-beaver text-sm">
              Connect your wallet to access your dashboard
            </p>

            <button
              onClick={() => setShowWalletModal(true)}
              className="w-full cursor-pointer btn-secondary flex items-center justify-center gap-3 py-4"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-sm pt-4 border-t border-delft-blue">
            <p className="text-beaver">
              New to AURAVEST?{" "}
              <Link
                to={LandingRouters.USER_REGISTER}
                className="font-semibold text-ecru hover:text-chamoisee transition-colors duration-200"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;