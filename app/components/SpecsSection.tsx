"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const specs = [
  { label: "Case Material", value: "Grade 5 Titanium, DLC" },
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const glowY = useTransform(scrollYProgress, [0, 1], [-50, 200]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "10rem 2rem",
        background: "var(--bg-secondary)",
        overflow: "hidden",
        perspective: "1000px",
      }}
    >
      {/* Background glow for parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(0, 214, 255, 0.03) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
          y: glowY,
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div className="caption" style={{ marginBottom: "1rem", color: "#00D6FF" }}>
            Technical Specifications
          </div>
          <h2 className="heading-lg">Precision in every detail.</h2>
        </motion.div>

        <div
          className="specs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            columnGap: "3rem",
            rowGap: "0",
          }}
        >
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40, rotateX: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                padding: "1.75rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                transformOrigin: "top center",
              }}
            >
              {/* Animated bottom border */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
                  transformOrigin: "left center",
                }}
              />
              <span
                style={{
                  fontSize: "0.80rem",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.9)",
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
