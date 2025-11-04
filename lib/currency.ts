const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2 });

export function formatARS(value: number) {
  return formatter.format(value || 0);
}


