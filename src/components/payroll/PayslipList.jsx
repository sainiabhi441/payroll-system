// src/components/payroll/PayslipList.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";


export default function PayslipList() {
  const { employees } = usePayroll();

  return (
    <div className="payslip-list">

      {/* No employees message */}
      {employees.length === 0 && (
        <p className="empty-text">No employees added yet.</p>
      )}

      {/* LIST CONTAINER */}
      <div className="card-list">
        {employees.map((emp) => (
          <EmployeeCard key={emp.empId} emp={emp} />
        ))}
      </div>
    </div>
  );
}
