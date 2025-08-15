import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { openUrl } from "@tauri-apps/plugin-opener";
import { getVersion } from "@tauri-apps/api/app";

function Help() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  return (
    <div>
      <div className="bg-surface rounded-xl p-5 shadow-md border border-accent/40">
        <p className="text-light/85">
          Stockmate is an application for uploading photos to stock services and
          social media platforms. The project is currently in development. You
          can report bugs and suggestions on GitHub.
        </p>
        <button
          onClick={() => openUrl("https://github.com/Magic-Forces/stockmate")}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-700 text-bg font-medium py-2 px-4 rounded transition mt-2.5"
        >
          <FaGithub size={20} />
          View on GitHub
        </button>

        <p className="text-sm text-light-700 mt-5">Version: {version}</p>
      </div>
    </div>
  );
}

export default Help;
