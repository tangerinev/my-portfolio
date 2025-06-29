import projects from "../data/projects.json";

export default function ProjectSidebar({ openId, setOpen }) {
  return (
    <ul
      style={{
        position: "sticky",
        top: "6rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: "180px",
      }}
    >
      {projects.map((p) => (
        <li key={p.id} style={{ margin: ".5rem 0" }}>
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
              color: p.id === openId ? "#2563eb" : "#475569",
              cursor: "pointer",
            }}
          >
            {p.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
