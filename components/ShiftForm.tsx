"use client";
import { useState } from "react";
import { Button, Card, CardContent, Label, Input } from "@/components/ui";
import { ymd } from "@/lib/time";
import { Turno } from "@/lib/types";

type Props = {
  defaultRate?: number;
  onSave: (t: Turno) => void;
};

export default function ShiftForm({ defaultRate = 0, onSave }: Props) {
  const now = new Date();
  const [fecha, setFecha] = useState<string>(ymd(now));
  const [ingreso, setIngreso] = useState<string>("08:00");
  const [egreso, setEgreso] = useState<string>("17:00");
  const [valorHoraARS, setValorHoraARS] = useState<number>(defaultRate);

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
      <div className="col-span-2">
        <Button type="submit" className="w-full" disabled={disabled}>Guardar</Button>
      </div>
    </form>
  );
}


