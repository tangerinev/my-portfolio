import { useState } from "preact/hooks";
import data from "../data/timeline.json";

export default function Timeline() {
  const [open, setOpen] = useState(null);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {data.map((it, idx) => (
        <li key={idx} style={{ marginBottom: "1rem" }}>
          <button
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <strong>{it.date}</strong> · {it.title}
          </button>

          {open === idx && (
            <p
              style={{
                marginTop: "0.5rem",
                background: "#f9fafb",
                padding: "0.75rem",
                borderRadius: "6px",
              }}
            >
              {it.desc}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
