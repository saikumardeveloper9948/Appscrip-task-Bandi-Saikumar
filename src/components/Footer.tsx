"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FooterSectionsOpen {
  mettaMuse: boolean;
  quickLinks: boolean;
  followUs: boolean;
}

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  // Default states: mobile starts collapsed, desktop/tablet starts expanded
  const [openSections, setOpenSections] = useState<FooterSectionsOpen>({
    mettaMuse: false,
    quickLinks: false,
    followUs: false,
  });

  // Check screen size and set default states
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // If desktop/tablet, always expand sections; if mobile, keep collapsed
      if (!mobile) {
        setOpenSections({
          mettaMuse: true,
          quickLinks: true,
          followUs: true,
        });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (section: keyof FooterSectionsOpen) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    console.log(`Footer section toggled: ${section}`);
  };

  const handleNewsletterSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log(`Newsletter signup: ${email}`);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-top">
        <div className="footer-newsletter">
          <h2 className="footer-heading">BE THE FIRST TO KNOW</h2>
          <p className="footer-subtext">Sign up for updates from mettā muse.</p>
          <form
            className="newsletter-form"
            onSubmit={handleNewsletterSubscribe}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail..."
              aria-label="Email address for newsletter"
              className="newsletter-input"
              required
            />
            <button
              className="newsletter-btn"
              aria-label="Subscribe to newsletter"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        <div className="footer-contact">
          <h2 className="footer-heading">CONTACT US</h2>
          <p className="footer-subtext">+44 221 133 5360</p>
          <p className="footer-subtext">customercare@mettamuse.com</p>
          <h2 className="footer-heading footer-heading-mt">CURRENCY</h2>
          <div className="currency-selector">
            <span className="currency-flag">🇺🇸</span>
            <span>USD</span>
          </div>
          <p className="footer-currency-note">
            Transactions will be completed in Euros and a currency reference is
            available on hover.
          </p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        {/* mettā muse Section */}
        <div className={`footer-links-group ${isMobile ? "collapsible" : ""}`}>
          {isMobile ? (
            <>
              <button
                className="footer-links-heading-btn"
                onClick={() => toggleSection("mettaMuse")}
                aria-expanded={openSections.mettaMuse}
              >
                <h3 className="footer-links-heading">mettā muse</h3>
                <span className="footer-toggle-icon">
                  {openSections.mettaMuse ? "▼" : "▶"}
                </span>
              </button>
              {openSections.mettaMuse && (
                <ul className="footer-links-list active">
                  <li>
                    <Link href="/">About Us</Link>
                  </li>
                  <li>
                    <Link href="/">Stories</Link>
                  </li>
                  <li>
                    <Link href="/">Artisans</Link>
                  </li>
                  <li>
                    <Link href="/">Boutiques</Link>
                  </li>
                  <li>
                    <Link href="/">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/">EU Compliances Docs</Link>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <h3 className="footer-links-heading">mettā muse</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Stories</Link>
                </li>
                <li>
                  <Link href="/">Artisans</Link>
                </li>
                <li>
                  <Link href="/">Boutiques</Link>
                </li>
                <li>
                  <Link href="/">Contact Us</Link>
                </li>
                <li>
                  <Link href="/">EU Compliances Docs</Link>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* QUICK LINKS Section */}
        <div className={`footer-links-group ${isMobile ? "collapsible" : ""}`}>
          {isMobile ? (
            <>
              <button
                className="footer-links-heading-btn"
                onClick={() => toggleSection("quickLinks")}
                aria-expanded={openSections.quickLinks}
              >
                <h3 className="footer-links-heading">QUICK LINKS</h3>
                <span className="footer-toggle-icon">
                  {openSections.quickLinks ? "▼" : "▶"}
                </span>
              </button>
              {openSections.quickLinks && (
                <ul className="footer-links-list active">
                  <li>
                    <Link href="/">Orders &amp; Shipping</Link>
                  </li>
                  <li>
                    <Link href="/">Join/Login as a Seller</Link>
                  </li>
                  <li>
                    <Link href="/">Payment &amp; Pricing</Link>
                  </li>
                  <li>
                    <Link href="/">Return &amp; Refunds</Link>
                  </li>
                  <li>
                    <Link href="/">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/">Terms &amp; Conditions</Link>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <h3 className="footer-links-heading">QUICK LINKS</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="/">Orders &amp; Shipping</Link>
                </li>
                <li>
                  <Link href="/">Join/Login as a Seller</Link>
                </li>
                <li>
                  <Link href="/">Payment &amp; Pricing</Link>
                </li>
                <li>
                  <Link href="/">Return &amp; Refunds</Link>
                </li>
                <li>
                  <Link href="/">FAQs</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* FOLLOW US Section */}
        <div className={`footer-links-group ${isMobile ? "collapsible" : ""}`}>
          {isMobile ? (
            <>
              <button
                className="footer-links-heading-btn"
                onClick={() => toggleSection("followUs")}
                aria-expanded={openSections.followUs}
              >
                <h3 className="footer-links-heading">FOLLOW US</h3>
                <span className="footer-toggle-icon">
                  {openSections.followUs ? "▼" : "▶"}
                </span>
              </button>
              {openSections.followUs && (
                <>
                  <div className="social-links active">
                    <Link
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="social-links">
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
              </div>
              <h3 className="footer-links-heading footer-heading-mt">
                mettā muse ACCEPTS
              </h3>
              <div className="payment-icons">
                {/* Google Pay */}
                <div className="payment-badge google-pay">
                  <span>G Pay</span>
                </div>
                {/* Mastercard */}
                <div className="payment-badge mastercard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 32"
                    width="48"
                    height="32"
                  >
                    <rect width="48" height="32" fill="white" rx="4" />
                    <circle cx="16" cy="16" r="8" fill="#EB001B" />
                    <circle cx="32" cy="16" r="8" fill="#F79E1B" />
                  </svg>
                </div>
                {/* PayPal */}
                <div className="payment-badge paypal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 32"
                    width="48"
                    height="32"
                  >
                    <rect width="48" height="32" fill="#003087" rx="4" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill="white"
                    >
                      P
                    </text>
                  </svg>
                </div>
                {/* American Express */}
                <div className="payment-badge amex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 32"
                    width="48"
                    height="32"
                  >
                    <rect width="48" height="32" fill="#006FCF" rx="4" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="white"
                    >
                      AMEX
                    </text>
                  </svg>
                </div>
                {/* Apple Pay */}
                <div className="payment-badge apple-pay">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 32"
                    width="48"
                    height="32"
                  >
                    <rect
                      width="48"
                      height="32"
                      fill="white"
                      stroke="#000"
                      strokeWidth="1.5"
                      rx="4"
                    />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#000"
                    >
                      Pay
                    </text>
                  </svg>
                </div>
                {/* DPay */}
                <div className="payment-badge dpay">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 32"
                    width="48"
                    height="32"
                  >
                    <defs>
                      <linearGradient
                        id="dpayGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#7C3AED", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#6D28D9", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <rect width="48" height="32" fill="url(#dpayGrad)" rx="4" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill="white"
                    >
                      D
                    </text>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Accepts Section - Mobile Only */}
      <div className="footer-payment-section">
        <div
          style={{
            padding: "0 16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--color-gray-700)",
          }}
        >
          <h3 className="footer-links-heading">mettā muse ACCEPTS</h3>
          <div className="payment-icons">
            {/* Google Pay */}
            <div className="payment-badge google-pay">
              <span>G Pay</span>
            </div>
            {/* Mastercard */}
            <div className="payment-badge mastercard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="48"
                height="32"
              >
                <rect width="48" height="32" fill="white" rx="4" />
                <circle cx="16" cy="16" r="8" fill="#EB001B" />
                <circle cx="32" cy="16" r="8" fill="#F79E1B" />
              </svg>
            </div>
            {/* PayPal */}
            <div className="payment-badge paypal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="48"
                height="32"
              >
                <rect width="48" height="32" fill="#003087" rx="4" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="white"
                >
                  P
                </text>
              </svg>
            </div>
            {/* American Express */}
            <div className="payment-badge amex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="48"
                height="32"
              >
                <rect width="48" height="32" fill="#006FCF" rx="4" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="white"
                >
                  AMEX
                </text>
              </svg>
            </div>
            {/* Apple Pay */}
            <div className="payment-badge apple-pay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="48"
                height="32"
              >
                <rect
                  width="48"
                  height="32"
                  fill="white"
                  stroke="#000"
                  strokeWidth="1.5"
                  rx="4"
                />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#000"
                >
                  Pay
                </text>
              </svg>
            </div>
            {/* DPay */}
            <div className="payment-badge dpay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="48"
                height="32"
              >
                <defs>
                  <linearGradient
                    id="dpayGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#7C3AED", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#6D28D9", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <rect width="48" height="32" fill="url(#dpayGrad)" rx="4" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="white"
                >
                  D
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-copyright">
        <p>
          Copyright © {new Date().getFullYear()} mettamuse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
