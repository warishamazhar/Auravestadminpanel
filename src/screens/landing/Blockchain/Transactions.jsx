import React from "react";
import CardComponent from "../../../components/Global/CardComponent";
import { GiTrade } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import TableComponent from "../../../components/Global/TableComponent";
import SearchComponent from "../../../components/Global/SearchComponent";

const Transactions = () => {
  const topCards = [
    {
      name: "Txn Count",
      icon: <GiTrade />,
      value1: "14,968,183",
      value2: "+17,977",
    },
    {
      name: "Trading Volume",
      icon: <RiStockFill />,
      value1: "13,921,012",
      value1sum: "= 13,921,012",
      value2: "4,890.20",
      value2sum: "= $233.10",
    },
  ];
  const columns = [
    "Block",
    "Hash",
    "Time",
    "Type",
    "From",
    "To",
    "Token",
    "Method Invoked",
    "Amount/Action",
    "Result",
  ];
  const rows = [
    [
      "13,919,739",
      "9bd217...a90d50",
      "3 seconds ago",
      "Transfer POX",
      "Governance",
      "pionex",
      "YUM",
      "Transfer",
      "0.2 YUM",
      "Success",
    ],
    [
      "13,919,739",
      "9bd217...a90d50",
      "3 seconds ago",
      "Transfer POX",
      "Governance",
      "pionex",
      "YUM",
      "Transfer",
      "0.2 YUM",
      "Success",
    ],
    [
      "13,919,739",
      "9bd217...a90d50",
      "3 seconds ago",
      "Transfer POX",
      "Governance",
      "pionex",
      "YUM",
      "Transfer",
      "0.2 YUM",
      "Success",
    ],
    [
      "13,919,739",
      "9bd217...a90d50",
      "3 seconds ago",
      "Transfer POX",
      "Governance",
      "pionex",
      "YUM",
      "Transfer",
      "0.2 YUM",
      "Success",
    ],
  ]
  return (
    <div className="space-y-10">
      <SearchComponent />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>

      <TableComponent columns={columns} rows={rows} />
    </div>
  );
};

export default Transactions;
