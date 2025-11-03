import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import PlanCard from "../../components/Screen/UserPanel/PlanCard";
import {
  getAllPackageBuyers,
  getPackageInfoAdmin,
  updatePackageAdmin,
} from "../../api/admin.api";
import { getMoneySymbol } from "../../utils/additionalFunc";
import { toast } from "react-toastify";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { useLocation } from "react-router-dom";

const ManagePackage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const location = useLocation();
  const data = location?.state;

  const [allPackageBuyers, setAllPackageBuyers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    min: "",
    max: "",
    profitPercentage: "",
    tags: "",
    status: true,
  });

  const staticPlans = [
    {
      id: 1,
      title: "BASIC Plan",
      min: 50,
      max: 1000,
      profitPercentage: 8,
      limit: "Up to 3X",
      recommended: false,
      features: [
        "8% return on investment",
        "Investment range: $50 – $1000",
        "Profit limit: Up to 3X",
        "Limited support",
        "Basic access to features",
      ],
    },
    {
      id: 2,
      title: "STANDARD Plan",
      min: 1010,
      max: 5000,
      profitPercentage: 10,
      limit: "Up to 3X",
      recommended: true,
      features: [
        "10% return on investment",
        "Investment range: $1010 – $5,000",
        "Profit limit: Up to 3X",
        "Priority support",
        "Access to premium features",
      ],
    },
    {
      id: 3,
      title: "PREMIUM Plan",
      min: 5100,
      max: Infinity,
      profitPercentage: 12,
      limit: "Up to 3X",
      recommended: false,
      features: [
        "12% return on investment",
        "Investment range: $5,100 & Above",
        "Profit limit: Up to 3X",
        "24/7 support",
        "Full access to all features",
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);

    setFormData({
      title: plan.title || "",
      min: plan.min || "",
      max: plan.max === Infinity ? "" : plan.max || "",
      profitPercentage: plan.profitPercentage || "",
      tags: extractTags(plan.features) || "",
      status: extractStatus(plan.features),
      perDayRoi: plan.perDayRoi || "",
    });
  };

  const extractTags = (features) => {
    const tagLine = features.find((f) => f.startsWith("Tags:"));
    return tagLine ? tagLine.replace("Tags: ", "") : "";
  };

  const extractStatus = (features) => {
    const statusLine = features.find((f) => f.startsWith("Status:"));
    return statusLine?.includes("Active") ?? true;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setFormData({
      title: "",
      min: "",
      max: "",
      profitPercentage: "",
      tags: "",
      status: true,
      perDayRoi: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchPackageInfo = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getPackageInfoAdmin();
      const rawPlans = response?.data;

      if (!rawPlans || !Array.isArray(rawPlans)) {
        setPlans(staticPlans);
        return;
      }

      const transformedPlans = rawPlans.map((plan) => ({
        _id: plan._id,
        id: plan.id,
        title: plan.title,
        min: plan.minAmount,
        max: plan.maxAmount,
        profitPercentage: plan.percentage,
        recommended: plan.title.toLowerCase() === "standard",
        perDayRoi: plan.perDayRoi ?? 0,
        status: plan.status,
        features: [
          `${plan.percentage}% return on investment`,
          `Investment range: ${getMoneySymbol()}${plan.minAmount} – ${
            plan.maxAmount === Infinity
              ? "∞"
              : getMoneySymbol() + plan.maxAmount
          }`,
          `Tags: ${plan.tags.join(", ")}`,
          `Status: ${plan.status ? "Active" : "Inactive"}`,
          `Per day ROI: $ ${plan?.perDayRoi}`,
        ],
      }));

      setPlans(transformedPlans);
    } catch (error) {
      console.error("Error fetching package info:", error);
      setPlans(staticPlans);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPackageInfo();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      minAmount: parseFloat(formData.min),
      maxAmount: formData.max === "" ? Infinity : parseFloat(formData.max),
      percentage: parseFloat(formData.profitPercentage),
      tags: formData.tags.split(",").map((t) => t.trim()),
      status: formData.status,
      perDayRoi: parseFloat(formData.perDayRoi) || 0,
    };

    try {
      dispatch(setLoading(true));
      const res = await updatePackageAdmin(selectedPlan._id, payload);
      if (res?.success) {
        toast.success(res?.message || "Plan updated successfully!");
        handleCloseModal();
        fetchPackageInfo();
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Failed to update plan:", error);
      toast.error("Failed to update plan. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchAllPackageBuyersHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllPackageBuyers();
      if (response?.success) {
        setAllPackageBuyers(response?.data?.history || []);
      } else {
        toast.error(response?.message || "Something went wrong");
        setAllPackageBuyers([]);
      }
    } catch (err) {
      console.error("Error fetching package buyers: ", err);
      setAllPackageBuyers([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllPackageBuyersHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allPackageBuyers.filter((item) => isToday(new Date(item.createdAt)))
      : allPackageBuyers;

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
    },
    // {
    //   header: "From User",
    //   accessor: "fromUser.username",
    //   cell: (row) => (
    //     <span className="font-medium text-white">{row?.fromUser?.username || "-"}</span>
    //   ),
    // },
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
      header: "ReferralIncome",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.income}
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

  return (
    <div className="space-y-8 pt-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Investment Plans</h1>
        <p className="text-slate-400 mt-1">
          Choose a plan that fits your strategy and start earning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelectPlan}
            isAdmin={true}
          />
        ))}
      </div>

      <DataTable
        title="Recent Package Investors"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Plan</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div className="space-y-2">
                <span className="text-sm text-slate-400">Title</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Plan Title"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-400">
                  Minimum Investment
                </span>
                <input
                  type="number"
                  name="min"
                  value={formData.min}
                  onChange={handleFormChange}
                  placeholder="Minimum Amount"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-400">
                  Maximum Investment
                </span>
                <input
                  type="number"
                  name="max"
                  value={formData.max}
                  onChange={handleFormChange}
                  placeholder="Maximum Amount"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-400">
                  Profit Percentage
                </span>
                <input
                  type="number"
                  name="profitPercentage"
                  value={formData.profitPercentage}
                  onChange={handleFormChange}
                  placeholder="Profit Percentage"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-400">
                  Package Description (separated by comma)
                </span>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="Tags (comma separated)"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-400">ROI per day</span>
                <input
                  type="number"
                  name="perDayRoi"
                  value={formData.perDayRoi}
                  onChange={handleFormChange}
                  placeholder="Per Day ROI"
                  className="w-full p-2 rounded border bg-slate-800 text-white"
                />
              </div>
              <label className="flex items-center text-white gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleFormChange}
                />
                Active
              </label>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-slate-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackage;
