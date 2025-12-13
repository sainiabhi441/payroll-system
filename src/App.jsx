// src/App.jsx
import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";

import "./App.css";

export default function App() {
  return (
    <PayrollProvider>
      <div className="app">
        <div className="layout">

          {/* LEFT FORM */}
          <aside className="left-panel">
            <EmployeeForm />
          </aside>

          {/* RIGHT LIST */}
          <main className="right-panel">
            <h2 className="title">Employee Payslips</h2>
            <PayslipList />
          </main>

        </div>
      </div>
    </PayrollProvider>
  );
}
