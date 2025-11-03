import React, { useEffect, useState } from "react";
import { AuthenticatedUserRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";
import { getIncomeTotal } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";

const InvestmentReport = () => {
  const dispatch = useDispatch();
  const [totalIncome, setTotalIncome] = useState({});
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
  const revenueOverview = [
    {
      title: "Total Partners",
      value: `${Number(totalIncome?.partners ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/conference-call.png",
      path: AuthenticatedUserRouters.MY_REFERRALS,
    },
    {
      title: "Active Partners",
      value: `${Number(totalIncome?.partnerActive ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/ok.png",
      path: AuthenticatedUserRouters.MY_REFERRALS,
      data: "active",
    },
    {
      title: "Inactive Partners",
      value: `${Number(totalIncome?.partnerInactive ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group--v3.png",
      path: AuthenticatedUserRouters.MY_REFERRALS,
      data: "inactive",
    },
    {
      title: "Total Downline Users",
      value: `${Number(totalIncome?.totalDownlineUsers ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/user-group-woman-woman--v3.png",
      path: AuthenticatedUserRouters.MY_TEAM,
    },
    {
      title: "Total Trading Income",
      value: `$ ${Number(totalIncome?.currentIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
    },
    {
      title: "Today Trading Income",
      value: `$ ${Number(totalIncome?.todayTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Level Income",
      value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
      icon: "https://cdn-icons-png.flaticon.com/512/10102/10102408.png",
      path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
    },
    {
      title: "Today Level Income",
      value: `$ ${Number(totalIncome?.todayLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/isometric/50/economic-improvement--v1.png",
      path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Global Achievers",
      value: `${Number(totalIncome?.totalGlobalAchiever ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/medal.png",
      path: AuthenticatedUserRouters.GLOBAL_ACHIEVERS,
    },
    {
      title: "Today Global Achievers",
      value: `${Number(totalIncome?.todayGlobalAchiever ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/prize.png",
      path: AuthenticatedUserRouters.GLOBAL_ACHIEVERS,
      data: "today",
    },
    {
      title: "Total Matching Income",
      value: `$ ${Number(totalIncome?.totalMatching ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/combo-chart.png",
      path: AuthenticatedUserRouters.MATCHING_INCOME_HISTORY,
    },
    {
      title: "Today Matching Income",
      value: `$ ${Number(totalIncome?.todayMatching ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/increase.png",
      path: AuthenticatedUserRouters.MATCHING_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Referrals Income",
      value: `$ ${Number(totalIncome?.totalReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group.png",
      path: AuthenticatedUserRouters.REFERRAL_INCOME_HISTORY,
    },
    {
      title: "Today Referrals Income",
      value: `$ ${Number(totalIncome?.todayReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedUserRouters.REFERRAL_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Investement",
      value: `$ ${Number(totalIncome?.totalTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/transaction.png",
      path: AuthenticatedUserRouters.INVESTMENT_HISTORY,
    },
    {
      title: "Today Investement",
      value: `$ ${Number(totalIncome?.todayTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/exchange.png",
      path: AuthenticatedUserRouters.INVESTMENT_HISTORY,
      data: "today",
    },
    {
      title: "Total Team Transaction",
      value: `$ ${Number(totalIncome?.totalTeamTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/color/48/transaction.png",
      path: AuthenticatedUserRouters.TRANSACTIONS,
    },
    {
      title: "Today Team Transaction",
      value: `$ ${Number(totalIncome?.todayTeamTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/pulsar-gradient/48/refund-2.png",
      path: AuthenticatedUserRouters.TRANSACTIONS,
      data: "today",
    },
    {
      title: "Total Withdrawals",
      value: `$ ${Number(totalIncome?.totalWithdraw ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money-bag.png",
      path: AuthenticatedUserRouters.WITHDRAWAL_HISTORY,
    },
    {
      title: "Today Withdrawals",
      value: `$ ${Number(totalIncome?.todayWithdraw ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/isometric/50/card-in-use.png",
      path: AuthenticatedUserRouters.WITHDRAWAL_HISTORY,
      data: "today",
    },
    {
      title: "Total Income",
      value: `$ ${Number(totalIncome?.totalIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/sales-performance.png",
      path: AuthenticatedUserRouters.INCOME_HISTORY,
    },
    {
      title: "Today Income",
      value: `$ ${Number(totalIncome?.todayIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money-transfer.png",
      path: AuthenticatedUserRouters.INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Today Live A/C Income",
      value: `$ ${Number(totalIncome?.todayLiveTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/account-1.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Live A/C Income",
      value: `$ ${Number(totalIncome?.totalLiveTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/change-user.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
    },
  ];
  return (
    <div className="space-y-10 mt-5">
      <div>
        <h1 className="text-3xl font-bold text-white">My Investments</h1>
        <p className="text-slate-400 mt-1">
          Track your investment reports.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {revenueOverview.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            iconImage={item.icon}
            change={item.change}
            changeType={item.changeType}
            path={item.path}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
};

export default InvestmentReport;
