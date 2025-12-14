// src/components/payroll/PayslipList.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";

export default function PayslipList() {
  const { employees } = usePayroll();

  return (
    <>
      {/* 🔹 CSS INSIDE COMPONENT */}
      <style>
        {`
          .payslip-list {
            margin-top: 12px;
          }

          .empty-text {
            color: #777;
            font-size: 14px;
            margin-bottom: 10px;
          }

          /* 🔥 CARD GRID (same look as before) */
          .card-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            align-items: start;
          }
        `}
      </style>

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
    </>
  );
}
