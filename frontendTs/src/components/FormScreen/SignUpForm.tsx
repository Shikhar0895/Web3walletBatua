import { useState } from "react";

import { useToast } from "@/ui/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignupForm } from "@/types";

const SignUpForm = ({ setMode, mode }) => {
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
  };

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
        <h2>Signup</h2>

        <p className="text-gray-500">Create your account to get started</p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="Name"
          value={formData.name}
          onChange={onChangeHandler}
          autoComplete="off"
          className="inputFieldStyle"
        />

        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="Email"
          autoComplete="off"
          className="inputFieldStyle"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          className="inputFieldStyle"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-white rounded-[4px] text-gray-900 w-[65%]"
      >
        SIGNUP
      </button>
      <p>
        {`Already have an account? ${"  "}`}

        <span
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            console.log("signup clicked");
          }}
          className="cursor-pointer text-opacity-10"
        >
          SignIn
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
