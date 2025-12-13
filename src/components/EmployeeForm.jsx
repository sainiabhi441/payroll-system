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

  // Prefill when editing
  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name || "");
      setDepartment(editEmployee.department || "Production");
      setDesignation(editEmployee.designation || "je");
      setBasic(editEmployee.basic || "");
    }
  }, [editEmployee]);

  // Auto preview
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
    <div className="employee-form">
      <h3 className="form-title">
        {editEmployee ? "Edit Employee" : "Add New Employee"}
      </h3>

      <form onSubmit={handleSubmit} className="form-body">

        {/* NAME */}
        <div className="field">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* DEPARTMENT + DESIGNATION */}
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

        {/* BASIC */}
        <div className="field">
          <label>Basic Salary</label>
          <input
            type="number"
            value={basic}
            onChange={(e) => setBasic(e.target.value)}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="submit-btn">
          {editEmployee ? "Update Employee" : "Save Employee"}
        </button>
      </form>

      {/* PREVIEW */}
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
  );
}
