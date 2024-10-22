import { EyeClosedIcon } from "@radix-ui/react-icons";
import { CopyIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

const KeyPairUi = ({ data, label }) => {
  const [key, setKey] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    let returnedState = showPassword ? false : true;
    setShowPassword(returnedState);
  };

  return (
    <div>
      {" "}
      <label htmlFor="public-key" className="text-lg font-semibold">
        {label}
      </label>
      <div className="flex gap-4">
        <div
          className={`flex items-center space-x-2 bg-white rounded-[8px] w-[90%]  ${
            label === "Private Key" ? "relative" : ""
          }`}
        >
          <input
            id={label}
            value={data ? data : ""}
            type={
              label === "Private Key"
                ? showPassword
                  ? "password"
                  : "text"
                : "text"
            }
            readOnly
            className={`font-mono text-sm p-4 text-gray-900 rounded-[8px] w-[80%]  `}
          />
          {label === "Private Key" ? (
            <div
              onClick={toggleShowPassword}
              className="absolute z-10 text-black cursor-pointer right-[20px] "
            >
              {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
            </div>
          ) : null}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(data);
          }}
          aria-label="Copy public key"
          className="cursor-pointer "
        >
          <CopyIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default KeyPairUi;
