import Sidebar from "./Sidebar";
import "../styles/shell.css";

export default function Shell({ title, subtitle, right }) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="content">
        <div className="pageHeader">
          <div>
            <h1 className="pageTitle">{title}</h1>
            {subtitle ? <p className="pageSub">{subtitle}</p> : null}
          </div>
          <div>{right}</div>
        </div>
      </main>
    </div>
  );
}
