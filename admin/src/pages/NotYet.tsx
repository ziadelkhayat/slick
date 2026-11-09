import { useLocation } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { screenId } from "../components/Layout";
import { SCREENS } from "../screens";

// Screens not rebuilt in React yet: same tabs and title, and a way to open the screen in the current back office.
export function NotYet() {
  const id = screenId(useLocation().pathname);
  const title = SCREENS[id]?.title ?? "This screen";
  return (
    <>
      <PageHead id={id} />
      <div className="card">
        <div className="empty">
          <p className="note">{title} hasn't moved to the new back office yet.</p>
          <a className="btn pri" href={`../index.html#${id}`}>Open in Current Back Office</a>
        </div>
      </div>
    </>
  );
}
