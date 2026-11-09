import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SIDE, SCREENS } from "../screens";
import { useAuth } from "../lib/auth";
import { Svg, ICON } from "./Svg";

export const screenId = (pathname: string) => pathname.replace(/^\//, "") || "dashboard";

// Same page frame as the current back office (index.html): .app > .side + .main > .top + .content
export function Layout() {
  const { staff, company, session, signOut } = useAuth();
  const { pathname } = useLocation();
  const id = screenId(pathname);
  const sideOn = SCREENS[id]?.side ?? id;

  // "Menu" is the only sidebar entry with sub-entries (Menu Builder, Sales Channels)
  const groupStart = SIDE.findIndex((s) => s.href === null);
  const groupKids = SIDE.slice(groupStart + 1, groupStart + 3);
  const groupHasCurrent = groupKids.some((k) => k.href === sideOn);
  const [groupOpen, setGroupOpen] = useState(groupHasCurrent);
  useEffect(() => { if (groupHasCurrent) setGroupOpen(true); }, [groupHasCurrent]);

  // phone: the sidebar slides in
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle("navopen", navOpen); }, [navOpen]);
  useEffect(() => setNavOpen(false), [pathname]);

  // account menu (top right)
  const [acctOpen, setAcctOpen] = useState(false);
  const acctRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!acctRef.current?.contains(e.target as Node)) setAcctOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const who = company?.name ?? staff?.name ?? "";
  const initials = who.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const roleLabel = staff?.role === "owner" ? "Owner · full access" : staff?.role === "admin" ? "Admin" : staff?.role === "agent" ? "Agent" : "";

  const link = (s: (typeof SIDE)[number], cls = "") => (
    <Link key={s.text} to={"/" + s.href} className={[cls, s.href === sideOn ? "on" : ""].join(" ").trim()}>
      <Svg paths={s.svg} />{s.text}
    </Link>
  );

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <div className="logo">S</div>
          <div><b>Slick</b><small>Restaurant ERP</small></div>
        </div>
        <nav className="nav" id="nav">
          {SIDE.map((s, i) => {
            if (i > groupStart && i <= groupStart + groupKids.length) return null;
            if (s.href !== null) return link(s);
            return (
              <div key={s.text} className={"grp" + (groupOpen ? " open" : "") + (groupHasCurrent ? " on" : "")}>
                <button type="button" onClick={() => setGroupOpen(!groupOpen)}>
                  <Svg paths={s.svg} />{s.text}<span className="chev">›</span>
                </button>
                <div className="sub">{groupKids.map((k) => link(k))}</div>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="main">
        <div className="top">
          <button className="menuBtn" type="button" aria-label="Open menu" onClick={(e) => { e.stopPropagation(); setNavOpen(!navOpen); }}>
            <Svg paths={ICON.menu} />
          </button>
          <div className="sp" />
          <div className="acct" ref={acctRef}>
            <button type="button" className="acctbtn" id="acctBtn" aria-haspopup="menu" aria-expanded={acctOpen} onClick={() => setAcctOpen(!acctOpen)}>
              <span className="avatar" id="avatar" aria-hidden="true">{initials}</span><span id="who">{who}</span><span className="chev" aria-hidden="true">▾</span>
            </button>
            <div className="acctmenu" id="acctMenu" role="menu" hidden={!acctOpen}>
              <div className="acchead">
                <b>{staff?.name ?? ""}</b>
                <span className="note">{session?.user.email ?? ""}</span>
                {roleLabel && <span className="tag on" style={{ marginTop: 6, alignSelf: "flex-start" }}>{roleLabel}</span>}
              </div>
              <a href="../index.html#account" role="menuitem">Account settings</a>
              <button type="button" role="menuitem" onClick={signOut}>Sign out</button>
            </div>
          </div>
        </div>
        <div className="content" id="view">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
