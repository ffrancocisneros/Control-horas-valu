"use client";
import { useState, useEffect } from "react";
import { Button, Card, CardContent, Label, Input } from "@/components/ui";
import { ymd } from "@/lib/time";
import { Turno } from "@/lib/types";

type Props = {
  defaultRate?: number;
  turnoEditar?: Turno | null;
  onSave: (t: Turno) => void;
  onCancel?: () => void;
};

export default function ShiftForm({ defaultRate = 0, turnoEditar, onSave, onCancel }: Props) {
  const now = new Date();
  const [fecha, setFecha] = useState<string>(ymd(now));
  const [ingreso, setIngreso] = useState<string>("08:00");
  const [egreso, setEgreso] = useState<string>("17:00");
  const [valorHoraARS, setValorHoraARS] = useState<number>(defaultRate);

  // Cargar datos del turno cuando se selecciona para editar
  useEffect(() => {
    if (turnoEditar) {
      setFecha(turnoEditar.fechaISO);
      setIngreso(turnoEditar.ingreso);
      setEgreso(turnoEditar.egreso);
      setValorHoraARS(turnoEditar.valorHoraARS);
    } else {
      // Resetear formulario cuando no hay turno para editar
      setFecha(ymd(now));
      setIngreso("08:00");
      setEgreso("17:00");
      setValorHoraARS(defaultRate);
    }
  }, [turnoEditar, defaultRate]);

  const disabled = !fecha || !ingreso || !egreso || Number.isNaN(valorHoraARS) || valorHoraARS <= 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t: Turno = {
      id: fecha,
      fechaISO: fecha,
      ingreso,
      egreso,
      valorHoraARS,
    };
    onSave(t);
    // Resetear formulario después de guardar
    if (!turnoEditar) {
      setFecha(ymd(now));
      setIngreso("08:00");
      setEgreso("17:00");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <Label>Fecha</Label>
        <Input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} />
      </div>
      <div>
        <Label>Ingreso</Label>
        <Input type="time" value={ingreso} onChange={(e)=>setIngreso(e.target.value)} />
      </div>
      <div>
        <Label>Egreso</Label>
        <Input type="time" value={egreso} onChange={(e)=>setEgreso(e.target.value)} />
      </div>
      <div className="col-span-2">
        <Label>Valor hora (ARS)</Label>
        <Input type="number" inputMode="decimal" step="0.01" value={valorHoraARS} onChange={(e)=>setValorHoraARS(parseFloat(e.target.value))} />
      </div>
      <div className="col-span-2 flex gap-2">
        {turnoEditar && onCancel && (
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" className={turnoEditar ? "flex-1" : "w-full"} disabled={disabled}>
          {turnoEditar ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}


