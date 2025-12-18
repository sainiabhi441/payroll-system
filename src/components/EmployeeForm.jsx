// src/components/EmployeeForm.jsx
import { useEffect, useState } from "react";
import { usePayroll } from "../contexts/PayrollContext";
import { calcGross } from "../utils/salaryCalc";

const designationMap = {
  Production: ["je", "se"],
  Marketing: ["asm", "me"],
  Accounts: ["cs", "ca"],
};

export default function EmployeeForm() {
  const { addEmployee, updateEmployee, editEmployee, setEditEmployee } =
    usePayroll();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Production");
  const [designation, setDesignation] = useState("je");
  const [basic, setBasic] = useState("");

  // 🆕 Attendance states
  const [workingDays, setWorkingDays] = useState(26);
  const [presentDays, setPresentDays] = useState(26);

  const [preview, setPreview] = useState(null);

  /* ======================
      EDIT MODE LOAD
     ====================== */
  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name || "");
      setDepartment(editEmployee.department || "Production");
      setDesignation(editEmployee.designation || "je");
      setBasic(editEmployee.basic || "");
      setWorkingDays(editEmployee.workingDays ?? 26);
      setPresentDays(editEmployee.presentDays ?? 26);
    }
  }, [editEmployee]);

  /* ======================
      SALARY PREVIEW
     ====================== */
  useEffect(() => {
    if (basic !== "") {
      setPreview(calcGross(basic, designation));
    } else {
      setPreview(null);
    }
  }, [basic, designation]);

  /* ======================
      SUBMIT
     ====================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation (Company Rule)
    if (presentDays > workingDays) {
      alert("Present Days cannot be more than Working Days");
      return;
    }

    const emp = {
      name,
      department,
      designation,
      basic: Number(basic),
      workingDays,
      presentDays,
      ...calcGross(basic, designation),
    };

    if (editEmployee) {
      emp.empId = editEmployee.empId;
      updateEmployee(emp);
    } else {
      addEmployee(emp);
    }

    // Reset
    setName("");
    setBasic("");
    setDepartment("Production");
    setDesignation("je");
    setWorkingDays(26);
    setPresentDays(26);
    setEditEmployee(null);
  };

  return (
    <>
      {/* 🔹 CSS INSIDE COMPONENT */}
      <style>
        {`
        .employee-form {
          background: #ffffff;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
        }

        .field label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .field input,
        .field select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
        }

        .field-row {
          display: flex;
          gap: 18px;
        }

        .field-row .field {
          flex: 1;
        }

        .submit-btn {
          margin-top: 10px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #212529;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .preview-box {
          margin-top: 22px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }
      `}
      </style>

      <div className="employee-form">
        <h3 className="form-title">
          {editEmployee ? "Edit Employee" : "Add New Employee"}
        </h3>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Department</label>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDesignation(designationMap[e.target.value][0]);
                }}
              >
                <option>Production</option>
                <option>Marketing</option>
                <option>Accounts</option>
              </select>
            </div>

            <div className="field">
              <label>Designation</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                {designationMap[department].map((d) => (
                  <option key={d}>{d.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Basic Salary</label>
            <input
              type="number"
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
              required
            />
          </div>

          {/* 🆕 Attendance Fields */}
          <div className="field-row">
            <div className="field">
              <label>Working Days</label>
              <input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(Number(e.target.value))}
              />
            </div>

            <div className="field">
              <label>Present Days</label>
              <input
                type="number"
                value={presentDays}
                onChange={(e) => setPresentDays(Number(e.target.value))}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editEmployee ? "Update Employee" : "Save Employee"}
          </button>
        </form>

        {preview && (
          <div className="preview-box">
            <h4>Payslip Preview</h4>
            <p>Basic: ₹{preview.basic}</p>
            <p>HRA: ₹{preview.hra}</p>
            <p>DA: ₹{preview.da}</p>
            <p>PF: ₹{preview.pf}</p>
            <strong>Gross Salary: ₹{preview.gross}</strong>
          </div>
        )}
      </div>
    </>
  );
}
