import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";
import Header from "./components/Header";
/* CSS */
import "./index.css";   // global base styles
import "./App.css";     // layout + header styles

export default function App() {
  return (
    <PayrollProvider>
      <div className="app">

        

        <div className="layout">
          {/* LEFT SIDE : FORM */}
          <aside className="left-panel">
            <EmployeeForm />
          </aside>

          {/* RIGHT SIDE : LIST */}
          <main className="right-panel">
            <h2 className="title">Employee Payslips</h2>
            <PayslipList />
          </main>
        </div>

      </div>
    </PayrollProvider>
  );
}
