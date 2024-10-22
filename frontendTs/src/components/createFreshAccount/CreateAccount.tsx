import React, { useState } from "react";
import SelectNetwork from "./SelectNetwork";
import SecretPhrase from "./SecretPhrase";
import { useAuth } from "@/contexts/AuthContext";
import { useBlockchain } from "@/contexts/BlockchainContext";

const CreateAccount = () => {
  const { logout } = useAuth();
  const { clear } = useBlockchain();
  const [IsNetworkSelected, setIsNetworkSelected] = useState(false);
  const [IsPhraseCopied, setIsPhraseCopied] = useState(false);

  return (
    <>
      {!IsNetworkSelected && (
        <SelectNetwork isNetworkSelected={() => setIsNetworkSelected(true)} />
      )}

      {IsNetworkSelected && !IsPhraseCopied && (
        <SecretPhrase IsPhraseCopied={() => setIsPhraseCopied(true)} />
      )}
    </>
  );
};

export default CreateAccount;
