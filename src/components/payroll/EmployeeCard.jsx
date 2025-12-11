// src/components/payroll/EmployeeCard.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";

export default function EmployeeCard({ emp }) {
  const { setEditEmployee, deleteEmployee } = usePayroll();

  if (!emp) return null;

  return (
    <div className="card shadow-sm mb-4 border-0" style={{ borderRadius: "16px", width: "340px" }}>
      <div className="card-body">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1 fw-bold">{emp.name}</h5>
            <small className="text-muted">ID: {emp.empId}</small>

            <div className="mt-1 text-secondary">
              {emp.department} • {emp.designation.toUpperCase()}
            </div>
          </div>

          {/* ICONS */}
          <div className="d-flex gap-2">
            <button
              onClick={() => setEditEmployee(emp)}
              className="btn btn-light btn-sm border"
              title="Edit"
            >
              ✏️
            </button>

            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this?")) {
                  deleteEmployee(emp.empId);
                }
              }}
              className="btn btn-light btn-sm border"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* SALARY DETAILS */}
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item px-0">Basic: ₹{emp.basic}</li>
          <li className="list-group-item px-0">HRA: ₹{emp.hra}</li>
          <li className="list-group-item px-0">DA: ₹{emp.da}</li>
          <li className="list-group-item px-0">PF: ₹{emp.pf}</li>
        </ul>

        {/* GROSS */}
        <h6 className="text-end mt-3 fw-bold">Gross: ₹{emp.gross}</h6>
      </div>
    </div>
  );
}
