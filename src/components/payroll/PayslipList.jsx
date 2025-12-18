// src/components/payroll/PayslipList.jsx
import React, { useState } from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";

export default function PayslipList() {
  const { employees } = usePayroll();

  // 🔍 Search & Filter state
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // 🔎 Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDept =
      department === "All" || emp.department === department;

    return matchName && matchDept;
  });

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

          /* 🔍 SEARCH BAR */
          .filter-bar {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
          }

          .filter-bar input,
          .filter-bar select {
            padding: 8px 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 14px;
          }

          /* 🔥 CARD GRID */
          .card-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            align-items: start;
          }
        `}
      </style>

      <div className="payslip-list">

        {/* 🔍 SEARCH + FILTER */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Production">Production</option>
            <option value="Marketing">Marketing</option>
            <option value="Accounts">Accounts</option>
          </select>
        </div>

        {/* No employees message */}
        {filteredEmployees.length === 0 && (
          <p className="empty-text">No matching employees found.</p>
        )}

        {/* LIST CONTAINER */}
        <div className="card-list">
          {filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.empId} emp={emp} />
          ))}
        </div>
      </div>
    </>
  );
}
