import React, { useEffect, useState } from "react";
import { setLoading } from "../../redux/slices/loadingSlice";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { useDispatch } from "react-redux";
import { maskWalletAddress } from "../../utils/additionalFunc";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import { getAllUserWithdrawalHistory } from "../../api/user.api";

const WithdrawalHistory = () => {
  const [allWithdrawalHistory, setAllWithdrawalHistory] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;
  const fetchAllWithdrawalHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserWithdrawalHistory();
      setAllWithdrawalHistory(response?.data?.history);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchAllWithdrawalHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allWithdrawalHistory.filter((item) => isToday(new Date(item.createdAt)))
      : allWithdrawalHistory;

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (row, rowIndex) => (
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
      searchValue: (row) => row?.user?.username,
    },
    {
      header: "Client Address",
      accessor: "clientAddress",
      cell: (row) => (
        <span className="font-medium text-white">
          {maskWalletAddress(row?.clientAddress)}
        </span>
      ),
    },
    {
      header: "Main Address",
      accessor: "mainAddress",
      cell: (row) => (
        <span className="font-medium text-white">
          {maskWalletAddress(row?.mainAddress)}
        </span>
      ),
    },
    {
      header: "Withdrawal",
      accessor: "investment",
      cell: (row) => (
        <span className="font-medium text-white">$ {row?.investment}</span>
      ),
    },
    {
      header: "Percentage",
      accessor: "percentage",
      cell: (row) => {
        const tenPercent = (row?.investment ?? 0) * 0.1;
        return <span className="font-medium text-white">$ {tenPercent}</span>;
      },
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

  return (
    <DataTable
      title="Withdrawal History"
      columns={columns}
      data={filteredIncomeHistory}
      pageSize={10}
    />
  );
};

export default WithdrawalHistory;
