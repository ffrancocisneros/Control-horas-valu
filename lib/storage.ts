import { Turno } from "./types";

const KEY = "chv:turnos:v1";

function readAll(): Turno[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(list: Turno[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function getAll(): Turno[] {
  return readAll();
}

export function upsertByFecha(turno: Turno) {
  const all = readAll();
  const idx = all.findIndex(t => t.fechaISO === turno.fechaISO);
  if (idx >= 0) all[idx] = turno; else all.push(turno);
  writeAll(all);
}

export function upsertById(turno: Turno) {
  const all = readAll();
  const idx = all.findIndex(t => t.id === turno.id);
  if (idx >= 0) {
    // Si se cambió la fecha, eliminar el turno con la fecha antigua (si existe)
    const oldTurno = all[idx];
    if (oldTurno.fechaISO !== turno.fechaISO) {
      // Buscar si hay otro turno con la nueva fecha y eliminarlo
      const newFechaIdx = all.findIndex(t => t.fechaISO === turno.fechaISO && t.id !== turno.id);
      if (newFechaIdx >= 0) {
        all.splice(newFechaIdx, 1);
      }
    }
    all[idx] = turno;
  } else {
    // Si no existe por ID, buscar por fecha y reemplazar o agregar
    const fechaIdx = all.findIndex(t => t.fechaISO === turno.fechaISO);
    if (fechaIdx >= 0) {
      all[fechaIdx] = turno;
    } else {
      all.push(turno);
    }
  }
  writeAll(all);
}

export function removeById(id: string) {
  const all = readAll().filter(t => t.id !== id);
  writeAll(all);
}

export function getByMonth(year: number, month0: number): Turno[] {
  const all = readAll();
  const m = String(month0 + 1).padStart(2, '0');
  const y = String(year);
  return all.filter(t => t.fechaISO.startsWith(`${y}-${m}-`)).sort((a,b) => a.fechaISO.localeCompare(b.fechaISO));
}


