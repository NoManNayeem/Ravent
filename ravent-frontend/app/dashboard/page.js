// app/dashboard/page.js

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineUpload,
  HiOutlineLogout,
} from "react-icons/hi";
import api from "../../lib/api";

export default function DashboardPage({ className = "" }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    api
      .get("/accounts/profile/")
      .then((res) => {
        setUsername(res.data.username);
        fetchFiles();
      })
      .catch(() => {
        localStorage.clear();
        router.push("/login");
      });
  }, [router]);

  const fetchFiles = async () => {
    try {
      const { data } = await api.get("/agenticai/files/");
      setFiles(data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    const fileField = fileInputRef.current;
    if (!fileField.files.length) {
      setError("Please select a file to upload.");
      return;
    }
    const file = fileField.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      await api.post("/agenticai/files/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fileField.value = "";
      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file. Ensure it's PDF, DOCX, or TXT.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/agenticai/files/${id}/`);
      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleProcess = (file) => {
    // Placeholder for processing logic
    alert(`Processing file: ${file.file}`);
  };

  return (
    <section
      className={`
        flex justify-center
        bg-[var(--color-bg)]
        py-24
        min-h-[calc(100vh-64px)]
        animate-fadeIn
        ${className}
      `}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-[var(--color-text)]">
              Welcome, {username}
            </h2>
            <button
              onClick={handleLogout}
              className="flex items-center text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              <HiOutlineLogout className="h-5 w-5 mr-1" />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* File Upload Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4 flex items-center">
              <HiOutlineUpload className="h-6 w-6 mr-2 text-[var(--color-accent)] animate-bounce" />
              Upload a File
            </h3>
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="block w-full sm:w-auto text-sm text-[var(--color-text)]
                  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                  file:text-sm file:font-medium file:bg-[var(--color-primary)] file:text-white
                  hover:file:bg-[var(--color-primary)]/90 transition-colors"
              />
              <button
                type="submit"
                disabled={uploading}
                className={`
                  bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white
                  font-medium rounded-lg px-6 py-2
                  shadow-lg hover:shadow-2xl
                  transition-transform transition-shadow duration-300
                  transform hover:-translate-y-0.5
                  ${uploading ? "opacity-60 cursor-not-allowed" : ""}
                `}
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </form>
          </div>

          {/* Files Table */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              Your Files
            </h3>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Filename
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Uploaded At
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-4 text-center text-sm text-gray-500">
                        No files uploaded yet.
                      </td>
                    </tr>
                  ) : (
                    files.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-[var(--color-text)] border-b">
                          {file.file.split("/").pop()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 border-b">
                          {new Date(file.uploaded_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center space-x-4 border-b">
                          <button
                            onClick={() => handleProcess(file)}
                            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                            title="Process File"
                          >
                            <HiOutlinePlay className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete File"
                          >
                            <HiOutlineTrash className="h-5 w-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
