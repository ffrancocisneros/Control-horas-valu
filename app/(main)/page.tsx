"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import MonthPicker from "@/components/MonthPicker";
import ShiftForm from "@/components/ShiftForm";
import DayList from "@/components/DayList";
import SummaryBar from "@/components/SummaryBar";
import { getByMonth, upsertByFecha, getAll } from "@/lib/storage";
import { calcDayHours, monthTotals } from "@/lib/time";
import { Turno } from "@/lib/types";

export default function Page() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth()); // 0-based
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    setTurnos(getByMonth(year, month));
  }, [year, month]);

  const handleSave = (t: Turno) => {
    upsertByFecha(t);
    setTurnos(getByMonth(year, month));
  };

  const totals = useMemo(() => monthTotals(turnos), [turnos]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Control Horas Valu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <MonthPicker year={year} month={month} onChange={(y,m)=>{setYear(y); setMonth(m);}} />
          <ShiftForm defaultRate={turnos[0]?.valorHoraARS} onSave={handleSave} />
        </CardContent>
      </Card>

      <DayList year={year} month={month} items={turnos} onChange={setTurnos} />

      <SummaryBar totals={totals} />
    </div>
  );
}


