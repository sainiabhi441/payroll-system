// src/components/payroll/EmployeeCard.jsx
import React from "react";
import jsPDF from "jspdf";
import { usePayroll } from "../../contexts/PayrollContext";
import { calculateSalary } from "../../utils/salaryCalc";

export default function EmployeeCard({ emp }) {
  const { setEditEmployee, deleteEmployee } = usePayroll();
  if (!emp) return null;

  const salary = calculateSalary(emp);

  // 📄 PDF Payslip Function
  const downloadPayslip = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Company Name Pvt Ltd", 20, 20);

    doc.setFontSize(12);
    doc.text(`Employee Name: ${emp.name}`, 20, 35);
    doc.text(`Employee ID: ${emp.empId}`, 20, 42);
    doc.text(`Department: ${emp.department}`, 20, 49);
    doc.text(`Designation: ${emp.designation.toUpperCase()}`, 20, 56);

    doc.line(20, 60, 190, 60);

    doc.text(`Working Days: ${emp.workingDays}`, 20, 70);
    doc.text(`Present Days: ${emp.presentDays}`, 20, 77);

    doc.line(20, 82, 190, 82);

    doc.text(`Basic Salary: ₹${emp.basic}`, 20, 92);
    doc.text(`HRA: ₹${emp.hra}`, 20, 99);
    doc.text(`DA: ₹${emp.da}`, 20, 106);
    doc.text(`PF: ₹${emp.pf}`, 20, 113);

    doc.line(20, 118, 190, 118);

    doc.text(`Gross Salary: ₹${salary.gross}`, 20, 128);

    doc.setFontSize(14);
    doc.text(`Payable Salary: ₹${salary.finalSalary}`, 20, 140);

    doc.save(`Payslip_${emp.name}.pdf`);
  };

  return (
    <>
      <style>
        {`
  .employee-card {
    background: #f3f6fb;
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
    width: 100%;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .emp-name {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }

  .emp-id {
    font-size: 12px;
    color: #777;
  }

  .emp-role {
    font-size: 13px;
    color: #555;
  }

  .icon-btn {
    background: #f1f3f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px 6px;
    cursor: pointer;
    margin-left: 6px;
  }

  .salary-list {
    list-style: none;
    padding: 0;
    margin: 12px 0;
  }

  .salary-list li {
    font-size: 14px;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
  }

  .gross {
    margin-top: 8px;
    text-align: right;
    font-weight: 700;
    font-size: 15px;
  }

  .download-btn {
    margin-top: 10px;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: none;
    background: #212529;
    color: white;
    font-size: 14px;
    cursor: pointer;
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

          <div>
            <button
              className="icon-btn"
              onClick={() => setEditEmployee(emp)}
            >
              ✏️
            </button>
            <button
              className="icon-btn"
              onClick={() =>
                confirm("Delete this employee?") &&
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
          <li>Working Days: {emp.workingDays}</li>
          <li>Present Days: {emp.presentDays}</li>
        </ul>

        <div className="gross">
          Payable Salary: ₹{salary.finalSalary}
        </div>

        {/* 📄 Download Button */}
        <button className="download-btn" onClick={downloadPayslip}>
          📄 Download Payslip
        </button>
      </div>
    </>
  );
}
