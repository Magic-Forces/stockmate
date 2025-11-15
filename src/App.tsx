import "./App.css";
import appIcon from "/app-icon.svg";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  FaPhotoVideo,
  FaCog,
  FaQuestionCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import Photos from "./pages/Photos";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function App() {
  return (
    <main>
      <nav className="border-b border-accent px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex gap-2 text-2xl font-bold">
          <img src={appIcon} alt="Stockmate icon" className="w-8 h-8" />
          Stockmate
        </NavLink>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-light/80"
              }`
            }
          >
            <FaPhotoVideo />
            <span>Photos</span>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-light/80"
              }`
            }
          >
            <FaCloudUploadAlt />
            <span>Services</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-light/80"
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
          <NavLink
            to="/help"
            title="Help"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded bg-surface hover:text-accent ${
                isActive ? "text-accent" : "text-light/80"
              }`
            }
          >
            <FaQuestionCircle size={17} />
          </NavLink>
        </div>
      </nav>

      <section className="p-5">
        <Routes>
          <Route path="/" element={<Photos />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
