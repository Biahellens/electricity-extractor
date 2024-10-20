import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UseMobile } from "@contexts/MobileContext";

// Pages
import Home from "@pages/Home/Home";
import Dashboard from "@pages/Dashboard/Dashboard";

// Components
import Header from "@components/Header/Header";

function App() {
  const { isMobile } = UseMobile();

  return (
    <Router>
      <div>
        <Header />
        <div
          className="main-content"
          style={{
            overflow: isMobile ? 'scroll' : '', position: isMobile ? 'relative' : "fixed",
            top: "5rem"
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route index element={<Navigate to="/home" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;