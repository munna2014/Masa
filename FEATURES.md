# StaffFlow - Complete Feature Documentation

## 📋 Table of Contents
1. [Dashboard](#dashboard)
2. [Vendor Management](#vendor-management)
3. [Schedule Calendar](#schedule-calendar)
4. [Staff Assignment](#staff-assignment)
5. [Check-In/Check-Out System](#check-incheck-out-system)
6. [Automation Features](#automation-features)

---

## Dashboard

### Overview
The main dashboard provides a comprehensive view of your staffing operations with real-time KPIs and analytics.

### Key Metrics
- **Active Vendors**: Total number of vendors requiring staff
- **Available Staff**: Total staff members in the system
- **Total Assignments**: Number of scheduled shifts
- **Staff Utilization**: Percentage of staff capacity being used

### Components

#### KPI Cards
- Color-coded cards for quick insights
- Hover effects for better UX
- Real-time data updates

#### Staffing Requirements Panel
- Lists all vendor requirements
- Shows dates, times, and staff needed
- Expandable vendor details
- Contact information display

#### Quick Stats
- Total staff needed across all vendors
- Completed assignments count
- Pending assignments count

#### Recent Assignments Table
- Latest 5 assignments
- Staff name, vendor, date, time, and status
- Status badges (Scheduled, Checked In, Completed)

### Actions
- **Generate Schedule**: One-click button to auto-generate optimal schedule

---

## Vendor Management

### Vendor List View

#### Features
- Expandable vendor cards
- Vendor information display:
  - Name and location
  - Contact phone number
  - Number of shifts
- Detailed shift requirements breakdown

#### Shift Details
For each shift, displays:
- Date
- Start and end time
- Required role
- Number of staff needed

#### Summary Statistics
- Total vendors count
- Total shifts across all vendors
- Total staff needed

### Data Structure
```javascript
{
  id: 1,
  name: "Sultan Dines Restaurant",
  location: "Downtown",
  contact: "+1-555-0101",
  requirements: [
    {
      date: "2024-11-20",
      startTime: "10:00",
      endTime: "18:00",
      staffNeeded: 3,
      role: "Server"
    }
  ]
}
```

---

## Schedule Calendar

### Interactive Calendar View
- Monthly calendar display
- Navigation between months
- Visual assignment indicators

### Calendar Features

#### Date Cells
- Shows number of shifts on each date
- Displays assigned staff names (abbreviated)
- Color-coded status indicators
- Hover effects for better visibility

#### Assignment Overview
- Comprehensive table of all assignments
- Sortable columns:
  - Staff name
  - Vendor name
  - Date
  - Time
  - Role
  - Status

### Schedule Generation
- One-click generation button
- Automatic staff allocation based on:
  - Skill matching
  - Availability
  - Labor law compliance
  - Current workload

### Status Indicators
- **Scheduled**: Blue badge - Shift assigned, pending check-in
- **Checked In**: Yellow badge - Staff has arrived
- **Checked Out**: Green badge - Shift completed

---

## Staff Assignment

### Assignment Management

#### Features
- Comprehensive assignments table
- Advanced filtering options
- Edit and delete functionality
- Status tracking

#### Filtering
- **By Vendor**: Select specific vendor
- **By Status**: Filter by scheduled, checked-in, or completed

#### Assignment Table Columns
- Staff name and phone
- Vendor name
- Date
- Shift time
- Role
- Current status
- Hours worked
- Action buttons

#### Actions
- **Edit**: Modify assignment status
- **Delete**: Remove assignment

### Edit Modal
- Change assignment status
- Save or cancel changes
- Confirmation before deletion

### Summary Statistics
- Total assignments (filtered)
- Number checked in
- Number completed

---

## Check-In/Check-Out System

### Features
- Real-time attendance tracking
- GPS-ready for location verification
- Automatic hours calculation
- Staff search and filtering

### Check-In/Check-Out Process

#### Step 1: Search
- Search by staff name
- Search by vendor name
- Filter by status

#### Step 2: Select Assignment
- View assignment details
- Confirm vendor and shift time
- Review assigned role

#### Step 3: Check-In
- Click "Check In" button
- System records check-in time
- Status changes to "Checked In"

#### Step 4: Check-Out
- Click "Check Out" button
- System records check-out time
- Automatically calculates hours worked
- Status changes to "Completed"

### Assignment Card Display
Each assignment shows:
- Staff name and phone
- Vendor name
- Date and role
- Shift time
- Current status badge
- Check-in/out times (when applicable)
- Hours worked (when completed)

### Detail Modal
- Full assignment information
- Check-in and check-out times
- Total hours worked
- Vendor and role details

### Data Recorded
```javascript
{
  checkInTime: "14:30:45",
  checkOutTime: "22:45:30",
  hoursWorked: 8.25,
  status: "checked-out"
}
```

---

## Automation Features

### 1. Schedule Generation Algorithm

#### Matching Criteria
The system automatically matches staff to shifts based on:

1. **Skill Matching**
   - Staff must have the required role skill
   - Example: "Server" skill for restaurant shifts

2. **Availability Check**
   - Staff must be available on the required date
   - Availability is pre-configured in staff profiles

3. **Labor Law Compliance**
   - Staff cannot exceed max hours per week
   - Current hours are tracked and updated
   - System prevents over-allocation

4. **Current Workload**
   - Considers already assigned hours
   - Prevents burnout
   - Ensures fair distribution

#### Algorithm Flow
```
For each vendor requirement:
  For each staff member:
    Check if:
      - Has required skill ✓
      - Available on date ✓
      - Won't exceed max hours ✓
      - Status is available ✓
    If all checks pass:
      Create assignment
      Update staff current hours
```

### 2. Shift Rotation
- Automatic distribution of shifts
- Prevents same staff from working consecutive days
- Balances workload across team

### 3. Hours Calculation
- Automatic calculation on check-out
- Accurate to minutes
- Payroll-ready format
- Tracks cumulative hours per week

### 4. Status Management
- Automatic status transitions
- Scheduled → Checked In → Checked Out
- Prevents invalid state changes

---

## Integration Points

### Ready for Backend Integration

#### API Endpoints Needed
- `GET /vendors` - Fetch all vendors
- `POST /vendors` - Create new vendor
- `GET /staff` - Fetch all staff
- `POST /staff` - Add new staff member
- `GET /assignments` - Fetch assignments
- `POST /assignments` - Create assignment
- `PUT /assignments/:id` - Update assignment
- `DELETE /assignments/:id` - Delete assignment

#### Notification Integration
- WhatsApp API for SMS notifications
- Email notifications
- In-app notifications (already implemented)

#### GPS Integration
- Location verification on check-in
- Geofencing for vendor locations
- Location history tracking

#### Payment Integration
- Payroll system connection
- Hours-based payment calculation
- Invoice generation

---

## User Roles & Permissions

### Admin
- Full access to all features
- Can generate schedules
- Can manage vendors and staff
- Can view all assignments

### Manager
- View assignments
- Check-in/check-out staff
- Generate reports
- Limited vendor management

### Staff
- View own assignments
- Check-in/check-out
- View shift details
- Contact information

---

## Mobile Responsiveness

### Breakpoints
- **Mobile** (< 768px): Single column, hamburger menu
- **Tablet** (768px - 1024px): Two columns, optimized layout
- **Desktop** (> 1024px): Full multi-column layout

### Mobile Features
- Hamburger navigation menu
- Touch-friendly buttons
- Optimized card layouts
- Scrollable tables
- Full-screen modals

---

## Performance Optimizations

### Implemented
- Component-level state management
- Efficient filtering and searching
- Memoized calculations
- Optimized re-renders

### Recommended Future
- Redux for global state management
- API caching
- Pagination for large datasets
- Virtual scrolling for long lists
- Service workers for offline support

---

## Security Considerations

### Current Implementation
- Client-side validation
- Status-based access control
- Input sanitization

### Recommended Enhancements
- JWT authentication
- Role-based access control (RBAC)
- Data encryption
- API rate limiting
- Audit logging

---

## Customization Guide

### Adding New Vendors
Edit `App.jsx`:
```javascript
const [vendors, setVendors] = useState([
  {
    id: 4,
    name: "New Vendor",
    location: "Location",
    contact: "+1-555-0104",
    requirements: [...]
  }
])
```

### Adding New Staff
```javascript
const [staff, setStaff] = useState([
  {
    id: 5,
    name: "New Staff",
    phone: "+1-555-1005",
    skills: ["Role1", "Role2"],
    availability: ["2024-11-20", "2024-11-21"],
    maxHoursPerWeek: 40,
    currentHours: 0,
    status: "available"
  }
])
```

### Modifying Schedule Algorithm
Edit `App.jsx` `generateSchedule()` function to adjust:
- Matching criteria
- Priority rules
- Allocation limits

---

## Troubleshooting

### Common Issues

#### No assignments generated
- Check staff availability dates
- Verify skill matches
- Ensure staff hours don't exceed limits

#### Check-in/out not working
- Verify assignment status
- Check browser console for errors
- Ensure assignment exists

#### Calendar not displaying
- Check date format (YYYY-MM-DD)
- Verify month navigation
- Clear browser cache

---

## Future Enhancements

### Planned Features
1. Real-time notifications
2. GPS-based check-in
3. Advanced analytics dashboard
4. Payroll integration
5. Mobile app (React Native)
6. AI-powered demand forecasting
7. Multi-language support
8. Dark mode toggle
9. Export to CSV/PDF
10. Recurring shift templates

---

## Support & Documentation

For additional help:
- Check README.md for setup instructions
- Review component code comments
- Check browser console for error messages
- Create an issue on GitHub

---

**Last Updated**: November 2024
**Version**: 1.0.0
