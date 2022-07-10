// Lib
import { Routes, Route } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';

// React Component
import Home from './views/home';
import LoginView from "./views/auth/loginView";
import RegisterView from "./views/auth/registerView";
import DashboardView from "./views/dashboard";
import EditorView from "./views/editor";
import OauthGoogleView from "./views/auth/oauthGoogle";

// Css
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserView>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/google/oauth/" element={<OauthGoogleView />} />
          <Route path="/dashboard/*" element={<DashboardView />} />
          <Route path="/editor/:type/:encodedId" element={<EditorView />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <div className="flex h-screen">
          <h1 className="m-auto font-roboto text-ls font-bold text-center">please open in desktop browser</h1>
        </div>
      </MobileView>
    </div>
  );
}

export default App;
