/* eslint-disable react/prop-types */
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { NumberFormatCommas } from "../../utils/FormatText";

const Transactions = ({ history }) => {
  const columns = [
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => <span className="font-medium text-hero-primary">{row?._id}</span>,
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => <span className="text-hero-secondary">{row?.type}</span>,
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => {
        return row?.type === "investment" ? (
          <span className="font-semibold text-stat-active">
            <NumberFormatCommas value={row?.amount} />
          </span>
        ) : (
          <span className="font-semibold text-red-400">
            <NumberFormatCommas value={row?.investment} />
          </span>
        );
      },
    },
    {
      header: "Date",
      accessor: "date",
      cell: (row) => (
        <span className="text-hero-secondary">{new Date(row?.createdAt)?.toLocaleDateString()}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      className: "text-center",
      cell: (row) => {
        return row.status === "Processing" ? (
          <span className="px-2 py-1 text-xs font-semibold text-chamoisee bg-chamoisee/20 rounded-full border border-chamoisee/30">
            {row.status}
          </span>
        ) : row.status === "Cancelled" ? (
          <span className="px-2 py-1 text-xs font-semibold text-red-200 bg-red-500/20 rounded-full border border-red-500/30">
            {row.status}
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold text-stat-active bg-stat-active/20 rounded-full border border-stat-active/30">
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <DataTable
      title="Transactions"
      columns={columns}
      data={history}
      pageSize={10}
    />
  );
};

export default Transactions;