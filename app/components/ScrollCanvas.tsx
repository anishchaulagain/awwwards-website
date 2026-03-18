"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 147;

function getFrameSrc(index: number): string {
  const num = String(index).padStart(3, "0");
  return `/exploded-view-of-watch/ezgif-frame-${num}.jpg`;
}

/* ──────────────────────── Story Sections ──────────────────────── */

interface StoryBlock {
  id: string;
  startPct: number;
  endPct: number;
  align: "left" | "right" | "center";
  caption?: string;
  heading: string;
  lines: string[];
}

const STORIES: StoryBlock[] = [
  {
    id: "hero",
    startPct: 0,
    endPct: 0.14,
    align: "center",
    heading: "Chrono X1",
    lines: [
      "Time, perfected.",
      "A mechanical masterpiece engineered for precision and presence.",
    ],
  },
  {
    id: "craftsmanship",
    startPct: 0.16,
    endPct: 0.38,
    align: "left",
    caption: "Craftsmanship",
    heading: "Engineered with precision.",
    lines: [
      "Layered construction ensures strength and elegance.",
      "Every component is refined for balance and durability.",
    ],
  },
  {
    id: "movement",
    startPct: 0.40,
    endPct: 0.63,
    align: "right",
    caption: "Movement",
    heading: "The art of movement.",
    lines: [
      "Hundreds of micro-components in perfect harmony.",
      "Precision mechanics built for lasting accuracy.",
    ],
  },
  {
    id: "materials",
    startPct: 0.65,
    endPct: 0.83,
    align: "left",
    caption: "Materials",
    heading: "Crafted to endure.",
    lines: [
      "Sapphire clarity. Precision metal. Timeless materials.",
    ],
  },
  {
    id: "reassembly",
    startPct: 0.85,
    endPct: 1.0,
    align: "center",
    heading: "Every second, elevated.",
    lines: [
      "Built with purpose. Designed for legacy.",
    ],
  },
];

/* ──────────────────────── Component ──────────────────────── */

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleStory, setVisibleStory] = useState<string | null>("hero");
  const [storyOpacity, setStoryOpacity] = useState<Record<string, number>>({
    hero: 1,
  });
  const rafRef = useRef<number>(0);

  /* ─── Draw a frame to the canvas ─── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    // Draw with cover-fit centering
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /* ─── Preload all frames ─── */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          // Draw first frame once loaded
          setTimeout(() => drawFrame(0), 50);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  /* ─── GSAP ScrollTrigger for frame sequence ─── */
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    // Animate frame index based on scroll
    const obj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update story visibility
          const opacities: Record<string, number> = {};
          let currentVisible: string | null = null;

          STORIES.forEach((story) => {
            const fadeInStart = story.startPct;
            const fadeInEnd = fadeInStart + 0.03;
            const fadeOutStart = story.endPct - 0.03;
            const fadeOutEnd = story.endPct;

            let opacity = 0;
            if (progress >= fadeInStart && progress <= fadeInEnd) {
              opacity = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
            } else if (progress > fadeInEnd && progress < fadeOutStart) {
              opacity = 1;
            } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
              opacity = 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            }

            opacity = Math.max(0, Math.min(1, opacity));
            opacities[story.id] = opacity;
            if (opacity > 0.1) currentVisible = story.id;
          });

          setStoryOpacity(opacities);
          setVisibleStory(currentVisible);
        },
      },
    });

    tl.to(obj, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      onUpdate: () => {
        const newIndex = Math.round(obj.frame);
        if (newIndex !== frameIndexRef.current) {
          frameIndexRef.current = newIndex;
          drawFrame(newIndex);
        }
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded, drawFrame]);

  /* ─── Handle resize ─── */
  useEffect(() => {
    const handleResize = () => {
      drawFrame(frameIndexRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <>
      {/* Loading screen */}
      {!loaded && (
        <div className="loader">
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Loading Experience
          </div>
          <div className="loader-bar">
            <div
              className="loader-fill"
              style={{ width: `${loadProgress * 100}%` }}
            />
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.25)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(loadProgress * 100)}%
          </div>
        </div>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        id="overview"
        className="canvas-container"
        style={{ height: "500vh" }}
      >
        {/* Sticky canvas area */}
        <div className="canvas-sticky">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              background: "#050505",
            }}
          />

          {/* Radial glow behind the watch */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(5,8,21,0.4) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Story Overlays */}
          {STORIES.map((story) => {
            const opacity = storyOpacity[story.id] ?? 0;
            if (opacity < 0.01) return null;

            return (
              <div
                key={story.id}
                className={`story-overlay align-${story.align}`}
                style={{
                  opacity,
                  transition: "none",
                }}
              >
                <div className="story-content">
                  {story.caption && (
                    <div className="caption" style={{ marginBottom: "1rem", color: "#00D6FF" }}>
                      {story.caption}
                    </div>
                  )}

                  {story.id === "hero" ? (
                    /* Hero has special styling */
                    <>
                      <h1
                        className="heading-xl"
                        style={{
                          marginBottom: "0.75rem",
                          textShadow: "0 0 80px rgba(0,80,255,0.15)",
                        }}
                      >
                        {story.heading}
                      </h1>
                      {story.lines.map((line, i) => (
                        <p
                          key={i}
                          className={i === 0 ? "subtitle" : "body-text"}
                          style={{
                            marginBottom: i < story.lines.length - 1 ? "0.5rem" : 0,
                            maxWidth: i === 0 ? "none" : "420px",
                            margin: i > 0 ? "0.5rem auto 0" : undefined,
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </>
                  ) : story.id === "reassembly" ? (
                    /* CTA section */
                    <>
                      <h2 className="heading-lg" style={{ marginBottom: "1rem" }}>
                        {story.heading}
                      </h2>
                      {story.lines.map((line, i) => (
                        <p key={i} className="body-text" style={{ marginBottom: "0.5rem" }}>
                          {line}
                        </p>
                      ))}
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginTop: "2.5rem",
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <a href="#discover" className="btn-primary">
                          <span>Discover the Watch</span>
                        </a>
                        <a href="#specs" className="btn-secondary">
                          View Specifications
                        </a>
                      </div>
                    </>
                  ) : (
                    /* Standard sections */
                    <>
                      <h2 className="heading-lg" style={{ marginBottom: "0.75rem" }}>
                        {story.heading}
                      </h2>
                      <div className="section-divider" />
                      {story.lines.map((line, i) => (
                        <p key={i} className="body-text" style={{ marginBottom: "0.5rem" }}>
                          {line}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Scroll indicator — only on hero */}
          {(storyOpacity["hero"] ?? 0) > 0.3 && (
            <div
              className="scroll-indicator"
              style={{ opacity: storyOpacity["hero"] ?? 0 }}
            >
              <span className="caption" style={{ fontSize: "0.65rem" }}>
                Scroll to explore
              </span>
              <div className="line" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
