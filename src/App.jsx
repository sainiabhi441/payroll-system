// src/App.jsx
import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";

export default function App() {
  return (
    <PayrollProvider>
      <div className="bg-light min-vh-100 py-4">
        <div className="container">

          {/* ⭐ Custom row with manual spacing fix */}
          <div className="d-flex" style={{ gap: "120px" }}>

            {/* LEFT SIDE — FIXED FORM */}
            <div
              style={{
                width: "380px",
                position: "sticky",
                top: "20px",
                height: "fit-content"
              }}
            >
              <EmployeeForm />
            </div>

            {/* RIGHT SIDE — SCROLLABLE LIST */}
            <div
              style={{
                flex: 1,
                maxHeight: "90vh",
                overflowY: "auto",
                paddingLeft: "120px"   // ⭐ small internal spacing
              }}
            >
              <h2 className="fw-bold mb-3">Employee Payslips</h2>
              <PayslipList />
            </div>

          </div>

        </div>
      </div>
    </PayrollProvider>
  );
}
