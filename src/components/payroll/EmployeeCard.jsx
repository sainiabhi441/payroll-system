// src/components/payroll/EmployeeCard.jsx
import React from "react";
import { usePayroll } from "../../contexts/PayrollContext";

export default function EmployeeCard({ emp }) {
  const { setEditEmployee, deleteEmployee } = usePayroll();

  if (!emp) return null;

  return (
    <div style={cardStyle.container}>
      
      {/* HEADER */}
      <div style={cardStyle.header}>
        <div>
          <h3 style={{ margin: 0 }}>{emp.name}</h3>
          <small style={{ color: "#666" }}>ID: {emp.empId}</small>

          <div style={{ color: "#444", marginTop: 4 }}>
            {emp.department} • {emp.designation.toUpperCase()}
          </div>
        </div>

        {/* ICONS */}
        <div style={cardStyle.iconRow}>
          <button
            onClick={() => setEditEmployee(emp)}
            style={cardStyle.iconBtn}
            title="Edit"
          >
            ✏️
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this?")) {
                deleteEmployee(emp.empId);
              }
            }}
            style={cardStyle.iconBtn}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* SALARY DETAILS */}
      <div style={cardStyle.details}>
        <p>Basic: ₹{emp.basic}</p>
        <p>HRA: ₹{emp.hra}</p>
        <p>DA: ₹{emp.da}</p>
        <p>PF: ₹{emp.pf}</p>
      </div>

      {/* GROSS */}
      <div style={{ textAlign: "right", marginTop: 8 }}>
        <strong>Gross: ₹{emp.gross}</strong>
      </div>
    </div>
  );
}

const cardStyle = {
  container: {
    background: "#fff",
    padding: 22,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    marginBottom: 18,
    border: "1px solid #eee",
    width: "330px",         // ⭐ CARD WIDTH ADDED (SIZE BADA KIYA)
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  details: {
    marginTop: 10,
    lineHeight: "1.6",
    color: "#333",
  },

  iconRow: {
    display: "flex",
    gap: 6,               // Close but not touching 👍
    alignItems: "center",
  },

  iconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    padding: "4px",
  },
};
