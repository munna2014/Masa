import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../components/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Seed initial users to localStorage if not present
      if (!localStorage.getItem('allUsers')) {
        localStorage.setItem('allUsers', JSON.stringify(mockUsers));
      }
    } catch (error) {
      console.error('Failed to seed users to localStorage:', error);
      // Continue without seeding - the login function has fallbacks
    }

    // Check for existing logged-in user session
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (parseError) {
        console.error('Failed to parse saved user:', parseError);
        // Clear corrupted data
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  const getAllUsers = () => {
    try {
      const users = localStorage.getItem('allUsers');
      return users ? JSON.parse(users) : {};
    } catch (error) {
      console.error('Failed to get users from localStorage:', error);
      return {};
    }
  };

  const getUserData = (username) => {
    const allUsers = getAllUsers();
    return allUsers[username] || allUsers.default;
  };

  const login = (username, password) => {
    const allUsers = getAllUsers();
    const userData = allUsers[username];

    // Add a special, reliable check for the admin user
    if (username === 'admin' && password === 'admin') {
      console.log('Admin login attempt - allUsers:', allUsers);
      console.log('Admin user from allUsers:', allUsers.admin);
      console.log('Admin user from mockUsers:', mockUsers.admin);
      
      // Ensure admin user exists, fallback to mockUsers if needed
      let adminUser = allUsers.admin || mockUsers.admin;
      
      // If still not found, create a default admin user
      if (!adminUser) {
        console.log('Creating fallback admin user');
        adminUser = {
          id: 'admin',
          name: 'Admin User',
          username: 'admin',
          role: 'admin',
          email: 'admin@company.com',
          avatar: 'A'
        };
      }
      
      console.log('Final admin user:', adminUser);
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    // In a real app, you'd verify the password here
    if (username && password && userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    // Handle case where user does not exist
    if (!userData) return { success: false, error: 'User not found.' };

    return { success: false, error: 'Invalid credentials' };
  };

  const register = (username, email, password) => {
    // Simple registration logic
    if (username && email && password) {
      if (username.toLowerCase() === 'admin') {
        return { success: false, error: 'The username "admin" is reserved.' };
      }

      const allUsers = getAllUsers();
      if (allUsers[username]) {
        return { success: false, error: 'Username is already taken.' };
      }

      // Create a new user profile by copying the default profile
      const newUser = { ...allUsers.default };
      newUser.username = username;
      newUser.email = email;
      newUser.role = 'user';
      newUser.id = username; // Use username as ID

      allUsers[username] = newUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
    return { success: false, error: 'Please fill all fields' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
