import { useState, useEffect } from "preact/hooks";
import projects from "../data/projects.json";
import ProjectSidebar from "./ProjectSidebar.jsx";

/* ------------- Feature 블록 (클릭 → 기술 토글) -------------- */
function Feature({ name, techList, left, row }) {
  const [open, setOpen] = useState(false);

  /* 세부 기술 토글 박스 위치 조정 */
  const popStyle = {
    position: "absolute",
    top: `${row * 46}px`,
    [left ? "left" : "right"]: "215px",
    maxWidth: "260px",
    padding: ".7rem",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    boxShadow: "0 4px 14px rgba(0,0,0,.08)",
    fontSize: ".85rem",
    lineHeight: 1.45,
    zIndex: 20,
  };

  return (
    <li style={{ margin: `${row ? 24 : 0}px 0`, position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          minWidth: "180px",
          padding: ".45rem .7rem",
          border: "1px solid #cbd5e1",
          background: "#f8fafc",
          borderRadius: "6px",
          textAlign: "left",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {name}
      </button>
      {open && (
        <div style={popStyle}>
          {techList.map((t) => (
            <div key={t}>• {t}</div>
          ))}
        </div>
      )}
    </li>
  );
}

/* ------------- Blueprint (ERD 스타일) -------------- */
function Blueprint({ front, back, tech }) {
  const rowH = 46;
  const svgH = Math.max(front.length, back.length) * rowH;
  return (
    <div style={{ marginTop: "1rem", position: "relative" }}>
      <div class="blueprint-cols">
        {/* 왼쪽: Frontend */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {front.map((f, i) => (
            <Feature key={f} name={f} techList={tech[f] || []} left row={i} />
          ))}
        </ul>

        {/* 오른쪽: Backend */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {back.map((b, i) => (
            <Feature
              key={b}
              name={b}
              techList={tech[b] || []}
              left={false}
              row={i}
            />
          ))}
        </ul>
      </div>

      {/* 가로 화살표 선 */}
      <svg class="blueprint-svg" width="100%" height={svgH}>
        {front.map((_, i) => (
          <line
            key={i}
            x1="45%"
            y1={i * rowH + 20}
            x2="55%"
            y2={i * rowH + 20}
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        ))}
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L6 3 L0 6 Z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* ------------- 타임라인 (노드 + 클릭 확장) -------------- */
function VerticalTimeline({ current, setCurrent }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  /* 화면 리사이즈 시 isMobile 다시 계산 (선택) */
  useEffect(() => {
    const onResize = () => setCurrent((c) => c); // trigger re-render
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      class="timeline-wrapper"
      style={{ marginLeft: isMobile ? 0 : "220px", padding: "2rem 1rem 4rem" }}
    >
      <div class="midline" />
      {projects.map((p, idx) => {
        const left = idx % 2 === 1;
        const open = current === p.id;
        return (
          <div
            key={p.id}
            id={p.id}
            style={{
              position: "relative",
              margin: "3.5rem 0",
              display: "flex",
              justifyContent: isMobile
                ? "center"
                : left
                ? "flex-start"
                : "flex-end",
            }}
          >
            {/* 노드 점 */}
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  left: "calc(50% + 110px)",
                  top: "0",
                  transform: "translate(-50%,-50%)",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#2563eb",
                }}
              />
            )}

            {/* 카드 */}
            <article
              onClick={() => setCurrent(open ? null : p.id)}
              style={{
                width: isMobile ? "100%" : "46%",
                cursor: "pointer",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fff",
                boxShadow: open ? "0 4px 16px rgba(0,0,0,.08)" : "none",
                transform: open
                  ? `translateY(${isMobile ? "0" : left ? "-60px" : "60px"})`
                  : "none",
                transition: "transform .35s",
              }}
            >
              <strong>{p.date}</strong> — {p.title}
              {open && (
                <Blueprint front={p.front} back={p.back} tech={p.tech} />
              )}
            </article>
          </div>
        );
      })}
    </section>
  );
}

/* ------------- 최상위 통합 컴포넌트 -------------- */
export default function FixedSidebarTimeline() {
  const [current, setCurrent] = useState(null);
  return (
    <>
      <ProjectSidebar current={current} setCurrent={setCurrent} />
      <VerticalTimeline current={current} setCurrent={setCurrent} />
    </>
  );
}
