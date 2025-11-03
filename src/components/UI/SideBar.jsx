import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaUsers } from "react-icons/fa";
// import { MainContent } from "../../constants/mainContent";
import { IoMdTv } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticatedUserRouters } from "../../constants/routes";
import {
  MdChevronLeft,
  MdKeyboardArrowRight,
  MdManageAccounts,
  MdOutlineLogout,
  MdSupportAgent,
} from "react-icons/md";
import {
  toggleSideMenu,
  closeSideMenu,
} from "../../redux/slices/sideMenuSlice";
import { AiOutlineProduct } from "react-icons/ai";
import { SiContentstack } from "react-icons/si";
import { BsCashCoin } from "react-icons/bs";
import { GiCash } from "react-icons/gi";
import { ImTree } from "react-icons/im";
import useLogout from "../../hooks/useLogout";
import { GrServices } from "react-icons/gr";
import { RiHome7Fill } from "react-icons/ri";

const SideBar = () => {
  const dispatch = useDispatch();
  const sideToggle = useSelector((state) => state.sideMenuSlice.open);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isSmallScreen = () => window.innerWidth <= 1024;

  const [openMenus, setOpenMenus] = useState({
    contentManagement: false,
    userManagement: false,
    serviceManagement: false,
    accountManagement: false,
    orderManagement: false,
    withdrawalManagement: false,
    incomeManagement: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (isSmallScreen()) {
        dispatch(closeSideMenu());
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => {
      const updated = {
        contentManagement: false,
        userManagement: false,
        serviceManagement: false,
        accountManagement: false,
        orderManagement: false,
        withdrawalManagement: false,
        incomeManagement: false,
      };
      updated[key] = !prev[key];
      return updated;
    });
  };

  const closeAllMenus = () => {
    setOpenMenus({
      contentManagement: false,
      userManagement: false,
      serviceManagement: false,
      accountManagement: false,
      orderManagement: false,
      withdrawalManagement: false,
      incomeManagement: false,
    });
  };

  const { logout, loading } = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  const NavItem = ({ icon, label, router, onClick }) => {
    const isActive = pathname === router;

    return (
      <div
        className={`flex items-center ${
          sideToggle ? "" : "justify-center"
        } gap-3 text-sm py-2 px-6 rounded-r-xl cursor-pointer
      ${
        isActive
          ? "user-active-link text-white font-semibold"
          : "primary-text hover:text-white user-active-link"
      }`}
        onClick={() => {
          if (onClick) onClick();
          navigate(router);
          if (isSmallScreen()) {
            dispatch(closeSideMenu());
          }
        }}
      >
        <span className="p-1 rounded bg-[var(--color-light-gray)] text-white">
          {icon}
        </span>
        {sideToggle && <span className="text-xs">{label}</span>}
      </div>
    );
  };

  const DropdownMenu = ({
    icon,
    label,
    isOpen,
    onToggle,
    items,
    mainRoute,
  }) => {
    const { pathname } = useLocation(); // current route

    // check if any child is active
    const isChildActive = items.some((item) => pathname === item.route);

    const handleItemClick = (route) => {
      navigate(route);
      if (isSmallScreen()) {
        dispatch(closeSideMenu());
        closeAllMenus();
      }
    };

    return (
      <div className="relative group">
        {/* Parent Item */}
        <div
          className={`flex ${
            sideToggle ? "justify-between" : "justify-center"
          } items-center py-2 px-6 cursor-pointer text-sm rounded-r-xl
          ${
            isChildActive
              ? "user-active-link text-white font-semibold" // highlight parent if child active
              : "hover:text-white"
          }`}
          onClick={() => {
            if (!sideToggle && !isSmallScreen()) {
              // Sidebar is collapsed AND we're on desktop → open sidebar & dropdown
              dispatch(toggleSideMenu());
              onToggle();
            } else if (sideToggle) {
              // Sidebar is open → just toggle dropdown
              onToggle();
            } else {
              // Mobile view → just navigate (mobile UX should not open dropdown)
              handleItemClick(mainRoute);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <span className="p-1 rounded bg-[var(--color-light-gray)]">
              {icon}
            </span>
            {sideToggle && <span className="text-xs">{label}</span>}
          </div>
          {sideToggle && (
            <MdChevronLeft
              className={`transition-all duration-300 ${
                isOpen ? "rotate-270" : ""
              }`}
            />
          )}
        </div>

        {/* Child Items */}
        <div
          className={`ml-6 mt-1 text-xs space-y-1 transition-all duration-300 ${
            isOpen && sideToggle ? "block" : "hidden"
          }`}
        >
          {items.map((item, idx) => {
            const isActive = pathname === item.route;
            return (
              <div
                key={idx}
                onClick={() => handleItemClick(item.route)}
                className={`flex items-center gap-2 py-1.5 cursor-pointer transition 
                ${
                  isActive
                    ? "font-semibold text-[#018DF3]"
                    : "text-gray-400 hover:text-[var(--primary-color)]"
                }`}
              >
                <span
                  className={`transition-transform duration-300 group-hover:translate-x-1 ${
                    isActive ? "text-[#018DF3]" : ""
                  }`}
                >
                  <MdKeyboardArrowRight />
                </span>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed lg:top-50 lg:left-1 top-0 left-0 lg:h-[100vh] h-screen transition-all duration-300 ease-in-out bg-user-sidebar text-white flex flex-col lg:z-0 z-50 justify-between font-nunito hide-scrollbar rounded-md 
    ${sideToggle ? "w-[250px] translate-x-0" : "w-[70px] -translate-x-full"}
    lg:translate-x-0 lg:sticky shadow-lg border-1`}
    >
      {/* Close Button */}
      <div
        className="absolute top-2 right-5 lg:hidden cursor-pointer"
        onClick={() => {
          dispatch(toggleSideMenu(), closeAllMenus());
        }}
      >
        <FaAngleDoubleLeft />
      </div>

      {/* Logo Section - fixed at the top */}
      <div className="flex gap-3 items-center lg:my-2 mb-2 mt-4 justify-center relative after:h-[1px] after:w-full after:bg-black after:absolute after:bottom-0 after:left-0">
        <img
          src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
          alt="Logo"
          className={`rounded ${
            sideToggle ? "w-14 mb-2" : "scale-[0.8]"
          } cursor-pointer border-1 border-[--primary-color]`}
          onClick={() => navigate(AuthenticatedUserRouters.DASHBOARD)}
        />
        <div className={`flex flex-col ${!sideToggle && "hidden"} text-sm`}>
          <p className="font-bold text-[--primary-color]">Hi, ADMIN</p>
          <p className="font-light font-xs">MYCKRA Affiliates</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto hide-scrollbar pb-3">
        <NavItem
          icon={<RiHome7Fill size={20} />}
          label="Dashboard"
          router={AuthenticatedUserRouters.DASHBOARD}
        />
        <DropdownMenu
          icon={<FaUsers size={20} />}
          label="Affiliate Management"
          isOpen={openMenus.userManagement}
          onToggle={() => toggleMenu("userManagement")}
          items={[
            {
              label: "All Affiliates",
              route: AuthenticatedUserRouters.DASHBOARD,
            },
            {
              label: "Active Affiliates",
              route: AuthenticatedUserRouters.DASHBOARD,
            },
            {
              label: "Inactive Affiliates",
              route: AuthenticatedUserRouters.DASHBOARD,
            },
            {
              label: "Affiliate Requests",
              route: AuthenticatedUserRouters.DASHBOARD,
            },
            { label: "Downline", route: AuthenticatedUserRouters.DASHBOARD },
          ]}
          mainRoute={AuthenticatedUserRouters.DASHBOARDT}
        />
        <NavItem
          icon={<MdOutlineLogout size={20} />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default SideBar;
