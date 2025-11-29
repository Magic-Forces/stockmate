import { FaFolderOpen, FaPlus, FaTrash } from "react-icons/fa";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

function Settings() {
  const [path, setPath] = useState("");
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    fetchPaths();
  }, []);

  async function savePath() {
    try {
      await invoke("save_path", { path });
      setPath("");
      await fetchPaths();
    } catch (_) {}
  }

  async function choosePath() {
    try {
      await invoke("choose_path");
      await fetchPaths();
    } catch (_) {}
  }

  async function fetchPaths() {
    try {
      const result = await invoke<string[]>("fetch_paths");
      setPaths(result);
    } catch (_) {}
  }

  async function removePath(path: string) {
    try {
      await invoke("remove_path", { path });
      await fetchPaths();
    } catch (_) {}
  }

  return (
    <>
      <div className="rounded-xl p-5 border border-accent">
        <h2 className="text-xl font-semibold mb-2">Photo directories:</h2>

        <div className="flex gap-2 items-center mb-4">
          <input
            type="text"
            name="directoryPath"
            placeholder="Enter directory path..."
            className="flex-1 px-2 py-2 rounded placeholder-light-700 focus:outline-none ring-2 ring-accent"
            value={path}
            onChange={(e) => setPath(e.currentTarget.value)}
          />

          <button
            type="button"
            className="px-2 py-2 rounded bg-accent hover:bg-accent-700 text-bg transition flex items-center gap-2 border-2 border-accent hover:border-accent-700"
            onClick={savePath}
          >
            <FaPlus />
            Add
          </button>

          <button
            type="button"
            className="px-2 py-2 rounded hover:text-light text-light-700 transition flex items-center gap-2 border-2 border-accent"
            onClick={choosePath}
          >
            <FaFolderOpen />
            Choose
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {paths.map((p, i) => (
            <div
              key={i}
              className="px-2 py-1 rounded border border-accent/40 
                 bg-dark-700 text-light text-sm 
                 flex justify-between items-center select-text"
            >
              <span className="break-all">{p}</span>

              <button
                type="button"
                className="text-red-500 hover:text-red-700 px-2"
                onClick={() => removePath(p)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Settings;
