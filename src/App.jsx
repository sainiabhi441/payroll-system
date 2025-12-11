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
              className="col-md-4 position-sticky me-5"
              style={{ top: "20px", height: "fit-content" }}
            >
              <EmployeeForm />
            </div>

            {/* RIGHT SIDE — SCROLLABLE LIST */}
            <div
              className="col-md-7 ps-4"
              style={{ maxHeight: "90vh", overflowY: "auto", marginTop: "15px" }}
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
