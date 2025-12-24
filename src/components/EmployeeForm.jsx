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

  /* ======================
      STATES
     ====================== */
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Production");
  const [designation, setDesignation] = useState("je");
  const [basic, setBasic] = useState("");

  // ✅ Attendance (EMPTY by default)
  const [workingDays, setWorkingDays] = useState("");
  const [presentDays, setPresentDays] = useState("");

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
      setWorkingDays(
        editEmployee.workingDays !== undefined
          ? String(editEmployee.workingDays)
          : ""
      );
      setPresentDays(
        editEmployee.presentDays !== undefined
          ? String(editEmployee.presentDays)
          : ""
      );
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

    if (
      workingDays !== "" &&
      presentDays !== "" &&
      Number(presentDays) > Number(workingDays)
    ) {
      alert("Present Days cannot be more than Working Days");
      return;
    }

    const emp = {
      name,
      department,
      designation,
      basic: Number(basic),

      // ✅ ONLY send if user filled
      workingDays:
        workingDays === "" ? undefined : Number(workingDays),
      presentDays:
        presentDays === "" ? undefined : Number(presentDays),
    };

    if (editEmployee) {
      emp.empId = editEmployee.empId;
      updateEmployee(emp);
    } else {
      addEmployee(emp);
    }

    // ✅ REAL RESET (EMPTY)
    setName("");
    setDepartment("Production");
    setDesignation("je");
    setBasic("");
    setWorkingDays("");
    setPresentDays("");
    setEditEmployee(null);
  };

  /* ======================
      UI
     ====================== */
  return (
    <>
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

          <div className="field-row">
            <div className="field">
              <label>Working Days</label>
              <input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                placeholder="e.g. 26"
              />
            </div>

            <div className="field">
              <label>Present Days</label>
              <input
                type="number"
                value={presentDays}
                onChange={(e) => setPresentDays(e.target.value)}
                placeholder="e.g. 24"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editEmployee ? "Update Employee" : "Save Employee"}
          </button>
        </form>

        {preview && (
          <div className="preview-box">
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
