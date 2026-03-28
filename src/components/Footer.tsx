import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-newsletter">
          <h2 className="footer-heading">BE THE FIRST TO KNOW</h2>
          <p className="footer-subtext">Sign up for updates from mettā muse.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your e-mail..."
              aria-label="Email address for newsletter"
              className="newsletter-input"
            />
            <button className="newsletter-btn" aria-label="Subscribe to newsletter">
              SUBSCRIBE
            </button>
          </div>
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
            Transactions will be completed in Euros and a currency reference is available on hover.
          </p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-links-group">
          <h3 className="footer-links-heading">mettā muse</h3>
          <ul className="footer-links-list">
            <li><Link href="/">About Us</Link></li>
            <li><Link href="/">Stories</Link></li>
            <li><Link href="/">Artisans</Link></li>
            <li><Link href="/">Boutiques</Link></li>
            <li><Link href="/">Contact Us</Link></li>
            <li><Link href="/">EU Compliances Docs</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-links-heading">QUICK LINKS</h3>
          <ul className="footer-links-list">
            <li><Link href="/">Orders &amp; Shipping</Link></li>
            <li><Link href="/">Join/Login as a Seller</Link></li>
            <li><Link href="/">Payment &amp; Pricing</Link></li>
            <li><Link href="/">Return &amp; Refunds</Link></li>
            <li><Link href="/">FAQs</Link></li>
            <li><Link href="/">Privacy Policy</Link></li>
            <li><Link href="/">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-links-heading">FOLLOW US</h3>
          <div className="social-links">
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </Link>
          </div>
          <h3 className="footer-links-heading footer-heading-mt">mettā muse ACCEPTS</h3>
          <div className="payment-icons">
            <span className="payment-icon" title="Google Pay">G Pay</span>
            <span className="payment-icon" title="Mastercard">MC</span>
            <span className="payment-icon" title="PayPal">PP</span>
            <span className="payment-icon" title="Amex">Amex</span>
            <span className="payment-icon" title="Apple Pay">⌘ Pay</span>
            <span className="payment-icon" title="Visa">Visa</span>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-copyright">
        <p>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
}
