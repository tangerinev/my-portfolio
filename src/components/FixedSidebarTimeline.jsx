import { useState } from "preact/hooks";
import projects from "../data/projects.json";
import ProjectSidebar from "./ProjectSidebar.jsx";

/* ------------- Blueprint with ref & mermaid.render ------------------- */
import { useEffect, useRef } from "preact/hooks";

function Blueprint({ front, back }) {
  const ref = useRef(null);

  // Mermaid 다이어그램 텍스트
  const diagram = [
    "graph LR",
    ...front.map((f, i) => `F${i}["${f}"]`),
    ...back.map((b, i) => `B${i}["${b}"]`),
    ...front.map((_, i) => `F${i} --> B${i}`),
  ].join("\n");

  useEffect(() => {
    async function renderMermaid() {
      // ① 아직 mermaid가 없으면 ESM 동적 import
      if (!window.mermaid) {
        const mod = await import(
          "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
        );
        window.mermaid = mod.default;
        mod.default.initialize({ startOnLoad: false, theme: "default" });
      }

      // ② SVG 렌더링
      const { mermaid } = window;
      const id = "m_" + Math.random().toString(36).slice(2);
      mermaid.render(id, diagram, (svg) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }

    renderMermaid();
  }, []);

  return <div ref={ref} style={{ marginTop: "1rem" }} />;
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
