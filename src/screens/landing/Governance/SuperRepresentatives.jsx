import React, { useState } from "react";
import SearchComponent from "../../../components/Global/SearchComponent";
import CardComponent from "../../../components/Global/CardComponent";
import TableComponent from "../../../components/Global/TableComponent";
import { GiVote } from "react-icons/gi";
import { RiPresentationFill } from "react-icons/ri";
import { LuBoxes } from "react-icons/lu";
import { SiTraefikproxy } from "react-icons/si";

const SuperRepresentatives = () => {
  const [activeTab, setActiveTab] = useState(0);
  const topCards = [
    {
      name: "Vote",
      icon: <GiVote />,
      value1: "0",
      value2: "00:00:00",
      subHead: "Total (Real Time)",
      subHead2: "Next Round",
    },
    {
      name: "Super Representatives",
      icon: <RiPresentationFill />,
      value1: "30",
      value2: "0",
      subHead2: "Last 30D",
    },
    {
      name: "Blocks Produced",
      icon: <LuBoxes />,
      value1: "0",
      value2: "0",
      subHead: "Max.",
      subHead2: "Min.",
    },
    {
      name: "Productivity",
      icon: <SiTraefikproxy />,
      value1: "0.00%",
      value2: "0.00%",
      subHead: "Highest",
      subHead2: "Lowest",
    },
  ];
  const columns1 = [
    "Rank",
    "Name",
    "Current Version",
    "Status",
    "Last Block",
    "Block Produced",
    "Block Missed",
    "Productivity",
    "Current Vote",
    "Vote Weightage",
    "Reward Distributed",
    "APR",
  ];
  const rows1 = [
    [
      "1",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
    [
      "2",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
    [
      "3",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
  ];
  const columns2 = [
    "Rank",
    "Name",
    "Current Version",
    "Status",
    "Last Block",
    "Block Produced",
    "Block Missed",
    "Productivity",
    "Current Vote",
    "Vote Weightage",
    "Reward Distributed",
    "APR",
  ];
  const rows2 = [
    [
      "1",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
    [
      "2",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
    [
      "3",
      "Rock Black",
      "1",
      "Success",
      "13,962,17",
      "563,025",
      "277",
      "6.86",
      "1,166,922",
      "5.67%",
      "80%",
      "6.77%",
    ],
  ];
  const columns3 = [
    "Rank",
    "Name",
    "Current Version",
    "Status",
    "Last Block",
    "Block Produced",
    "Block Missed",
    "Productivity",
    "Current Vote",
    "Vote Weightage",
    "Reward Distributed",
    "APR",
  ];
  const rows3 = [];
  const buttonNames = ["Super Representatives", "SR Partners", "SR Candidates"];
  const handleTabSwitch = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="space-y-10">
      <SearchComponent />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {topCards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>
      <div class="rounded-3xl py-4 px-9 reusable-box">
        <ul class="list-disc text-[var(--text)] text-opacity-50">
          <li class="leading-loose">
            On the POLLUX network, all POX holders can apply to be SR candidates
            and have the chance to become SRs or SR partners.
          </li>
          <li class="leading-loose">
            Any POX holder can vote for SR candidates, among which the top 27
            most-voted candidates will become SRs, while the 28th to 127th will
            become SR partners.
          </li>
          <li>
            SRs are responsible for producing blocks and packing transactions,
            for which they receive voting rewards and block rewards; SR
            partners, on the other hand, only receive voting rewards without
            performing the aforementioned two tasks.
          </li>
          <li class="leading-loose">
            All SR candidates, SR partners and SRs have the right to initiate
            proposals to modify parameters on the POLLUX network.
          </li>
        </ul>
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
        ) : (
          <TableComponent columns={columns3} rows={rows3} />
        )}
      </div>
    </div>
  );
};

export default SuperRepresentatives;
