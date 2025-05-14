import React, { useState } from 'react'
import AttendanceCard from '../../Components/AttendanceCard'
import { FaUmbrellaBeach, FaUserFriends, FaHospital, FaTools } from 'react-icons/fa';
import { HiOutlineUserRemove } from 'react-icons/hi';
import { DropDownPicker } from '../../Components/DropDownPicker';
import HolidayTable from '../../Components/HolidayTable';
import ApplyLeaveModal from '../../Components/LeaveModal';
const LeaveTracker = () => {
    const [isOpen,setIsOpen ] = useState(false);

  const leaveData = [
    {
      icon: <HiOutlineUserRemove />,
      label: 'Absents',
      available: 0,
      badgeColor: 'bg-red-400',
    },
    {
      icon: <FaUmbrellaBeach />,
      label: 'Holidays',
      available: 10,
      badgeColor: 'bg-yellow-300',
    },
    {
      icon: <FaUserFriends />,
      label: 'Personal',
      available: 10,
      badgeColor: 'bg-green-500',
    },
    {
      icon: <FaHospital />,
      label: 'Sick Leave',
      available: 0,
      badgeColor: 'bg-blue-500',
    },
    {
      icon: <FaTools />,
      label: 'Compensatory',
      available: 0,
      badgeColor: 'bg-purple-400',
    },
  ];

  return (
    // MainBody
    <div className='px-4 py-2'>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
        {/* Route */}
        <h1 className='flex text-text-white font-bold text-sm'>
          People/<h3 className='font-normal'>Leave Tracker/Summary</h3>
        </h1>
        {/* Top Tab */}
        <div className='flex mt-2 bg-background px-6 py-1 w-60 rounded-md items-center justify-around text-xs'>
          <span className='px-2 cursor-pointer'>Summary</span>
          <div className='w-[1px] h-8 bg-black'></div>
          <span onClick={()=>setIsOpen(i=>!i)} className='px-2 cursor-pointer'>Leave Request</span>
        </div>
        {/* LeaveSummaryDiv */}
        <div className='mt-3 bg-background px-6 py-1  rounded-md text-sm font-medium'>
          <div className='flex justify-between items-center align-bottom '>
            <div>
              <div className='px-2 text-lg'>Leave Summary</div>
              <div className=''>
                <h1 className='px-2 text-xs font-light mt-2 ml-1'>Available Leaves        :   02</h1>
                <h1 className='px-2 text-xs font-light mt-1 ml-1 '>Booked Leaves        :   20</h1>
              </div>
            </div>
            <button className='bg-[#76FA9E] h-8 px-4 rounded-lg text-xs'>Apply Now</button>
          </div>

        </div>
        {/* attendance summary card view horizontal */}
        <div className='my-6 flex flex-wrap items-start justify-start gap-6 '>
          {
            leaveData.map((item, index) => {
              return (
                <AttendanceCard title={item.label} value={item.available} icon={item.icon} badgeColor={item.badgeColor} />
              )
            })
          }
        </div>
           {/* upcoming holidays and leave */}
                 <div className='p-4 mt-3 bg-background px-6 pb-8 rounded-md text-sm font-semibold'>
                    <h1 className='my-2 mb-6'>Upcoming Holidays And Leaves</h1>
                    <HolidayTable/>
                 </div>
                 {/* past holidays and leave */}
                 <div className='p-4 mt-3 bg-background px-6 pb-8 rounded-md text-sm font-semibold'>
                    <DropDownPicker options={["holidays","leave","leave and holidays"]}/>
                    <HolidayTable/>
                 </div>
      </div>
              <ApplyLeaveModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default LeaveTracker
