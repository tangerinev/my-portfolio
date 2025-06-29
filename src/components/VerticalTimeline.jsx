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

/* ❸ Front ↔ Back 다이어그램 */
function Blueprint({ front, back, tech }) {
  // 두 컬럼을 SVG 선으로 시각적 연결
  return (
    <div style={{ marginTop: "1rem", position: "relative" }}>
      <div style={{ display: "flex", gap: "2rem" }}>
        <ul style={{ flex: 1 }}>
          {front.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <ul style={{ flex: 1 }}>
          {back.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      {/* 연결선 (간단 SVG) */}
      <svg
        width="100%"
        height={front.length * 28}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        {front.map((f, i) => (
          <line
            key={i}
            x1="45%"
            y1={20 + i * 28}
            x2="55%"
            y2={20 + i * 28}
            stroke="#94a3b8"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* 기술 토글 리스트 */}
      <details style={{ marginTop: "1rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>
          ▶ 기술 스택 자세히
        </summary>
        {Object.entries(tech).map(([feat, list]) => (
          <p key={feat} style={{ margin: "0.4rem 0" }}>
            <strong>{feat}</strong>: {list.join(", ")}
          </p>
        ))}
      </details>
    </div>
  );
}
