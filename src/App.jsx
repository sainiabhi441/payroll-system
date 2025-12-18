import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";
import PayrollSummary from "./components/summary/PayrollSummary";

/* CSS */
import "./index.css";   // global base styles
import "./App.css";     // layout + header styles

export default function App() {
  return (
    <PayrollProvider>
      <div className="app">

        {/* 🔥 TOP HEADER STRIP */}
        <Header />

        {/* MAIN LAYOUT */}
        <div className="layout">
          {/* LEFT SIDE : FORM */}
          <aside className="left-panel">
            <EmployeeForm />
          </aside>

          {/* RIGHT SIDE : LIST */}
          <main className="right-panel">

            {/* ✅ FIXED PAYSLIP HEADER */}
            <div className="payslip-header">
              Employee Payslips
            </div>

            <PayslipList />
          </main>
        </div>

      </div>
    </PayrollProvider>
  );
}
