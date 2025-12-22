// src/utils/salaryCalc.js

/* =========================
   GROSS SALARY CALCULATION
   ========================= */
export function calcGross(basic, desig) {
  const base = Number(basic) || 0;

  const rules = {
    je: { hra: 0.20, da: 0.10, pf: 0.12 },
    se: { hra: 0.22, da: 0.12, pf: 0.12 },

    asm: { hra: 0.18, da: 0.09, pf: 0.11 },
    me: { hra: 0.20, da: 0.10, pf: 0.11 },

    cs: { hra: 0.16, da: 0.08, pf: 0.10 },
    ca: { hra: 0.18, da: 0.09, pf: 0.10 },
  };

  const r = rules[desig] || rules.je;

  const hra = base * r.hra;
  const da = base * r.da;
  const pf = base * r.pf;

  const gross = base + hra + da - pf;

  return {
    basic: Math.round(base),
    hra: Math.round(hra),
    da: Math.round(da),
    pf: Math.round(pf),
    gross: Math.round(gross),
  };
}

/* =========================
   ATTENDANCE BASED SALARY
   ========================= */
export function calculateSalary(emp) {
  // 🔒 SAFE NUMBER CASTING
  const gross = Number(emp?.gross) || 0;
  const workingDays = Number(emp?.workingDays) || 26;
  const presentDays =
    Number(emp?.presentDays) || workingDays;

  // 🛡️ DIVISION SAFETY
  const perDaySalary =
    workingDays > 0 ? gross / workingDays : 0;

  const finalSalary = perDaySalary * presentDays;

  return {
    gross: Math.round(gross),
    workingDays,
    presentDays,
    perDaySalary: Math.round(perDaySalary),
    finalSalary: Math.round(finalSalary),
  };
}
