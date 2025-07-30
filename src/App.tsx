// import { invoke } from "@tauri-apps/api/core";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
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
import appIcon from "./assets/app-icon.svg";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-space-grotesk select-none">
      <nav className="border-b border-blue-400 px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex gap-2 text-2xl font-bold text-white">
          <img src={appIcon} alt="Stockmate icon" className="w-8 h-8" />
          Stockmate
        </NavLink>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : "text-gray-300"
              }`
            }
          >
            <FaPhotoVideo />
            <span>Photos</span>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : "text-gray-300"
              }`
            }
          >
            <FaCloudUploadAlt />
            <span>Services</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : "text-gray-300"
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded hover:text-blue-400 bg-gray-800 transition ${
                isActive ? "text-blue-400 bg-gray-800" : "text-gray-300"
              }`
            }
            title="Help"
          >
            <FaQuestionCircle size={18} />
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
    </div>
  );
}

export default App;
