"use client";

import { useState } from "react";
import Link from "next/link";

interface DropdownState {
  shop: boolean;
  account: boolean;
  language: boolean;
}

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ 
  cartCount = 0, 
  wishlistCount = 0,
  onSearch,
  searchQuery = ""
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    shop: false,
    account: false,
    language: false,
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("ENG");

  const toggleDropdown = (dropdown: keyof DropdownState) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({ shop: false, account: false, language: false });
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    closeAllDropdowns();
  };

  const handleLanguageSelect = (lang: string) => {
    setCurrentLanguage(lang);
    console.log(`Language changed to: ${lang}`);
    handleMenuItemClick(`Language changed to ${lang}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (onSearch) {
      onSearch(query);
    }
    setSearchOpen(false);
    console.log(`Search query: ${query}`);
  };

  const handleWishlistClick = () => {
    console.log("Wishlist clicked");
    handleMenuItemClick("Open Wishlist");
  };

  const handleCartClick = () => {
    console.log("Shopping cart clicked");
    handleMenuItemClick("Open Shopping Cart");
  };

  return (
    <header className="header">
      <div className="announcement-bar">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      {/* Main header */}
      <div className="header-main">
        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          )}
        </button>

        {/* Logo */}
        <div className="header-logo">
          <Link href="/" aria-label="LOGO - Go to homepage">
            <span className="logo-text">LOGO</span>
          </Link>
        </div>

        {/* Header icons */}
        <div className="header-icons">
          {/* Search */}
          <div className="search-wrapper">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen(!searchOpen)}
              className="search-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {searchOpen && (
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  className="search-input"
                  autoFocus
                  defaultValue={searchQuery}
                  aria-label="Search input"
                />
                <button type="submit" aria-label="Submit search">
                  Search
                </button>
              </form>
            )}
          </div>

          {/* Wishlist */}
          <button
            aria-label={`Wishlist (${wishlistCount} items)`}
            onClick={handleWishlistClick}
            className="header-icon-btn"
            title={`${wishlistCount} items in wishlist`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>

          {/* Shopping Cart */}
          <button
            aria-label={`Shopping cart (${cartCount} items)`}
            onClick={handleCartClick}
            className="header-icon-btn"
            title={`${cartCount} items in cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          {/* User Account */}
          <div className="account-dropdown">
            <button
              aria-label="User account menu"
              onClick={() => toggleDropdown("account")}
              aria-expanded={dropdownOpen.account}
              aria-haspopup="menu"
              className="header-icon-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            {dropdownOpen.account && (
              <div className="dropdown-menu account-menu" role="menu">
                <Link href="/" onClick={() => handleMenuItemClick("Login")} role="menuitem">
                  Login
                </Link>
                <Link href="/" onClick={() => handleMenuItemClick("Sign Up")} role="menuitem">
                  Sign Up
                </Link>
                <Link href="/" onClick={() => handleMenuItemClick("Profile")} role="menuitem">
                  Profile
                </Link>
                <Link href="/" onClick={() => handleMenuItemClick("Orders")} role="menuitem">
                  Orders
                </Link>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="language-dropdown">
            <button
              aria-label="Change language"
              onClick={() => toggleDropdown("language")}
              aria-expanded={dropdownOpen.language}
              aria-haspopup="menu"
              className="language-btn"
            >
              {currentLanguage} ▼
            </button>
            {dropdownOpen.language && (
              <div className="dropdown-menu language-menu" role="menu">
                <button
                  onClick={() => handleLanguageSelect("ENG")}
                  role="menuitem"
                  className={currentLanguage === "ENG" ? "active" : ""}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageSelect("ESP")}
                  role="menuitem"
                  className={currentLanguage === "ESP" ? "active" : ""}
                >
                  Español
                </button>
                <button
                  onClick={() => handleLanguageSelect("FRA")}
                  role="menuitem"
                  className={currentLanguage === "FRA" ? "active" : ""}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageSelect("DEU")}
                  role="menuitem"
                  className={currentLanguage === "DEU" ? "active" : ""}
                >
                  Deutsch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar (Desktop/Tablet only) */}
      <nav className="header-nav" aria-label="Main navigation">
        <div className="header-nav-container">
          <a href="#shop" onClick={() => handleMenuItemClick("Shop")}>
            SHOP
          </a>
          <div className="nav-dropdown">
            <button
              className="nav-dropdown-btn"
              onClick={() => toggleDropdown("shop")}
              aria-expanded={dropdownOpen.shop}
              aria-haspopup="menu"
            >
              SKILLS ▼
            </button>
            {dropdownOpen.shop && (
              <div className="dropdown-menu" role="menu">
                <a href="#skills-design" onClick={() => handleMenuItemClick("Skills - Design")} role="menuitem">
                  Design
                </a>
                <a href="#skills-photography" onClick={() => handleMenuItemClick("Skills - Photography")} role="menuitem">
                  Photography
                </a>
                <a href="#skills-craftsmanship" onClick={() => handleMenuItemClick("Skills - Craftsmanship")} role="menuitem">
                  Craftsmanship
                </a>
              </div>
            )}
          </div>
          <a href="#stories" onClick={() => handleMenuItemClick("Stories")}>
            STORIES
          </a>
          <a href="#about" onClick={() => handleMenuItemClick("About")}>
            ABOUT
          </a>
          <a href="#contact" onClick={() => handleMenuItemClick("Contact")}>
            CONTACT US
          </a>
        </div>
      </nav>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-item">
            <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              SHOP
            </a>
          </div>
          <div className="mobile-nav-item with-submenu">
            <button
              onClick={() => toggleDropdown("shop")}
              className="mobile-nav-link"
              aria-expanded={dropdownOpen.shop}
              aria-haspopup="menu"
            >
              SKILLS ▼
            </button>
            {dropdownOpen.shop && (
              <div className="mobile-submenu" role="menu">
                <a href="#skills-design" onClick={() => handleMenuItemClick("Skills - Design")} role="menuitem">
                  Design
                </a>
                <a href="#skills-photography" onClick={() => handleMenuItemClick("Skills - Photography")} role="menuitem">
                  Photography
                </a>
                <a href="#skills-craftsmanship" onClick={() => handleMenuItemClick("Skills - Craftsmanship")} role="menuitem">
                  Craftsmanship
                </a>
              </div>
            )}
          </div>
          <div className="mobile-nav-item">
            <a href="#stories" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              STORIES
            </a>
          </div>
          <div className="mobile-nav-item">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              ABOUT
            </a>
          </div>
          <div className="mobile-nav-item">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              CONTACT US
            </a>
          </div>
          <div className="mobile-nav-divider"></div>
          <div className="mobile-nav-section-title">Account</div>
          <div className="mobile-nav-item">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              Login
            </Link>
          </div>
          <div className="mobile-nav-item">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
