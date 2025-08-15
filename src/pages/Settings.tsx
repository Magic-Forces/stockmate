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
      <div className="bg-surface rounded-xl p-5 shadow-md border border-accent/40">
        <h2 className="text-xl font-semibold text-light mb-4">
          Photo directories:
        </h2>

        <div className="flex flex-wrap gap-2 items-center mb-4">
          <input
            type="text"
            value={manualPath}
            onChange={(e) => setManualPath(e.target.value)}
            placeholder="Enter directory path..."
            className="flex-1 min-w-[200px] px-3 py-2 rounded bg-bg text-light placeholder-light-700 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={loading}
          />
          <button
            onClick={() => savePath(manualPath, true)}
            disabled={loading || !manualPath.trim()}
            className="px-4 py-2 rounded bg-accent hover:bg-accent-700 disabled:bg-surface/60 text-bg transition inline-flex items-center gap-2"
          >
            <FaPlus />
            Add
          </button>
          <button
            onClick={handleChooseFolder}
            disabled={loading}
            className="px-4 py-2 rounded bg-bg hover:brightness-110 disabled:opacity-60 text-light transition inline-flex items-center gap-2 border border-accent"
          >
            <FaFolderOpen />
            Choose
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-light-700 font-medium">
            Saved directories:
          </p>
          {savedPaths.length === 0 ? (
            <p className="text-light-700 text-sm italic">
              No directories added yet
            </p>
          ) : (
            savedPaths.map((directory) => (
              <div
                key={directory.id}
                className="flex items-center justify-between bg-bg rounded px-3 py-2"
              >
                {editingId === directory.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingPath}
                      onChange={(e) => setEditingPath(e.target.value)}
                      className="flex-1 px-2 py-1 rounded bg-surface text-light text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={loading}
                    />
                    <button
                      onClick={handleChooseFolderForEdit}
                      disabled={loading}
                      className="px-2 py-1 rounded bg-bg hover:brightness-110 disabled:opacity-60 text-light transition text-sm border border-accent"
                      title="Choose folder"
                    >
                      <FaFolderOpen size={12} />
                    </button>
                  </div>
                ) : (
                  <span className="text-light font-mono text-sm">
                    {directory.path}
                  </span>
                )}

                <div className="flex items-center gap-1 ml-2">
                  {editingId === directory.id ? (
                    <>
                      <button
                        onClick={() => updatePath(directory.id, editingPath)}
                        disabled={loading || !editingPath.trim()}
                        className="text-accent hover:text-accent-700 disabled:opacity-50 transition p-1"
                        title="Save changes"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={cancelEditing}
                        disabled={loading}
                        className="text-light/70 hover:text-light transition p-1"
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
                        className="text-accent hover:text-accent-700 disabled:opacity-50 transition p-1"
                        title="Edit path"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => removePath(directory.id)}
                        disabled={loading || editingId !== null}
                        className="text-light/70 hover:text-accent disabled:opacity-50 transition p-1"
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
