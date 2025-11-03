import React from "react";
import appLogo from "../../assets/auravest-logo.png"
import { useNavigate } from "react-router-dom";
import { LandingRouters } from "../../constants/routes";
import { UserPlus, LogIn } from "lucide-react";

const Header1 = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile Header */}
      <header className="flex lg:hidden fixed top-0 left-0 py-2 right-0 z-50 bg-rich-black backdrop-blur-lg h-24 items-center justify-between px-4 border-b border-delft-blue">
        <div className="flex items-center space-x-3">
          <img 
            src={appLogo} 
            className="h-16 cursor-pointer" 
            alt="AURAVEST Logo" 
            onClick={() => navigate(LandingRouters.DASHBOARD)} 
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="btn-secondary px-4 h-10 rounded-xl text-ecru hover:border-chamoisee transition-all duration-200 flex items-center gap-2 text-sm"
            onClick={() => navigate(LandingRouters.USER_REGISTER)}
          >
            <UserPlus className="w-4 h-4" />
            Sign up
          </button>
          <button 
            className="btn-primary px-4 h-10 rounded-xl text-space-cadet hover:shadow-lg hover:shadow-chamoisee/30 transition-all duration-200 flex items-center gap-2 text-sm"
            onClick={() => navigate(LandingRouters.USER_LOGIN)}
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex fixed py-2 top-0 left-0 right-0 z-50 bg-rich-black/80 backdrop-blur-xl h-20 items-center justify-between px-8 border-b border-delft-blue">
        <div className="flex items-center">
          <div className="relative cursor-pointer" onClick={() => navigate(LandingRouters.DASHBOARD)}>
            <div className="absolute inset-0 bg-gradient-to-r from-chamoisee via-ecru to-chamoisee blur-2xl opacity-20"></div>
            <img 
              src={appLogo} 
              className="h-16 cursor-pointer relative z-10" 
              alt="AURAVEST Logo" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="btn-secondary px-6 h-10 rounded-xl text-ecru hover:border-chamoisee hover:bg-chamoisee/10 transition-all duration-200 flex items-center gap-2"
            onClick={() => navigate(LandingRouters.USER_REGISTER)}
          >
            <UserPlus className="w-4 h-4" />
            Sign up
          </button>
          <button 
            className="btn-primary px-6 h-10 rounded-xl text-space-cadet hover:shadow-lg hover:shadow-chamoisee/30 transition-all duration-200 flex items-center gap-2"
            onClick={() => navigate(LandingRouters.USER_LOGIN)}
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </div>
      </header>
    </>
  );
};

export default Header1;