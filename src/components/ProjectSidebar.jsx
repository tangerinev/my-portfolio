import projects from "../data/projects.json";

export default function ProjectSidebar({ openId, setOpen }) {
  return (
    <aside
      style={{
        /* 고정 위치: viewport 왼쪽 0px */
        position: "fixed",
        top: "80px" /* TopMenu 높이만큼 내려서 겹치지 않게 */,
        left: 0,
        width: "200px",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        padding: "1rem 1rem 2rem",
        borderRight: "1px solid #e2e8f0",
        background: "#ffffff",
        boxShadow: "2px 0 4px rgba(0,0,0,.04)",
      }}
    >
      <h4 style={{ margin: "0 0 .75rem", fontWeight: 600 }}>Projects</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.6 }}>
        {projects.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => {
                document
                  .querySelector("#" + p.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
                setOpen(p.id);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                width: "100%",
                cursor: "pointer",
                color: p.id === openId ? "#2563eb" : "#475569",
                fontWeight: p.id === openId ? 600 : 400,
              }}
            >
              {p.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
