# StaffFlow - API Integration Guide

## 🔌 Backend Integration

This guide shows how to integrate StaffFlow with a backend API.

---

## 📋 Prerequisites

### Backend Requirements
- RESTful API endpoints
- CORS enabled
- Authentication (JWT recommended)
- Error handling

### Frontend Setup
```bash
npm install axios
```

---

## 🔑 API Endpoints

### Vendors

#### Get All Vendors
```
GET /api/vendors
Response: Array<Vendor>
```

#### Get Single Vendor
```
GET /api/vendors/:id
Response: Vendor
```

#### Create Vendor
```
POST /api/vendors
Body: Vendor
Response: Vendor (with id)
```

#### Update Vendor
```
PUT /api/vendors/:id
Body: Vendor
Response: Vendor
```

#### Delete Vendor
```
DELETE /api/vendors/:id
Response: { success: true }
```

---

### Staff

#### Get All Staff
```
GET /api/staff
Response: Array<Staff>
```

#### Get Single Staff
```
GET /api/staff/:id
Response: Staff
```

#### Create Staff
```
POST /api/staff
Body: Staff
Response: Staff (with id)
```

#### Update Staff
```
PUT /api/staff/:id
Body: Staff
Response: Staff
```

#### Delete Staff
```
DELETE /api/staff/:id
Response: { success: true }
```

---

### Assignments

#### Get All Assignments
```
GET /api/assignments
Response: Array<Assignment>
```

#### Get Assignments by Date
```
GET /api/assignments?date=2024-11-20
Response: Array<Assignment>
```

#### Create Assignment
```
POST /api/assignments
Body: Assignment
Response: Assignment (with id)
```

#### Update Assignment
```
PUT /api/assignments/:id
Body: Assignment
Response: Assignment
```

#### Delete Assignment
```
DELETE /api/assignments/:id
Response: { success: true }
```

#### Check-In
```
POST /api/assignments/:id/checkin
Body: { checkInTime: timestamp }
Response: Assignment
```

#### Check-Out
```
POST /api/assignments/:id/checkout
Body: { checkOutTime: timestamp }
Response: Assignment
```

---

## 🔐 Authentication

### Setup JWT

#### 1. Store Token
```javascript
// After login
localStorage.setItem('token', response.data.token)
```

#### 2. Create Axios Instance
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

#### 3. Handle Errors
```javascript
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 📝 Implementation Examples

### 1. Fetch Vendors

#### Before (Mock Data)
```javascript
const [vendors, setVendors] = useState([
  { id: 1, name: "Restaurant", ... }
])
```

#### After (API)
```javascript
import axios from 'axios'

useEffect(() => {
  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/vendors`
      )
      setVendors(response.data)
    } catch (error) {
      console.error('Failed to fetch vendors:', error)
      addNotification('Failed to load vendors', 'error')
    }
  }
  
  fetchVendors()
}, [])
```

---

### 2. Fetch Staff

```javascript
useEffect(() => {
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/staff`
      )
      setStaff(response.data)
    } catch (error) {
      console.error('Failed to fetch staff:', error)
      addNotification('Failed to load staff', 'error')
    }
  }
  
  fetchStaff()
}, [])
```

---

### 3. Generate Schedule

```javascript
const generateSchedule = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/assignments/generate`,
      {
        vendors: vendors,
        staff: staff
      }
    )
    
    setAssignments(response.data)
    addNotification('Schedule generated successfully!', 'success')
  } catch (error) {
    console.error('Failed to generate schedule:', error)
    addNotification('Failed to generate schedule', 'error')
  }
}
```

---

### 4. Check-In Staff

```javascript
const handleCheckIn = async (assignmentId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/assignments/${assignmentId}/checkin`,
      {
        checkInTime: new Date().toISOString()
      }
    )
    
    // Update local state
    setAssignments(prev =>
      prev.map(a => a.id === assignmentId ? response.data : a)
    )
    
    addNotification('Staff checked in successfully!', 'success')
  } catch (error) {
    console.error('Check-in failed:', error)
    addNotification('Check-in failed', 'error')
  }
}
```

---

### 5. Check-Out Staff

```javascript
const handleCheckOut = async (assignmentId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/assignments/${assignmentId}/checkout`,
      {
        checkOutTime: new Date().toISOString()
      }
    )
    
    // Update local state
    setAssignments(prev =>
      prev.map(a => a.id === assignmentId ? response.data : a)
    )
    
    addNotification('Staff checked out successfully!', 'success')
  } catch (error) {
    console.error('Check-out failed:', error)
    addNotification('Check-out failed', 'error')
  }
}
```

---

### 6. Create Assignment

```javascript
const createAssignment = async (assignment) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/assignments`,
      assignment
    )
    
    setAssignments(prev => [...prev, response.data])
    addNotification('Assignment created successfully!', 'success')
  } catch (error) {
    console.error('Failed to create assignment:', error)
    addNotification('Failed to create assignment', 'error')
  }
}
```

---

### 7. Update Assignment

```javascript
const updateAssignment = async (assignmentId, updates) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/assignments/${assignmentId}`,
      updates
    )
    
    setAssignments(prev =>
      prev.map(a => a.id === assignmentId ? response.data : a)
    )
    
    addNotification('Assignment updated successfully!', 'success')
  } catch (error) {
    console.error('Failed to update assignment:', error)
    addNotification('Failed to update assignment', 'error')
  }
}
```

