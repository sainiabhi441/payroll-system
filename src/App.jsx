import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";
import PayrollSummary from "./components/summary/PayrollSummary";

/* CSS */
import "./index.css";
import "./App.css";

export default function App() {
  return (
    <PayrollProvider>
      <div className="app">

        {/* 🔥 TOP HEADER STRIP */}
        <Header />

        {/* 📊 PAYROLL SUMMARY (ADMIN VIEW) */}
        <PayrollSummary />

        {/* MAIN LAYOUT */}
        <div className="layout">
          {/* LEFT SIDE : FORM */}
          <aside className="left-panel">
            <EmployeeForm />
          </aside>

          {/* RIGHT SIDE : LIST */}
          <main className="right-panel">
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
