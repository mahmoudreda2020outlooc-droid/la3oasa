'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

// Build trigger: order fix consolidation v3
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <p className="kicker">أكل معمول بمزاج 👨‍🍳</p>
          <h1 className="brand-name">لغــوصــة</h1>
          <p className="hero-subtitle">
            عارفينك بتحبها سايحة .. وعشان كدة ظبطنالك الأداء بزيادة 🧀🔥
          </p>
          <div className="hero-actions">
            <Link href="/menu" className="btn btn-primary">
              اطلب دلوقتي 🔥
            </Link>
            <Link href="/builder" className="btn btn-secondary">
              ابني ساندوتشك 🛠️
            </Link>
          </div>
        </div>

        {/* Iconic Badge */}
        <div className="floating-badge">
          <div className="badge-content">
            مكان كله اختراعات هتبسطك ❤️
          </div>
        </div>

        {/* Glow effect instead of blobs */}
        <div className="glow"></div>
      </section>

      <section className="features container">
        <div className="feature-card">
          <div className="icon">👨‍🍳</div>
          <h3>صنعة معلم</h3>
          <p>الساندوتش مخدوم صح، مش مجرد تجميعة.</p>
        </div>
        <div className="feature-card highlight">
          <div className="icon">🍔</div>
          <h3>لغوصة للركب</h3>
          <p>صوصات وجبنة سايحة هتغرقك سعادة..</p>
        </div>
        <div className="feature-card">
          <div className="icon">🥪</div>
          <h3>ساندوتشات متلغمة</h3>
          <p>الساندوتش مليان حشو وجبنة.. هتشبع يعني هتشبع.</p>
        </div>
      </section>

      <section id="gallery-section" className="gallery container">
        <h2 className="section-title">لحظات اللغوصة 📸</h2>
        <div className="gallery-grid">
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_0_1770310972175.png")}>
            <Image src="/gallery/uploaded_media_0_1770310972175.png" alt="لغوصة 1" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_1_1770310972175.png")}>
            <Image src="/gallery/uploaded_media_1_1770310972175.png" alt="لغوصة 2" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_2_1770310972175.jpg")}>
            <Image src="/gallery/uploaded_media_2_1770310972175.jpg" alt="لغوصة 3" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_3_1770310972175.jpg")}>
            <Image src="/gallery/uploaded_media_3_1770310972175.jpg" alt="لغوصة 4" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_4_1770310972175.jpg")}>
            <Image src="/gallery/uploaded_media_4_1770310972175.jpg" alt="لغوصة 5" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_0_1770326451721.jpg")}>
            <Image src="/gallery/uploaded_media_0_1770326451721.jpg" alt="لغوصة 6" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_1_1770326451721.jpg")}>
            <Image src="/gallery/uploaded_media_1_1770326451721.jpg" alt="لغوصة 7" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_2_1770326451721.png")}>
            <Image src="/gallery/uploaded_media_2_1770326451721.png" alt="لغوصة 8" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_3_1770326451721.png")}>
            <Image src="/gallery/uploaded_media_3_1770326451721.png" alt="لغوصة 9" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_4_1770326451721.png")}>
            <Image src="/gallery/uploaded_media_4_1770326451721.png" alt="لغوصة 10" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_0_1770326641883.png")}>
            <Image src="/gallery/uploaded_media_0_1770326641883.png" alt="لغوصة 11" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_1_1770326641883.png")}>
            <Image src="/gallery/uploaded_media_1_1770326641883.png" alt="لغوصة 12" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_2_1770326641883.jpg")}>
            <Image src="/gallery/uploaded_media_2_1770326641883.jpg" alt="لغوصة 13" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_3_1770326641883.jpg")}>
            <Image src="/gallery/uploaded_media_3_1770326641883.jpg" alt="لغوصة 14" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_4_1770326641883.jpg")}>
            <Image src="/gallery/uploaded_media_4_1770326641883.jpg" alt="لغوصة 15" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_0_1770326792535.jpg")}>
            <Image src="/gallery/uploaded_media_0_1770326792535.jpg" alt="لغوصة 16" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_1_1770326792535.png")}>
            <Image src="/gallery/uploaded_media_1_1770326792535.png" alt="لغوصة 17" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_2_1770326792535.png")}>
            <Image src="/gallery/uploaded_media_2_1770326792535.png" alt="لغوصة 18" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_3_1770326792535.jpg")}>
            <Image src="/gallery/uploaded_media_3_1770326792535.jpg" alt="لغوصة 19" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_4_1770326792535.jpg")}>
            <Image src="/gallery/uploaded_media_4_1770326792535.jpg" alt="لغوصة 20" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-item" onClick={() => setSelectedImage("/gallery/uploaded_media_1770326981203.png")}>
            <Image src="/gallery/uploaded_media_1770326981203.png" alt="لغوصة 21" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>
      <section id="about-us-section" className="about-us container">
        <div className="about-grid">
          <div className="about-image">
            <div className="chef-badge">
              <span className="badge-text" style={{ transform: 'rotate(0deg)' }}>100%<br />لغوصة</span>
            </div>
            <div className="decorative-glow"></div>
          </div>
          <div className="about-content">
            <h2 className="section-title" style={{ textAlign: 'right', marginBottom: '1.5rem' }}>حكايتنا 📖</h2>
            <div className="about-card">
              <p>
                بدأت حكايتنا في "لغوصة" بشغف بسيط: إزاي نخلي الساندوتش مش مجرد وجبة، لكن تجربة سعادة حقيقية.
                إحنا بنؤمن إن الأكل لازم يملى العين قبل المعدة، وعشان كدة كل ساندوتش عندنا مخدوم بزيادة، ومتغرق بصوصاتنا الخاصة اللي بتخليك تعيش اللغوصة الأصلية.
              </p>
              <p className="highlight-text">
                إحنا مش مجرد مطعم.. إحنا مكان لكل واحد بيعشق طعم الجبنة السايحة وتفاصيل الحشو المتلغم.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-num">+10</span>
                  <span className="stat-desc">اختراعات حصرية</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-desc">حب وشغف</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-section" className="contact-info container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>خليك قريب منا 🤝</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>العنوان</h3>
            <p>سيليكون واحه أمام الجامعه التيكنولوجيه بجوار بنك مصر</p>
            <a href="https://maps.google.com" target="_blank" className="contact-link">مشاهدة على الخريطة 🗺️</a>
          </div>
          <div className="contact-card highlight">
            <div className="contact-icon">📞</div>
            <h3>اطلب دلوقتي</h3>
            <p className="phone-num" dir="ltr">010 80482489</p>
            <a href="tel:01080482489" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>اتصل بنا 📲</a>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3>تابعنا على</h3>
            <div className="social-links-premium">
              <a href="https://www.facebook.com/profile.php?id=100095251601224" target="_blank" rel="noopener noreferrer" className="social-icon-link fb" title="Facebook">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://instagram.com/la3.wasa" target="_blank" rel="noopener noreferrer" className="social-icon-link ig" title="Instagram">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" /></svg>
              </a>
              <a href="https://tiktok.com/@la3.wasa" target="_blank" rel="noopener noreferrer" className="social-icon-link tt" title="TikTok">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.96-.99 1.6-.04.58.1 1.18.42 1.68.21.35.53.65.91.85.83.47 1.85.45 2.64-.13.57-.42.92-1.07.97-1.77.03-3.23.01-6.47.01-9.7z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
        }

        .contact-info {
          padding: 8rem 0; /* Clearer separation */
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
        }

        .contact-card:hover {
          transform: translateY(-10px);
          border-color: var(--color-primary);
          background: rgba(255, 159, 28, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 159, 28, 0.1);
        }

        .contact-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.75s;
        }

        .contact-card:hover::after {
          left: 150%;
        }

        .contact-card.highlight {
          border-color: rgba(255, 159, 28, 0.3);
          background: rgba(255, 159, 28, 0.05);
        }

        .contact-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .contact-card h3 {
          color: var(--color-primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .contact-card p {
          color: var(--foreground-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .contact-link {
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 700;
          transition: opacity 0.3s;
        }

        .contact-link:hover {
          opacity: 0.8;
        }

        .phone-num {
          font-size: 1.8rem !important;
          font-weight: 900;
          color: var(--foreground) !important;
          font-family: 'Changa', sans-serif;
        }

        .social-links-premium {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          width: 100%;
          margin-top: 1rem;
        }

        .social-icon-link {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .social-icon-link:hover {
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: rgba(255, 159, 28, 0.1);
        }

        .social-icon-link.fb:hover { color: #1877F2; background: rgba(24, 119, 242, 0.1); border-color: #1877F2; box-shadow: 0 0 20px rgba(24, 119, 242, 0.6); }
        .social-icon-link.ig:hover { color: #E4405F; background: rgba(228, 64, 95, 0.1); border-color: #E4405F; box-shadow: 0 0 20px rgba(228, 64, 95, 0.6); }
        .social-icon-link.tt:hover { color: #000; background: #fff; border-color: #fff; box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }

        .about-us {
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image {
          position: relative;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .decorative-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 159, 28, 0.15) 0%, transparent 70%);
          z-index: 1;
        }

        .chef-badge {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 3px dashed var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rotateBadge 20s linear infinite;
          position: relative;
          z-index: 2;
          background: rgba(44, 24, 16, 0.5);
          backdrop-filter: blur(5px);
        }

        .badge-text {
          color: var(--color-primary);
          font-weight: 900;
          font-size: 1.4rem;
          text-align: center;
          line-height: 1.2;
          font-family: 'Changa', sans-serif;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          padding: 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow-md);
          position: relative;
          z-index: 2;
        }

        .about-card p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--foreground-muted);
          margin-bottom: 1.5rem;
        }

        .highlight-text {
          color: var(--color-primary) !important;
          font-weight: 700;
          font-size: 1.25rem !important;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-item {
          background: rgba(255, 159, 28, 0.05);
          border: 1px solid rgba(255, 159, 28, 0.1);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-item:hover {
          background: rgba(255, 159, 28, 0.1);
          border-color: var(--color-primary);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 159, 28, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .stat-num {
          font-size: 2.5rem;
          font-weight: 950;
          color: var(--color-primary);
          font-family: 'Changa', sans-serif;
          line-height: 1;
          text-shadow: 0 0 10px rgba(255, 159, 28, 0.3);
        }

        .stat-desc {
          font-size: 0.9rem;
          color: var(--foreground);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }

        @keyframes rotateBadge {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero {
          position: relative;
          height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: radial-gradient(circle at center, #2C1810 0%, #1e130c 100%);
          overflow: hidden;
          padding: 10rem 0 12rem;
        }

        .hero-content {
          position: relative;
          z-index: 50; /* Higher than features */
          padding: 0 1rem;
        }

        .kicker {
          color: var(--color-primary);
          font-weight: 700;
          font-size: 1.2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .brand-name {
          font-family: 'Reem Kufi', sans-serif;
          font-size: 8rem;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: transparent;
          background: linear-gradient(180deg, #FFB950 20%, #E08E0B 80%);
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 4px 0px rgba(100, 50, 0, 0.5));
          letter-spacing: -2px;
          transform: rotate(-2deg);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          color: var(--foreground-muted);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          position: relative;
          z-index: 60;
        }

        .glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 159, 28, 0.1) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .floating-badge {
          position: absolute;
          top: 15%;
          left: 10%;
          z-index: 20;
          animation: floatBadge 6s ease-in-out infinite;
        }

        .badge-content {
          background: rgba(255, 159, 28, 0.1);
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          padding: 1rem;
          border-radius: 50%;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 800;
          font-size: 1rem;
          line-height: 1.3;
          box-shadow: 0 0 20px rgba(255, 159, 28, 0.2);
          backdrop-filter: blur(5px);
          transform: rotate(-10deg);
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: -5rem;
          padding-bottom: 5rem;
          position: relative;
          z-index: 20;
        }

        .feature-card {
          background: rgba(44, 24, 16, 0.8);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-glow);
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          color: var(--foreground);
          margin-bottom: 0.8rem;
          font-size: 1.4rem;
        }
        
        .feature-card p {
          color: var(--foreground-muted);
          line-height: 1.6;
        }

        /* Responsive styles for About Section */
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .about-image {
            height: 300px;
            margin-bottom: 1rem;
          }

          .about-content .section-title {
            text-align: center !important;
          }

          .about-stats {
            gap: 1rem;
          }
        }

        .gallery {
          margin-bottom: 6rem;
          position: relative;
          z-index: 10;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .gallery-item {
          position: relative;
          height: 300px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          border-color: var(--color-primary);
          z-index: 5;
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 768px) {
          .hero { 
            height: auto; 
            padding: 8rem 1rem 12rem; /* Give plenty of space at the bottom */
          }
          .hero-content {
            z-index: 100;
          }
          .floating-badge {
            top: 2%;
            left: 2%;
            transform: scale(0.65);
            transform-origin: top left;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
            transform: translateY(-50px); /* Move them up specifically on mobile */
          }
          .features {
            margin-top: 0; /* Remove the overlap on mobile so buttons aren't covered */
            position: relative;
            z-index: 10;
          }
          .brand-name { font-size: 4.5rem; }
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          .gallery-item { 
            height: 250px;
          }
        }
      `}</style>

      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            ✕
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="lightbox-img"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
