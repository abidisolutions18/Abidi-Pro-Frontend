import React, { useEffect, useState, useMemo } from "react";
import {
    UserCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    UserIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { checkInNow, checkOutNow, fetchCurrentStatus } from "../slices/attendanceTimer";
import { toast } from "react-toastify";

const RightSidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [timerInterval, setTimerInterval] = useState(null);

    // Redux state
    const { checkInn, loading } = useSelector((state) => state.attendanceTimer);
    const { user } = useSelector((state) => state.auth);

    const currentUser = user?.user;
    const profileImage = currentUser?.avatar || "";
    const firstName = currentUser?.name || "User";

    // ✅ Manager directly from Redux
    const manager = currentUser?.reportsTo || null;

    // ✅ Team members directly from populated department.members
    const teamMembers = useMemo(() => {
        if (!currentUser?.department?.members) return [];

        return currentUser.department.members
            .filter(member => member._id !== currentUser._id)
            .slice(0, 5);
    }, [currentUser]);

    useEffect(() => {
        dispatch(fetchCurrentStatus());
    }, [dispatch]);

    // Avatar component
    const Avatar = ({ url, name, size = "sm" }) => {
        const sizeClasses =
            size === "lg" ? "w-14 h-14" :
            size === "md" ? "w-10 h-10" :
            "w-8 h-8";

        if (url) {
            return (
                <img
                    src={url}
                    alt={name}
                    className={`${sizeClasses} rounded-full object-cover border-2 border-white shadow-sm`}
                />
            );
        }

        return (
            <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-white shadow-sm flex items-center justify-center`}>
                <span className={`${size === 'lg' ? 'text-lg' : 'text-xs'} font-bold text-indigo-600`}>
                    {name?.charAt(0).toUpperCase() || "U"}
                </span>
            </div>
        );
    };

    const formatTimeFromSeconds = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };

    useEffect(() => {
        if (checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) {
            const startTime = new Date(checkInn.log.checkInTime).getTime();

            const updateElapsed = () => {
                const now = Date.now();
                const elapsedSeconds = Math.floor((now - startTime) / 1000);
                setElapsedTime(formatTimeFromSeconds(elapsedSeconds));
            };

            updateElapsed();
            const interval = setInterval(updateElapsed, 1000);
            setTimerInterval(interval);

            return () => clearInterval(interval);
        } else {
            if (timerInterval) clearInterval(timerInterval);
            setElapsedTime({ hours: 0, minutes: 0, seconds: 0 });
        }
    }, [checkInn]);

    const handleCheckIn = () => {
        dispatch(checkInNow()).unwrap().catch(err =>
            toast.error(err?.message || "Failed to check in")
        );
    };

    const handleCheckOut = () => {
        dispatch(checkOutNow())
            .unwrap()
            .then(() => toast.success("Checked out successfully!"))
            .catch(err => toast.error(err?.message || "Failed to check out"));
    };

    const getButtonState = () => {
        if (!checkInn?.log) {
            return { text: "Check In", onClick: handleCheckIn, bgColor: "bg-emerald-500 hover:bg-emerald-600", disabled: false };
        }
        if (checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) {
            return { text: "Check Out", onClick: handleCheckOut, bgColor: "bg-red-500 hover:bg-red-600", disabled: false };
        }
        return { text: "Already Checked Out", bgColor: "bg-slate-400", disabled: true };
    };

    const buttonState = getButtonState();

    return (
        <aside className={`sticky top-14 z-50 h-[calc(100vh-3.5rem)] transition-all duration-500 ease-in-out flex-shrink-0 flex items-center py-2 pr-3 overflow-auto ${isOpen ? "w-52" : "w-8"}`}>
            <button
                onClick={toggleSidebar}
                className="absolute -left-0 top-12 z-[70] p-1.5 bg-white border border-slate-200 shadow-md rounded-full"
            >
                {isOpen ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
            </button>

            <div className={`h-full w-full bg-[#ECF0F3] rounded-[2rem] flex flex-col items-center py-5 px-4 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

                {/* Profile */}
                <div className="flex flex-col items-center w-full">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                        {profileImage ? (
                            <img src={profileImage} alt={firstName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-2xl font-bold">
                                {firstName.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h3 className="text-sm font-bold">{currentUser?.name}</h3>
                    <p className="text-[10px] uppercase">{currentUser?.designation}</p>

                    <button
                        onClick={buttonState.onClick}
                        disabled={buttonState.disabled || loading}
                        className={`${buttonState.bgColor} text-white text-xs font-bold py-2 px-8 rounded-full mt-2`}
                    >
                        {loading ? "Processing..." : buttonState.text}
                    </button>
                </div>

                {/* Reporting Manager */}
                <div className="w-full bg-white rounded-xl p-3 mt-4">
                    <p className="text-[9px] font-bold uppercase mb-2">Reporting Manager</p>

                    {manager ? (
                        <div className="flex items-center gap-2">
                            <Avatar url={manager.avatar} name={manager.name} size="md" />
                            <div>
                                <p className="text-xs font-bold">{manager.name}</p>
                                <p className="text-[9px]">{manager.designation}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs italic">No manager assigned</p>
                    )}
                </div>

                {/* Team Overview */}
                <div className="w-full bg-white rounded-xl p-3 mt-3 flex-1">
                    <div className="flex justify-between mb-2">
                        <p className="text-[9px] font-bold uppercase">Team Overview</p>
                        <span className="text-[10px]">{teamMembers.length}</span>
                    </div>

                    {teamMembers.map(member => (
                        <div key={member._id} className="flex items-center gap-2 py-1">
                            <Avatar url={member.avatar} name={member.name} />
                            <div>
                                <p className="text-[10px] font-bold">{member.name}</p>
                                <p className="text-[9px]">{member.designation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
