import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { employeeApi } from '../services/Api'; 
import toast from 'react-hot-toast';

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);         

  const loadInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeApi.fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while synchronization ran.");
      toast.error(err.message || "Failed to download team index files.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // create
  const addEmployee = async (newEmp) => {
    try {
      const savedEmp = await employeeApi.createEmployee(newEmp);
      setEmployees((prev) => [savedEmp, ...prev]);
      return savedEmp;
    } catch (err) {
      toast.error("Failed to add employee records.");
      throw err;
    }
  };

  //Update
  const updateEmployee = async (id, updatedData) => {
    try {
      const savedUpdate = await employeeApi.updateEmployee(id, updatedData);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? savedUpdate : emp))
      );
    } catch (err) {
      toast.error("Failed to update employee details.");
      throw err;
    }
  };

  //Delete
  const deleteEmployee = async (id) => {
    try {
      await employeeApi.deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      toast.error("Failed to drop database profile index file row.");
      throw err;
    }
  };

  const value = useMemo(() => ({
    employees,
    isLoading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    retryFetch: loadInitialData 
  }), [employees, isLoading, error]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployees must be utilized within an EmployeeProvider container');
  return context;
}
