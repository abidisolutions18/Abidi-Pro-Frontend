import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";

const TimeTracker = () => {
  // Sample data for the time tracker
  const timeSheets = [
    {
      id: "current",
      data: [
        {
          date: "10-02-2024",
          checkinTime: "3:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "7",
          status: "Approved"
        },
        {
          date: "11-02-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved"
        },
        {
          date: "12-02-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "12-02-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "12-02-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "11-02-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved"
        }
      ]
    },
    {
      id: "previous",
      data: [
        {
          date: "9-01-2024",
          checkinTime: "1:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "7",
          status: "Approved"
        },
        {
          date: "2-01-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved"
        },
        {
          date: "5-01-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "5-01-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "5-01-2024",
          checkinTime: "4:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "6",
          status: "Denied"
        },
        {
          date: "2-01-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved"
        },
        {
          date: "2-01-2024",
          checkinTime: "2:00 PM",
          checkoutTime: "10:00 PM",
          totalHours: "8",
          status: "Approved"
        }
      ]
    }
  ];

  const [activeSheet, setActiveSheet] = useState("current");

  const handleNavigation = (direction) => {
    setActiveSheet(direction === "previous" ? "previous" : "current");
  };

  const currentData = timeSheets.find(sheet => sheet.id === activeSheet)?.data || [];

  return (
    <div className="min-h-screen bg-[#dce3f0] p-4 m-6 rounded-lg shadow-md">
      {/* Time Tracker Section */}
      <div className="flex justify-between items-center mb-4 bg-gray-500 p-4 rounded-md m-6">
        <div className="mx-4">
          <h2 className="text-lg font-semibold">Time Tracker</h2>
        </div>
        
        <div className="flex items-center gap-4 mx-4">
          <button 
            className={`px-2 py-1 rounded ${activeSheet === "previous" ? "bg-gray-400 text-white" : "bg-gray-200"}`}
            onClick={() => handleNavigation("previous")}
          >
            {'<'}
          </button>
          <button className="px-2 py-1 bg-gray-200 rounded">
            <IoCalendarNumberOutline />
          </button>
          <button 
            className={`px-2 py-1 rounded ${activeSheet === "current" ? "bg-gray-400 text-white" : "bg-gray-200"}`}
            onClick={() => handleNavigation("current")}
          >
            {'>'}
          </button>
        </div>
        
        <div className="mx-4">
          <span className="text-sm">Submitted Hours | 00:00</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto m-6">
        <table className="w-full text-left text-sm bg-gray-100 rounded-md overflow-hidden">
          <thead className="bg-gray-500 text-center">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Checkin Time</th>
              <th className="px-4 py-2">Checkout Time</th>
              <th className="px-4 py-2">Total Hours</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr className="bg-white text-center" key={index}>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.checkinTime}</td>
                <td className="p-3">{item.checkoutTime}</td>
                <td className="p-3">{item.totalHours}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full ${
                    item.status === "Approved" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTracker;
  