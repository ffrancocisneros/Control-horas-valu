"use client";
import { Card, CardContent } from "@/components/ui";
import { MonthTotals } from "@/lib/types";
import { formatARS } from "@/lib/currency";

type Props = {
  totals: MonthTotals;
};

export default function SummaryBar({ totals }: Props) {
  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div>
          <div className="text-muted-foreground mb-1">Total con viáticos</div>
          <div className="font-semibold">{formatARS(totals.montoTotalConViaticos)}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Total viáticos</div>
          <div className="font-semibold">{formatARS(totals.montoTotalViaticos)}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Horas sin viáticos</div>
          <div className="font-semibold">{formatARS(totals.montoTotalHoras)}</div>
        </div>
      </CardContent>
    </Card>
  );
}


