import { useState } from "preact/hooks";
import projects from "../data/projects.json";

import ProjectSidebar from "./ProjectSidebar.jsx";

export default function VerticalTimeline() {
  const [openId, setOpen] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      {/* ❶ 사이드바 */}
      <ProjectSidebar openId={openId} setOpen={setOpen} />

      {/* ❷ 타임라인 영역 */}
      <div style={{ position: "relative", flex: 1, padding: "2rem 0" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "4px",
            background: "#cbd5e1",
            transform: "translateX(-50%)",
          }}
        />

        {projects.map((p, i) => {
          const left = i % 2 === 0;
          const isOpen = openId === p.id;
          return (
            <section
              key={p.id}
              id={p.id}
              style={{
                position: "relative",
                margin: "3rem 0",
                display: "flex",
                justifyContent: left ? "flex-start" : "flex-end",
              }}
            >
              {/* 노드 */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: "translate(-50%,-50%)",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#1e293b",
                }}
              />

              {/* 카드 */}
              <div
                style={{
                  width: "46%",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                  boxShadow: isOpen ? "0 4px 18px rgba(0,0,0,.12)" : "none",
                  transition: "transform .35s",
                  transform: isOpen
                    ? `translateY(${left ? "-50px" : "50px"})`
                    : "translateY(0)",
                }}
                onClick={() => setOpen(isOpen ? null : p.id)}
              >
                <strong>{p.date}</strong> — {p.title}
                {isOpen && (
                  <Blueprint front={p.front} back={p.back} tech={p.tech} />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Blueprint.jsx 내부 함수 교체 ---- */
function Blueprint({ front, back, tech }) {
  // 블록 사이 간격(행 높이) 계산
  const rowH = 40;
  const height = Math.max(front.length, back.length) * rowH;

  return (
    <div style={{ marginTop: "1rem", position: "relative" }}>
      {/* 두 칼럼 */}
      <div style={{ display: "flex", gap: "4rem" }}>
        {/* Front 블록 */}
        <div>
          {front.map((f, i) => (
            <FeatureBlock
              key={f}
              name={f}
              top={i * rowH}
              side="left"
              tech={tech[f]}
            />
          ))}
        </div>

        {/* Back 블록 */}
        <div>
          {back.map((b, i) => (
            <FeatureBlock
              key={b}
              name={b}
              top={i * rowH}
              side="right"
              tech={tech[b]}
            />
          ))}
        </div>
      </div>

      {/* SVG 선 */}
      <svg
        width="100%"
        height={height}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        {front.map((f, i) => (
          <line
            key={f}
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
            <path d="M0 0 L6 3 L0 6 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* 재사용 가능한 블록 + 클릭 토글 */
function FeatureBlock({ name, tech = [], top, side }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: top ? `${top}px` : 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          minWidth: "160px",
          padding: ".4rem .6rem",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          background: "#f8fafc",
          textAlign: "left",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {name}
      </button>

      {/* 기술 리스트 토글 */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 0,
            [side === "left" ? "left" : "right"]: "180px",
            maxWidth: "240px",
            padding: ".6rem .9rem",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,.06)",
            lineHeight: 1.4,
          }}
        >
          {tech.map((t) => (
            <p key={t} style={{ margin: 0, fontSize: ".85rem" }}>
              • {t}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
