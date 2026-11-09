import { useLocation } from "react-router-dom";
import { TITLES } from "../nav";

// Screens not rebuilt in React yet: open the same screen in the current back office.
export function NotYet() {
  const id = useLocation().pathname.replace(/^\//, "") || "dashboard";
  return (
    <div className="panel empty-state">
      <h2>{TITLES[id] ?? "This screen"} isn't on the new back office yet</h2>
      <p>It still works in the current back office while it's being rebuilt.</p>
      <a className="btn primary" href={`../index.html#${id}`}>Open in Current Back Office</a>
    </div>
  );
}
