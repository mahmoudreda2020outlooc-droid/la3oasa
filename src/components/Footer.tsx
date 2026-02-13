'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer style={{
            backgroundColor: '#1a110a',
            color: 'white',
            padding: '4rem 0',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 159, 28, 0.1)'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    textAlign: 'right',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>لغوصة</h3>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>مكان كله اختراعات هتبسطك ❤️</p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>العنوان</h4>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
                            سيليكون واحه أمام الجامعه التيكنولوجيه<br />
                            بجوار بنك مصر
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>تواصل معنا</h4>
                        <a href="tel:01080482489" dir="ltr" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
                            010 80482489 📞
                        </a>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start', marginTop: '1.5rem' }}>
                            <a href="https://www.facebook.com/profile.php?id=100095251601224" target="_blank" rel="noopener noreferrer" className="footer-social-link fb" title="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://instagram.com/la3.wasa" target="_blank" rel="noopener noreferrer" className="footer-social-link ig" title="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" /></svg>
                            </a>
                            <a href="https://tiktok.com/@la3.wasa" target="_blank" rel="noopener noreferrer" className="footer-social-link tt" title="TikTok">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.96-.99 1.6-.04.58.1 1.18.42 1.68.21.35.53.65.91.85.83.47 1.85.45 2.64-.13.57-.42.92-1.07.97-1.77.03-3.23.01-6.47.01-9.7z" /></svg>
                            </a>
                        </div>
                        <style>{`
                            .footer-social-link {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 44px;
                                height: 44px;
                                border-radius: 50%;
                                background: rgba(255, 255, 255, 0.05);
                                color: white;
                                transition: all 0.3s ease;
                                border: 1px solid rgba(255, 255, 255, 0.1);
                            }
                            .footer-social-link:hover {
                                transform: translateY(-3px);
                            }
                            .footer-social-link.fb:hover { color: #1877F2; background: rgba(24, 119, 242, 0.1); border-color: #1877F2; box-shadow: 0 0 15px rgba(24, 119, 242, 0.5); }
                            .footer-social-link.ig:hover { color: #E4405F; background: rgba(228, 64, 95, 0.1); border-color: #E4405F; box-shadow: 0 0 15px rgba(228, 64, 95, 0.5); }
                            .footer-social-link.tt:hover { color: #000; background: #fff; border-color: #fff; box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
                        `}</style>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', textAlign: 'center' }}>
                    <p>© {new Date().getFullYear()} مطعم لغوصة. جميع الحقوق محفوظة.</p>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.5 }}>
                        Made with ❤️ & 🍔
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
