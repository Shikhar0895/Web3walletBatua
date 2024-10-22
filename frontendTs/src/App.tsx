import { Route, Routes } from "react-router-dom";
import FormScreen from "./components/FormScreen/FormScreen";
import Dashboard from "./components/Homepage/Dashboard";
import { Buffer } from "buffer";
import PrivateRoute from "./contexts/PrivateRoute";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import GeneratePhrase from "./components/createFreshAccount/CreateAccount";
import CreateAccount from "./components/createFreshAccount/CreateAccount";
import Layout from "./components/Layout";

function App() {
  window.Buffer = Buffer;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FormScreen />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;
