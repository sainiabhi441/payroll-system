// src/components/payroll/PayslipList.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";

export default function PayslipList() {
  const { employees } = usePayroll();

  return (
    <div style={{ marginTop: 20 }}>
      

      {employees.length === 0 && (
        <p style={{ color: "#666" }}>No employees added yet.</p>
      )}

      <div style={styles.listContainer}>
        {employees.map((emp) => (
          <EmployeeCard key={emp.empId} emp={emp} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: "15px",
    fontWeight: "bold",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
