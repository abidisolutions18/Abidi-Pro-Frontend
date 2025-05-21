import React, { useState } from "react";

const OpenFolderScreen = ({ folder, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => [...prev, file]);
    }
  };

  // Optional: apply search filter
  const filteredFiles = uploadedFiles.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Top bar: show entries / search / upload */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-5 space-y-2 sm:space-y-0 sm:space-x-4 justify-between bg-white rounded-lg px-8 py-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm text-heading">Show</label>
          <select className="text-sm px-2 py-1 text-heading bg-secondary rounded-md shadow-md">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-heading">entries</span>

          <input
            type="text"
            placeholder="Search..."
            className="border-0 px-3 py-1.5 rounded-md shadow-md w-full sm:w-64 text-sm bg-secondary text-description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="fileInput"
            className="bg-[#86B2AA] hover:brightness-110 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
          >
            Upload File
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Files table */}
      <div className="bg-white rounded-xl shadow p-4 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-gray-100">
              <tr>
                {["File Name", "Size (KB)", "Type"].map((h) => (
                  <th
                    key={h}
                    className="p-3 font-medium text-gray-700 border-r last:border-none border-gray-300"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{file.name}</td>
                    <td className="p-3">{(file.size / 1024).toFixed(2)}</td>
                    <td className="p-3">{file.type || "Unknown"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    No files uploaded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OpenFolderScreen;
