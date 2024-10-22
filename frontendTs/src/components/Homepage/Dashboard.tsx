import { useAuth } from "@/contexts/AuthContext";
import {
  BlockchainProvider,
  useBlockchain,
} from "@/contexts/BlockchainContext";
import Navbar from "./Navbar";
import WalletInfo from "./WalletInfo";
import { Toaster } from "@/ui/components/toaster";
import { generateKeysFromSeed } from "@/utils";
import { useState } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const { clear } = useBlockchain();
  const flag = localStorage.getItem("flag");
  const [wallets, setWallets] = useState([]);
  const seed = true;

  console.log();
  return (
    <div className="min-w-[80%] min-h-[80%]">
      <Navbar logout={logout} clear={clear} />
      <div className="flex flex-col items-center">
        <div className="sm:w-[50%] w-[80%]  bg-white border-[1px] border-white bg-opacity-10 rounded-full p-6 mx-auto mb-5 flex justify-between items-center">
          <div className="px-4 py-2 bg-white text-gray-950 rounded-full">
            A{1}
          </div>
          <div
            className="px-4 py-2 bg-white text-gray-950 rounded-[16px] hover:bg-slate-950 hover:text-white cursor-pointer"
            onClick={() => {
              console.log(wallets.length);
              const newlyGeneratedKeys = generateKeysFromSeed(
                wallets.length + 1,
                wallets.length + 1,
                localStorage.getItem("coinType"),
                localStorage.getItem("mnemonic")
              );
              setWallets((prev) => [...prev, newlyGeneratedKeys]);
              console.log(wallets);
              console.log(newlyGeneratedKeys);
            }}
          >
            Wallet +
          </div>
        </div>
        {seed && (
          <div className="flex w-[90%] flex-wrap items-center justify-center gap-4">
            {wallets.map((w, index) => (
              <WalletInfo
                key={Math.round(Math.random() * 100)}
                data={w}
                index={index}
              />
            ))}
          </div>
        )}

        {/* <div>Enter Seed Phrase to retrieve your wallets</div> */}
      </div>
    </div>
  );
};

export default Dashboard;
