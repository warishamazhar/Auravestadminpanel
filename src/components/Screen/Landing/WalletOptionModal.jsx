/* eslint-disable react/prop-types */
import { CgClose } from "react-icons/cg";
import safePng from "../../../assets/safepal.png";
import trustPng from "../../../assets/trustwallet.jpg";
const WalletOptionModal = ({ show, hide, connectWallet }) => {
  if (!show) return null;

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "https://img.icons8.com/color/48/metamask-logo.png",
    },
    {
      name: "SafePal",
      icon: safePng,
    },
    {
      name: "Trust Wallet",
      icon: trustPng,
    },
  ];

  const selectHandler = (walletName) => {
    connectWallet(walletName);
    hide();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-60 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300">
        <button
          onClick={hide}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 text-2xl cursor-pointer"
        >
          <CgClose />
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Choose Wallet
        </h2>

        <div className="flex flex-col gap-4">
          {walletOptions.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                selectHandler(option.name.toLowerCase().replace(/\s/g, ""))
              }
              className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <img
                src={option.icon}
                alt={option.name}
                className="w-8 h-8 object-contain"
              />
              <span className="text-gray-700 dark:text-gray-100 font-medium">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletOptionModal;
