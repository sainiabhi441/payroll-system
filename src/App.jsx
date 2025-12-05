// src/App.jsx
import React from "react";
import { PayrollProvider } from "./contexts/PayrollContext";

import EmployeeForm from "./components/EmployeeForm";
import PayslipList from "./components/payroll/PayslipList";

export default function App() {
  return (
    <PayrollProvider>
      <div style={styles.page}>
        <div style={styles.container}>

          {/* LEFT SIDE — FIXED FORM */}
          <div style={styles.left}>
            <EmployeeForm />
          </div>

          {/* RIGHT SIDE — SCROLLABLE LIST */}
          <div style={styles.right}>
            <h2 style={styles.heading}>Employee Payslips</h2>
            <PayslipList />
          </div>

        </div>
      </div>
    </PayrollProvider>
  );
}

const styles = {
  page: {
    background: "#f3f4f6",
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
  },

  container: {
    display: "flex",
    gap: "150px",              // बड़ा clean gap form और cards के बीच
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "flex-start",
  },

  left: {
    width: "420px",
    position: "sticky",        // 👈 Form को fixed रखेगा
    top: "20px",
    height: "fit-content",
  },

  right: {
    flex: 1,
    maxHeight: "90vh",
    overflowY: "auto",         // 👈 केवल कार्ड्स scroll होंगे
    paddingRight: "10px",
  },

  heading: {
    marginBottom: "18px",
    fontSize: "24px",
    fontWeight: "700",
  },
};
