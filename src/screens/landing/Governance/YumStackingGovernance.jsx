import React, { useState } from "react";
import SearchComponent from "../../../components/Global/SearchComponent";
import { FaGoogleWallet } from "react-icons/fa";
import img1 from "../../../assets/Landing/Governance/img1.png";

const YumStackingGovernance = () => {
    const [inputValue, setInputValue] = useState(0)
  return (
    <div className="space-y-10">
      <SearchComponent />
      <div class="px-6 py-4 flex flex-col md:flex-row items-center justify-between border-[1px] border-[#151515] rounded-3xl shadow-xl reusable-box text-[var(--text)]">
        <div class="">
          <p class="font-bold text-4xl pb-4">YUM Staking Governance</p>
          <p class="text-[var(--text)] font-medium">
            YUM Network adopts the DPoS consensus mechanism. YUM holders can
            contribute
            <br /> to YUM's governance while enjoying an APY of up to{" "}
            <span class="text-[var(--text)]">9.18%</span>
          </p>
          <div class="flex flex-col items-start space-x-0 my-6">
            <button className="border border-[var(--border-color)] cursor-pointer bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-text)] py-2 px-4 rounded flex items-center space-x-2 transition-colors duration-200">
              <FaGoogleWallet />
              <span className="whitespace-nowrap">Connect Wallet</span>
            </button>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <img src={img1} alt="YUM-staking-image" />
        </div>
      </div>
      <div class="rounded-3xl bg-[#05B9C4] py-6 px-5 md:px-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-base text-white inline-block pb-[2px]">
              Total YUM Staked
            </p>
            <p class="font-bold text-center">20,847,150.00</p>
          </div>
          <div>
            <p class="text-base text-white inline-block pb-[2px]">
              YUM Staking Rate
            </p>
            <p class="font-bold text-center">49.28 %</p>
          </div>
          <div>
            <p class="text-base text-white inline-block pb-[2px]">
              Total YUM Rewards Distributed
            </p>
            <p class="font-bold text-center">2,301,213.19</p>
          </div>
          <div>
            <p class="text-base text-white inline-block pb-[2px]">
              Highest APR
            </p>
            <p class="font-bold text-center">9.18%</p>
          </div>
        </div>
      </div>
      <div class="text-[var(--text)]">
        <p class="font-semibold text-lg pb-2">Calculate Your Staking Rewards</p>
        <div class="border-[1px] border-[#434343] reusable-box rounded-3xl px-6 py-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="space-y-4">
              <p class="">I want to stake</p>
              <div class="flex flex-row items-center space-x-8 border-[1px] dark:border-white/50 rounded-xl py-2 px-4 ">
                <input
                  type="text"
                  class="bg-transparent outline-none"
                  placeholder="10000"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <p>YUM</p>
              </div>
              <p class="pl-1">
                Est. Rewards <span class="text-[#37DD00] font-bold">{inputValue*9.18}</span>
              </p>
            </div>
            <div>
              <img
                src="https://poxscan.io/assets/CalculateStakingReward-FJ5o55Yn.svg"
                alt="calculate-staking-reward-img"
              />
            </div>
          </div>
          <p class="text-[#73787B] pt-8 pb-2">
            * The estimated YUM rewards here are calculated based on the staking
            duration selected and the YUM amount entered. The actual APY and YUM
            rewards may vary.
          </p>
          <div class="flex flex-row justify-center items-center my-6">
            <div class="inline-flex flex-row items-center space-x-1 bg-white text-black rounded-xl px-12 py-2 font-semibold cursor-pointer hover:scale-105 transition-all duration-400 ease-in-out">
              <button>Stake Now</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-3 mt-[2px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YumStackingGovernance;
