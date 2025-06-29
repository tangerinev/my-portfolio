export default function SideBookmarks({ items }) {
  return (
    <ul
      style={{
        position: "sticky",
        top: "6rem",
        paddingLeft: 0,
        listStyle: "none",
      }}
    >
      {items.map((it) => (
        <li key={it.id} style={{ margin: "0.5rem 0" }}>
          <a
            href={`#${it.id}`}
            style={{ color: "#64748b", textDecoration: "none" }}
          >
            ▸ {it.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
