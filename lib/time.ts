import { Turno, DayCalc, MonthTotals } from "./types";

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToHoursDecimal(minutes: number): number {
  return Math.round((minutes / 60) * 100) / 100;
}

export function calcDayHours(turno: Pick<Turno, "ingreso" | "egreso">): DayCalc {
  const inMin = toMinutes(turno.ingreso);
  const outMin = toMinutes(turno.egreso);
  let workedMin = 0;
  if (outMin >= inMin) workedMin = outMin - inMin;
  else workedMin = outMin + (24 * 60) - inMin; // cruce medianoche

  const horas = minutesToHoursDecimal(workedMin);
  const viaticoHoras = horas === 0 ? 0 : 1; // si 0h, no sumar viático
  return {
    horasSinViatico: horas,
    horasConViatico: Math.round((horas + viaticoHoras) * 100) / 100,
    viaticoHoras,
  };
}

export function monthTotals(turnos: Turno[]): MonthTotals {
  const totalHorasSinViatico = turnos.reduce((acc, t) => acc + calcDayHours(t).horasSinViatico, 0);
  const totalViaticoHoras = turnos.reduce((acc, t) => acc + calcDayHours(t).viaticoHoras, 0);
  const totalHorasConViatico = totalHorasSinViatico + totalViaticoHoras;
  const valorHora = turnos[0]?.valorHoraARS ?? 0;
  const montoTotalHoras = round2(valorHora * totalHorasSinViatico);
  const montoTotalViaticos = round2(valorHora * totalViaticoHoras);
  const montoTotalConViaticos = round2(valorHora * totalHorasConViatico);
  return {
    totalHorasSinViatico: round2(totalHorasSinViatico),
    totalViaticoHoras: round2(totalViaticoHoras),
    totalHorasConViatico: round2(totalHorasConViatico),
    montoTotalHoras,
    montoTotalViaticos,
    montoTotalConViaticos,
  };
}

export function ymd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}


