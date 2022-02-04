import { Routes, Route } from "react-router-dom";
import Home from './views/home';
import Navbar from "./views/template/navbar";
import LoginView from "./views/auth/loginView";
import RegisterView from "./views/auth/registerView";
import DashboardView from "./views/dashboard";
import StructView from "./views/struct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/struct/:type/:listid" element={<StructView />} />
      </Routes>
    </div>
  );
}

export default App;
