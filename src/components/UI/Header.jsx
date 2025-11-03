import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showDark, showLight } from "../../redux/slices/toggleThemeSlice";
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import { FaBell, FaGoogleWallet } from "react-icons/fa";
import { LandingRouters } from "../../constants/routes";
import { connectWallet } from "../../utils/connectWallet";
import { MainContent } from "../../constants/mainContent";

const Header = ({ toggle }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef();
  const theme = useSelector((state) => state.toggleThemeSlice.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      title: "Home",
      href: "#home",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Packages",
      href: "#packages",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
    {
      title: "Contact",
      href: "#footer",
    },
  ];
  // const navItems = [
  //   {
  //     title: "Blockchain",
  //     href: "/blockchain/node",
  //     submenu: [
  //       ["Node", "/blockchain/node"],
  //       ["Blocks", LandingRouters.BLOCKS],
  //       ["Transactions", LandingRouters.TRANSACTIONS],
  //       ["Transfers", LandingRouters.TRANSFERS],
  //       ["Accounts", LandingRouters.ACCOUNTS],
  //       ["Contracts", LandingRouters.CONTRACTS],
  //     ],
  //   },
  //   {
  //     title: "Tokens",
  //     href: "/tokens",
  //     submenu: [
  //       ["POX", "/tokens/pox"],
  //       ["Others", "/tokens"],
  //     ],
  //   },
  //   {
  //     title: "Data",
  //     href: "/blockchain/transfers",
  //     submenu: [
  //       ["POX Supply", "/blockchain/transfers"],
  //       ["Rankings", "/blockchain/transfers"],
  //     ],
  //   },
  //   {
  //     title: "Governance",
  //     href: LandingRouters.SUPER_REPRESENTATIVES,
  //     submenu: [
  //       ["Super Representatives", LandingRouters.SUPER_REPRESENTATIVES],
  //       ["Votes", LandingRouters.VOTES],
  //       ["POX Staking Governance", LandingRouters.YUM_STACKING_GOVERNANCE],
  //       ["Parameters & Proposals", "/governance/parameterandproposal"],
  //     ],
  //   },
  //   {
  //     title: "More",
  //     href: "/more/contractsdeployment",
  //     submenu: [
  //       ["Contracts Deployment", "/more/contractsdeployment"],
  //       ["Contracts Verification", "/more/contractsverification"],
  //       ["Encoding Converter", "/more/encodingconverter"],
  //       ["Broadcast Transaction", "/more/broadcasttransaction"],
  //     ],
  //   },
  // ];

  const isActive = (path) =>
  location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleWalletConnect = async () => {
    navigate(LandingRouters.USER_REGISTER);
  };

  return (
    <div className="sticky top-0 z-50 relative bg-[var(--bg)] text-[var(--text)] dark:bg-[var(--bg)] dark:text-[var(--text)] shadow-lg dark:shadow-md dark:shadow-gray-600">
      <div className="spotlight"></div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between py-4 w-full px-6">
        <div className="flex items-center justify-around space-x-4 2xl:space-x-12">
          <Link to="/" data-discover="true">
            <img
              src={MainContent.appLogo}
              alt="Logo"
              className="h-12 w-auto cursor-pointer p2 bg-black dark:bg-transparent rounded"
            />
          </Link>

          <div className="hidden lg:flex lg:space-x-8 lg:pl-8 xl:space-x-16">
            {navItems.map((menu, index) => (
              <div className="relative group" key={index}>
                <Link
                  className={`text-lg font-medium hover:text-[var(--text)] transition-colors duration-200 ${
                    isActive(menu.href)
                      ? "text-[var(--btn-text)] underline"
                      : ""
                  }`}
                  to={menu.href}
                  data-discover="true"
                >
                  {menu.title}
                </Link>
                {/* <div className="absolute left-0 top-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 ease-in-out flex flex-col bg-gray-100 dark:bg-gray-600 bg-opacity-20 backdrop-blur-3xl text-black dark:text-white shadow-xl py-3 px-4 rounded-lg border border-black/10 dark:border-white/10 mt-2 whitespace-nowrap z-50">
                  {menu.submenu.map(([label, path], idx) => (
                    <Link
                      key={idx}
                      to={path}
                      data-discover="true"
                      className={`text-sm py-2 px-4 hover:text-[var(--btn-hover-text)] hover:bg-[var(--btn-hover-bg)] rounded-md transition-all duration-200 ${
                        isActive(path)
                          ? "text-[var(--btn-hover-text)] underline"
                          : ""
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-row items-center justify-end w-[30%]">
          <div className="flex items-center space-x-2 xl:space-x-4">
            <button
              onClick={() => {
                theme === "light"
                  ? dispatch(showDark())
                  : dispatch(showLight());
              }}
              className="cursor-pointer"
            >
              {theme === "light" ? <IoMoon size={24} /> : <IoSunny size={24} />}
            </button>
            <button
              onClick={handleWalletConnect}
              className="border border-[var(--border-color)] cursor-pointer bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-text)] py-2 px-4 rounded-3xl flex items-center space-x-2 transition-colors duration-200"
            >
              <FaGoogleWallet />
              <span className="whitespace-nowrap">Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex flex-row justify-between items-center lg:hidden py-4 px-4">
        <Link to="/" data-discover="true">
          <img
            src={MainContent.appLogo}
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              theme === "light" ? dispatch(showDark()) : dispatch(showLight());
            }}
            className="cursor-pointer"
          >
            {theme === "light" ? <IoMoon size={24} /> : <IoSunny size={24} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--text)] text-3xl focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 left-0 w-3/4 h-full z-50 bg-[var(--bg)] text-[var(--text)] shadow-xl px-6 py-8 space-y-4 overflow-auto hide-scrollbar ${
            isMobileMenuOpen
              ? "transform translate-x-0 transition-transform duration-300 ease-in-out"
              : "transform -translate-x-full transition-transform duration-300 ease-in-out"
          }`}
        >
          {navItems.map((menu, idx) => (
            <div key={idx}>
              <Link
                to={menu.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-lg font-semibold ${
                  isActive(menu.href)
                    ? "text-[var(--btn-hover-text)] underline"
                    : ""
                }`}
              >
                {menu.title}
              </Link>
              {/* <div className="ml-4 space-y-1">
                {menu.submenu.map(([label, path], index) => (
                  <Link
                    key={index}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm py-1 hover:text-[var(--btn-hover-text)] ${
                      isActive(path)
                        ? "text-[var(--btn-hover-text)] underline"
                        : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div> */}
            </div>
          ))}
          <button
            onClick={handleWalletConnect}
            className="border border-[var(--border-color)] cursor-pointer bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-text)] py-2 px-4 rounded-3xl flex items-center space-x-2 transition-colors duration-200"
          >
            <FaGoogleWallet />
            <span className="whitespace-nowrap">Connect Wallet</span>
          </button>
        </div>
    </div>
  );
};

export default Header;
