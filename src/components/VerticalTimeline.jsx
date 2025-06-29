import { useState } from "preact/hooks";
import data from "../data/timeline.json";

/**
 * data 배열 요소 예:
 * { date:'2024-12', title:'LangEx', desc:'…', side:'left', roadmap:[…] }
 * side: 'left' | 'right' (없으면 교대로 자동)
 */

export default function VerticalTimeline() {
  const [open, setOpen] = useState(null);

  // side 값이 없으면 index 홀짝으로 자동 배치
  const withSide = data.map((d, i) => ({
    ...d,
    side: d.side || (i % 2 ? "left" : "right"),
  }));

  return (
    <div
      style={{ position: "relative", padding: "2rem 0 2rem", width: "100%" }}
    >
      {/* 중앙선 */}
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

      {withSide.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            style={{
              position: "relative",
              margin: "3rem 0",
              display: "flex",
              justifyContent: item.side === "left" ? "flex-start" : "flex-end",
              alignItems: "center",
            }}
          >
            {/* 노드 원 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#334155",
              }}
            />
            {/* 카드 */}
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              style={{
                width: "46%",
                background: "#fff",
                border: "1px solid #e2e8f0",
                padding: "1rem",
                borderRadius: "0.5rem",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,.1)" : "none",
                transition: "transform .35s",
                transform: isOpen
                  ? `translateY(${item.side === "left" ? "-40px" : "40px"})`
                  : "translateY(0)",
              }}
            >
              <strong>{item.date}</strong> — {item.title}
              {isOpen && (
                <div style={{ marginTop: "0.75rem", lineHeight: 1.4 }}>
                  <p>{item.desc}</p>
                  {/* 상세 로드맵 예시 */}
                  {item.roadmap?.map((r, n) => (
                    <p
                      key={n}
                      style={{ marginLeft: "1rem", fontSize: ".9rem" }}
                    >
                      • {r}
                    </p>
                  ))}
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
