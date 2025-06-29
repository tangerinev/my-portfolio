import projects from "../data/projects.json";

export default function ProjectSidebar({ current, setCurrent }) {
  return (
    <aside class="sidebar">
      <h4 style={{ margin: "0 0 .8rem", fontWeight: 600 }}>Projects</h4>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: 1.6 }}>
        {projects.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => {
                document
                  .querySelector("#" + p.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
                setCurrent(p.id);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                width: "100%",
                cursor: "pointer",
                color: p.id === current ? "#2563eb" : "#475569",
                fontWeight: p.id === current ? 600 : 400,
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
