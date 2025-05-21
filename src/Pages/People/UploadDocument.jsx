import { useState } from "react";
import { Drawer, TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const UploadDocument = ({ onCreate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

  const toggle = (open) => () => setDrawerOpen(open);

  const handleSubmit = () => {
    if (!folderName.trim()) {
      toast.error("Folder name is required");
      return;
    }
    onCreate({
      name: folderName,
      file: "",
      createdAt: new Date().toISOString(),
    });
    setFolderName("");
    setDrawerOpen(false);
  };

  return (
    <>
       <div className="min-h-screen bg-primary p-4 m-6 rounded-lg shadow-md ">
         <div className="flex flex-col sm:flex-row sm:items-center mb-5 space-y-2 sm:space-y-0 sm:space-x-4 justify-between bg-white rounded-lg px-8 py-4">

           <div className="flex items-center space-x-4">
              <label className="text-sm text-heading">Show</label>
              <select className="text-sm px-2 py-1 text-heading bg-secondary rounded-md shadow-md">
                <option className="text-gray-700">10</option>
                <option className="text-gray-700">25</option>
                <option className="text-gray-700">50</option>
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
         </div>
       </div>
    </>
  );
};

export default UploadDocument;
