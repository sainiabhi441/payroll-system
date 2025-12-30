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
     PAYABLE SALARY LOGIC
  ========================= */

  const payableList = employees.map((emp) => {
    const workingDays = emp.workingDays || 26;
    const presentDays = emp.presentDays || 26;

    const payable =
      workingDays > 0
        ? Math.round((emp.gross || 0) * (presentDays / workingDays))
        : 0;

    return { ...emp, payable };
  });

  const highestPayableEmp =
    payableList.length > 0
      ? payableList.reduce((max, e) => (e.payable > max.payable ? e : max))
      : null;

  const lowestPayableEmp =
    payableList.length > 0
      ? payableList.reduce((min, e) => (e.payable < min.payable ? e : min))
      : null;

  const averagePayable =
    payableList.length > 0
      ? Math.round(
          payableList.reduce((s, e) => s + e.payable, 0) /
            payableList.length
        )
      : 0;

  /* =========================
     UI
  ========================= */
  return (
    <>
      <style>{`
        .payroll-summary {
          margin-bottom: 20px;
        }

        .summary-grid {
          display: flex;
          gap: 12px;
          flex-wrap: nowrap;
          overflow-x: auto;
        }

        .summary-card {
          border-radius: 14px;
          padding: 12px;
          min-width: 190px;
          text-align: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          background: #fff;
        }

        .summary-card p {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .summary-card h2 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
        }

        /* FULL COLOR PAYABLE CARDS */
        .payable-high {
          background: linear-gradient(135deg, #d4edda, #b7e4c7);
          color: #155724;
        }

        .payable-low {
          background: linear-gradient(135deg, #f8d7da, #f1b0b7);
          color: #721c24;
        }

        .payable-avg {
          background: linear-gradient(135deg, #d6e4ff, #b6ccfe);
          color: #102a71;
        }

        .emp-name {
          font-size: 14px;
          font-weight: 700;
          margin-top: 6px;
        }

        .dept-card {
          text-align: left;
        }

        .dept-row {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
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

          {highestPayableEmp && (
            <div className="summary-card payable-high">
              <p>Highest Payable</p>
              <h2>₹{highestPayableEmp.payable}</h2>
              <div className="emp-name">
                Name: {highestPayableEmp.name}
              </div>
            </div>
          )}

          {lowestPayableEmp && (
            <div className="summary-card payable-low">
              <p>Lowest Payable</p>
              <h2>₹{lowestPayableEmp.payable}</h2>
              <div className="emp-name">
                Name: {lowestPayableEmp.name}
              </div>
            </div>
          )}

          <div className="summary-card payable-avg">
            <p>Average Payable</p>
            <h2>₹{averagePayable}</h2>
          </div>

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
