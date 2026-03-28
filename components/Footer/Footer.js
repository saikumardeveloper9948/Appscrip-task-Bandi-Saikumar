import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  function handleSubscribe(e) {
    e.preventDefault();
    setEmail('');
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h3>BE THE FIRST TO KNOW</h3>
        <p>Sign up for updates from mettamorphose.</p>
        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your e-mail..."
            aria-label="Email for newsletter"
            required
            className={styles.emailInput}
          />
          <button type="submit" className={styles.subscribeBtn}>SUBSCRIBE</button>
        </form>
      </div>
      <div className={styles.footerColumns}>
        <div className={styles.footerCol}>
          <h4>METTAMORPHOSE</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/stories">Stories</a></li>
            <li><a href="/artisans">Artisans</a></li>
            <li><a href="/boutiques">Boutiques</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/eu-compliance">EU Compliances Docs</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="/orders">Orders &amp; Shipping</a></li>
            <li><a href="/seller">Join/Login as a Seller</a></li>
            <li><a href="/payment">Payment &amp; Refund Policy</a></li>
            <li><a href="/returns">Return &amp; Refunds</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms &amp; Conditions</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>FOLLOW US</h4>
          <ul>
            <li><a href="https://instagram.com" rel="noopener noreferrer" target="_blank">Instagram</a></li>
            <li><a href="https://linkedin.com" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
          </ul>
          <h4 className={styles.paymentTitle}>ACCEPT PAYMENTS</h4>
          <p className={styles.paymentIcons}>Visa | Mastercard | PayPal | UPI</p>
        </div>
        <div className={styles.footerCol}>
          <h4>CURRENCY</h4>
          <p>USD</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright &copy; {new Date().getFullYear()} METTAMORPHOSE. All rights reserved.</p>
      </div>
    </footer>
  );
}
