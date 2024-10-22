import { SyntheticEvent, useRef, useState } from "react";
import { getFormData, sendData } from "../../utils/index";
import { useToast } from "@/ui/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SigninForm, SignupForm } from "@/types";

const SignInForm = ({ setMode, mode }) => {
  const [formData, setFormData] = useState<SigninForm>({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <form
      className="formContainer"
      onSubmit={() => {
        return;
      }}
      id="signupform"
    >
      <div className="flex flex-col items-start gap-2 p-">
        <h2>Signin</h2>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="Email"
          value={formData.email}
          autoComplete="off"
          className="inputFieldStyle"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          autoComplete="off"
          className="inputFieldStyle"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-white rounded-[4px] text-gray-900 w-[65%]"
      >
        SIGNIN
      </button>
      <p>
        {`Don't have an account? ${"  "}`}
        <span
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            console.log("signin clicked");
          }}
          className="cursor-pointer text-opacity-10"
        >
          signup
        </span>
      </p>
    </form>
  );
};

export default SignInForm;
