import Form from "./Form";
import { OrbitingCirclesDemo } from "../customeUi/OrbitCircle";
import { Toaster } from "@/ui/components/toaster";
import SignInForm from "./SigninForm";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

const FormScreen = () => {
  const [mode, setMode] = useState<"signup" | "signin">("signin");
  return (
    <div>
      <h1 className="text-center my-5">Welcome to Batua</h1>
      {/* <button onClick={() => setMode("signin")}>Signin</button>
      <button onClick={() => setMode("signup")}>Signin</button> */}

      {mode === "signin" ? (
        <SignUpForm setMode={setMode} mode={mode} />
      ) : (
        <SignInForm setMode={setMode} mode={mode} />
      )}
      <div className="absolute -z-10 -top-[180px] -left-[200px] w-[600px] overflow-clip ">
        <OrbitingCirclesDemo />
      </div>
      <div className="absolute -z-10 -bottom-[0px] -right-0 w-[500px] h-[500px] overflow-clip">
        <OrbitingCirclesDemo />
      </div>
    </div>
  );
};
export default FormScreen;
