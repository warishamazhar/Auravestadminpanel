/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { getMoneySymbol } from "../../../utils/additionalFunc";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { sendPaymentDetail } from "../../../api/user.api";
import { MainContent } from "../../../constants/mainContent";

const InvestmentModal = ({ plan, onClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.isLoggedUser?.data);
  console.log(userInfo)
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(50); // Initialize with minimum value (or any value, if no min exists)
  }, [plan]);

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const USDT_ABI = [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value); // Simply set the amount without validation
  };

  const handleConnectAndPayment = async () => {
    if(amount < 50){
      toast.error("Amount must be greater than or equal to 50");
      return
    }
    try {
      dispatch(setLoading(true));

      if (window.ethereum) {
        const walletType = sessionStorage.getItem("walletType");
        if (walletType === "safepal") {
          const isSafePal =
            window.ethereum.isSafePal ||
            navigator.userAgent.toLowerCase().includes("safepal");
          if (!isSafePal) {
            throw new Error("Please use SafePal wallet.");
          }
        }
        if (walletType === "metamask") {
          const isMetaMask = window.ethereum.isMetaMask;
          if (!isMetaMask) {
            throw new Error("Please use MetaMask wallet.");
          }
        }
        if (walletType === "trustwallet") {
          const isTrustWallet = window.ethereum.isTrust;
          if (!isTrustWallet) {
            throw new Error("Please use Trust Wallet.");
          }
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding BSC network:", addError);
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);
        if (userAddress != userInfo?.account) {
          throw new Error("Please connect to the registered wallet.");
        }
        const recipientAddress = import.meta.env.VITE_PAYMENT_ADDRESS;
        if (!recipientAddress) {
          toast.error("Please enter a recipient address");
          return;
        }

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x38") {
          throw new Error("Please connect to BSC network first");
        }

        const usdtContract = new ethers.Contract(
          USDT_ADDRESS,
          USDT_ABI,
          signer
        );

        try {
          const decimals = await usdtContract.decimals();
          console.log(`Token decimals: ${decimals}`);
        } catch (error) {
          console.error("Error fetching USDT decimals:", error);
          throw new Error("Invalid USDT contract on BSC network");
        }

        const balance = await usdtContract.balanceOf(userAddress);
        const amountInUSDT = ethers.parseUnits(amount.toString(), 18);

        if (balance < amountInUSDT) {
          throw new Error("Insufficient USDT balance");
        }

        const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);
        console.log(tx);

        await onSuccess({
        //   packageId: plan._id,
          txnHash: tx.hash,
          amount,
          toWalletAddress: recipientAddress,
          fromWalletAddress: userAddress,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Wallet is not installed.",
        });
        throw new Error("Wallet is not installed.");
      }
    } catch (error) {
      console.error("Error during wallet connection or payment:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text:
          error.message ||
          "Failed to connect wallet or complete payment. Please try again.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSuccess = async (data) => {
    try {
      dispatch(setLoading(true));
      await sendPaymentDetail(data);
      onClose();
      toast.success("Investment successful!");
    } catch (error) {
      console.error("Error during wallet connection or payment:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!plan) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Invest in {MainContent.appName}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-white">
              Minimum Investment: {getMoneySymbol()} 50
            </span>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Investment Amount ({getMoneySymbol()})
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            />
          </div>

          <div className="text-xs text-slate-500 p-3 bg-slate-900/50 rounded-lg">
            You are investing **{amount}
            {getMoneySymbol()}** in the **{plan.title}** plan. Returns are
            calculated based on the plan's APY.
          </div>

          <button
            onClick={handleConnectAndPayment}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
          >
            Confirm {getMoneySymbol()}
            {amount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;
