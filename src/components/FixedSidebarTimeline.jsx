/**
 * src/components/FixedSidebarTimeline.jsx
 *  ⎿ ProjectSidebar  (고정)
 *   └ VerticalTimeline
 *        └ Blueprint (ERD  스타일)
 */
import { useState } from "preact/hooks";
import projects from "../data/projects.json";

/*----------------------- ① 고정 사이드바 ----------------------+*/
function ProjectSidebar({ current, setCurrent }) {
  return (
    <aside
      style={{
        position: "fixed",
        top: "80px",
        left: 0,
        width: "200px",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        padding: "1rem 1rem 2rem",
        borderRight: "1px solid #e2e8f0",
        background: "#fff",
        boxShadow: "2px 0 6px rgba(0,0,0,.04)",
        zIndex: 90,
      }}
    >
      <h4 style={{ margin: "0 0 .8rem" }}>Projects</h4>
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
                fontWeight: p.id === current ? 600 : 400,
                color: p.id === current ? "#2563eb" : "#475569",
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

/*---------------- ② Blueprint : ERD 블록 + 선 + 토글 ---------------*/
function Blueprint({ front, back, tech }) {
  const rowH = 46; // 행 높이
  const svgH = Math.max(front.length, back.length) * rowH;

  return (
    <div style={{ marginTop: "1rem", position: "relative" }}>
      <div style={{ display: "flex", gap: "5rem" }}>
        <Column list={front} tech={tech} left />
        <Column list={back} tech={tech} />
      </div>

      {/* 가로 연결선 */}
      <svg
        width="100%"
        height={svgH}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
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

/* Feature 블록 한 칸 + 세부 기술 토글 */
function Column({ list, tech, left = false }) {
  const [open, setOpen] = useState(null);
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {list.map((feat, i) => (
        <li key={feat} style={{ margin: `${i ? 24 : 0}px 0` }}>
          <button
            onClick={() => setOpen(open === feat ? null : feat)}
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
            {feat}
          </button>
          {open === feat && (
            <div
              style={{
                position: "absolute",
                [left ? "left" : "right"]: "215px",
                top: `${i * 46}px`,
                maxWidth: "260px",
                padding: ".7rem",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow: "0 4px 14px rgba(0,0,0,.08)",
                fontSize: ".85rem",
                lineHeight: 1.45,
              }}
            >
              {tech[feat]?.map((t) => (
                <div key={t}>• {t}</div>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/*-------------- ③ 타임라인 + 중앙 분리 애니메이션 ---------------*/
function VerticalTimeline() {
  const [openId, setOpen] = useState(null);
  return (
    <section
      style={{
        marginLeft: "220px",
        padding: "2rem 1rem 4rem",
        maxWidth: "900px",
      }}
    >
      {/* 중앙 세로선 */}
      <div
        style={{
          position: "absolute",
          left: "calc(50% + 110px)",
          top: 0,
          bottom: 0,
          width: "4px",
          background: "#cbd5e1",
        }}
      />
      {projects.map((p, idx) => {
        const side = idx % 2 ? "left" : "right";
        const isOpen = openId === p.id;
        return (
          <div
            key={p.id}
            id={p.id}
            style={{
              position: "relative",
              margin: "3.5rem 0",
              display: "flex",
              justifyContent: side === "left" ? "flex-start" : "flex-end",
            }}
          >
            {/* 노드 점 */}
            <div
              style={{
                position: "absolute",
                left: "calc(50% + 110px)",
                top: "0",
                transform: "translate(-50%,-50%)",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#1e293b",
              }}
            />
            {/* 카드 */}
            <article
              onClick={() => setOpen(isOpen ? null : p.id)}
              style={{
                width: "46%",
                cursor: "pointer",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fff",
                transform: isOpen
                  ? `translateY(${side === "left" ? "-60px" : "60px"})`
                  : "none",
                transition: "transform .4s",
              }}
            >
              <strong>{p.date}</strong> — {p.title}
              {isOpen && (
                <Blueprint front={p.front} back={p.back} tech={p.tech} />
              )}
            </article>
          </div>
        );
      })}
    </section>
  );
}

/*------------------- ④ 최상위 통합 -------------------*/
export default function FixedSidebarTimeline() {
  const [current, setCurrent] = useState(null);
  return (
    <>
      <ProjectSidebar current={current} setCurrent={setCurrent} />
      <VerticalTimeline />
    </>
  );
}
