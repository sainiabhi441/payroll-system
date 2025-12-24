// src/components/summary/PayrollSummary.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";

export default function PayrollSummary() {
  const { employees } = usePayroll();

  /* =========================
     CALCULATIONS
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
          margin-bottom: 20px;
        }

        /* FORCE SINGLE LINE */
        .summary-grid {
          display: flex;
          gap: 12px;
          flex-wrap: nowrap;
          overflow-x: auto;
        }

        /* SMALL CARD */
        .summary-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 10px 12px;   /* 👈 छोटा card */
          min-width: 180px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          text-align: center;
        }

        /* TEXT BIGGER */
        .summary-card p {
          font-size: 16px;     /* 👈 text बड़ा */
          font-weight: 700;
          color: #495057;
          margin-bottom: 4px;
        }

        /* NUMBER SAME */
        .summary-card h2 {
          font-size: 24px;     /* ❌ number unchanged */
          font-weight: 800;
          margin: 0;
          color: #212529;
        }

        /* DEPARTMENT CARD */
        .dept-card {
          text-align: left;
        }

        .dept-row {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 15px;
          margin-top: 6px;
        }
      `}</style>

      <div className="payroll-summary">
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

          {/* DEPARTMENT SAME LINE */}
          <div className="summary-card dept-card">
            <p>Department</p>

            {Object.entries(departmentCount).map(([dept, count]) => (
              <div key={dept} className="dept-row">
                <span>{dept}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
