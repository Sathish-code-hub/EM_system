import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { EmployeeProvider } from './context/EmployeeContext' // <-- Import Provider Context
import DashBoard from './pages/DashBoard'
import Employees from './pages/Employees'
import AdminLoginPage from './components/AdminLoginPage'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollTop'

const App = () => {
  return (
    <EmployeeProvider> 
      <Toaster />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/employees" element={<Employees />} />
        </Route>
      </Routes>
    </EmployeeProvider>
  )
}

export default App
