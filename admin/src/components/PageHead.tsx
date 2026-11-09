import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SCREENS } from "../screens";
import { Svg } from "./Svg";

// Section tabs + page title, as on the current back office (.ostick > .ptabs + .phead)
export function PageHead({ id, actions, children }: { id: string; actions?: ReactNode; children?: ReactNode }) {
  const s = SCREENS[id];
  return (
    <div className="ostick">
      {s?.tabs.length > 0 && (
        <nav className="ptabs">
          {s.tabs.map((t) => (
            <Link key={t.id} to={"/" + t.id} className={t.id === id ? "on" : ""}><Svg paths={t.svg} />{t.text}</Link>
          ))}
        </nav>
      )}
      {s?.title && (
        <div className="phead">
          {s.hico && <span className="hico"><Svg paths={s.hico} /></span>}
          <h1>{s.title}</h1>
          <div className="sp" />
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
