"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import MonthPicker from "@/components/MonthPicker";
import ShiftForm from "@/components/ShiftForm";
import DayList from "@/components/DayList";
import SummaryBar from "@/components/SummaryBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getByMonth, upsertByFecha, upsertById, removeById } from "@/lib/storage";
import { monthTotals } from "@/lib/time";
import { Turno } from "@/lib/types";

export default function Page() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth()); // 0-based
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnoEditar, setTurnoEditar] = useState<Turno | null>(null);

  useEffect(() => {
    setTurnos(getByMonth(year, month));
    setTurnoEditar(null); // Limpiar edición al cambiar de mes
  }, [year, month]);

  const handleSave = (t: Turno) => {
    if (turnoEditar) {
      // Si se está editando, mantener el ID original y actualizar por ID
      const turnoActualizado: Turno = {
        ...t,
        id: turnoEditar.id, // Mantener el ID original
      };
      upsertById(turnoActualizado);
    } else {
      // Si es nuevo, usar upsert por fecha
      upsertByFecha(t);
    }
    setTurnos(getByMonth(year, month));
    setTurnoEditar(null); // Limpiar edición después de guardar
  };

  const handleEdit = (turno: Turno) => {
    setTurnoEditar(turno);
    // Scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    removeById(id);
    setTurnos(getByMonth(year, month));
    if (turnoEditar?.id === id) {
      setTurnoEditar(null); // Limpiar edición si se elimina el turno que se estaba editando
    }
  };

  const handleCancelEdit = () => {
    setTurnoEditar(null);
  };

  const totals = useMemo(() => monthTotals(turnos), [turnos]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Control Horas Valu</CardTitle>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <MonthPicker year={year} month={month} onChange={(y,m)=>{setYear(y); setMonth(m);}} />
          <ShiftForm 
            defaultRate={turnos[0]?.valorHoraARS} 
            turnoEditar={turnoEditar}
            onSave={handleSave} 
            onCancel={handleCancelEdit}
          />
        </CardContent>
      </Card>

      <DayList 
        year={year} 
        month={month} 
        items={turnos} 
        onChange={setTurnos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SummaryBar totals={totals} />
    </div>
  );
}


