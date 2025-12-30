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
     PAYABLE SALARY LOGIC ✅
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
      ? payableList.reduce((max, emp) =>
          emp.payable > max.payable ? emp : max
        )
      : null;

  const lowestPayableEmp =
    payableList.length > 0
      ? payableList.reduce((min, emp) =>
          emp.payable < min.payable ? emp : min
        )
      : null;

  const averagePayable =
    payableList.length > 0
      ? Math.round(
          payableList.reduce((sum, emp) => sum + emp.payable, 0) /
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
          background: #ffffff;
          border-radius: 12px;
          padding: 10px 12px;
          min-width: 180px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          text-align: center;
        }

        .summary-card p {
          font-size: 16px;
          font-weight: 700;
          color: #495057;
          margin-bottom: 4px;
        }

        .summary-card h2 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
          color: #212529;
        }

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

        /* PAYABLE CARDS */
        .payable-high {
          border-left: 5px solid #28a745;
        }

        .payable-low {
          border-left: 5px solid #dc3545;
        }

        .payable-avg {
          border-left: 5px solid #0d6efd;
        }

        .emp-name {
          font-size: 14px;
          font-weight: 700;
          margin-top: 4px;
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

          {/* PAYABLE – HIGHEST */}
          {highestPayableEmp && (
            <div className="summary-card payable-high">
              <p>Highest Payable</p>
              <h2>₹{highestPayableEmp.payable}</h2>
              <div className="emp-name">{highestPayableEmp.name}</div>
            </div>
          )}

          {/* PAYABLE – LOWEST */}
          {lowestPayableEmp && (
            <div className="summary-card payable-low">
              <p>Lowest Payable</p>
              <h2>₹{lowestPayableEmp.payable}</h2>
              <div className="emp-name">{lowestPayableEmp.name}</div>
            </div>
          )}

          {/* PAYABLE – AVERAGE */}
          <div className="summary-card payable-avg">
            <p>Average Payable</p>
            <h2>₹{averagePayable}</h2>
          </div>

          {/* DEPARTMENT */}
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
