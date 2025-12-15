// src/components/payroll/EmployeeCard.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";

export default function EmployeeCard({ emp }) {
  const { setEditEmployee, deleteEmployee } = usePayroll();
  if (!emp) return null;

  return (
    <>
      {/* 🔹 CSS INSIDE COMPONENT (no extra file) */}
      <style>
        {`
  .employee-card {
  background: #f3f6fb;   /* 👈 हल्का blue-gray (soft & clean) */
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  width: 100%;
}

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
          }

          .emp-name {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #111;
          }

          .emp-id {
            font-size: 12px;
            color: #777;
          }

          .emp-role {
            margin-top: 4px;
            font-size: 13px;
            color: #555;
          }

          .card-actions {
            display: flex;
            gap: 6px;
          }

          .icon-btn {
            background: #f1f3f5;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 4px 6px;
            cursor: pointer;
            font-size: 14px;
          }

          .icon-btn:hover {
            background: #e9ecef;
          }

          .salary-list {
            list-style: none;
            padding: 0;
            margin: 12px 0 8px;
          }

          .salary-list li {
            font-size: 14px;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
            color: #333;
          }

          .salary-list li:last-child {
            border-bottom: none;
          }

          .gross {
            margin-top: 8px;
            text-align: right;
            font-weight: 700;
            font-size: 15px;
            color: #111;
          }
        `}
      </style>

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
              onClick={() =>
                confirm("Are you sure you want to delete this?") &&
                deleteEmployee(emp.empId)
              }
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
    </>
  );
}
