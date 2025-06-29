import { useState } from "preact/hooks";
import projects from "../data/projects.json";
import ProjectSidebar from "./ProjectSidebar.jsx";

/* ----- Blueprint: Mermaid ERD SVG ------------------------------------ */
function Blueprint({ front, back }) {
  /* front i ↔ back i 로 단순 연결 (필요시 links prop 생성) */
  const diagram = `
    graph LR
    ${front.map((f, i) => `F${i}["${f}"]`).join("\n")}
    ${back.map((b, i) => `B${i}["${b}"]`).join("\n")}
    ${front.map((_, i) => `F${i} --> B${i}`).join("\n")}
  `;
  return (
    <div class="mermaid" style={{ marginTop: "1rem" }}>
      {diagram}
    </div>
  );
}

/* ----- 타임라인 + 카드 ----------------------------------------------- */
function Timeline() {
  const [open, setOpen] = useState(null);

  return (
    <>
      {projects.map((p, idx) => {
        const left = idx % 2 === 1;
        const isOpen = open === p.id;

        return (
          <section key={p.id} id={p.id} style={{ margin: "3.5rem 0" }}>
            <div class="timeline-grid">
              {/* 중앙선 & 점 */}
              <div class="midline" />
              <div class="timeline-dot" />

              {/* 카드 */}
              <article
                class={`timeline-card ${left ? "" : "right"}`}
                onClick={() => setOpen(isOpen ? null : p.id)}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem",
                  background: "#fff",
                  cursor: "pointer",
                  boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,.08)" : "none",
                }}
              >
                <strong>{p.date}</strong> — {p.title}
                {isOpen && <Blueprint front={p.front} back={p.back} />}
              </article>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ----- 통합 컴포넌트 -------------------------------------------------- */
export default function FixedSidebarTimeline() {
  const [current, setCurrent] = useState(null);
  return (
    <>
      <ProjectSidebar current={current} setCurrent={setCurrent} />
      <Timeline />
    </>
  );
}
