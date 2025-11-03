import React from "react";
import TableComponent from "../../../components/Global/TableComponent";
import { GiLaurelsTrophy } from "react-icons/gi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";
import CardComponent from "../../../components/Global/CardComponent";
import SearchComponent from "../../../components/Global/SearchComponent";

const Blocks = () => {
  const columns = [
    "Block",
    "Age",
    "Producer",
    "Txn Count",
    "Consumed Energy/Bandwidth",
    "Burned YUM",
    "Block Reward",
    "Status",
  ];
  const rows = [
    [
      "#13,921,012",
      "22 seconds ago",
      "pionex",
      "0",
      "0",
      "0",
      "0.2 YUM",
      "Unconfirmed",
    ],
    [
      "#13,921,011",
      "28 seconds ago",
      "hyperpox",
      "0",
      "0",
      "0",
      "0.2 YUM",
      "Confirmed",
    ],
  ];

  const topCards = [
    {
      name: "Number of Blocks",
      icon: <TbPackages />,
      subHead: "Latest",
      value1: "13,955,077",
      value2: "+24,451",
    },
    {
      name: "Block Rewards",
      icon: <GiLaurelsTrophy />,
      value1: "13,921,012",
      value1sum: "= 13,921,012",
      value2: "4,890.20",
      value2sum: "= $233.10",
    },
    {
      name: "Stats on Burned YUM",
      icon: <FaFireFlameCurved />,
      value1: "13,921,012",
      value1sum: "= 13,921,012",
      value2: "4,890.20",
      value2sum: "= $233.10",
    },
  ];

  return (
    <div className="space-y-10">
      <SearchComponent />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>

      <div className="">
        <TableComponent columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Blocks;
