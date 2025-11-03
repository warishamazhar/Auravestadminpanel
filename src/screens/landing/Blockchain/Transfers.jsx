import React, { useState } from "react";
import CardComponent from "../../../components/Global/CardComponent";
import { GiTrade } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import TableComponent from "../../../components/Global/TableComponent";
import SearchComponent from "../../../components/Global/SearchComponent";

const Transfers = () => {
  const [activeTab, setActiveTab] = useState(0);
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
  const columns1 = [
    "Block",
    "Token",
    "Amount/Token ID",
    "Result",
    "Time",
    "From",
    "To",
    "Hash",
  ];
  const rows1 = [
    [
      "13,919,739",
      "YUM",
      "0.2 YUM",
      "Success",
      "3 seconds ago",
      "Governance",
      "pionex",
      "9bd217...a90d50",
    ],
    [
      "13,919,739",
      "YUM",
      "0.2 YUM",
      "Success",
      "3 seconds ago",
      "Governance",
      "pionex",
      "9bd217...a90d50",
    ],
    [
      "13,919,739",
      "YUM",
      "0.2 YUM",
      "Success",
      "3 seconds ago",
      "Governance",
      "pionex",
      "9bd217...a90d50",
    ],
    [
      "13,919,739",
      "YUM",
      "0.2 YUM",
      "Success",
      "3 seconds ago",
      "Governance",
      "pionex",
      "9bd217...a90d50",
    ],
  ];
  const columns2 = [
    "Block",
    "Hash",
    "Time",
    "Transaction Type",
    "From",
    "To",
    "Token",
    "Result",
  ];
  const rows2 = [
    [
      "13,919,739",
      "9bd217...a90d50",
      "3 seconds ago",
      "Transfer POX",
      "Governance",
      "pionex",
      "YUM",
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
      "Success",
    ],
  ];
  const columns3 = [
    "Block",
    "Token",
    "Amount/Token ID",
    "Result",
    "Time",
    "From",
    "To",
    "Hash",
  ];
  const rows3 = [];
  const columns4 = [
    "Block",
    "Token",
    "Amount/Token ID",
    "Result",
    "Time",
    "From",
    "To",
    "Hash",
  ];
  const rows4 = [];
  const buttonNames = [
    "PRC20 Transfers",
    "YUM Transfers",
    "YUM721 Transfers",
    "YUM1155 Transfers",
  ];
  const handleTabSwitch = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="space-y-10">
      <SearchComponent />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-center gap-5">
          {buttonNames.map((name, index) => (
            <button
              key={index}
              className={`border cursor-pointer py-2 px-4 rounded flex items-center space-x-2 transition-colors duration-200
      ${
        activeTab === index
          ? "bg-[var(--btn-hover-bg)] text-[var(--btn-hover-text)] border-[var(--btn-hover-bg)]"
          : "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--border-color)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-text)]"
      }
    `}
              onClick={() => handleTabSwitch(index)}
            >
              <span className="whitespace-nowrap">{name}</span>
            </button>
          ))}
        </div>
        {activeTab === 0 ? (
          <TableComponent columns={columns1} rows={rows1} />
        ) : activeTab === 1 ? (
          <TableComponent columns={columns2} rows={rows2} />
        ) : activeTab === 2 ? (
          <TableComponent columns={columns3} rows={rows3} />
        ) : (
          <TableComponent columns={columns4} rows={rows4} />
        )}
      </div>
    </div>
  );
};

export default Transfers;
