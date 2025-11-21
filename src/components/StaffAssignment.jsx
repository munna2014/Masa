import React, { useState } from 'react';
import { Users, Trash2, Edit2, Plus, X, ArrowLeft, Search, Filter, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StaffAssignment() {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchStaff, setSearchStaff] = useState('');
  const [searchVendor, setSearchVendor] = useState('');
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      staffName: 'John Smith',
      staffRole: 'Waiter',
      vendorName: 'Sultan Dines Restaurant',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '16:00',
      status: 'confirmed'
    },
    {
      id: 2,
      staffName: 'Sarah Johnson',
      staffRole: 'Chef',
      vendorName: 'Sultan Dines Restaurant',
      date: '2024-01-15',
      startTime: '16:00',
      endTime: '00:00',
      status: 'pending'
    }
  ]);

  // Sample staff data
  const staffList = [
    { id: 1, name: 'John Smith', role: 'Waiter', status: 'available', phone: '+60 12-345 6789', rating: 4.5 },
    { id: 2, name: 'Sarah Johnson', role: 'Chef', status: 'available', phone: '+60 12-456 7890', rating: 4.8 },
    { id: 3, name: 'Mike Wilson', role: 'Security', status: 'on-assignment', phone: '+60 12-567 8901', rating: 4.2 },
    { id: 4, name: 'Emily Davis', role: 'Event Staff', status: 'available', phone: '+60 12-678 9012', rating: 4.6 },
    { id: 5, name: 'Robert Brown', role: 'Kitchen Staff', status: 'available', phone: '+60 12-789 0123', rating: 4.3 }
  ];

  // Sample vendor data
  const vendorList = [
    {
      id: 1,
      name: 'Sultan Dines Restaurant',
      location: 'Downtown District',
      phone: '+60 3-1234 5678',
      email: 'manager@sultandines.com',
      requirements: [
        { date: '2024-01-15', startTime: '08:00', endTime: '16:00', staffNeeded: 3, role: 'Waiter' },
        { date: '2024-01-15', startTime: '16:00', endTime: '00:00', staffNeeded: 2, role: 'Chef' }
      ]
    },
    {
      id: 2,
      name: 'Marriott Convention Center',
      location: 'Business Park',
      phone: '+60 3-2345 6789',
      email: 'events@marriott.com',
      requirements: [
        { date: '2024-01-15', startTime: '15:00', endTime: '23:00', staffNeeded: 3, role: 'Security' }
      ]
    },
    {
      id: 3,
      name: 'Hilton Garden Inn',
      location: 'Airport Area',
      phone: '+60 3-3456 7890',
      email: 'manager@hilton.com',
      requirements: [
        { date: '2024-01-16', startTime: '06:00', endTime: '14:00', staffNeeded: 2, role: 'Kitchen Staff' }
      ]
    }
  ];

  const filteredStaff = staffList.filter(staff => 
    staff.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchStaff.toLowerCase())
  );

  const filteredVendors = vendorList.filter(vendor => 
    vendor.name.toLowerCase().includes(searchVendor.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchVendor.toLowerCase())
  );

  const handleCreateAssignment = () => {
    if (selectedStaff && selectedVendor) {
      const newAssignment = {
        id: assignments.length + 1,
        staffName: selectedStaff.name,
        staffRole: selectedStaff.role,
        vendorName: selectedVendor.name,
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '17:00',
        status: 'pending'
      };
      setAssignments([...assignments, newAssignment]);
      setSelectedStaff(null);
      setSelectedVendor(null);
      alert('Assignment created successfully!');
    } else {
      alert('Please select both staff and vendor');
    }
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
  };

  const handleConfirmAssignment = (assignmentId) => {
    setAssignments(assignments.map(a => 
      a.id === assignmentId ? { ...a, status: 'confirmed' } : a
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-black">Staff Assignment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-black mb-6">Create New Assignment</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staff Selection */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Select Staff</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchStaff}
                  onChange={(e) => setSearchStaff(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredStaff.map((staff) => (
                  <div
                    key={staff.id}
                    onClick={() => setSelectedStaff(staff)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStaff?.id === staff.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-black">{staff.name}</h4>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                        <p className="text-xs text-gray-500">{staff.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          staff.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {staff.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">⭐ {staff.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Selection */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Select Vendor</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchVendor}
                  onChange={(e) => setSearchVendor(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    onClick={() => setSelectedVendor(vendor)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedVendor?.id === vendor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-black">{vendor.name}</h4>
                      <p className="text-sm text-gray-600">{vendor.location}</p>
                      <p className="text-xs text-gray-500">{vendor.phone}</p>
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {vendor.requirements.length} requirements
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCreateAssignment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Assignment
            </button>
          </div>
        </div>

        {/* Current Assignments */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-6">Current Assignments</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Staff</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Vendor</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-black">{assignment.staffName}</td>
                    <td className="py-3 px-4 text-gray-600">{assignment.staffRole}</td>
                    <td className="py-3 px-4 text-gray-600">{assignment.vendorName}</td>
                    <td className="py-3 px-4 text-gray-600">{assignment.date}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {assignment.startTime} - {assignment.endTime}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        assignment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {assignment.status === 'pending' && (
                          <button 
                            onClick={() => handleConfirmAssignment(assignment.id)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Confirm Assignment"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete Assignment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAssignment;
