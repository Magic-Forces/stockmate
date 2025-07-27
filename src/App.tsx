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

function App() {
  return (
    <main className="flex min-h-screen bg-gray-900 text-white font-space-grotesk select-none">
      <aside className="w-50 bg-gray-800 p-6">
        <div className="flex flex-col h-full justify-between">
          <div>
            <NavLink
              to="/"
              className="block text-2xl font-bold mb-1 text-center"
            >
              Stockmate
            </NavLink>
            <hr className="border-gray-700 mb-6" />
            <nav className="space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 cursor-pointer hover:text-blue-400 ${
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
                  `flex items-center gap-2 cursor-pointer hover:text-blue-400 ${
                    isActive ? "text-blue-400 font-semibold" : "text-gray-300"
                  }`
                }
              >
                <FaCloudUploadAlt />
                <span>Services</span>
              </NavLink>
            </nav>
          </div>

          <div className="space-y-4">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer hover:text-blue-400 ${
                  isActive ? "text-blue-400 font-semibold" : "text-gray-300"
                }`
              }
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>{" "}
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer hover:text-blue-400 ${
                  isActive ? "text-blue-400 font-semibold" : "text-gray-300"
                }`
              }
            >
              <FaQuestionCircle />
              <span>Help</span>
            </NavLink>
          </div>
        </div>
      </aside>
      <section className="flex-1">
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
