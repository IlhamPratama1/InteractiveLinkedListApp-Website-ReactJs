import { Routes, Route } from "react-router-dom";
import Home from './views/home';
import Navbar from "./views/template/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
