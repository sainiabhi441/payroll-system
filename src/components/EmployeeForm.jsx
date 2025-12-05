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
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {editEmployee ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label>Department</label>
            <select
              style={styles.input}
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

          <div style={styles.inputGroup}>
            <label>Designation</label>

            {/* CAPITALIZED dropdown */}
            <select
              style={styles.input}
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

        <div style={styles.inputGroup}>
          <label>Basic Salary</label>
          <input
            type="number"
            style={styles.input}
            value={basic}
            onChange={(e) => setBasic(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={styles.btn}>
          {editEmployee ? "Update Employee" : "Save Employee"}
        </button>
      </form>

      {preview && (
        <div style={styles.preview}>
          <h3>Payslip Preview</h3>
          <p>Basic: ₹{preview.basic}</p>
          <p>HRA: ₹{preview.hra}</p>
          <p>DA: ₹{preview.da}</p>
          <p>PF: ₹{preview.pf}</p>

          <h3 style={{ marginTop: 10 }}>Gross Salary: ₹{preview.gross}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "390px",
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  },
  heading: {
    marginBottom: 15,
    color: "#1F2937",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "flex",
    gap: 15,
  },
  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginTop: 5,
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: "14px",
  },
  btn: {
    marginTop: 12,
    padding: "12px",
    background: "#111827",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    border: "none",
  },
  preview: {
    marginTop: 18,
    background: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
  },
};
