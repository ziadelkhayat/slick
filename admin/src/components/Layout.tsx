import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV, TITLES, groupOf, isGroup, isLeaf } from "../nav";
import { useAuth } from "../lib/auth";
import { Icon } from "./Icon";

// Foodics-style shell: dark sidebar with the main sections; a section with screens opens them as tabs across the top.
export function Layout() {
  const { staff, company, signOut } = useAuth();
  const { pathname } = useLocation();
  const screen = pathname.replace(/^\//, "") || "dashboard";
  const group = groupOf(screen);
  const [open, setOpen] = useState<string | null>(group?.title ?? null);

  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">
          <span className="logo" aria-hidden>S</span>
          <div>
            <b>Slick</b>
            <small>{company?.name ?? ""}</small>
          </div>
        </div>
        <nav>
          {NAV.map((n) =>
            isGroup(n) ? (
              <div key={n.title} className={"grp" + (group?.title === n.title ? " cur" : "")}>
                <button className="item" onClick={() => setOpen(open === n.title ? null : n.title)}>
                  <Icon name={n.icon} /> <span>{n.title}</span>
                  <span className={"chev" + (open === n.title ? " up" : "")}><Icon name="chevron" size={14} /></span>
                </button>
                {open === n.title && (
                  <div className="kids">
                    {n.kids.filter(isLeaf).map((k) => (
                      <NavLink key={k.id} to={"/" + k.id} className="kid">{k.title}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={n.id} to={"/" + n.id} className="item">
                <Icon name={n.icon} /> <span>{n.title}</span>
              </NavLink>
            ),
          )}
        </nav>
        <div className="me">
          <div>
            <b>{staff?.name ?? "Signed In"}</b>
            <small>{staff ? staff.role[0].toUpperCase() + staff.role.slice(1) : ""}</small>
          </div>
          <button className="icon-btn" title="Sign Out" onClick={signOut}><Icon name="logout" /></button>
        </div>
      </aside>

      <main className="main">
        <header className="top">
          <h1>{TITLES[screen] ?? "Slick"}</h1>
          {group && (
            <div className="tabs">
              {group.kids.map((k, i) =>
                isLeaf(k) ? <NavLink key={k.id} to={"/" + k.id} className="tab">{k.title}</NavLink> : <span key={i} className="tab-h">{k.heading}</span>,
              )}
            </div>
          )}
        </header>
        <section className="page">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
