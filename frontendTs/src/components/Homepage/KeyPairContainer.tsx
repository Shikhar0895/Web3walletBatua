import { useEffect, useState } from "react";
import useGenerateKeyPair from "@/hooks/useGenerateKeyPair";
import KeyPairUi from "./KeyPairUi";
import { getDataFromLocalStorage, sendData } from "@/utils";
import { API_URL } from "@/utils/constants";

const KeyPairContainer = ({ data }) => {
  const [keyPairdata, setKeyPairData] = useState<{
    privKey: string;
    pubKey: string;
  }>({
    privKey: "",
    pubKey: "",
  });

  // console.log({ dataFromKeyPairContainer: data });

  // useEffect(() => {
  //   if (flag === "freshAccount") {
  //     const dataToSend = {
  //       network: localStorage.getItem("currentNw"),
  //       token: localStorage.getItem("token"),
  //       // seed: localStorage.getItem("seed"),
  //       accountIndex: 1,
  //       walletData: { addressIndex: 1 },
  //       flag: "signin",
  //     };
  //     sendData(`${API_URL}/addWallet`, dataToSend)
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((err) => console.error(err));
  //   } else return;
  // }, [data]);

  return (
    <div className="border-2 border-gray-600 w-full p-5 rounded-xl my-5 flex flex-col gap-3">
      <KeyPairUi data={data?.pubKey} label={"Public Key"} />
      <KeyPairUi data={data?.privKey} label={"Private Key"} />
    </div>
  );
};
export default KeyPairContainer;
