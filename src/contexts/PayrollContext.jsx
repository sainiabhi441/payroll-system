import { createContext, useContext, useEffect, useState } from "react";

const PayrollContext = createContext();

const API = "https://payroll-system-backend-oqx4.onrender.com/api";

export const PayrollProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
        LOAD EMPLOYEES
     ========================= */
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API}/employees`);
      if (!res.ok) throw new Error("Failed to load employees");

      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError("Server unavailable. Employees not loaded.");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
        NORMALIZE EMPLOYEE
     ========================= */
  const normalizeEmployee = (emp) => ({
    ...emp,
    workingDays: emp.workingDays ?? 26,
    presentDays: emp.presentDays ?? emp.workingDays ?? 26,
  });

  /* =========================
        ADD EMPLOYEE
     ========================= */
  const addEmployee = async (employee) => {
    try {
      const normalized = normalizeEmployee(employee);

      const res = await fetch(`${API}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });

      if (!res.ok) throw new Error("Add failed");

      const savedEmployee = await res.json();
      setEmployees((prev) => [savedEmployee, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Employee add failed. Server not responding.");
    }
  };

  /* =========================
        UPDATE EMPLOYEE ✅ FIXED
     ========================= */
  const updateEmployee = async (updatedEmp) => {
    try {
      const normalized = normalizeEmployee(updatedEmp);

      const res = await fetch(
        `${API}/employees/${normalized.empId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(normalized),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const saved = await res.json();

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.empId === saved.empId ? saved : emp
        )
      );

      setEditEmployee(null);
    } catch (err) {
      console.error(err);
      alert("Employee update failed.");
    }
  };

  /* =========================
        DELETE EMPLOYEE ✅ FIXED
     ========================= */
  const deleteEmployee = async (empId) => {
    try {
      const res = await fetch(`${API}/employees/${empId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setEmployees((prev) =>
        prev.filter((emp) => emp.empId !== empId)
      );
    } catch (err) {
      console.error(err);
      alert("Employee delete failed.");
    }
  };

  return (
    <PayrollContext.Provider
      value={{
        employees,
        loading,
        error,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        editEmployee,
        setEditEmployee,
        reloadEmployees: loadEmployees,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayroll = () => useContext(PayrollContext);
