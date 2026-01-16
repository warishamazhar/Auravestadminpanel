import React, { useEffect, useState } from "react";
import {
  Wallet,
  DollarSign,
  ArrowDownLeft,
  AlertCircle,
  CheckCircle,
  Copy,
  TrendingUp,
  Clock,
  Briefcase
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getOptForWithdrawal,
  verifyWithdrawalDetails,
} from "../../api/user.api";
import { Axios } from "../../constants/mainContent";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { set } from "lodash";
import { setWithdrawalAmount } from "../../redux/slices/withdrawalSlice";

// Mock functions for demonstration
const getMoneySymbol = () => "$";

const RequestWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const dispatch = useDispatch();

  // Fetch fresh user data on mount to ensure withdrawalInfo is updated
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get("/user/get-user");
        if (response?.data?.success) {
          dispatch(loginUser({
            token: response.data.token,
            userId: response.data.data._id,
            role: response.data.role,
            data: response.data.data
          }));
        }
      } catch (error) {
        console.error("Error fetching fresh profile:", error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // Get the withdrawable amount from Redux
  const withdrawalInfo = useSelector((state) => state?.isLoggedUser?.data?.withdrawalInfo) || {};
  const {
    availableWithdrawalAmount = 0,
    totalWithdrawableAmount = 0,
    withdrawnAmount = 0
  } = withdrawalInfo;

  const reduxWithdrawalAmount = availableWithdrawalAmount;

  // Set withdrawalAmount when reduxWithdrawalAmount changes
  useEffect(() => {
    setWithdrawalAmount(reduxWithdrawalAmount);
  }, [reduxWithdrawalAmount]);

  // Fallback to legacy check if new fields are empty (handling transition period)
  // const legacyIncome = useSelector((state) => state?.isLoggedUser?.data?.incomeDetails?.income?.currentIncome) || 0;
  // useEffect(() => {
  //    if(availableWithdrawalAmount === 0 && legacyIncome > 0) setWithdrawalAmount(legacyIncome);
  // }, [legacyIncome, availableWithdrawalAmount]);

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const walletAddress = useSelector(
    (state) => state?.isLoggedUser?.data?.account
  ); // Replace with your actual wallet address source

  const handleWithdrawalRequest = async () => {
    const numberAmount = Number(amount);

    if (numberAmount < 10) {
      console.log("Error: Withdrawal Amount must be greater than $10.");
      return;
    }

    if (numberAmount > withdrawalAmount) {
      console.log("Error: Withdrawal amount exceeds your available balance.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await getOptForWithdrawal();

      if (res?.success) {
        setShowOtpModal(true);
      } else {
        const errorMessage = res?.response?.data?.message || res?.message || res?.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log("Error in withdrawal request:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }

    // Proceed with your withdrawal logic
    console.log("Withdrawal request submitted:", {
      amount: numberAmount,
      walletAddress,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAmount = (amt) => {
    return amt ? Number(amt).toLocaleString() : "0";
  };

  // Format amount with 2 decimal places for currency
  const formatCurrency = (amt) => {
    if (!amt || Number(amt) <= 0) return "0.00";
    return Number(amt).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const remainingAmount =
    withdrawalAmount - Number(amount) >= 0
      ? withdrawalAmount - Number(amount)
      : 0;

  // Calculate gas fees (4% of withdrawal amount)
  const calculateGasFees = (withdrawalAmt) => {
    if (!withdrawalAmt || Number(withdrawalAmt) <= 0) return 0;
    return (Number(withdrawalAmt) * 4) / 100;
  };

  // Calculate net amount after gas fees deduction
  const calculateNetAmount = (withdrawalAmt) => {
    if (!withdrawalAmt || Number(withdrawalAmt) <= 0) return 0;
    const gasFees = calculateGasFees(withdrawalAmt);
    return Number(withdrawalAmt) - gasFees;
  };

  const gasFees = amount ? calculateGasFees(amount) : 0;
  const netAmount = amount ? calculateNetAmount(amount) : 0;

  const OtpModal = ({ show, onClose, onSubmit }) => {
    const [otp, setOtp] = useState("");

    const handleSubmit = async () => {
      try {
        dispatch(setLoading(true)); // Set loading state
        const payload = {
          amount: Number(amount),
          otp,
          walletAddress,
        };
        const res = await verifyWithdrawalDetails(payload);

        if (res?.success) {
          // Update withdrawal amount after successful withdrawal
          const withdrawalAmountAfterWithdrawal =
            withdrawalAmount - Number(amount);
          setWithdrawalAmount(withdrawalAmountAfterWithdrawal);

          setShowOtpModal(false);
          toast.success(
            res?.message || "Withdrawal request submitted successfully"
          );
          setAmount("");
          setOtp("");
        } else {
          const errorMessage = res?.response?.data?.message || res?.message || res?.response?.data?.error || "Something went wrong";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.log("Error in withdrawal request:", error);
        const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false)); // Reset loading state
      }
    };

    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-slate-900 border border-blue-600 p-6 rounded-xl w-full max-w-sm shadow-2xl">
          <h2 className="text-white text-xl font-bold mb-4">Enter OTP</h2>
          <p className="text-slate-400 text-sm mb-4">
            An OTP has been sent to your registered email or phone number.
          </p>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true)); // Set loading state
      const payload = {
        amount: Number(amount),
        walletAddress,
      };
      const res = await verifyWithdrawalDetails(payload);

      if (res?.success) {
        // Update withdrawal amount after successful withdrawal
        const withdrawalAmountAfterWithdrawal =
          withdrawalAmount - Number(amount);
        setWithdrawalAmount(withdrawalAmountAfterWithdrawal);

        setShowOtpModal(false);
        toast.success(
          res?.message || "Withdrawal request submitted successfully"
        );
        setAmount("");
      } else {
        const errorMessage = res?.response?.data?.message || res?.message || res?.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log("Error in withdrawal request:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">


        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Total Withdrawal (Requested/Total) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 rounded-2xl border border-blue-500/20 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={80} className="text-blue-500" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-400 text-sm font-medium mb-1">Total Withdrawal</p>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {getMoneySymbol()} {formatAmount(totalWithdrawableAmount)}
              </h3>
            </div>
          </div>

          {/* Card 2: Available Withdrawal */}
          <div className="bg-gradient-to-br from-blue-900/40 via-blue-900/20 to-slate-900 p-5 rounded-2xl border border-green-500/30 shadow-lg relative overflow-hidden group hover:border-green-500/50 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign size={80} className="text-green-500" />
            </div>
            <div className="relative z-10">
              <p className="text-green-400/80 text-sm font-medium mb-1">Available Withdrawal</p>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {getMoneySymbol()} {formatAmount(availableWithdrawalAmount)}
              </h3>
            </div>
          </div>

          {/* Card 3: Withdrawn Amount (History) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 rounded-2xl border border-purple-500/20 shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle size={80} className="text-purple-500" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-400 text-sm font-medium mb-1">Withdrawn Amount</p>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {getMoneySymbol()} {formatAmount(withdrawnAmount)}
              </h3>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>

          {/* Header */}
          <div className="relative flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl shadow-lg shadow-blue-500/10">
              <ArrowDownLeft className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Withdrawal Request
              </h2>
              <p className="text-slate-400">
                Withdraw your funds securely to your wallet
              </p>
            </div>
          </div>

          {/* Minimum Withdrawal Notice */}
          <div className="relative mb-8 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-amber-300 font-semibold">
                  Minimum Withdrawal: {getMoneySymbol()} 10
                </span>
                <p className="text-amber-200/70 text-sm mt-1">
                  Please ensure your withdrawal amount meets the minimum
                  requirement
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="relative space-y-6 mb-8">
            {/* Available Balance */}
            <div className="mb-2 text-sm text-slate-400 flex justify-between items-center">
              <span>Available to withdraw:</span>
              <span className="font-bold text-green-400">
                {getMoneySymbol()}
                {formatAmount(withdrawalAmount)}
              </span>
            </div>

            {/* Withdrawal Amount Input */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                <DollarSign className="w-4 h-4 text-green-400" />
                Withdrawal Amount ({getMoneySymbol()})
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal" // helps mobile devices show number keyboard
                  value={amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="remove-arrows w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 group-hover:border-blue-600/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {amount && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <span className="text-blue-400 font-bold text-sm">
                      {getMoneySymbol()}
                      {formatAmount(amount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Remaining Balance */}
            {amount && (
              <div className="text-sm text-slate-400 flex justify-between items-center">
                <span>Remaining Balance:</span>
                <span
                  className={`font-semibold ${Number(amount) > withdrawalAmount
                    ? "text-red-400"
                    : "text-yellow-400"
                    }`}
                >
                  {getMoneySymbol()}
                  {formatAmount(remainingAmount)}
                </span>
              </div>
            )}

            {/* Wallet Address */}
            <div className="group mt-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                <Wallet className="w-4 h-4 text-cyan-400" />
                Destination Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={walletAddress}
                  disabled
                  className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl py-4 px-5 pr-12 text-slate-300 text-sm font-mono cursor-not-allowed transition-all duration-300"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 group"
                  title="Copy address"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                  )}
                </button>

                {copied && (
                  <div className="absolute -top-8 right-0 bg-green-500/20 border border-green-500/30 text-green-400 text-xs px-2 py-1 rounded-lg">
                    Copied!
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Funds will be sent to this wallet address
              </p>
            </div>
          </div>

          {/* Withdrawal Summary */}
          {amount &&
            Number(amount) >= 10 &&
            Number(amount) <= withdrawalAmount && (
              <div className="relative mb-8 p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Withdrawal Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount:</span>
                    <span className="text-white font-semibold">
                      {getMoneySymbol()}
                      {formatAmount(amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-cyan-400 font-mono text-xs">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gas Fees (4%):</span>
                    <span className="text-red-400 font-semibold">
                      {getMoneySymbol()}
                      {formatCurrency(gasFees)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-600/30 pt-2 mt-3">
                    <span className="text-slate-300 font-semibold">
                      You will receive:
                    </span>
                    <span className="text-green-400 font-bold text-lg">
                      {getMoneySymbol()}
                      {formatCurrency(netAmount)}
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              !amount ||
              Number(amount) < 10 ||
              Number(amount) > withdrawalAmount
            }
            className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group ${!amount ||
              Number(amount) < 10 ||
              Number(amount) > withdrawalAmount
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] border border-blue-500/30"
              }`}
          >
            <div className="relative flex items-center justify-center gap-3">
              <ArrowDownLeft className="w-5 h-5" />
              <span>
                {!amount || Number(amount) < 10
                  ? "Enter Valid Amount"
                  : Number(amount) > withdrawalAmount
                    ? "Amount Exceeds Balance"
                    : `Confirm Withdrawal ${getMoneySymbol()}${formatAmount(
                      amount
                    )}`}
              </span>
            </div>
            {amount &&
              Number(amount) >= 10 &&
              Number(amount) <= withdrawalAmount && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              )}
          </button>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
            <p className="text-xs text-slate-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                Withdrawal requests are processed within 24-48 hours. Please
                ensure your wallet address is correct as transactions cannot be
                reversed.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* <OtpModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        // onSubmit={handleOtpSubmit}
      /> */}
    </>
  );
};

export default RequestWithdrawal;
