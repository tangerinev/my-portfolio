import { useState } from "preact/hooks";

export default function TopMenu({ active }) {
  const items = ["me", "code", "stories", "thoughts"];
  const [hover, setHover] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        gap: "1.2rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        background: "#fff",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {items.map((id) => (
        <a
          key={id}
          href={id === "me" ? "/" : `/${id}`}
          style={{
            textTransform: "capitalize",
            fontWeight: id === active ? 700 : 500,
            opacity: id !== active && !hover && active === "me" ? 0.35 : 1,
            transition: "opacity .25s",
          }}
        >
          {id}
        </a>
      ))}
    </nav>
  );
}
