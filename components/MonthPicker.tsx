"use client";
import { Button } from "@/components/ui";

type Props = {
  year: number;
  month: number; // 0-based
  onChange: (y: number, m: number) => void;
};

export default function MonthPicker({ year, month, onChange }: Props) {
  const prev = () => {
    const d = new Date(year, month - 1, 1);
    onChange(d.getFullYear(), d.getMonth());
  };
  const next = () => {
    const d = new Date(year, month + 1, 1);
    onChange(d.getFullYear(), d.getMonth());
  };
  const label = new Date(year, month, 1).toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={prev} aria-label="Mes anterior">←</Button>
      <div className="text-sm font-medium capitalize">{label}</div>
      <Button variant="outline" onClick={next} aria-label="Mes siguiente">→</Button>
    </div>
  );
}


