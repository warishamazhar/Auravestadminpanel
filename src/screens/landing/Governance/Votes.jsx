import React from "react";
import SearchComponent from "../../../components/Global/SearchComponent";
import CardComponent from "../../../components/Global/CardComponent";
import TableComponent from "../../../components/Global/TableComponent";

const Votes = () => {
  const topCards = [
    {
      name: "Votes",
      value1: "(+) 20,563,318",
      value2: "Rockblack",
      subHead: "Real-time total votes this round",
      subHead2: "Most votes gained this round",
    },
    {
      name: "My Account",
      value1: "0",
      value2: "0/0",
      value3: "0",
      subHead: "Available POX Balance",
      subHead2: "Available Votes / Total Votes",
      subHead3: "Claimable YUM Rewards",
      showButton: true,
    },
  ];
  const columns1 = [
    "SR. NO.",
    "Address",
    "Vote Percentage",
    "Productivity",
    "Reward Distributed",
    "APR",
    "My Votes",
  ];

  const rows = [
    ["1", "Rockblack", "5.67", "4.03", "20%", "6.77", "0"],
    ["2", "sendbox", "4.01", "3.96", "0%", "8.77", "0"],
    ["3", "Blockdot", "5.01", "4.96", "30%", "10.77", "0"],
    ["4", "Poxex", "3.28", "3.96", "7%", "7.68", "0"],
  ];
  return (
    <div className="space-y-10">
      <SearchComponent />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>
      <TableComponent columns={columns1} rows={rows} />
    </div>
  );
};

export default Votes;
