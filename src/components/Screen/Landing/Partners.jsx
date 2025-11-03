// Partners.jsx
import React, { useEffect, useState } from "react";
import shadow from "../../../assets/Landing/shadowbg.png";
import mobShadow from "../../../assets/Landing/mobShadow.png";
import { useLocation } from "react-router-dom";

const Partners = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      const element = document.getElementById("about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  const [selected, setSelected] = useState("total");
  const statsData = {
    total: {
      accounts: "3 475 770",
      accountsChange: "+225",
      totalUSD: "1 471 629 306",
      usdChange: "+3 920",
    },
    eth: {
      accounts: "1 230 000",
      accountsChange: "+150",
      totalUSD: "750 000 000",
      usdChange: "+2 100",
    },
    tron: {
      accounts: "980 000",
      accountsChange: "+60",
      totalUSD: "450 000 000",
      usdChange: "+1 200",
    },
    busd: {
      accounts: "1 265 770",
      accountsChange: "+15",
      totalUSD: "271 629 306",
      usdChange: "+620",
    },
  };

  return (
    <section className="relative lg:mt-[0px] mb-[80px]" id="about">
      <div className="flex flex-col w-full lg:space-y-[80px] relative container mx-auto lg:px-[115px] space-y-[40px]">
        {/* Title & Icon */}
        <div className="flex flex-col items-center gap-3 mx-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-[12px] new-landing-activity">
            {/* SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.25 2.25C2.05109..."
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-[48px] font-medium leading-[1.21] text-center new-landing-title lg:text-[32px] lg:leading-[32px] lg:font-normal">
            Partner results
          </h2>
          <p className="text-[18px] text-white-500 text-center lg:text-sm">
            All data is stored in the blockchain in the public domain and can be
            verified!
          </p>
        </div>

        {/* Results Box */}
        <div className="relative flex flex-col items-center">
          <div className="max-w-[1170px] relative z-[2] flex flex-col items-center lg:p-10 py-5 w-full lg:h-[271px] rounded-[50px] new-landing-results-bg border-[1px] border-solid border-white-100 h-[414px]">
            <div className="flex flex-col items-center space-y-[32px] w-full">
              {/* Button Group */}
              <div className="flex items-center space-x-[4px] w-[270px] h-[40px] bg-[rgba(0,0,0,0.50)] border-[1px] border-solid border-white-200 backdrop-blur-[25px] rounded-[38px] p-1">
                {["total", "eth", "tron", "busd"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelected(item)}
                    className={`flex items-center justify-center w-[66px] h-full rounded-full custom-transition ${
                      selected === item
                        ? "bg-[#216EFF] text-white new-landing-blue-shadow"
                        : "text-white-500 hover:bg-[#216EFF]"
                    }`}
                  >
                    <span className="text-[14px] leading-[14px] capitalize">
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between w-full pl-0 flex-col lg:flex-row space-y-10">
                <div className="flex flex-col items-center space-y-[12px]">
                  <span className="text-[16px] text-white-500">
                    Accounts count
                  </span>
                  <div className="flex items-center lg:space-x-[12px] lg:flex-row flex-col space-x-0 !mb-0">
                    <span className="lg:text-[48px] text-white leading-none font-semibold text-[40px]">
                      {statsData[selected].accounts}
                    </span>
                    <span className="text-[#72FC75] text-[24px] font-semibold">
                      {statsData[selected].accountsChange}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-[12px]">
                  <span className="text-[16px] text-white-500">
                    Total result, USD
                  </span>
                  <div className="flex items-center lg:space-x-[12px] lg:flex-row flex-col space-x-0">
                    <span className="lg:text-[48px] text-white leading-none font-semibold text-[40px]">
                      {statsData[selected].totalUSD}
                    </span>
                    <span className="text-[#72FC75] text-[24px] font-semibold">
                      {statsData[selected].usdChange}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contracts Box */}
          <div className="max-w-[1170px] mt-[-90px] z-[1] flex flex-col space-y-[6px] justify-end items-center lg:px-10 py-5 lg:w-[900px] lg:h-[240px] rounded-[30px] border-[1px] border-solid border-white-100 new-landing-contracts-bg w-full h-[340px]">
            {/* Contract Entries */}
            {[
              { label: "eth", value: "0x5acc...FB97" },
              { label: "tron", value: "TREbha..." },
              { label: "busd", value: "0x5acc...FB97" },
            ].map(({ label, value }, idx) => (
              <React.Fragment key={label}>
                <div className="flex items-center justify-between w-full lg:flex-row flex-col">
                  <div className="flex items-center space-x-[10px] px-[16px]">
                    <span className="text-sm text-white-500">
                      Contract address
                    </span>
                    <span className="text-sm text-white-500">{label} x3 / x4</span>
                  </div>
                  <div className="flex items-center space-x-[10px] px-[16px] lg:pb-[7px]">
                    <span className="text-sm text-white-500 lg:leading-[14px]">
                      {value}
                    </span>
                    {/* Copy Icon */}
                    <button className="custom-transition hover:opacity-70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          opacity="0.3"
                          d="M7 3.5C7 3.10218..."
                          fill="white"
                        />
                        <path
                          opacity="0.8"
                          d="M4.5 6C4.10218..."
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-white-100 last:hidden"></div>
              </React.Fragment>
            ))}
          </div>

          {/* Background Shadows */}
          <img
            src={shadow}
            alt=""
            className="absolute top-[-120px] z-[0] left-1/2 -translate-x-1/2 w-full pointer-events-none hidden lg:flex"
          />
          <img
            src={mobShadow}
            alt=""
            className="absolute top-0 max-h-[700px] z-[0] left-1/2 -translate-x-1/2 w-full pointer-events-none lg:hidden flex"
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;
