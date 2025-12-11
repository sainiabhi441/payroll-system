// src/components/payroll/PayslipList.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";

export default function PayslipList() {
  const { employees } = usePayroll();

  return (
    <div className="mt-3">

      {/* No employees message */}
      {employees.length === 0 && (
        <p className="text-muted">No employees added yet.</p>
      )}

      {/* LIST CONTAINER */}
      <div className="d-flex flex-column gap-3">
        {employees.map((emp) => (
          <EmployeeCard key={emp.empId} emp={emp} />
        ))}
      </div>
    </div>
  );
}
