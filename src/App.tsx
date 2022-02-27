import { Routes, Route } from "react-router-dom";
import Home from './views/home';
import LoginView from "./views/auth/loginView";
import RegisterView from "./views/auth/registerView";
import DashboardView from "./views/dashboard";
import EditorView from "./views/editor";
import QuestView from "./views/quest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard/*" element={<DashboardView />} />
        <Route path="/quest" element={<QuestView />} />
        <Route path="/editor/:encodedId" element={<EditorView />} />
      </Routes>
    </div>
  );
}

export default App;
