import { useEffect, useState, type ReactNode } from "react";

export type Column<T> = { title: string; num?: boolean; cell: (row: T) => ReactNode };

const PER = 50;   // same page size as the current back office

// Table card with select boxes and Previous / Next, as on the current back office (.card.tbl)
export function Table<T extends { id: string }>({ rows, columns, empty, onOpen }: {
  rows: T[]; columns: Column<T>[]; empty: string; onOpen?: (row: T) => void;
}) {
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const pages = Math.max(1, Math.ceil(rows.length / PER));
  const pg = Math.min(page, pages);
  const shown = rows.slice((pg - 1) * PER, pg * PER);
  useEffect(() => setPage(1), [rows.length]);
  const allOn = shown.length > 0 && shown.every((r) => sel.has(r.id));
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="card tbl obody tfit">
      {rows.length === 0 ? (
        <div className="empty"><p className="note">{empty}</p></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="noedit bkc">
                <input type="checkbox" aria-label="Select all on this page" checked={allOn}
                  onChange={() => setSel((s) => { const n = new Set(s); shown.forEach((r) => (allOn ? n.delete(r.id) : n.add(r.id))); return n; })} />
              </th>
              {columns.map((c) => <th key={c.title} className={c.num ? "num" : ""}>{c.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className={onOpen ? "click" : ""} onClick={() => onOpen?.(r)}>
                <td className="noedit bkc" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={sel.has(r.id)} onChange={() => toggle(r.id)} />
                </td>
                {columns.map((c) => <td key={c.title} className={c.num ? "num" : ""}>{c.cell(r)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pager">
        <span className="note">Showing {rows.length ? (pg - 1) * PER + 1 : 0} to {Math.min(pg * PER, rows.length)} out of {rows.length}</span>
        <div className="sp" />
        <button className="btn sm" disabled={pg <= 1} onClick={() => setPage(pg - 1)}>Previous</button>
        <button className="btn sm" disabled={pg >= pages} onClick={() => setPage(pg + 1)}>Next</button>
      </div>
    </div>
  );
}
