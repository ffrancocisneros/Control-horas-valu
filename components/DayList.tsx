"use client";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui";
import { Turno } from "@/lib/types";
import { calcDayHours } from "@/lib/time";
import { formatARS } from "@/lib/currency";

type Props = {
  year: number;
  month: number; // 0-based
  items: Turno[];
  onChange: (items: Turno[]) => void;
};

export default function DayList({ year, month, items }: Props) {
  const valorHora = items[0]?.valorHoraARS ?? 0;
  const rows = useMemo(() => items.map(t => {
    const calc = calcDayHours(t);
    return {
      ...t,
      ...calc,
      montoDia: (calc.horasConViatico) * valorHora,
    };
  }), [items, valorHora]);

  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">
          No hay turnos cargados para este mes.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {rows.map(r => (
        <Card key={r.id}>
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-medium">{r.fechaISO}</div>
              <div className="text-muted-foreground">{r.ingreso} → {r.egreso}</div>
            </div>
            <div className="text-right text-sm">
              <div>{r.horasSinViatico.toFixed(2)}h + {r.viaticoHoras}h</div>
              <div className="text-muted-foreground">{formatARS(r.montoDia)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


