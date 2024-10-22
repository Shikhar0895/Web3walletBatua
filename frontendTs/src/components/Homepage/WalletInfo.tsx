import { useBlockchain } from "@/contexts/BlockchainContext";
import React, { useEffect, useState } from "react";
import KeyPairContainer from "./KeyPairContainer";
import BalanceContainer from "./BalanceContainer";
import { getDataFromLocalStorage } from "@/utils";

const WalletInfo = ({ data, index }) => {
  return (
    <div className="sectionContainer sm:w-[40%] w-[100%] ">
      <div className="flex items-center justify-between">
        <span>Wallet:{index + 1}</span>
        <span>Network:{getDataFromLocalStorage("currentNw")}</span>
      </div>
      <KeyPairContainer data={data} />
      <BalanceContainer />
    </div>
  );
};

export default WalletInfo;
