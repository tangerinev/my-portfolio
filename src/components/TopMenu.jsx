import { useState, useEffect } from "preact/hooks";

export default function TopMenu({ active }) {
  // 접힘 대신 ‘투명도 0.3 + 크기 축소’ 효과로 바꿈
  const [hover, setHover] = useState(false);

  const items = [
    { id: "me", label: "Me" },
    { id: "code", label: "Code" },
    { id: "stories", label: "Stories" },
    { id: "thoughts", label: "Thoughts" },
  ];

  /** 페이지가 Me일 때 한 번만 살짝 줄어든 상태로 진입 */
  const initialShrink = active === "me" && !hover;

  useEffect(() => {
    // 스크롤 맨 위에서만 shrink, 아래로 내리면 항상 풀림
    const onScroll = () => window.scrollY > 120 && setHover(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 100,
        transition: "transform .25s, opacity .25s",
        transform: initialShrink ? "scale(.9)" : "scale(1)",
        opacity: initialShrink ? 0.4 : 1,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => active === "me" && setHover(false)}
    >
      {items.map((it) => (
        <a
          key={it.id}
          href={it.id === "me" ? "/" : `/${it.id}`}
          style={{
            fontWeight: it.id === active ? "bold" : 500,
            textDecoration: "none",
            color: "#334155",
            pointerEvents: initialShrink && it.id !== "me" ? "none" : "auto",
            transition: "opacity .25s",
            opacity: initialShrink && it.id !== "me" ? 0 : 1,
          }}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}
