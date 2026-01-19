import api from '../axios';

const API_URL = '/timesheets';

const getEmployeeTimesheets = async (month, year) => {
  const response = await api.get(API_URL, { 
    params: { month, year } 
  });
  return response.data;
};

// --- FIX IS HERE ---
const createTimesheet = async (timesheetData) => {
  // REMOVED manual header configuration
  const response = await api.post(API_URL, timesheetData);
  return response.data;
};
// -------------------

const getTimesheetById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

const getAllTimesheets = async (month, year) => {
  const response = await api.get(`${API_URL}/all`, {
    params: { month, year }
  });
  return response.data;
};

const updateTimesheetStatus = async (id, updateData) => {
  // If you are sending files here too, remove headers as well
  const response = await api.put(`${API_URL}/${id}/status`, updateData);
  return response.data;
};

export default {
  getEmployeeTimesheets,
  createTimesheet,
  getTimesheetById,
  getAllTimesheets,
  updateTimesheetStatus
};