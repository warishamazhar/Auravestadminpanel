import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const faqData = [
  {
    question: "Why is yumeko the best alternative to trading?",
    answer: [
      "The cryptocurrency rate has no effect on the sustainability of the rewards.",
      "The minimum entry threshold is equal to just a couple of cups of coffee.",
      "There is no need to wait for payouts - funds come instantly to your wallet.",
      "Rewards always depend only on the actions of the participant.",
      "The participant can receive the reward indefinitely, as long as he expands his team.",
    ],
  },
  {
    question: "How does the yumeko platform work?",
    answer: [
      "yumeko is built on smart contract technology, ensuring full automation and transparency.",
      "Users participate in a decentralized matrix system that redistributes rewards based on smart contract logic.",
      "There are no intermediaries – the system runs on blockchain, and all funds are transferred directly between participants.",
    ],
  },
  {
    question: "What are the benefits of using yumeko?",
    answer: [
      "Full decentralization means no single entity controls your assets.",
      "Instant payouts are made directly to your crypto wallet.",
      "Transparent and immutable conditions enforced by smart contracts.",
      "You maintain full control of your funds at all times.",
    ],
  },
  {
    question: "How to start using yumeko?",
    answer: [
      "Install a crypto wallet like MetaMask or Trust Wallet.",
      "Fund your wallet with the required amount of cryptocurrency (usually BNB or ETH).",
      "Use your wallet to connect to the yumeko platform and register.",
      "Once registered, you can begin activating slots and building your team.",
    ],
  },
  {
    question: "Is yumeko safe to use?",
    answer: [
      "Yes, yumeko operates on open-source smart contracts that are permanently stored on the blockchain.",
      "There are no admins or centralized authorities that can alter the rules or control your funds.",
      "Users are in full control of their interactions through their own wallets.",
    ],
  },
];

const Faq = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash === "#faq") {
      const element = document.getElementById("faq");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);location
  const [openIndex, setOpenIndex] = useState(0); // default open first item

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative container mx-auto px-4 lg:px-[115px]" id="faq">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 max-w-[343px] lg:max-w-[720px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 w-10 h-10 rounded-[12px] bg-blue-600 text-white">
          <span className="text-[24px] font-medium">?</span>
        </div>
        <h2 className="text-[32px] lg:text-[48px] font-normal lg:font-medium leading-[1.21] lg:leading-[1.21]">
          Frequently asked Questions
        </h2>
        <p className="text-sm lg:text-lg text-white-500 font-light">
          Quick answerss to help you make the most of yumeko
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mt-10 lg:mt-[106px] max-w-full lg:max-w-[770px] mx-auto">
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`relative border border-white/10 bg-gray-800 text-white rounded-[20px] cursor-pointer p-5 lg:p-8 transition-colors duration-300 ${
                  isOpen ? "" : ""
                }`}
              >
                {/* Question Row */}
                <div className="flex items-center gap-4 lg:gap-6">
                  <div
                    className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[16px] lg:text-lg">{item.question}</h3>
                </div>

                {/* Answer */}
                {isOpen && item.answer.length > 0 && (
                  <div className="mt-4 lg:mt-8 pl-0 lg:pl-[47px]">
                    <div className="w-full h-[1px] bg-white/20" />
                    <div className="flex flex-col text-white-500 text-sm mt-6 lg:mt-[30px] gap-2">
                      {item.answer.map((line, idx) => (
                        <span
                          key={idx}
                          className="leading-[22.4px] font-light relative"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
