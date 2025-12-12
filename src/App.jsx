// src/App.jsx
import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";

export default function App() {
  return (
    <PayrollProvider>
      <div className="bg-light min-vh-100 py-4">
        
        {/* ⭐ Container padding removed for better alignment */}
        <div className="container" style={{ paddingLeft: "0px" }}>

          <div className="row">

            {/* LEFT FORM */}
            <div
              className="col-md-4"
              style={{
                position: "sticky",
                top: "20px",
                height: "fit-content",
                marginLeft: "-25px"   // ⭐ balanced left shift
              }}
            >
              <EmployeeForm />
            </div>

            {/* RIGHT LIST */}
            <div
              className="col-md-8"
              style={{
                maxHeight: "88vh",
                overflowY: "auto",
                marginTop: "20px",
                paddingLeft: "10px"  // ⭐ scroll bar perfectly aligned
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
