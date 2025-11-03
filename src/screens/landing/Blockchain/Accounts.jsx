import React from "react";
import SearchComponent from "../../../components/Global/SearchComponent";
import CardComponent from "../../../components/Global/CardComponent";
import TableComponent from "../../../components/Global/TableComponent";
import { RiUserStarFill } from "react-icons/ri";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

const Accounts = () => {
  const topCards = [
    {
      name: "YUM holder",
      icon: <RiUserStarFill />,
      value1: "250,032",
      value2: "100%",
      subHead2: "Percentage"
    },
    {
      name: "Number of Accounts",
      icon: <FaUserPlus />,
      value1: "250,032",
      value2: "726",
    },
    {
      name: "Active Accounts",
      icon: <FaUserCheck />,
      subHead: "Daily Active Accounts",
      value1: "955",
      value2: "+243.53%",
    },
  ];
  const columns = [
    "Account",
    "YUM Balance",
    "Percentage",
    "YUM Power",
    "TXN Count",
    "Latest TXN Time",
  ];
  const rows = [
    [
      "HPOX Swap",
      "3,913,133.59",
      "9.25",
      "0",
      "0",
      "2 minutes ago"
    ],
    [
      "pionex",
      "3,913,133.59",
      "9.25",
      "0",
      "0",
      "2 minutes ago"
    ],
    [
      "hyperpox",
      "3,913,133.59",
      "9.25",
      "0",
      "0",
      "2 minutes ago"
    ],
    [
      "gemin",
      "3,913,133.59",
      "9.25",
      "0",
      "0",
      "2 minutes ago"
    ]
  ]
  return (
    <div className="space-y-10">
      <SearchComponent />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>

      <TableComponent columns={columns} rows={rows} />
    </div>
  );
};

export default Accounts;
