import { createContext, useContext, useState } from "react";

const BlockchainContext = createContext(undefined);

export const BlockchainProvider = ({ children }) => {
  const [blockchain, setblockchain] = useState(null);

  const solana = () => setblockchain({ coinType: "501", network: "Solana" });
  const ethereum = () => setblockchain({ coinType: "60", network: "Ethereum" });
  const polygon = () => setblockchain({ coinType: "60", network: "Polygon" });
  const clear = () => setblockchain(null);

  return (
    <BlockchainContext.Provider
      value={{ blockchain, solana, ethereum, polygon, clear }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      "useBlockchain must be used within an BlockchainContextprovider"
    );
  }
  return context;
};
