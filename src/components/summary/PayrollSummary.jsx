// src/components/summary/PayrollSummary.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";

export default function PayrollSummary() {
  const { employees } = usePayroll();

  /* =========================
     CALCULATIONS (SAFE)
  ========================= */

  const totalEmployees = employees.length;

  const totalPayroll = employees.reduce(
    (sum, emp) => sum + (emp.gross || 0),
    0
  );

  const highestSalary =
    employees.length > 0
      ? Math.max(...employees.map((e) => e.gross || 0))
      : 0;

  const departmentCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  /* =========================
     UI
  ========================= */
  return (
    <>
      <style>{`
        .payroll-summary {
          margin-bottom: 24px;
        }

        .payroll-summary h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        /* TOP SUMMARY GRID */
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        /* CARD */
        .summary-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .summary-card p {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .summary-card h2 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
          color: #212529;
        }

        /* DEPARTMENT CARD */
        .summary-card.full-width {
          text-align: left;
        }

        .dept-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-weight: 600;
          border-bottom: 1px solid #eee;
        }

        .dept-row:last-child {
          border-bottom: none;
        }

        .empty-text {
          color: #999;
          margin-top: 6px;
        }
      `}</style>

      <div className="payroll-summary">
        <h3>📊 Payroll Summary</h3>

        {/* TOP CARDS */}
        <div className="summary-grid">
          <div className="summary-card">
            <p>Total Employees</p>
            <h2>{totalEmployees}</h2>
          </div>

          <div className="summary-card">
            <p>Total Payroll</p>
            <h2>₹{totalPayroll}</h2>
          </div>

          <div className="summary-card">
            <p>Highest Salary</p>
            <h2>₹{highestSalary}</h2>
          </div>
        </div>

        {/* DEPARTMENT WISE */}
        <div className="summary-card full-width">
          <p>Department Wise Employees</p>

          {Object.keys(departmentCount).length === 0 && (
            <div className="empty-text">No employees added yet</div>
          )}

          {Object.entries(departmentCount).map(([dept, count]) => (
            <div key={dept} className="dept-row">
              <span>{dept}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
