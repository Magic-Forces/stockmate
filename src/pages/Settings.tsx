import { useState, useEffect } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import {
  FaFolderOpen,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Database from "@tauri-apps/plugin-sql";

interface PhotoDirectory {
  id: number;
  path: string;
  created_at: string;
}

function Settings() {
  const [manualPath, setManualPath] = useState("");
  const [savedPaths, setSavedPaths] = useState<PhotoDirectory[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPath, setEditingPath] = useState("");

  useEffect(() => {
    loadFolderPaths();
  }, []);

  const loadFolderPaths = async () => {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.select<PhotoDirectory[]>(
        "SELECT id, path, created_at FROM photo_directories ORDER BY created_at DESC"
      );
      setSavedPaths(result);
    } catch (error) {
      console.error("Error loading folder paths:", error);
    }
  };

  const savePath = async (path: string, isManual: boolean = false) => {
    if (path.trim() !== "") {
      setLoading(true);
      try {
        const db = await Database.load("sqlite:data.db");
        await db.execute("INSERT INTO photo_directories (path) VALUES (?)", [
          path.trim(),
        ]);

        await loadFolderPaths();

        if (isManual) {
          setManualPath("");
        }
      } catch (error) {
        console.error("Error saving folder path:", error);
        alert("Error saving folder path: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updatePath = async (id: number, newPath: string) => {
    if (newPath.trim() !== "") {
      setLoading(true);
      try {
        const db = await Database.load("sqlite:data.db");
        await db.execute("UPDATE photo_directories SET path = ? WHERE id = ?", [
          newPath.trim(),
          id,
        ]);

        await loadFolderPaths();
        setEditingId(null);
        setEditingPath("");
      } catch (error) {
        console.error("Error updating folder path:", error);
        alert("Error updating folder path: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removePath = async (id: number) => {
    try {
      const db = await Database.load("sqlite:data.db");
      await db.execute("DELETE FROM photo_directories WHERE id = ?", [id]);
      await loadFolderPaths();
    } catch (error) {
      console.error("Error removing folder path:", error);
      alert("Error removing folder path: " + error);
    }
  };

  const startEditing = (directory: PhotoDirectory) => {
    setEditingId(directory.id);
    setEditingPath(directory.path);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingPath("");
  };

  const handleChooseFolder = async () => {
    const selected = await open({
      multiple: false,
      directory: true,
    });

    if (typeof selected === "string") {
      await savePath(selected);
    }
  };

  const handleChooseFolderForEdit = async () => {
    const selected = await open({
      multiple: false,
      directory: true,
    });

    if (typeof selected === "string") {
      setEditingPath(selected);
    }
  };

  return (
    <div>
      <div className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Photo directories:
        </h2>

        <div className="flex flex-wrap gap-2 items-center mb-4">
          <input
            type="text"
            value={manualPath}
            onChange={(e) => setManualPath(e.target.value)}
            placeholder="Enter directory path..."
            className="flex-1 min-w-[200px] px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={() => savePath(manualPath, true)}
            disabled={loading || !manualPath.trim()}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white transition inline-flex items-center gap-2"
          >
            <FaPlus />
            Add
          </button>
          <button
            onClick={handleChooseFolder}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white transition inline-flex items-center gap-2"
          >
            <FaFolderOpen />
            Choose
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400 font-medium">
            Saved directories:
          </p>
          {savedPaths.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No directories added yet
            </p>
          ) : (
            savedPaths.map((directory) => (
              <div
                key={directory.id}
                className="flex items-center justify-between bg-gray-700 rounded px-3 py-2"
              >
                {editingId === directory.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingPath}
                      onChange={(e) => setEditingPath(e.target.value)}
                      className="flex-1 px-2 py-1 rounded bg-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <button
                      onClick={handleChooseFolderForEdit}
                      disabled={loading}
                      className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white transition text-sm"
                      title="Choose folder"
                    >
                      <FaFolderOpen size={12} />
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-200 font-mono text-sm">
                    {directory.path}
                  </span>
                )}

                <div className="flex items-center gap-1 ml-2">
                  {editingId === directory.id ? (
                    <>
                      <button
                        onClick={() => updatePath(directory.id, editingPath)}
                        disabled={loading || !editingPath.trim()}
                        className="text-green-400 hover:text-green-300 disabled:text-gray-500 transition p-1"
                        title="Save changes"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={cancelEditing}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-300 disabled:text-gray-500 transition p-1"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(directory)}
                        disabled={loading || editingId !== null}
                        className="text-blue-400 hover:text-blue-300 disabled:text-gray-500 transition p-1"
                        title="Edit path"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => removePath(directory.id)}
                        disabled={loading || editingId !== null}
                        className="text-red-400 hover:text-red-300 disabled:text-gray-500 transition p-1"
                        title="Remove directory"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Settings;
