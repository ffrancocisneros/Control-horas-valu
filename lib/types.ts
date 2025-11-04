export type Turno = {
  id: string;
  fechaISO: string; // yyyy-mm-dd
  ingreso: string; // HH:mm
  egreso: string; // HH:mm
  valorHoraARS: number;
};

export type DayCalc = {
  horasSinViatico: number;
  horasConViatico: number;
  viaticoHoras: number; // siempre 1 por día
};

export type MonthTotals = {
  totalHorasSinViatico: number;
  totalViaticoHoras: number;
  totalHorasConViatico: number;
  montoTotalHoras: number;
  montoTotalViaticos: number;
  montoTotalConViaticos: number;
};


