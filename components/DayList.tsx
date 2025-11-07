"use client";
import { useMemo } from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { Turno } from "@/lib/types";
import { calcDayHours } from "@/lib/time";
import { formatARS } from "@/lib/currency";

type Props = {
  year: number;
  month: number; // 0-based
  items: Turno[];
  onChange: (items: Turno[]) => void;
  onEdit?: (turno: Turno) => void;
  onDelete?: (id: string) => void;
};

export default function DayList({ year, month, items, onEdit, onDelete }: Props) {
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
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 text-sm">
                <div className="font-medium">{r.fechaISO}</div>
                <div className="text-muted-foreground">{r.ingreso} → {r.egreso}</div>
                <div className="mt-1">
                  <span className="text-xs">{r.horasSinViatico.toFixed(2)}h + {r.viaticoHoras}h</span>
                  <span className="text-muted-foreground ml-2 text-xs">{formatARS(r.montoDia)}</span>
                </div>
              </div>
              <div className="flex gap-2 sm:flex-shrink-0">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(r)}
                    aria-label="Editar turno"
                    className="flex-1 sm:flex-initial"
                  >
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm(`¿Eliminar turno del ${r.fechaISO}?`)) {
                        onDelete(r.id);
                      }
                    }}
                    aria-label="Eliminar turno"
                    className="flex-1 sm:flex-initial"
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


