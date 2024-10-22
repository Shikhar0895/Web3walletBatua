import { useBlockchain } from "@/contexts/BlockchainContext";
import { useState } from "react";

const SelectNetwork = ({ isNetworkSelected }) => {
  const { solana, ethereum, polygon, blockchain, clear } = useBlockchain();
  const [selectedbtn, setSelectedbtn] = useState(blockchain);

  const buttons = [
    { id: 1, label: "Solana", network: solana, coinType: "501" },
    { id: 2, label: "Ethereum", network: ethereum, coinType: "60" },
    { id: 3, label: "Polygon", network: polygon, coinType: "60" },
  ];
  return (
    <div className="p-7 border-2 border-gray-600 rounded-2xl my-5 max-h-[180px] min-w-[70%] ">
      <h1>Select Network</h1>

      <div className="flex justify-between gap-6 my-5">
        <div className="flex gap-4">
          {buttons.map((btn) => {
            return (
              <button
                className={`${
                  blockchain === null
                    ? "bg-slate-800 text-white rounded-xl px-6 py-3 visible"
                    : `${
                        selectedbtn === btn.id
                          ? "bg-white text-gray-700 rounded-xl px-6 py-3 visible"
                          : "hidden"
                      }`
                } `}
                key={btn.id}
                onClick={() => {
                  btn.network();
                  localStorage.setItem("currentNw", btn.label);
                  localStorage.setItem("coinType", btn.coinType);
                  setSelectedbtn(btn.id);
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            isNetworkSelected();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default SelectNetwork;
