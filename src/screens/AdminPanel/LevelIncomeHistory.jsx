import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  getAllIncomeHistory,
  getAllLevelIncomeHistory,
  getAllReferralIncomeHistory,
  getIncomeTotalForAdmin,
} from "../../api/admin.api";
import ServerSideTable from "../../components/Screen/UserPanel/ServerSideTable";
import { isToday } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import { AuthenticatedAdminRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";

const LevelIncomeHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  const [allLevelIncomeHistory, setAllLevelIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState({});

  const fetchAllLevelIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllLevelIncomeHistory();
      if (response?.success) {
        setAllLevelIncomeHistory(response?.data?.history || []);
      } else {
        toast.error(response?.message || "Something went wrong");
        setAllLevelIncomeHistory([]);
      }
    } catch (err) {
      toast.error("Failed to fetch Level Income history");
      setAllLevelIncomeHistory([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllLevelIncomeHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allLevelIncomeHistory.filter((item) =>
          isToday(new Date(item.createdAt))
        )
      : allLevelIncomeHistory;

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => <span className="font-medium text-white">{row?.id}</span>,
    },
    {
      header: "User ID",
      accessor: "user.username",
      cell: (row) => (
        <span className="font-medium text-white">{row?.user?.username}</span>
      ),
      searchValue: (row) => row?.user?.username || "",
    },
    {
      header: "From User",
      accessor: "fromUser.username",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.fromUser?.username || "-"}
        </span>
      ),
      searchValue: (row) => row?.fromUser?.username || "",
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.amount.toFixed(3)}
        </span>
      ),
    },
    {
      header: "ReferralIncome",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.income.toFixed(3)}
        </span>
      ),
    },
    {
      header: "Level",
      accessor: "level",
      cell: (row) => (
        <span className="font-medium text-white">{row?.level}</span>
      ),
    },
    {
      header: "Days",
      accessor: "days",
      cell: (row) => (
        <span className="font-medium text-white">{row?.days}</span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => (
        <span className="font-medium text-white">{row?.type}</span>
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
      searchValue: (row) => {
        return new Date(row?.createdAt)?.toLocaleDateString();
      },
    },
  ];

  const cardData = [
    {
      title: "Total Income",
      value: `$ ${Number(totalIncome?.totalIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      path: AuthenticatedAdminRouters.INCOME_HISTORY,
    },
    {
      title: "Total Referral Income",
      value: `$ ${Number(totalIncome?.totalReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedAdminRouters.REFERRAL_INCOME_HISTORY,
    },
    {
      title: "Total Level Income",
      value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedAdminRouters.LEVEL_INCOME_HISTORY,
    },
    {
      title: "Total Matching Income",
      value: `$ ${Number(totalIncome?.totalMatching ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/handshake.png",
      path: AuthenticatedAdminRouters.MATCHING_INCOME_HISTORY,
    },
    {
      title: "Total Trading",
      value: `$ ${Number(totalIncome?.totalTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
      path: AuthenticatedAdminRouters.TRADING_LIST,
    },
  ];

  const fetchCardData = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getIncomeTotalForAdmin();
      if (response?.success) {
        setTotalIncome(response || {});
      } else {
        toast.error(response?.message || "Something went wrong");
        setTotalIncome({});
      }
    } catch (err) {
      toast.error("Failed to fetch income history");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  return (
    <div className="space-y-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            iconImage={item.icon}
            change={item.change}
            changeType={item.changeType}
            path={item.path}
          />
        ))}
      </div>
      <DataTable
        title="Level Income History"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />
    </div>
  );
};

export default LevelIncomeHistory;
