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
    <>
      <div className="rounded-xl p-5 border border-accent">
        <p>
          Stockmate is an application for uploading photos to stock services and
          social media platforms. The project is currently in development. You
          can report bugs and suggestions on GitHub.
        </p>
        <button
          onClick={() => openUrl("https://github.com/Magic-Forces/stockmate")}
          className="flex items-center gap-2 bg-accent hover:bg-accent-700 text-bg font-medium py-2 px-4 rounded mt-5 transition"
        >
          <FaGithub size={17} />
          View on GitHub
        </button>

        <p className="text-sm text-light-700 mt-2.5">Version: {version}</p>
      </div>
    </>
  );
}

export default Help;
