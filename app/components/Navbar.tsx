"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Craftsmanship", href: "#craftsmanship" },
    { label: "Movement", href: "#movement" },
    { label: "Materials", href: "#materials" },
    { label: "Specs", href: "#specs" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 4vw, 4rem)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled
          ? "rgba(5, 5, 5, 0.72)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid transparent",
      }}
    >
      {/* Brand */}
      <a
        href="#"
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.9)",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        Chrono X1
      </a>

      {/* Center Links — Desktop */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
        className="nav-links-desktop"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              transition: "color 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.95)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA — Desktop */}
      <a
        href="#discover"
        className="btn-primary nav-cta-desktop"
        style={{
          padding: "0.6rem 1.5rem",
          fontSize: "0.75rem",
        }}
      >
        <span>Discover the Watch</span>
      </a>

      {/* Mobile menu button */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.5"
        >
          {mobileOpen ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(5, 5, 5, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#discover"
            className="btn-primary"
            style={{
              padding: "0.7rem 1.5rem",
              fontSize: "0.75rem",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <span>Discover the Watch</span>
          </a>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-cta-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
