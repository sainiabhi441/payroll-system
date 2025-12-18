// src/utils/salaryCalc.js

/* =========================
   GROSS SALARY CALCULATION
   ========================= */
export function calcGross(basic, desig) {
  basic = Number(basic);

  const rules = {
    je: { hra: 0.20, da: 0.10, pf: 0.12 },
    se: { hra: 0.22, da: 0.12, pf: 0.12 },

    asm: { hra: 0.18, da: 0.09, pf: 0.11 },
    me: { hra: 0.20, da: 0.10, pf: 0.11 },

    cs: { hra: 0.16, da: 0.08, pf: 0.10 },
    ca: { hra: 0.18, da: 0.09, pf: 0.10 },
  };

  const r = rules[desig] || rules.je;

  const hra = basic * r.hra;
  const da = basic * r.da;
  const pf = basic * r.pf;

  const gross = basic + hra + da - pf;

  return {
    basic: Math.round(basic),
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
  const gross = Number(emp.gross);

  const workingDays = emp.workingDays ?? 26;
  const presentDays = emp.presentDays ?? workingDays;

  const perDaySalary = gross / workingDays;
  const finalSalary = perDaySalary * presentDays;

  return {
    gross,
    perDaySalary: Math.round(perDaySalary),
    finalSalary: Math.round(finalSalary),
  };
}
