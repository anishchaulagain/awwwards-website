"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Craftsmanship", href: "#craftsmanship" },
    { label: "Movement", href: "#movement" },
    { label: "Materials", href: "#materials" },
    { label: "Specifications", href: "#specs" },
  ];

  return (
    <footer className="footer">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Top Area */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "0.75rem",
              }}
            >
              ANISH
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.35)",
                maxWidth: "280px",
                lineHeight: 1.6,
              }}
            >
              Precision mechanical timepieces crafted for those who appreciate
              the art of horology.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <div
                className="caption"
                style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.25)" }}
              >
                Explore
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div
                className="caption"
                style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.25)" }}
              >
                Contact
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  Boutiques
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  Customer Service
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  Press
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {currentYear} ANISH Watches. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href="#"
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              Privacy
            </a>
            <a
              href="#"
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              Terms
            </a>
            <a
              href="#"
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
