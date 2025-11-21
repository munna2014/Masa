# StaffFlow - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Install & Run
```bash
cd staffing-platform
npm install
npm start
```

The app opens automatically at `http://localhost:3000`

---

## 📊 First Steps

### Step 1: View Dashboard
- See KPIs: Vendors, Staff, Assignments, Utilization
- Review staffing requirements
- Check recent assignments

### Step 2: Explore Vendors
- Click "Vendors" tab
- Expand vendor cards to see shift requirements
- View location and contact info

### Step 3: Generate Schedule
- Click "Generate Schedule" button
- System automatically assigns staff
- Check assignments in "Schedule" tab

### Step 4: Track Attendance
- Go to "Check-In/Out" tab
- Search for staff member
- Click "Check In" when they arrive
- Click "Check Out" when they leave

### Step 5: Manage Assignments
- Visit "Assignments" tab
- Filter by vendor or status
- Edit or delete assignments as needed

---

## 🎯 Common Tasks

### Generate Optimal Schedule
```
Dashboard → "Generate Schedule" button
↓
System matches staff to shifts based on:
  • Skills
  • Availability
  • Labor law compliance
  • Current workload
↓
View results in Schedule tab
```

### Check Staff In
```
Check-In/Out tab → Search staff name
↓
Click "Check In" button
↓
Status changes to "Checked In"
↓
Check-in time recorded
```

### Check Staff Out
```
Check-In/Out tab → Find checked-in staff
↓
Click "Check Out" button
↓
Status changes to "Completed"
↓
Hours automatically calculated
```

### Edit Assignment
```
Assignments tab → Find assignment
↓
Click edit icon (pencil)
↓
Change status in modal
↓
Click "Save"
```

### Delete Assignment
```
Assignments tab → Find assignment
↓
Click delete icon (trash)
↓
Assignment removed
```

---

## 📱 Navigation

### Desktop
- Use top navigation bar
- Click tab names: Dashboard, Vendors, Schedule, Assignments, Check-In/Out

### Mobile
- Click hamburger menu (☰)
- Select tab
- Menu closes automatically

---

## 🔍 Filtering & Searching

### Filter Assignments
- **By Vendor**: Select from dropdown
- **By Status**: Scheduled, Checked In, Completed

### Search Staff
- Type staff name or vendor name
- Results update in real-time

### Filter Check-In/Out
- Search by staff or vendor
- Filter by status

---

## 📊 Understanding the Data

### Vendor Requirements
```
Vendor: Sultan Dines Restaurant
Location: Downtown
Contact: +1-555-0101

Shifts:
- Nov 20: 10:00-18:00 (3 Servers needed)
- Nov 21: 11:00-19:00 (4 Servers needed)
```

### Staff Profile
```
Name: John Smith
Phone: +1-555-1001
Skills: Server, Event Staff
Available: Nov 20, 21, 22
Max Hours/Week: 40
Current Hours: 0
```

### Assignment
```
Staff: John Smith
Vendor: Sultan Dines Restaurant
Date: Nov 20, 2024
Time: 10:00 - 18:00
Role: Server
Status: Scheduled
Check-in: -
Check-out: -
Hours: 0
```

---

## 💡 Tips & Tricks

### Maximize Schedule Efficiency
- Ensure staff have diverse skills
- Set realistic availability
- Use max hours wisely
- Generate schedule regularly

### Track Hours Accurately
- Check in immediately on arrival
- Check out when leaving
- System calculates automatically
- Review hours in assignments table

### Manage Vendors Effectively
- Keep contact info updated
- Plan shifts in advance
- Communicate requirements clearly
- Review past assignments

### Optimize Staff Utilization
- Monitor utilization percentage
- Balance workload fairly
- Rotate shifts regularly
- Track hours per week

---

## 🎨 Customizing Data

### Add New Vendor
1. Edit `src/App.jsx`
2. Find `const [vendors, setVendors]`
3. Add new vendor object:
```javascript
{
  id: 4,
  name: "New Restaurant",
  location: "New Location",
  contact: "+1-555-0104",
  requirements: [
    {
      date: "2024-11-25",
      startTime: "10:00",
      endTime: "18:00",
      staffNeeded: 2,
      role: "Server"
    }
  ]
}
```
4. Save and refresh browser

### Add New Staff Member
1. Edit `src/App.jsx`
2. Find `const [staff, setStaff]`
3. Add new staff object:
```javascript
{
  id: 5,
  name: "New Person",
  phone: "+1-555-1005",
  skills: ["Server"],
  availability: ["2024-11-25", "2024-11-26"],
  maxHoursPerWeek: 40,
  currentHours: 0,
  status: "available"
}
```
4. Save and refresh browser

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port 3000 in use
```bash
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux: Kill process
lsof -ti:3000 | xargs kill -9
```

### Styles not loading
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart dev server

### No assignments generated
- Check staff availability matches shift dates
- Verify staff have required skills
- Ensure staff hours won't be exceeded
- Check vendor requirements are set

---

## 📞 Getting Help

### Check Documentation
- README.md - Full documentation
- FEATURES.md - Detailed features
- Component comments - Code explanations

### Debug Issues
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API issues
4. Review component state in React DevTools

### Common Error Messages
- "No assignments found" - Generate schedule first
- "Staff not available" - Check availability dates
- "Hours exceeded" - Staff at max hours for week

---

## 🎓 Learning Path

### Beginner
1. Explore Dashboard
2. View Vendors
3. Generate Schedule
4. Check assignments

### Intermediate
1. Manage assignments
2. Track check-in/out
3. Filter and search
4. Edit assignments

### Advanced
1. Customize data
2. Modify schedule algorithm
3. Integrate with backend
4. Add new features

---

## 📋 Checklist for First Use

- [ ] App installed and running
- [ ] Dashboard displays correctly
- [ ] Vendors visible in Vendors tab
- [ ] Schedule generated successfully
- [ ] Assignments visible in Schedule tab
- [ ] Check-in/out working
- [ ] Filters functioning
- [ ] Mobile menu working

---

## 🚀 Next Steps

1. **Customize Data**: Add your vendors and staff
2. **Test Features**: Try all tabs and buttons
3. **Generate Schedules**: Create optimal assignments
4. **Track Attendance**: Use check-in/out system
5. **Integrate Backend**: Connect to your API
6. **Deploy**: Push to production

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Create React App](https://create-react-app.dev)

---

**Happy Scheduling! 🎉**

For detailed information, see README.md and FEATURES.md
