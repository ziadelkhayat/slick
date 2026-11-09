import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sb } from "../lib/supabase";
import { Icon } from "../components/Icon";

type Brand = { id: string; name: string; name_ar: string | null; deleted: boolean; created_at: string };
type Branch = { id: string; brand_id: string | null };

// First screen on React: the company's brands with their number of branches (live data).
export function Brands() {
  const [tab, setTab] = useState<"all" | "deleted">("all");
  const [q, setQ] = useState("");

  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await sb.from("brands").select("id,name,name_ar,deleted,created_at").order("name");
      if (error) throw error;
      return data as Brand[];
    },
  });
  const branches = useQuery({
    queryKey: ["branches", "brand-counts"],
    queryFn: async () => {
      const { data, error } = await sb.from("branches").select("id,brand_id");
      if (error) throw error;
      return data as Branch[];
    },
  });

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (brands.data ?? [])
      .filter((b) => (tab === "deleted" ? b.deleted : !b.deleted))
      .filter((b) => !s || b.name.toLowerCase().includes(s) || (b.name_ar ?? "").includes(q.trim()));
  }, [brands.data, tab, q]);
  const count = (id: string) => (branches.data ?? []).filter((b) => b.brand_id === id).length;

  return (
    <div className="panel">
      <div className="bar">
        <div className="seg">
          <button className={tab === "all" ? "on" : ""} onClick={() => setTab("all")}>All</button>
          <button className={tab === "deleted" ? "on" : ""} onClick={() => setTab("deleted")}>Deleted</button>
        </div>
        <label className="search">
          <Icon name="search" size={16} />
          <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      {brands.isLoading ? (
        <div className="empty">Loading…</div>
      ) : brands.error ? (
        <div className="empty err">Couldn't load brands: {(brands.error as Error).message}</div>
      ) : rows.length === 0 ? (
        <div className="empty">No brands here.</div>
      ) : (
        <table className="grid">
          <thead>
            <tr><th>Name</th><th>Name Localized</th><th>Branches</th><th>Created</th></tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <td><b>{b.name}</b></td>
                <td><span dir="auto">{b.name_ar || "—"}</span></td>
                <td>{count(b.id)}</td>
                <td>{new Date(b.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
