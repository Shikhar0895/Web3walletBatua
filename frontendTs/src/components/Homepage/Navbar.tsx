import { useNavigate } from "react-router-dom";

const Navbar = ({ logout, clear }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-4">
      Dashboard
      <button
        className="btn-primary"
        onClick={() => {
          clear();
          logout();
          navigate("/");
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
