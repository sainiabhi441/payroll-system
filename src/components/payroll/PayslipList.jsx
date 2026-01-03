// src/components/payroll/PayslipList.jsx
import React, { useState } from "react";
import { usePayroll } from "../../contexts/PayrollContext";
import EmployeeCard from "./EmployeeCard";
import Pagination from "../common/Pagination";

export default function PayslipList() {
  const { employees } = usePayroll();

  // 🔍 Search & Filter state
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // 🔢 Pagination state
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔎 Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDept =
      department === "All" || emp.department === department;

    return matchName && matchDept;
  });

  // 🔢 Pagination logic
  const totalPages = Math.ceil(
    filteredEmployees.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    endIndex
  );

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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // search pe page reset
            }}
          />

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1); // filter pe page reset
            }}
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
          {currentEmployees.map((emp) => (
            <EmployeeCard key={emp.empId} emp={emp} />
          ))}
        </div>

        {/* 🔢 PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            onNext={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
          />
        )}
      </div>
    </>
  );
}
