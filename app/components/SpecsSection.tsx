"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  { label: "Case Material", value: "Grade 5 Titanium, DLC Coating" },
  { label: "Case Diameter", value: "41mm" },
  { label: "Water Resistance", value: "100m / 10 ATM" },
  { label: "Movement", value: "In-house Automatic Cal. AX1" },
  { label: "Power Reserve", value: "72 Hours" },
  { label: "Crystal", value: "Sapphire, AR Coated" },
  { label: "Bracelet", value: "Brushed Titanium, Micro-adjust" },
  { label: "Frequency", value: "28,800 vph (4 Hz)" },
];

export default function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="specs"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "8rem 2rem",
        background: "var(--bg-secondary)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="caption" style={{ marginBottom: "1rem", color: "#00D6FF" }}>
            Technical Specifications
          </div>
          <h2 className="heading-lg">Precision in every detail.</h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
          }}
        >
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                padding: "1.5rem 2rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  textAlign: "right",
                }}
              >
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
