import React, { useState } from "react";
import SearchComponent from "../../../components/Global/SearchComponent";
import CardComponent from "../../../components/Global/CardComponent";
import { FaFileInvoice } from "react-icons/fa";
import { RiContractFill } from "react-icons/ri";
import TableComponent from "../../../components/Global/TableComponent";

const Contracts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const topCards = [
    {
      name: "Contracts",
      icon: <FaFileInvoice />,
      value1: "250,032",
      value2: "100%",
      subHead2: "Yesterday",
    },
    {
      name: "Verified Contracts",
      icon: <RiContractFill />,
      value1: "250,032",
      value2: "726",
      subHead: "Yesterday",
    },
  ];
  const columns1 = [
    "S.No.",
    "Contract Name",
    "Number of Calls",
    "Contract Address",
    "Version",
    "License",
    "Created On",
  ];
  const rows1 = [
    [
      "1",
      "Uvi Token",
      "6,290,929",
      "9bd217...a90d50",
      "pollux_v0.8.18+commit.f18bedfe",
      "MIT license",
      "2024-09-26",
    ],
    [
      "2",
      "Uvi Token",
      "6,290,929",
      "9bd217...a90d50",
      "pollux_v0.8.18+commit.f18bedfe",
      "MIT license",
      "2024-09-26",
    ],
    [
      "3",
      "Uvi Token",
      "6,290,929",
      "9bd217...a90d50",
      "pollux_v0.8.18+commit.f18bedfe",
      "MIT license",
      "2024-09-26",
    ],
    [
      "4",
      "Uvi Token",
      "6,290,929",
      "9bd217...a90d50",
      "pollux_v0.8.18+commit.f18bedfe",
      "MIT license",
      "2024-09-26",
    ],
  ];
  const columns2 = [
    "S.No.",
    "Number of Calls",
    "Contract Address",
    "Created On",
    "Verified On",
  ];
  const rows2 = [
    [
      "1",
      "pollux_v0.8.18+commit.f18bedfe",
      "483,355",
      "2024-09-26",
      "2025-09-21",
    ],
    [
      "2",
      "pollux_v0.8.18+commit.f18bedfe",
      "483,355",
      "2024-09-26",
      "2025-09-21",
    ],
    [
      "3",
      "pollux_v0.8.18+commit.f18bedfe",
      "483,355",
      "2024-09-26",
      "2025-09-21",
    ],
  ];
  const buttonNames = ["Verified Contracts", "All Contracts"];
  const handleTabSwitch = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="space-y-10">
      <SearchComponent />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
        ) : (
          <TableComponent columns={columns2} rows={rows2} />
        )}
      </div>
    </div>
  );
};

export default Contracts;
