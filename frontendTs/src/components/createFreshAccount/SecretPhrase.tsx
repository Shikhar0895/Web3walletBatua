import React from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { toast } from "@/ui/hooks/use-toast";
import { CopyIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { sendData } from "@/utils";

const SecretPhrase = ({ IsPhraseCopied }) => {
  const mnemonic = generateMnemonic();
  const navigate = useNavigate();
  const enc = new TextEncoder();
  const copyPhrase = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(mnemonic);
    toast({
      description: "Phrase copied successfully",
    });
  };
  return (
    <>
      <div className="border-2 border-gray-600  p-5 rounded-xl max-w-[60%] sm:w-[40%]  mx-auto my-9 ">
        <h1>Secret Phrase:</h1>
        <div className="flex flex-wrap gap-4">
          {mnemonic
            .toString()
            .split(" ")
            .map((word, __index) => {
              return (
                <span
                  className="px-4 py-2 rounded-xl bg-gray-400 text-white"
                  key={__index}
                >{`${__index + 1}.${word}`}</span>
              );
            })}
        </div>

        <div className="my-5 flex justify-between">
          <div
            className="text-center  px-4 py-2 bg-white text-gray-800 rounded-[8px] flex items-center gap-3 cursor-pointer"
            onClick={copyPhrase}
          >
            Copy Phrase
            <CopyIcon />
          </div>
          <button
            className="btn-primary "
            onClick={() => {
              let seed = null;
              IsPhraseCopied();
              navigate("/dashboard");
              localStorage.setItem("mnemonic", mnemonic);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SecretPhrase;
