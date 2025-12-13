// src/components/payroll/EmployeeCard.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";


export default function EmployeeCard({ emp }) {
  const { setEditEmployee, deleteEmployee } = usePayroll();

  if (!emp) return null;

  return (
    <div className="employee-card">
      <div className="card-header">
        <div>
          <h5 className="emp-name">{emp.name}</h5>
          <span className="emp-id">ID: {emp.empId}</span>
          <div className="emp-role">
            {emp.department} • {emp.designation.toUpperCase()}
          </div>
        </div>

        <div className="card-actions">
          <button
            className="icon-btn"
            title="Edit"
            onClick={() => setEditEmployee(emp)}
          >
            ✏️
          </button>

          <button
            className="icon-btn"
            title="Delete"
            onClick={() => {
              if (confirm("Are you sure you want to delete this?")) {
                deleteEmployee(emp.empId);
              }
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      <ul className="salary-list">
        <li>Basic: ₹{emp.basic}</li>
        <li>HRA: ₹{emp.hra}</li>
        <li>DA: ₹{emp.da}</li>
        <li>PF: ₹{emp.pf}</li>
      </ul>

      <div className="gross">Gross: ₹{emp.gross}</div>
    </div>
  );
}
