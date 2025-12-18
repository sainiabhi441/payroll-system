import { createContext, useContext, useEffect, useState } from "react";

const PayrollContext = createContext();

const API = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "payroll_employees";

export const PayrollProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  /* =========================
        LOAD EMPLOYEES
     ========================= */
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await fetch(`${API}/employees`);
      if (!res.ok) throw new Error("Backend not available");

      const data = await res.json();
      setEmployees(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn("Backend down → loading from localStorage");

      const localData = localStorage.getItem(STORAGE_KEY);
      setEmployees(localData ? JSON.parse(localData) : []);
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
    const normalizedEmployee = normalizeEmployee(employee);

    try {
      const res = await fetch(`${API}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedEmployee),
      });

      if (!res.ok) throw new Error("Add failed");

      const data = await res.json();
      const updated = [data, ...employees];

      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Backend down → add locally");

      const localEmp = {
        ...normalizedEmployee,
        empId: Date.now(),
      };

      const updated = [localEmp, ...employees];
      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  /* =========================
        UPDATE EMPLOYEE
     ========================= */
  const updateEmployee = async (updatedEmp) => {
    const normalizedEmployee = normalizeEmployee(updatedEmp);

    try {
      const res = await fetch(
        `${API}/employees/${normalizedEmployee.empId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(normalizedEmployee),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();

      const updated = employees.map((emp) =>
        emp.empId === normalizedEmployee.empId ? data : emp
      );

      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEditEmployee(null);
    } catch (err) {
      console.warn("Backend down → update locally");

      const updated = employees.map((emp) =>
        emp.empId === normalizedEmployee.empId
          ? normalizedEmployee
          : emp
      );

      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEditEmployee(null);
    }
  };

  /* =========================
        DELETE EMPLOYEE
     ========================= */
  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${API}/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      const updated = employees.filter((emp) => emp.empId !== id);
      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Backend down → delete locally");

      const updated = employees.filter((emp) => emp.empId !== id);
      setEmployees(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
