const HolidayTable = () => {
        const holidays = [
      { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
      { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
      { date: "May 01, 2025", day: "Thursday", name: "Labor Day" },
    ];
  return (
     <div className=" space-y-px">
      {holidays.map((holiday, index) => (
        <div
          key={index}
          className={`flex w-full items-center rounded-md overflow-hidden ${
            index % 2 === 0 ? "bg-primary text-white" : "bg-[#B3C5C3]"
          }`}
        >
          <div className="w-1/6 px-2 text-center py-2 truncate">{holiday.date}</div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/50 mx-1"></div>

          <div className="w-2/6 px-2 text-center py-2 truncate">{holiday.day}</div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/50 mx-1"></div>

          <div className="w-3/6 px-2 text-center py-2 truncate">{holiday.name}</div>
        </div>
      ))}
    </div>

  );
};

export default HolidayTable;