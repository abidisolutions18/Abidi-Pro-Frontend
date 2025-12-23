import React, { useState, useEffect } from "react";
import api from "../axios";
import { toast } from "react-toastify";
 
const ApplyLeaveModal = ({ isOpen, setIsOpen, onLeaveAdded, userLeaves = {} }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [quotaError, setQuotaError] = useState("");
  const [daysRequested, setDaysRequested] = useState(0);
 
  // Calculate number of days between start and end date
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    return diffDays;
  };

  // Map leave type enum to userLeaves object key
  const getLeaveBalanceKey = (leaveType) => {
    const mapping = {
      "Paid": "paid",
      "Sick": "sick",
      "Majlis": "majlis",
      "Casual": "casual",
      "Earned": "earned",
      "Maternity": "maternity",
      "Paternity": "paternity",
      "Compensatory": "compensatory",
      "Unpaid": "unpaid"
    };
    return mapping[leaveType] || leaveType.toLowerCase();
  };

  // Validate quota whenever dates or leave type changes
  useEffect(() => {
    if (leaveType && startDate && endDate) {
      const days = calculateDays(startDate, endDate);
      setDaysRequested(days);

      // Skip validation for Unpaid leave
      if (leaveType === "Unpaid") {
        setQuotaError("");
        return;
      }

      const balanceKey = getLeaveBalanceKey(leaveType);
      const availableBalance = userLeaves[balanceKey] || 0;

      if (days > availableBalance) {
        setQuotaError(`Insufficient Leave Balance. Available: ${availableBalance} days, Requested: ${days} days`);
      } else {
        setQuotaError("");
      }
    } else {
      setDaysRequested(0);
      setQuotaError("");
    }
  }, [leaveType, startDate, endDate, userLeaves]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!leaveType || !startDate || !endDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate dates
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    // Check quota validation
    if (quotaError) {
      toast.error(quotaError);
      return;
    }
 
    try {
      const payload = {
        leaveType,
        startDate,
        endDate,
        reason,
      };
 
      await api.post("/leaves", payload);
      toast.success("Leave request submitted successfully");
      
      // Reset form
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setQuotaError("");
      setDaysRequested(0);
      
      // Close modal
      setIsOpen(false);
      
      // Trigger refresh callback if provided
      if (onLeaveAdded) {
        onLeaveAdded();
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error(error.response?.data?.message || "Failed to submit leave request");
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setQuotaError("");
      setDaysRequested(0);
    }
  }, [isOpen]);
 
  // Check if submit should be disabled
  const isSubmitDisabled = quotaError !== "" || !leaveType || !startDate || !endDate;

  // Get available balance for selected leave type
  const getAvailableBalance = () => {
    if (!leaveType || leaveType === "Unpaid") return null;
    const balanceKey = getLeaveBalanceKey(leaveType);
    return userLeaves[balanceKey] || 0;
  };

  const availableBalance = getAvailableBalance();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative z-80 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Apply for Leave</h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
 
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Leave Type*
                </label>
                <select
                  className={`w-full border-2 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    quotaError && leaveType ? "border-red-500" : "border-gray-300"
                  }`}
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="Paid">Paid Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Majlis">Majlis Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Earned">Earned Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                  <option value="Paternity">Paternity Leave</option>
                  <option value="Compensatory">Compensatory Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
                {availableBalance !== null && (
                  <p className="mt-1 text-xs text-gray-500">
                    Available balance: <span className="font-semibold text-teal-600">{availableBalance} days</span>
                  </p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date*
                </label>
                <input
                  type="date"
                  className={`w-full border-2 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    quotaError && startDate ? "border-red-500" : "border-gray-300"
                  }`}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date*
                </label>
                <input
                  type="date"
                  className={`w-full border-2 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    quotaError && endDate ? "border-red-500" : "border-gray-300"
                  }`}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
                {daysRequested > 0 && (
                  <p className="mt-1 text-xs text-gray-600">
                    Days requested: <span className="font-semibold">{daysRequested} day{daysRequested !== 1 ? 's' : ''}</span>
                  </p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Leave
                </label>
                <textarea
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for leave (optional)"
                ></textarea>
              </div>

              {/* Quota Error Message */}
              {quotaError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{quotaError}</p>
                    </div>
                  </div>
                </div>
              )}
 
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all ${
                    isSubmitDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl"
                  }`}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
 
export default ApplyLeaveModal;
 
 