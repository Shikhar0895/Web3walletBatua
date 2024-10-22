import {
  fetchData,
  generateKeys,
  generateKeysFromSeed,
  getDataFromLocalStorage,
} from "@/utils";
import { API_URL } from "@/utils/constants";
import React, { useState, useEffect } from "react";

type keyPairState = { privKey: string; pubKey: string } | null;

interface KeyPairReturnType {
  data: keyPairState;
  loading: boolean;
}

const useGenerateKeyPair = (): KeyPairReturnType => {
  const [data, setData] = useState<keyPairState>(null);
  const [loading, setLoading] = useState(true);

  const flagValue = getDataFromLocalStorage("flag");

  useEffect(() => {
    let keyPairData = null;
    if (flagValue === "freshAccount") {
      keyPairData = generateKeys("0", "0");
    } else if (flagValue === "accountandWalletExist") {
      keyPairData = generateKeysFromSeed(
        "0",
        "0",
        "501",
        "fc881667e0d96afeb1508dacbe56ef05638ce8efaf8a105296397e107bd6cc2bcbb4a81cfcb8e369dc265e67bcd91582dad6e0e24ac472feee33c1d5a64e2db1"
      );
    }

    if (keyPairData) {
      setData(keyPairData);
      setLoading(false);
    }
  }, []);

  return { data, loading };
};

export default useGenerateKeyPair;

const fetchAccountsAndWalletsData = () => {
  fetchData(`${API_URL}/fetchData`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(err));
};
