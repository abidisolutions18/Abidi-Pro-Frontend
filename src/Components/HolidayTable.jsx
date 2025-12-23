import { useEffect, useState } from 'react';
import holidayApi from '../api/holidayApi';

const HolidayTable = ({ searchTerm = "" }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data = await holidayApi.getAllHolidays();
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  const today = new Date();
  const isMatch = (holiday) => {
    const s = searchTerm.toLowerCase();
    return (
      holiday.holidayName.toLowerCase().includes(s) ||
      holiday.day.toLowerCase().includes(s) ||
      new Date(holiday.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).toLowerCase().includes(s)
    );
  };

  const upcomingHolidays = holidays
    .filter(h => new Date(h.date) >= today)
    .filter(isMatch)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastHolidays = holidays
    .filter(h => new Date(h.date) < today)
    .filter(isMatch)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderTable = (title, data) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-500">{title}</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
            <tr>
              {["Date", "Day", "Holiday Name", "Type"].map((header, index) => (
                <th
                  key={header}
                  className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${
                    index !== 3 ? "border-r border-teal-500" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length ? (
              data.map((holiday, i) => (
                <tr 
                  key={i} 
                  className="hover:bg-teal-50 transition-colors duration-150 cursor-pointer bg-white"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {new Date(holiday.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{holiday.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{holiday.holidayName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
                      {holiday.holidayType}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                  {searchTerm
                    ? `No ${title.toLowerCase()} found matching "${searchTerm}"`
                    : `No ${title.toLowerCase()} available`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-4 text-center">Loading holidays...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-200">
      {renderTable("Upcoming Holidays", upcomingHolidays)}
      {renderTable("Past Holidays", pastHolidays)}
    </div>
  );
};

export default HolidayTable;
