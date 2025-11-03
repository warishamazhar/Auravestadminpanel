import React, { useEffect, useState } from "react";
import {
  getAllWithdrawalRequests,
  withdrawalRequestApproveReject,
} from "../../api/admin.api";
import { setLoading } from "../../redux/slices/loadingSlice";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const WithdrawalRequest = () => {
  const [allWithdrawalRequests, setAllWithdrawalRequests] = useState([]);
  const dispatch = useDispatch();
  const fetchAllWithdrawalRequests = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllWithdrawalRequests();
      setAllWithdrawalRequests(response?.data?.history);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    // fetchAllWithdrawalRequests();
  }, []);
  const handleApproveReject = async (id, status) => {
    const currentStatus = status === "approved" ? "rejected" : "approved";

    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${currentStatus} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setLoading(true));
          const response = await withdrawalRequestApproveReject(id, { status });
          if (response?.success) {
            Swal.fire({
              icon: "success",
              text:
                response?.message || `Withdrawal ${currentStatus} successfully`,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });

            setAllWithdrawalRequests((prevWithdrawalRequests) =>
              prevWithdrawalRequests.filter(
                (user) => user._id !== id && user.status === "pending"
              )
            );
          } else {
            Swal.fire({
              icon: "error",
              text: response?.message || "Something went wrong!",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error("Error blocking user:", error);
          Swal.fire({
            icon: "error",
            text: "Something went wrong!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } finally {
          dispatch(setLoading(false));
        }
      }
    });
  };

  const columns = [
    {
      header: "ID",
      accessor: "_id",
      cell: (row, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      cell: (row) => (
        <span className="font-medium text-white">{row?.name}</span>
      ),
    },
    {
      header: "User ID",
      accessor: "username",
      cell: (row) => (
        <span className="font-medium text-white">{row?.username}</span>
      ),
      searchValue: (row) => row?.username,
    },
    {
      header: "Email",
      accessor: "email",
      cell: (row) => (
        <span className="font-medium text-white">{row?.email}</span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white">$ {row?.amount}</span>
      ),
    },
    {
      header: "Date",
      accessor: "date",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt)?.toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Action",
      exportable: false,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-1 text-xs font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => handleApproveReject(row?._id, "approve")}
          >
            Approve
          </button>
          <button
            className="px-4 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => handleApproveReject(row?._id, "reject")}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];
  return (
    <DataTable
      title="Pending Withdrawal Request"
      columns={columns}
      data={allWithdrawalRequests}
      pageSize={10}
    />
  );
};

export default WithdrawalRequest;
