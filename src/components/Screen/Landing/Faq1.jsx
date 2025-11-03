import React, { useState, useEffect } from "react";
import { LandingRouters } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

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
    icon: "💎",
    color: "from-blue-500 to-cyan-500"
  },
  {
    question: "How does the yumeko platform work?",
    answer: [
      "yumeko is built on smart contract technology, ensuring full automation and transparency.",
      "Users participate in a decentralized matrix system that redistributes rewards based on smart contract logic.",
      "There are no intermediaries – the system runs on blockchain, and all funds are transferred directly between participants.",
    ],
    icon: "⚙️",
    color: "from-purple-500 to-pink-500"
  },
  {
    question: "What are the benefits of using yumeko?",
    answer: [
      "Full decentralization means no single entity controls your assets.",
      "Instant payouts are made directly to your crypto wallet.",
      "Transparent and immutable conditions enforced by smart contracts.",
      "You maintain full control of your funds at all times.",
    ],
    icon: "🎯",
    color: "from-green-500 to-emerald-500"
  },
  {
    question: "How to start using yumeko?",
    answer: [
      "Install a crypto wallet like MetaMask or Trust Wallet.",
      "Fund your wallet with the required amount of cryptocurrency (usually BNB or ETH).",
      "Use your wallet to connect to the yumeko platform and register.",
      "Once registered, you can begin activating slots and building your team.",
    ],
    icon: "🚀",
    color: "from-orange-500 to-red-500"
  },
  {
    question: "Is yumeko safe to use?",
    answer: [
      "Yes, yumeko operates on open-source smart contracts that are permanently stored on the blockchain.",
      "There are no admins or centralized authorities that can alter the rules or control your funds.",
      "Users are in full control of their interactions through their own wallets.",
    ],
    icon: "🛡️",
    color: "from-indigo-500 to-purple-500"
  },
];

const Faq1 = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative container mx-auto lg:px-[115px] py-20" id="faq">
      <style>
        {`
          @keyframes float-question {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          @keyframes expand {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
          }

          @keyframes checkmark {
            0% { width: 0; }
            100% { width: 12px; }
          }
          
          .animate-float-question { animation: float-question 3s ease-in-out infinite; }
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          .animate-expand { animation: expand 0.3s ease-out forwards; }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          
          .glass-card {
            background: rgba(11, 11, 11, 0.5);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .faq-item-open {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          
          .checkmark::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 12px;
            height: 2px;
            background: currentColor;
            animation: checkmark 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header Section */}
      <div className="relative flex flex-col items-center gap-6 max-w-[800px] mx-auto text-center mb-16">
        {/* Animated Icon */}
        <div className="relative animate-float-question">
          <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl animate-pulse-glow" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl">
            <span className="text-3xl">❓</span>
          </div>
        </div>

        {/* Title with Gradient */}
        <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked
          </span>
          <br />
          <span className="text-white">Questions</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-gray-300 max-w-2xl">
          Everything you need to know about <span className="text-blue-400 font-semibold">yumeko</span>. 
          Can't find what you're looking for? <span className="text-purple-400 cursor-pointer hover:underline">Contact us</span>
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="glass-card px-4 py-2 rounded-full">
            <span className="text-sm text-gray-400">Response Time: </span>
            <span className="text-blue-400 font-semibold">Instant</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-full">
            <span className="text-sm text-gray-400">24/7 Support</span>
            <span className="ml-2">✓</span>
          </div>
        </div>
      </div>

      {/* FAQ Items Container */}
      <div className="relative max-w-[900px] mx-auto">
        {/* Connection Lines (Desktop) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent ml-8" />

        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Number Badge (Desktop) */}
                <div className="hidden lg:flex absolute -left-10 top-6 items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold shadow-lg z-10">
                  {index + 1}
                </div>

                {/* FAQ Card */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform ${
                    isOpen 
                      ? 'faq-item-open shadow-xl scale-[1.02]' 
                      : 'glass-card hover:bg-white/5 hover:scale-[1.01] hover:shadow-lg'
                  }`}
                >
                  {/* Shimmer Effect on Hover */}
                  {isHovered && !isOpen && (
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  )}

                  {/* Question Section */}
                  <div className="flex items-start gap-4 p-6 lg:p-8">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-300 ${
                      isOpen ? 'scale-110 rotate-12' : isHovered ? 'scale-105' : ''
                    }`}>
                      {item.icon}
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-semibold text-white pr-4 leading-relaxed">
                        {item.question}
                      </h3>
                    </div>

                    {/* Toggle Button */}
                    <button
                      className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-blue-500 border-blue-500' : 'hover:bg-white/10 hover:border-blue-500/50'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Answer Section */}
                  {isOpen && (
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8 animate-expand">
                      {/* Divider */}
                      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Answer Content */}
                      <div className="pl-0 lg:pl-16 space-y-3">
                        {item.answer.map((line, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-gray-300 animate-expand"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            {/* Custom Checkmark Bullet */}
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5L4.5 8.5L11 1.5" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="flex-1 leading-relaxed">{line}</span>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info Card */}
                      <div className="mt-6 lg:ml-16 glass-card rounded-xl p-4 border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <p className="text-sm text-gray-300">
                              <span className="font-semibold text-white">Pro Tip:</span> For more detailed information, 
                              check our <span className="text-blue-400 hover:underline cursor-pointer">documentation</span> or 
                              <span className="text-purple-400 hover:underline cursor-pointer ml-1">contact support</span>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Border Effect (Active) */}
                  {isOpen && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-gray-300 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105" onClick={() => navigate(LandingRouters.USER_REGISTER)}>
                Contact Support
              </button>
              {/* <button className="px-8 py-3 glass-card border border-blue-500/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                View Docs
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq1;