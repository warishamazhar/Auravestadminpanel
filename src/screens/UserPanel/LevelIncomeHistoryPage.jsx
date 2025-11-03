import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  getAllIncomeHistory,
  getAllLevelIncomeHistory,
  getAllReferralIncomeHistory,
} from "../../api/admin.api";
import ServerSideTable from "../../components/Screen/UserPanel/ServerSideTable";
import { isToday } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import { getAllUserLevelIncomeHistory } from "../../api/user.api";
import { AuthenticatedUserRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";
import { getIncomeTotal } from "../../api/auth.api";

const LevelIncomeHistoryPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  const [allLevelIncomeHistory, setAllLevelIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState({});

  const fetchAllLevelIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserLevelIncomeHistory();
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
        <span className="font-medium text-white">
          {row?.user?.username || "N/A"}
        </span>
      ),
    },
    {
      header: "From User",
      accessor: "fromUser.username",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.fromUser?.username || "-"}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.amount?.toFixed(3)}
        </span>
      ),
    },
    {
      header: "ReferralIncome",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.income?.toFixed(3)}
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
    },
  ];

  const cardData = [
      {
        title: "Total Income",
        value: `$ ${Number(totalIncome?.totalIncome ?? 0).toFixed(2)}`,
        icon: "https://img.icons8.com/3d-fluency/94/sales-performance.png",
        path: AuthenticatedUserRouters.INCOME_HISTORY,
      },
      {
        title: "Total Trading Income",
        value: `$ ${Number(totalIncome?.totalTrading ?? 0).toFixed(2)}`,
        icon: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
        path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      },
      {
        title: "Total Level Income",
        value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
        icon: "https://cdn-icons-png.flaticon.com/512/10102/10102408.png",
        path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
      },
      {
        title: "Total Global Achievers",
        value: `${Number(totalIncome?.totalGlobalAchiever ?? 0).toFixed(2)}`,
        icon: "https://img.icons8.com/3d-fluency/94/medal.png",
        path: AuthenticatedUserRouters.GLOBAL_ACHIEVERS,
      },
      {
        title: "Total Matching Income",
        value: `$ ${Number(totalIncome?.totalMatching ?? 0).toFixed(2)}`,
        icon: "https://img.icons8.com/3d-fluency/94/combo-chart.png",
        path: AuthenticatedUserRouters.MATCHING_INCOME_HISTORY,
      },
      {
        title: "Total Referrals Income",
        value: `$ ${Number(totalIncome?.totalReferral ?? 0).toFixed(2)}`,
        icon: "https://img.icons8.com/3d-fluency/94/group.png",
        path: AuthenticatedUserRouters.REFERRAL_INCOME_HISTORY,
      },
    ];

  const fetchCardData = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getIncomeTotal();
      if (response?.success) {
        setTotalIncome(response?.data || {});
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

export default LevelIncomeHistoryPage;
