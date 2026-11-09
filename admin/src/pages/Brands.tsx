import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sb } from "../lib/supabase";
import { PageHead } from "../components/PageHead";
import { Table } from "../components/Table";
import { Svg, ICON } from "../components/Svg";

type Brand = { id: string; name: string; name_ar: string | null; deleted: boolean };

// Manage → Brands, same screen as the current back office
export function Brands() {
  const [tab, setTab] = useState<"all" | "deleted">("all");
  const [q, setQ] = useState("");

  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await sb.from("brands").select("id,name,name_ar,deleted").order("name");
      if (error) throw error;
      return data as Brand[];
    },
  });
  const branches = useQuery({
    queryKey: ["branches", "ids"],
    queryFn: async () => {
      const { data, error } = await sb.from("branches").select("id,brand_id");
      if (error) throw error;
      return data as { id: string; brand_id: string | null }[];
    },
  });

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (brands.data ?? [])
      .filter((b) => (tab === "deleted" ? b.deleted : !b.deleted))
      .filter((b) => !s || b.name.toLowerCase().includes(s) || (b.name_ar ?? "").toLowerCase().includes(s));
  }, [brands.data, tab, q]);
  const count = (id: string) => (branches.data ?? []).filter((b) => b.brand_id === id).length;
  const old = (hash: string) => { location.href = "../index.html#" + hash; };

  return (
    <>
      <PageHead id="brands" actions={<button className="btn pri" onClick={() => old("brands")}><Svg paths={ICON.plus} />Create Brand</button>}>
        <div className="card otabsc">
          <div className="ttop">
            <div className="ttabs">
              <a href="#/brands" className={tab === "all" ? "on" : ""} onClick={(e) => { e.preventDefault(); setTab("all"); }}>All</a>
              <a href="#/brands" className={tab === "deleted" ? "on" : ""} onClick={(e) => { e.preventDefault(); setTab("deleted"); }}>Deleted</a>
            </div>
            <div className="sp" />
            <input className="sel search" placeholder="Search" aria-label="Search Brands" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
      </PageHead>
      {brands.error ? (
        <div className="card"><p className="note">Couldn't load brands: {(brands.error as Error).message}</p></div>
      ) : (
        <Table
          rows={brands.isLoading ? [] : rows}
          empty={brands.isLoading ? "Loading…" : "No brands yet."}
          onOpen={() => old("brands")}
          columns={[
            { title: "Brand", cell: (b) => <><b>{b.name}</b> {b.name_ar && <span className="note">{b.name_ar}</span>}</> },
            { title: "Branches", num: true, cell: (b) => count(b.id) },
          ]}
        />
      )}
    </>
  );
}
