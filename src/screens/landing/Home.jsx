import React, { useEffect } from "react";
import TableComponent from "../../components/Global/TableComponent";
import HomeTop from "../../components/Screen/Landing/HomeTop";
import HomeSecond from "../../components/Screen/Landing/HomeSecond";
import HomeThird from "../../components/Screen/Landing/HomeThird";
import DocSlide from "../../components/Screen/Landing/DocSlide";
import Partners from "../../components/Screen/Landing/Partners";
import Technology from "../../components/Screen/Landing/Technology";
import Convenient from "../../components/Screen/Landing/Convenient";
import Faq from "../../components/Screen/Landing/Faq";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#home") {
      const element = document.getElementById("home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  const columns = [
    "Block",
    "Hash",
    "Time",
    "Type",
    "From",
    "To",
    "Token",
    "Amount/Action",
    "Result",
  ];

  const rows = [
    [
      <a
        className="hover:text-green-500"
        href="/blockchain/block/blockdetails/13919739"
      >
        13,919,739
      </a>,
      <a
        className="truncate text-[#B3B3B3] cursor-pointer hover:text-green-500"
        href="/transactiondetails/9bd217"
      >
        9bd217...a90d50
      </a>,
      <p className="text-white text-opacity-70">3 seconds ago</p>,
      "Transfer POX",
      <a className="hover:text-green-500" href="/address-account/Governance">
        Governance
      </a>,
      <a className="hover:text-green-500" href="/">
        Governance
      </a>,
      <p className="uppercase">POX</p>,
      "45,000,000.000000",
      <p className="text-green-500 font-semibold">SUCCESS</p>,
    ],
    [
      <a
        className="hover:text-green-500"
        href="/blockchain/block/blockdetails/13919734"
      >
        13,919,734
      </a>,
      <a
        className="truncate text-[#B3B3B3] cursor-pointer hover:text-green-500"
        href="/transactiondetails/19e977"
      >
        19e977...52f023
      </a>,
      <p className="text-white text-opacity-70">24 seconds ago</p>,
      "Transfer bdog_usdt",
      <a
        className="hover:text-green-500"
        href="/address-account/PHcf59acrLY8dNWdUWhRMf3n7qJ3uMCy43"
      >
        PHcf5...MCy43
      </a>,
      <a className="hover:text-green-500" href="/">
        PGdvF...VjkCL
      </a>,
      <p className="uppercase">bdog_usdt</p>,
      "2.670630",
      <p className="text-green-500 font-semibold">SUCCESS</p>,
    ],
  ];
  return (
    <div className="md:p-6 p-4 bg-[var(--bg)] text-[var(--text)] min-h-screen space-y-5" id="home">
      <HomeTop />
      <HomeSecond />
      <HomeThird />
      <h1 className="text-2xl font-bold">Blockchain Transactions</h1>
      <div className="mb-20">
        <TableComponent columns={columns} rows={rows} />
      </div>
      <DocSlide />
      <Partners />
      <Technology />
      <Convenient />
      <Faq />
    </div>
  );
};

export default Home;
