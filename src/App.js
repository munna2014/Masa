import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './components/Home';
import Contact from './components/Contact';
import VendorList from './components/VendorList';
import StaffProfile from './components/StaffProfile';
import StaffAssignment from './components/StaffAssignment';
import CheckInOut from './components/CheckInOut';
import Dashboard from './components/Dashboard';
import ColorCustomizer from './components/ColorCustomizer';
import {
  Home as HomeIcon,
  Calendar,
  MapPin,
  Users,
  ClipboardList,
  CheckCircle,
  Bell,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import './App.css';

function App({ activeTab: propActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user, logout, isAdmin } = useAuth();
  
  // Handle logout with navigation
  const handleLogout = () => {
    logout();
    navigate('/home');
  };
  
  // Get active tab from URL path or prop
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/staff')) return 'staff';
    if (path.startsWith('/vendors')) return 'vendors';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/staff-dashboard')) return 'dashboard';
    if (path.startsWith('/assignments')) return 'assignments';
    if (path.startsWith('/checkin')) return 'checkin';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(propActiveTab || getActiveTabFromPath());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'John Smith',
      phone: '+1-555-1001',
      skills: ['Server', 'Event Staff'],
      availability: ['2025-11-20', '2025-11-21', '2025-11-22'],
      maxHoursPerWeek: 40,
      currentHours: 0,
      status: 'available',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '+1-555-1002',
      skills: ['Sales Associate', 'Server'],
      availability: ['2025-11-20', '2025-11-23', '2025-11-24'],
      maxHoursPerWeek: 35,
      currentHours: 0,
      status: 'available',
    },
    {
      id: 3,
      name: 'Mike Davis',
      phone: '+1-555-1003',
      skills: ['Event Staff', 'Sales Associate'],
      availability: ['2025-11-21', '2025-11-22', '2025-11-23'],
      maxHoursPerWeek: 40,
      currentHours: 0,
      status: 'available',
    },
    {
      id: 4,
      name: 'Emily Brown',
      phone: '+1-555-1004',
      skills: ['Server', 'Event Staff', 'Sales Associate'],
      availability: ['2025-11-20', '2025-11-21', '2025-11-22', '2025-11-23', '2025-11-24'],
      maxHoursPerWeek: 45,
      currentHours: 0,
      status: 'available',
    },
  ]);

  const [selectedStaff, setSelectedStaff] = useState(params.staffId ? staff.find(s => s.id === parseInt(params.staffId)) : null);

  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Sultan Dines Restaurant',
      location: 'Downtown',
      requirements: [
        { date: '2025-11-20', startTime: '10:00', endTime: '18:00', staffNeeded: 3, role: 'Server' },
        { date: '2025-11-21', startTime: '11:00', endTime: '19:00', staffNeeded: 4, role: 'Server' },
      ],
      contact: '+1-555-0101',
    },
    {
      id: 2,
      name: 'Tech Conference 2025',
      location: 'Convention Center',
      requirements: [
        { date: '2025-11-22', startTime: '08:00', endTime: '17:00', staffNeeded: 5, role: 'Event Staff' },
        { date: '2025-11-23', startTime: '08:00', endTime: '17:00', staffNeeded: 6, role: 'Event Staff' },
      ],
      contact: '+1-555-0102',
    },
    {
      id: 3,
      name: 'Retail Store XYZ',
      location: 'Mall District',
      requirements: [
        { date: '2025-11-20', startTime: '09:00', endTime: '17:00', staffNeeded: 2, role: 'Sales Associate' },
        { date: '2025-11-24', startTime: '10:00', endTime: '18:00', staffNeeded: 3, role: 'Sales Associate' },
      ],
      contact: '+1-555-0103',
    },
  ]);

  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const generateSchedule = () => {
    const newAssignments = [];
    let assignmentId = 1;

    vendors.forEach((vendor) => {
      vendor.requirements.forEach((req) => {
        let staffNeeded = req.staffNeeded;
        const availableStaff = staff.filter(
          (s) =>
            s.availability.includes(req.date) &&
            s.skills.includes(req.role) &&
            s.status === 'available' &&
            s.currentHours < s.maxHoursPerWeek
        );

        for (let i = 0; i < staffNeeded && i < availableStaff.length; i++) {
          const assignedStaff = availableStaff[i];
          newAssignments.push({
            id: assignmentId++,
            staffId: assignedStaff.id,
            staffName: assignedStaff.name,
            vendorId: vendor.id,
            vendorName: vendor.name,
            date: req.date,
            startTime: req.startTime,
            endTime: req.endTime,
            role: req.role,
            status: 'scheduled',
          });

          assignedStaff.currentHours += 
            parseInt(req.endTime.split(':')[0]) - parseInt(req.startTime.split(':')[0]);
        }
      });
    });

    setAssignments(newAssignments);
  };

  const handleStaffUpdate = (updatedStaff) => {
    setStaff(prevStaff => 
      prevStaff.map(s => s.id === updatedStaff.id ? updatedStaff : s)
    );
    if (selectedStaff && selectedStaff.id === updatedStaff.id) {
      setSelectedStaff(updatedStaff);
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    const routes = {
      home: '/home',
      staff: '/staff',
      vendors: '/vendors',
      profile: isAdmin() ? '/profile' : '/staff-profile',
      reports: '/reports',
      settings: '/settings',
      contact: '/contact',
      dashboard: '/staff-dashboard',
      assignments: '/assignments',
      checkin: '/checkin'
    };
    navigate(routes[tab] || '/home');
  };

  const handleStaffSelect = (staffId) => {
    setSelectedStaff(staffId);
    navigate(`/staff/${staffId}`);
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'profile', label: 'Profile', icon: Users },
      { id: 'vendors', label: 'Vendors', icon: MapPin },
    ];

    if (isAdmin()) {
      return [
        ...baseItems,
        { id: 'dashboard', label: 'Dashboard', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: ClipboardList },
        { id: 'checkin', label: 'Check-In/Out', icon: CheckCircle },
      ];
    }

    return baseItems;
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const handleCheckIn = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, status: 'checked-in', checkInTime: new Date().toLocaleTimeString() }
          : a
      )
    );
    addNotification('Staff checked in successfully!', 'success');
  };

  const handleCheckOut = (assignmentId) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (assignment && assignment.checkInTime) {
      const checkOutTime = new Date();
      const checkInTime = new Date(`2025-01-01 ${assignment.checkInTime}`);
      const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);

      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                status: 'checked-out',
                checkOutTime: checkOutTime.toLocaleTimeString(),
                hoursWorked: hoursWorked.toFixed(2),
              }
            : a
        )
      );
      addNotification('Staff checked out successfully!', 'success');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start gap-3 flex-shrink-0">
              <div className="bg-black p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-black hidden sm:block">StaffFlow</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              {getNavigationItems().map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <span className="text-gray-600 text-sm">
                {user?.username} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-2">
              {getNavigationItems().map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    handleNavigation(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              
              {/* Mobile User Info & Logout */}
              <div className="pt-2 border-t border-gray-200">
                <div className="px-4 py-2 text-gray-600 text-sm">
                  {user?.username} ({user?.role})
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-40 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 ${
              activeTab === 'home'
                ? 'bg-black'
                : activeTab === 'dashboard'
                ? 'bg-gray-800'
                : 'bg-black'
            }`}
          >
            <Bell className="w-4 h-4" />
            {notif.message}
          </div>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'home' ? (
        <Home onNavigate={handleNavigation} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              vendors={vendors}
              staff={staff}
              assignments={assignments}
              onGenerateSchedule={generateSchedule}
            />
          )}
          {activeTab === 'vendors' && <VendorList vendors={vendors} />}
          {activeTab === 'profile' && (
            <StaffProfile
              staff={selectedStaff || staff[0]}
              onBack={() => handleNavigation('dashboard')}
              onUpdate={handleStaffUpdate}
            />
          )}
          {activeTab === 'assignments' && (
            <StaffAssignment
              assignments={assignments}
              staff={staff}
              vendors={vendors}
              onAssignmentUpdate={setAssignments}
            />
          )}
          {activeTab === 'checkin' && (
            <CheckInOut
              assignments={assignments}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          )}
          {activeTab === 'contact' && (
            <Contact onNavigate={handleNavigation} />
          )}
        </main>
      )}
      <ColorCustomizer />
    </div>
    </ThemeProvider>
  );
}

export default App;
