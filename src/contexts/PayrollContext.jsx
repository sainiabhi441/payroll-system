import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PayrollContext = createContext();

const API = import.meta.env.VITE_API_URL; // http://localhost:5000/api

export const PayrollProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  // 🔹 Fetch Employees FROM Backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/employees`);
      setEmployees(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔹 Add Employee TO Backend
  const addEmployee = async (employee) => {
    try {
      const res = await axios.post(`${API}/employees`, employee);
      setEmployees([res.data, ...employees]);
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  // 🔹 Update Employee IN Backend
  const updateEmployee = async (updated) => {
    try {
      const res = await axios.put(
        `${API}/employees/${updated.empId}`,
        updated
      );

      setEmployees(
        employees.map((emp) =>
          emp.empId === updated.empId ? res.data : emp
        )
      );

      setEditEmployee(null);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  // 🔹 Delete Employee FROM Backend
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API}/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.empId !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <PayrollContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        editEmployee,
        setEditEmployee,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayroll = () => useContext(PayrollContext);
