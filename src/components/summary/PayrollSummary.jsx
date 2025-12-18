// src/components/summary/PayrollSummary.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import { calculateSalary } from "../../utils/salaryCalc";

export default function PayrollSummary() {
  const { employees } = usePayroll();

  // Total Employees
  const totalEmployees = employees.length;

  // Calculations
  let totalPayroll = 0;
  let highestSalary = 0;
  const departmentCount = {};

  employees.forEach((emp) => {
    const salary = calculateSalary(emp);

    totalPayroll += salary.finalSalary;
    highestSalary = Math.max(highestSalary, salary.finalSalary);

    departmentCount[emp.department] =
      (departmentCount[emp.department] || 0) + 1;
  });

  return (
    <div className="payroll-summary">
      <h3>📊 Payroll Summary</h3>

      {/* TOP SUMMARY CARDS */}
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

      {/* DEPARTMENT WISE COUNT */}
      <div className="summary-card full-width">
        <p>Department Wise Employees</p>

        {Object.keys(departmentCount).length === 0 && (
          <p>No employees added yet</p>
        )}

        {Object.keys(departmentCount).map((dept) => (
          <div key={dept}>
            {dept} : {departmentCount[dept]}
          </div>
        ))}
      </div>
    </div>
  );
}
