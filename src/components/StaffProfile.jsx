import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Edit2, Save, X, Mail, Phone, Briefcase, CheckCircle, AlertCircle,
  TrendingUp, CalendarDays, ArrowRight, Activity, Bell, Clock, MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function StaffProfile({ staff: propStaff, onBack, onUpdate }) {
  const navigate = useNavigate();
  const { user: staff } = useAuth(); // Use user data from AuthContext
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [activeView, setActiveView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [scheduledShifts, setScheduledShifts] = useState(staff?.scheduledShifts || []);
  const [shiftRequests, setShiftRequests] = useState(staff?.shiftRequests || []);
  const upcomingShifts = staff?.upcomingShifts || [];
  const announcements = staff?.announcements || [];

  useEffect(() => {
    if (staff) {
      setScheduledShifts(staff.scheduledShifts || []);
      setShiftRequests(staff.shiftRequests || []);
    }
  }, [staff]);


  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/staff');
    }
  };

  const handleAgreeToShift = (requestId) => {
    const request = shiftRequests.find(r => r.id === requestId);
    if (!request) return;

    // For simplicity, parsing 'Dec 20-22' into [20, 21, 22]
    const datePart = request.date.replace('Dec ', '');
    const newShifts = [];
    if (datePart.includes('-')) {
      const [start, end] = datePart.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        newShifts.push({ day: i, time: request.time, location: request.location, type: 'Agreed Shift' });
      }
    } else {
      newShifts.push({ day: Number(datePart), time: request.time, location: request.location, type: 'Agreed Shift' });
    }

    // Add new shifts if they don't exist
    setScheduledShifts(prevShifts => {
      const existingDays = new Set(prevShifts.map(s => s.day));
      const uniqueNewShifts = newShifts.filter(s => !existingDays.has(s.day));
      return [...prevShifts, ...uniqueNewShifts];
    });

    // Remove the request from the list
    setShiftRequests(prevRequests => prevRequests.filter(r => r.id !== requestId));
  };

  // Enhanced calendar generation
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Navigation functions
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonthName = monthNames[currentMonth];

  const realCurrentDay = today.getDate();
  const isCurrentMonthAndYear = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

  const selectedShift = scheduledShifts.find(shift => shift.day === selectedDate);

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex">
            <div className="flex-1 p-8 overflow-auto">
              {/* Enhanced Upcoming Shifts */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Shifts</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</button>
                </div>
                <div className="grid grid-cols-7 gap-3">
                  {upcomingShifts.map((shift, index) => (
                    <div key={index} className="group">
                      <div className={`bg-gradient-to-br ${shift.color} rounded-2xl p-4 text-center text-white shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
                        <div className="text-sm font-bold mb-2">{shift.day}</div>
                        <div className="text-xs mb-1 opacity-90">{shift.type}</div>
                        <div className="text-sm font-semibold">{shift.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Current Schedule */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{currentMonthName} {currentYear} Schedule</h2>
                  <div className="flex gap-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Assignees</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>This Month</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Locations</option>
                    </select>
                  </div>
                </div>
                
                {/* Enhanced Calendar View */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handlePreviousMonth}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                          title="Previous month"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold">{currentMonthName} {currentYear}</h3>
                        <button 
                          onClick={handleNextMonth}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                          title="Next month"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">Month</button>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Week</button>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Day</button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {weekDays.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-700 py-3">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => {
                        if (day === null) {
                          return <div key={index} className="h-14"></div>;
                        }
                        
                        const isSelected = day === selectedDate;
                        const isToday = isCurrentMonthAndYear && day === realCurrentDay;
                        const hasShift = scheduledShifts.some(shift => shift.day === day);
                        const isOff = [4, 11, 18, 25].includes(day);
                        
                        return (
                          <div
                            key={index}
                            className={`h-14 flex flex-col items-center justify-center rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-lg transform scale-105' 
                                : isOff 
                                  ? 'bg-gray-100 text-gray-400'
                                  : hasShift 
                                    ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 font-medium'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedDate(day)}
                          >
                            <span>{day}</span>
                            {isToday && <span className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-blue-600'}`}>Today</span>}
                            {hasShift && !isSelected && <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {selectedShift && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Shift Details for {currentMonthName} {selectedDate}
                      </h4>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <CalendarDays className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{selectedShift.type}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedShift.time}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedShift.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Right Sidebar */}
            <div className="w-96 bg-white border-l border-gray-100 p-6">
              {/* Enhanced Announcements */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Announcements</h3>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="group hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 cursor-pointer">
                      <div className="flex gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                            {announcement.avatar}
                          </div>
                          {announcement.priority === 'high' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">{announcement.title}</div>
                          <div className="text-xs text-gray-600 mb-2">{announcement.message}</div>
                          <div className="text-xs text-gray-400">{announcement.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Shift Change Requests */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Shift Requests</h3>
                  {shiftRequests.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">{shiftRequests.length} New</span>
                  )}
                </div>
                <div className="space-y-4">
                  {shiftRequests.map((request) => (
                    <div key={request.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-gray-900 text-lg">{request.date}</span>
                          <div className="text-xs text-gray-500 mt-1">Requested by {request.requester}</div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">Pending</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          {request.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {request.location}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md">
                          Refuse
                        </button>
                        <button
                          onClick={() => handleAgreeToShift(request.id)}
                          className="flex-1 py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md"
                        >
                          Agree
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </div>
  );
}

export default StaffProfile;