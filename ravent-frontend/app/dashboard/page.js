// app/dashboard/page.js

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineUpload,
} from "react-icons/hi";
import api from "../../lib/api";

export default function DashboardPage() {
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
    // Verify token and fetch profile
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
    <section className="flex flex-col items-center bg-gray-100 py-24 min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Welcome, {username}
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <HiOutlineUpload className="h-6 w-6 mr-2 text-blue-600" />
            Upload a File
          </h3>
          {error && (
            <p className="mb-2 text-sm text-red-600">{error}</p>
          )}
          <form
            onSubmit={handleUpload}
            className="flex items-center gap-4"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200"
            />
            <button
              type="submit"
              disabled={uploading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-shadow shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </form>
        </div>

        {/* Files Table */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Files
          </h3>
          <div className="overflow-x-auto">
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
                    <td
                      colSpan={3}
                      className="px-4 py-4 text-center text-sm text-gray-500"
                    >
                      No files uploaded yet.
                    </td>
                  </tr>
                ) : (
                  files.map((file) => (
                    <tr
                      key={file.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">
                        {file.file.split("/").pop()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-b">
                        {new Date(file.uploaded_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center space-x-4 border-b">
                        <button
                          onClick={() => handleProcess(file)}
                          className="text-green-600 hover:text-green-800 transition-colors"
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
    </section>
  );
}
