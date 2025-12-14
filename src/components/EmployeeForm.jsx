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
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name || "");
      setDepartment(editEmployee.department || "Production");
      setDesignation(editEmployee.designation || "je");
      setBasic(editEmployee.basic || "");
    }
  }, [editEmployee]);

  useEffect(() => {
    if (basic !== "") {
      setPreview(calcGross(basic, designation));
    } else {
      setPreview(null);
    }
  }, [basic, designation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emp = {
      name,
      department,
      designation,
      basic: Number(basic),
      ...calcGross(basic, designation),
    };

    if (editEmployee) {
      emp.empId = editEmployee.empId;
      updateEmployee(emp);
    } else {
      addEmployee(emp);
    }

    setName("");
    setBasic("");
    setDepartment("Production");
    setDesignation("je");
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
          font-size: 24px;              /* ⬆️ title बड़ा */
          font-weight: 700;
          margin-bottom: 18px;
          color: #111;
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
          font-size: 17px;              /* ⬆️ label text बड़ा */
          font-weight: 600;
          margin-bottom: 6px;
          color: #333;
        }

        .field input,
        .field select {
          padding: 10px 12px;           /* ⬆️ input height */
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;              /* ⬆️ input text बड़ा */
        }

        .field-row {
          display: flex;
          gap: 22px;                    /* Department–Designation gap */
        }

        .field-row .field {
          flex: 1;                      /* बराबर width */
        }

        .submit-btn {
          margin-top: 10px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #212529;
          color: white;
          font-size: 16px;              /* ⬆️ button text */
          font-weight: 600;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #000;
        }

        .preview-box {
          margin-top: 22px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }

        .preview-box h4 {
          margin-bottom: 8px;
          font-size: 17px;
        }

        .preview-box p {
          margin: 5px 0;
          font-size: 15px;
        }

        .gross-preview {
          margin-top: 12px;
          font-weight: 700;
          font-size: 16px;
        }

        /* 📱 Mobile */
        @media (max-width: 600px) {
          .field-row {
            flex-direction: column;
            gap: 14px;
          }
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
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
                <option key={d} value={d}>
                  {d.toUpperCase()}
                </option>
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

          <h4 className="gross-preview">
            Gross Salary: ₹{preview.gross}
          </h4>
        </div>
      )}
    </div>
  </>
);
}