---

### 8. Delete Assignment

```javascript
const deleteAssignment = async (assignmentId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/assignments/${assignmentId}`
    )
    
    setAssignments(prev =>
      prev.filter(a => a.id !== assignmentId)
    )
    
    addNotification('Assignment deleted successfully!', 'success')
  } catch (error) {
    console.error('Failed to delete assignment:', error)
    addNotification('Failed to delete assignment', 'error')
  }
}
```

---

## 🔄 API Service Module

Create `src/services/api.js`:

```javascript
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Vendor API
export const vendorAPI = {
  getAll: () => api.get('/vendors'),
  getById: (id) => api.get(`/vendors/${id}`),
  create: (vendor) => api.post('/vendors', vendor),
  update: (id, vendor) => api.put(`/vendors/${id}`, vendor),
  delete: (id) => api.delete(`/vendors/${id}`)
}

// Staff API
export const staffAPI = {
  getAll: () => api.get('/staff'),
  getById: (id) => api.get(`/staff/${id}`),
  create: (staff) => api.post('/staff', staff),
  update: (id, staff) => api.put(`/staff/${id}`, staff),
  delete: (id) => api.delete(`/staff/${id}`)
}

// Assignment API
export const assignmentAPI = {
  getAll: () => api.get('/assignments'),
  getByDate: (date) => api.get(`/assignments?date=${date}`),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (assignment) => api.post('/assignments', assignment),
  update: (id, assignment) => api.put(`/assignments/${id}`, assignment),
  delete: (id) => api.delete(`/assignments/${id}`),
  checkIn: (id, time) => api.post(`/assignments/${id}/checkin`, { checkInTime: time }),
  checkOut: (id, time) => api.post(`/assignments/${id}/checkout`, { checkOutTime: time }),
  generate: (data) => api.post('/assignments/generate', data)
}

export default api
```

---

## 🔌 Environment Variables

Create `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NOTIFICATION_URL=http://localhost:5000/notifications
REACT_APP_ENVIRONMENT=development
```

Create `.env.production`:
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_NOTIFICATION_URL=https://notify.yourdomain.com
REACT_APP_ENVIRONMENT=production
```

---

## 📱 Notifications Integration

### WhatsApp Integration

```javascript
const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_NOTIFICATION_URL}/whatsapp`,
      {
        to: phoneNumber,
        message: message
      }
    )
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error)
  }
}

// Usage
const notifyStaffCheckIn = (staff) => {
  const message = `Hi ${staff.name}, you have been checked in for your shift. Start time: 10:00 AM`
  sendWhatsAppNotification(staff.phone, message)
}
```

### SMS Integration

```javascript
const sendSMSNotification = async (phoneNumber, message) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_NOTIFICATION_URL}/sms`,
      {
        to: phoneNumber,
        message: message
      }
    )
  } catch (error) {
    console.error('Failed to send SMS notification:', error)
  }
}
```

### Email Integration

```javascript
const sendEmailNotification = async (email, subject, body) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_NOTIFICATION_URL}/email`,
      {
        to: email,
        subject: subject,
        body: body
      }
    )
  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
}
```

---

## 🔄 Real-Time Updates (WebSocket)

```javascript
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_API_URL)

// Listen for assignment updates
socket.on('assignment:created', (assignment) => {
  setAssignments(prev => [...prev, assignment])
})

socket.on('assignment:updated', (assignment) => {
  setAssignments(prev =>
    prev.map(a => a.id === assignment.id ? assignment : a)
  )
})

socket.on('assignment:deleted', (assignmentId) => {
  setAssignments(prev =>
    prev.filter(a => a.id !== assignmentId)
  )
})

// Emit events
const emitAssignmentUpdate = (assignment) => {
  socket.emit('assignment:update', assignment)
}
```

---

## 🧪 Testing API Integration

### Mock API for Testing

```javascript
import MockAdapter from 'axios-mock-adapter'
import api from './api'

const mock = new MockAdapter(api)

// Mock vendor endpoints
mock.onGet('/vendors').reply(200, [
  { id: 1, name: 'Restaurant', ... }
])

mock.onPost('/vendors').reply(201, { id: 2, ... })
```

---

## 📊 Error Handling

### Global Error Handler

```javascript
const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return 'Invalid request'
      case 401:
        return 'Unauthorized'
      case 403:
        return 'Forbidden'
      case 404:
        return 'Not found'
      case 500:
        return 'Server error'
      default:
        return data.message || 'An error occurred'
    }
  } else if (error.request) {
    // Request made but no response
    return 'No response from server'
  } else {
    // Error in request setup
    return 'Request error'
  }
}
```

---

## 🔒 Security Best Practices

1. **Never hardcode API keys**
   - Use environment variables
   - Rotate keys regularly

2. **Use HTTPS only**
   - All API calls should be HTTPS
   - Enable HSTS headers

3. **Validate input**
   - Sanitize user input
   - Validate on both client and server

4. **Implement rate limiting**
   - Prevent brute force attacks
   - Throttle requests

5. **Use CORS properly**
   - Whitelist allowed origins
   - Validate requests

---

## 📚 Resources

- [Axios Documentation](https://axios-http.com)
- [REST API Best Practices](https://restfulapi.net)
- [JWT Authentication](https://jwt.io)
- [Socket.io Documentation](https://socket.io)

---

**Last Updated**: November 2024
**Version**: 1.0.0
