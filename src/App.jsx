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

          <div className="row">

            {/* LEFT SIDE — FIXED FORM */}
            <div
              className="col-md-4"
              style={{
                position: "sticky",
                top: "20px",
                height: "fit-content",
                marginLeft: "-40px"     // ⭐ FORM ko left shift kiya
              }}
            >
              <EmployeeForm />
            </div>

            {/* RIGHT SIDE — SCROLLABLE LIST */}
            <div
              className="col-md-8"
              style={{
                maxHeight: "88vh",
                overflowY: "auto",
                paddingLeft: "10px",    // ⭐ Gap controlled
                marginTop: "20px"       // ⭐ Scroll ko form ke barabar align kiya
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
