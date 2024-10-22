import { SyntheticEvent, useRef, useState } from "react";
import { getFormData, sendData } from "../../utils/index";
import { useToast } from "@/ui/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { signinSchema, signupSchema } from "@/schemas";

const Form = () => {
  const [mode, setMode] = useState("signup");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    //Retrieve form data on submit event
    const data = getFormData(formRef.current);
    //vlidate data as per defined schema and store it in result
    const result =
      mode === "signup"
        ? signupSchema.safeParse(data)
        : signinSchema.safeParse(data);

    //if result.success is false then run code for handling errors
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log("Validation error", errors);
      alert("Validation errors. Check console");

      //if result.success is true then perform steps to send data to backend
    } else {
      const resp = await sendData(`http://localhost:5000/${mode}`, data);

      formRef.current.reset();

      if (mode === "signup") {
        resp.status === 201
          ? toast({
              description: `${resp.data.message}`,
            })
          : toast({
              description: `Something went wrong`,
            });
      } else {
        if (resp.status === 201) {
          // Multiple statements handled here
          if (resp.data.message === "Account and wallet already exists") {
            navigate("/dashboard");
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("flag", resp.data.flag);

            localStorage.setItem("data", JSON.stringify(resp.data.data));
            return;
          }

          login();
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("flag", resp.data.flag);

          navigate("/createAccount");
        } else {
          toast({
            description: `${resp.data.message}`,
          });
        }
      }
    }
  };

  const formRef = useRef(null);
  return (
    <form
      className="formContainer"
      onSubmit={handleSubmit}
      id="signupform"
      ref={formRef}
    >
      <div className="flex flex-col items-start gap-2 p-">
        <h2>{mode === "signup" ? "Signup" : "Signin"}</h2>
        {mode === "signup" ? (
          <>
            <p className="text-gray-500">Create your account to get started</p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="Name"
              autoComplete="off"
              className="bg-[rgba(10,10,10,0)] p-2 border-2 border-white rounded-lg mb-4"
            />
          </>
        ) : null}
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="Email"
          autoComplete="off"
          className="bg-[rgba(10,10,10,0)] p-2 border-2 border-white rounded-lg mb-4"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          className="bg-[rgba(10,10,10,0)] p-2 border-2 border-white rounded-lg mb-4"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-white rounded-[8px] text-gray-900 w-[65%]"
      >
        {mode.toUpperCase()}
      </button>
      <p>
        {mode === "signup"
          ? `Already have an account? ${"  "}`
          : `Don't have an account? ${"  "}`}
        <span
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="cursor-pointer"
        >
          {mode === "signup" ? "signin" : "signup"}
        </span>
      </p>
    </form>
  );
};

export default Form;
