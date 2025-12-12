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

  // Auto preview calculation
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

    // Reset
    setName("");
    setBasic("");
    setDepartment("Production");
    setDesignation("je");
    setEditEmployee(null);
  };

  return (
    <div className="card shadow-sm p-4" style={{ width: "100%" }}>

      <h3 className="mb-3 text-dark fw-semibold">
        {editEmployee ? "Edit Employee" : "Add New Employee"}
      </h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

        {/* NAME */}
        <div className="form-group">
          <label className="fw-medium mb-1">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* ROW: DEPT + DESIGNATION */}
        <div className="row">
          <div className="col">
            <label className="fw-medium mb-1">Department</label>
            <select
              className="form-control"
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

          <div className="col">
            <label className="fw-medium mb-1">Designation</label>
            <select
              className="form-control"
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

        {/* BASIC SALARY */}
        <div className="form-group">
          <label className="fw-medium mb-1">Basic Salary</label>
          <input
            type="number"
            className="form-control"
            value={basic}
            onChange={(e) => setBasic(e.target.value)}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="btn btn-dark w-100 mt-2 fw-semibold">
          {editEmployee ? "Update Employee" : "Save Employee"}
        </button>
      </form>

      {/* Preview BOX */}
      {preview && (
        <div className="mt-4 p-3 rounded bg-light border">
          <h5>Payslip Preview</h5>
          <p className="mb-1">Basic: ₹{preview.basic}</p>
          <p className="mb-1">HRA: ₹{preview.hra}</p>
          <p className="mb-1">DA: ₹{preview.da}</p>
          <p className="mb-1">PF: ₹{preview.pf}</p>

          <h5 className="mt-3">Gross Salary: ₹{preview.gross}</h5>
        </div>
      )}
    </div>
  );
}
