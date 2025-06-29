import { useState } from "preact/hooks";
import projects from "../data/projects.json";
import ProjectSidebar from "./ProjectSidebar.jsx";

/* ------------- Blueprint with ref & mermaid.render ------------------- */
import { useEffect, useRef } from "preact/hooks";

function Blueprint({ front, back }) {
  /* 1) mermaid 마크다운 문자열 만들기 */
  const diagram = [
    "graph LR",
    ...front.map((f, i) => `F${i}["${f}"]`),
    ...back.map((b, i) => `B${i}["${b}"]`),
    ...front.map((_, i) => `F${i} --> B${i}`),
  ].join("\n");

  const containerRef = useRef(null);

  /* 2) DOM 삽입 후 1회 mermaid.render 실행 */
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.mermaid &&
      containerRef.current
    ) {
      const { mermaid } = window;
      const uniqueId = "m_" + Math.random().toString(36).slice(2);
      mermaid.render(uniqueId, diagram, (svgCode) => {
        containerRef.current.innerHTML = svgCode;
      });
    }
  }, []);

  /* 3) 빈 div → mermaid.render 가 SVG를 삽입 */
  return <div ref={containerRef} style={{ marginTop: "1rem" }} />;
}

/* ── 타임라인 ── */
function Timeline({ current, setCurrent }) {
  return (
    <>
      <div class="midline" /> {/* 중앙선 한 번만 그려도 충분 */}
      {projects.map((p, idx) => {
        const left = idx % 2 === 1;
        const open = current === p.id;

        return (
          <section key={p.id} id={p.id} class="timeline-section">
            <div class="timeline-grid">
              <div class="timeline-dot" />

              <article
                class={`timeline-card ${left ? "" : "right"}`}
                onClick={() => setCurrent(open ? null : p.id)}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem",
                  background: "#fff",
                  cursor: "pointer",
                  boxShadow: open ? "0 4px 14px rgba(0,0,0,.08)" : "none",
                }}
              >
                <strong>{p.date}</strong> — {p.title}
                {open && <Blueprint front={p.front} back={p.back} />}
              </article>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ── 통합 컴포넌트 ── */
export default function FixedSidebarTimeline() {
  const [current, setCurrent] = useState(null);
  return (
    <>
      <ProjectSidebar current={current} setCurrent={setCurrent} />
      <Timeline current={current} setCurrent={setCurrent} />
    </>
  );
}
