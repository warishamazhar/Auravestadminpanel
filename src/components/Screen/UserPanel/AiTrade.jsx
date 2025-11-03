import React, { useEffect, useState, useMemo } from "react";
import { fetchCoinMarkets } from "../../../api/extra.api";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { getAllTradingIncomeHistory, tradeInAi } from "../../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import LiveMarketChart from "./LiveMarketChart";
import CoinListItem from "./CoinListItem";
import DataTable from "./DataTable";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AiTrade = () => {
  const [countdownTime, setCountdownTime] = useState(0); // Time in seconds until midnight
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeframe, setTimeframe] = useState("30");
  const [aiTrade, setAiTrade] = useState(null);
  const dispatch = useDispatch();
  const todayRoiCollected = useSelector(
    (state) => state?.isLoggedUser?.data?.todayRoiCollected
  );
  const [allTradingIncomeHistory, setAllTradingIncomeHistory] = useState([]);
  const location = useLocation();
  const data = location?.state;
  const fetchAllTradingIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllTradingIncomeHistory();
      if (response?.success) {
        setAllTradingIncomeHistory(response?.data?.history);
      } else {
        setAllTradingIncomeHistory([]);
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchAllTradingIncomeHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allTradingIncomeHistory.filter((item) =>
          isToday(new Date(item.createdAt))
        )
      : allTradingIncomeHistory;

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (row, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "User ID",
      accessor: "id",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.user?.username || "N/A"}
        </span>
      ),
      searchValue: (row) => row?.user?.username
    },
    {
      header: "Package",
      accessor: "package.title",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.package?.title || "N/A"}
        </span>
      ),
      searchValue: (row) => row?.package?.title
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.amount}
        </span>
      ),
    },
    {
      header: "Income",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-green-400">
          $ {row?.income.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Percentage",
      accessor: "percentage",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.percentage.toFixed(2)}%
        </span>
      ),
    },
    {
      header: "Reward Paid",
      accessor: "rewardPaid",
      cell: (row) => (
        <span className="font-medium text-white">{row?.rewardPaid}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`font-medium ${
            row?.status === "Completed" ? "text-green-500" : "text-yellow-400"
          }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };
  // Countdown logic to update every second
  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      // Start the countdown when the button is disabled
      interval = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(interval); // Stop the interval once the countdown reaches 0
            setIsButtonDisabled(false); // Re-enable the button
            return 0;
          }
        });
      }, 1000); // Update every second
    }
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isButtonDisabled]);

  const timeframeOptions = [
    { label: "24H", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
  ];

  const activeTimeframeLabel =
    timeframeOptions.find((opt) => opt.value === timeframe)?.label ||
    `${timeframe} Days`;

  const fetchAllCoins = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchCoinMarkets();
      setAllCoins(data);
      setSelectedCoin(data?.[0]);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCoins();
    const interval = setInterval(() => {
      fetchAllCoins();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAiTrade(todayRoiCollected); // Set the AI trade status (true or false)

    if (todayRoiCollected === true) {
      // If AI trade is false, start the countdown based on the time the data was fetched
      setIsButtonDisabled(true);
      setCountdownTime(getTimeUntilMidnight());
      // Use the fetchedAt timestamp if available
    } else {
      setIsButtonDisabled(false); // Enable the button if aiTrade is true
    }
  }, []);

  const handleAiTradeClick = async () => {
    dispatch(setLoading(true));
    try {
      const res = await tradeInAi();
      if (res?.success) {
        toast.success(res?.message || "Success");
        setIsButtonDisabled(true); // Disable the button
        setCountdownTime(getTimeUntilMidnight());
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error trading in AI:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const filteredCoins = useMemo(() => {
    return allCoins?.filter(
      (coin) =>
        coin?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        coin?.symbol?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }, [allCoins, searchTerm]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 ">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-4">
              {selectedCoin && (
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                    </h2>
                    <p className="text-sm text-slate-400">
                      Last {activeTimeframeLabel}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg">
                {timeframeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTimeframe(opt.value)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      timeframe === opt.value
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <LiveMarketChart coinId={selectedCoin?.id} days={timeframe} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleAiTradeClick}
              disabled={isButtonDisabled} // Disable the button based on state
              className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white p-4 rounded-xl 
                font-semibold text-lg hover:bg-blue-500 transition-colors 
                shadow-lg shadow-blue-600/20 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-400"
            >
              <i className="fa-solid fa-arrow-trend-up"></i>
              <span>
                {isButtonDisabled
                  ? `Cooldown: ${formatCountdown(countdownTime)}`
                  : "AI Trade"}
              </span>
            </button>

            {/* <button
              onClick={() => navigate(AuthenticatedUserRouters.WITHDRAW)}
              className="flex items-center justify-center gap-3 w-full bg-slate-700/50 border border-slate-600 text-slate-300 p-4 rounded-xl 
              font-semibold text-lg hover:bg-slate-700 hover:text-white transition-colors 
              focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
              <i className="fa-solid fa-money-bill-transfer"></i>
              <span>Withdrawal</span>
              </button> */}
          </div>
        </div>

        <div className="lg:col-span-1 bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-4 flex flex-col h-[600px]">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search coin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            {filteredCoins?.map((coin, index) => (
              <CoinListItem
                key={`coin-${index}`}
                coin={coin}
                onSelect={setSelectedCoin}
              />
            ))}
          </div>
        </div>
      </div>
      <DataTable
        title="Trading Profit Income History"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />
    </div>
  );
};

export default AiTrade;
