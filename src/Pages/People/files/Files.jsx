

 
import React, { useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import Folder from "./Folder"; // Make sure the path is correct
 
const Files = ({ data = [
  {
    name: "Front end development",
    sharedBy: "Brad Mason",
    sharedOn: "06/09/2022",
    category: "Transfer Bank",
  },
  {
    name: "UI Templates",
    sharedBy: "Sanderson",
    sharedOn: "25/09/2022",
    category: "Cash on Delivery",
  },
  {
    name: "Approval for design",
    sharedBy: "Jun Redfern",
    sharedOn: "04/10/2022",
    category: "Transfer Bank",
  },
  {
    name: "Start dates of upcoming",
    sharedBy: "Miriam Kidd",
    sharedOn: "17/10/2022",
    category: "Transfer Bank",
  },
  {
    name: "UI/UX",
    sharedBy: "Dominic",
    sharedOn: "24/10/2022",
    category: "Cash on Delivery",
  },
  {
    name: "HTML CSS Files",
    sharedBy: "Shanice",
    sharedOn: "01/11/2022",
    category: "Transfer Bank",
  },
  {
    name: "Bootstrap document",
    sharedBy: "Poppy-Rose",
    sharedOn: "22/11/2022",
    category: "Transfer Bank",
  },
] }) => {
  const [activeTab, setActiveTab] = useState("sharedWithMe");
  const [searchTerm, setSearchTerm] = useState("");
 
  const filteredData = data.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-md w-full">
      {/* Tabs */}
      <div className="flex space-x-2 bg-white rounded-lg overflow-hidden mb-4 w-fit">
        <button
          onClick={() => setActiveTab("sharedWithMe")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "sharedWithMe"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Shared with me
        </button>
 
        <button
          onClick={() => setActiveTab("sharedWithRole")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "sharedWithRole"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Shared with My Role
        </button>
      </div>
 
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Show</label>
          <select className="text-sm border rounded px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm">entries</span>
        </div>
 
        <input
          type="text"
          placeholder=" Search..."
          className="border px-3 py-1.5 rounded w-full sm:w-64 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
 
      {/* Conditional Rendering */}
      {activeTab === "sharedWithMe" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left py-2 px-4">Files</th>
                <th className="text-left py-2 px-4">Shared by</th>
                <th className="text-left py-2 px-4">Shared on</th>
                <th className="text-left py-2 px-4">Category</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                >
                  <td className="py-2 px-4">{data.name}</td>
                  <td className="py-2 px-4">{data.sharedBy}</td>
                  <td className="py-2 px-4">{data.sharedOn}</td>
                  <td className="py-2 px-4">{data.category}</td>
                  <td className="py-2 px-4 flex items-center space-x-2">
                    <button title="View">
                      <FiEye className="text-lg text-purple-600" />
                    </button>
                    <button title="Download">
                      <FiDownload className="text-lg text-green-600" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Folder activeTab="sharedWithRole" search={searchTerm} />
      )}
    </div>
  );
};
 
export default Files;
 
 