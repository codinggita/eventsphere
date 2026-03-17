import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import EventsList from './pages/EventsList'
import EventDetails from './pages/EventDetails'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import MyEvents from './pages/MyEvents'
import MyRegistrations from './pages/MyRegistrations'

import HomePage from './pages/HomePage';
import SavedEvents from './pages/SavedEvents';

import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/create" 
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/:id/edit" 
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-events" 
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-registrations" 
              element={
                <ProtectedRoute>
                  <MyRegistrations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/saved-events" 
              element={
                <ProtectedRoute>
                  <SavedEvents />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
