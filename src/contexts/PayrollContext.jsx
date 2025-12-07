import { createContext, useContext, useState, useEffect } from "react";

const PayrollContext = createContext();

const API = import.meta.env.VITE_API_URL; // Example: https://payroll-system-backend-ogx4.onrender.com/api

export const PayrollProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  // 🔹 Fetch Employees FROM Backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API}/employees`);
      const data = await res.json();
      setEmployees(data);
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
      const res = await fetch(`${API}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await res.json();
      setEmployees([data, ...employees]);
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  // 🔹 Update Employee IN Backend
  const updateEmployee = async (updated) => {
    try {
      const res = await fetch(`${API}/employees/${updated.empId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });
      const data = await res.json();

      setEmployees(
        employees.map((emp) =>
          emp.empId === updated.empId ? data : emp
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
      await fetch(`${API}/employees/${id}`, {
        method: "DELETE",
      });

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
