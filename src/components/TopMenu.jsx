import { useState } from "preact/hooks";

export default function TopMenu({ active }) {
  const [collapsed, setCollapsed] = useState(active === "me"); // Me 클릭 후 자동 접힘
  const items = [
    { id: "me", label: "Me" },
    { id: "code", label: "Code" },
    { id: "stories", label: "Stories" },
    { id: "thoughts", label: "Thoughts" },
  ];

  const toggle = (id) => {
    if (id === "me") setCollapsed(true);
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: ".75rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 50,
      }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => active === "me" && setCollapsed(true)}
    >
      {items.map((it) =>
        collapsed && it.id !== active ? null : (
          <a
            href={it.id === "me" ? "/" : `/${it.id}`}
            onClick={() => toggle(it.id)}
            style={{
              fontWeight: it.id === active ? "bold" : 500,
              textDecoration: "none",
              color: "#334155",
            }}
          >
            {it.label}
          </a>
        )
      )}
    </nav>
  );
}
