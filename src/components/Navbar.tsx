'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import InstallButton from './InstallButton';

const Navbar = () => {
    const pathname = usePathname();
    const [isZoomed, setIsZoomed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (pathname?.startsWith('/admin')) return null;

    const navItems = [
        { href: "/", label: "الرئيسية" },
        { href: "/menu", label: "المنيو" },
        { href: "/builder", label: "اصنع طلبك 🛠️", highlight: true },
        { href: "/track", label: "تتبع طلبك 📍" },
        { href: "/#gallery-section", label: "لحظات اللغوصة" },
        { href: "/#about-us-section", label: "حكايتنا" },
        { href: "/#contact-section", label: "تواصل معنا" },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.logoWrapper} onClick={() => setIsZoomed(true)} style={{ cursor: 'zoom-in' }}>
                    <Image
                        src="/logo.png"
                        alt="لغوصة - La3wasa"
                        width={100}
                        height={60}
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>

                {/* Hamburger Button */}
                <button
                    className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {isZoomed && typeof document !== 'undefined' && createPortal(
                    <div className="lightbox-overlay" onClick={() => setIsZoomed(false)}>
                        <button className="lightbox-close" onClick={() => setIsZoomed(false)}>✕</button>
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <img src="/logo.png" alt="Logo" className="lightbox-img" />
                        </div>
                    </div>,
                    document.body
                )}

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navActive : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={item.highlight ? styles.navLinkHighlight : styles.navLink}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <InstallButton />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
