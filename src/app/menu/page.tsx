'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { menuItems, CATEGORIES } from '../../data/menu';
import MenuCard from '../../components/MenuCard';
import { Suspense } from 'react';

function MenuContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCategory = searchParams.get('cat');

    const filteredItems = activeCategory
        ? menuItems.filter(item => item.category === activeCategory)
        : [];

    const selectedCategoryInfo = CATEGORIES.find(c => c.id === activeCategory);

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1 className="menu-title">
                    {activeCategory ? `${selectedCategoryInfo?.emoji} ${selectedCategoryInfo?.name}` : 'منيو لغوصة'}
                </h1>
                <p className="menu-subtitle">
                    {activeCategory ? `كل اختراعاتنا في قسم ${selectedCategoryInfo?.name} ❤️` : 'كل اختراعاتنا اللي هتبسطك في مكان واحد ❤️'}
                </p>
            </div>

            <div className="content-wrapper container">
                {!activeCategory ? (
                    <div className="category-selection">
                        <div className="selection-grid">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => router.push(`/menu?cat=${cat.id}`)}
                                    className="selection-card"
                                >
                                    <span className="card-emoji">{cat.emoji}</span>
                                    <span className="card-name">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <section className="menu-section">
                        <div className="section-actions">
                            <button
                                onClick={() => router.push('/menu')}
                                className="back-btn"
                            >
                                <span className="arrow">←</span>
                                العودة للمنيو الرئيسي
                            </button>
                        </div>
                        <div className="grid">
                            {filteredItems.map(item => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <style jsx>{`
                .menu-container {
                    background-color: #1a110a;
                    min-height: 100vh;
                    padding-bottom: 5rem;
                }

                .menu-header {
                    text-align: center;
                    padding: 8rem 1rem 4rem;
                    background: radial-gradient(circle at center, #2C1810 0%, #1a110a 100%);
                    position: relative;
                }

                .menu-title {
                    font-size: 4rem;
                    font-weight: 900;
                    margin-bottom: 1rem;
                    background: linear-gradient(180deg, #FFB950 20%, #E08E0B 80%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    font-family: 'Reem Kufi', sans-serif;
                }

                .menu-subtitle {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .category-selection {
                    margin-top: 2rem;
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .selection-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 1.5rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .selection-card {
                    background: rgba(44, 24, 16, 0.4);
                    border: 1px solid rgba(255, 159, 28, 0.1);
                    border-radius: 20px;
                    padding: 2rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                    width: 100%;
                }

                .selection-card:hover {
                    background: rgba(255, 159, 28, 0.1);
                    border-color: var(--color-primary);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                .section-actions {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 2rem;
                }

                .back-btn {
                    background: rgba(255, 159, 28, 0.05);
                    border: 1px solid rgba(255, 159, 28, 0.2);
                    color: var(--color-primary);
                    padding: 0.8rem 1.5rem;
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .back-btn:hover {
                    background: var(--color-primary);
                    color: #000;
                    transform: translateX(-5px);
                }

                .back-btn .arrow {
                    font-size: 1.2rem;
                }

                .card-emoji {
                    font-size: 3rem;
                    margin-bottom: 0.75rem;
                }

                .card-name {
                    color: #fff;
                    font-weight: 700;
                    font-size: 1rem;
                    text-align: center;
                }

                .menu-section {
                    margin-top: 2rem;
                    animation: fadeIn 0.5s ease-out;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 3rem;
                }

                @media (max-width: 768px) {
                    .menu-title { font-size: 3rem; }
                    .grid { 
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .selection-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                    .content-wrapper { padding: 0 1.5rem; }
                }
            `}</style>
        </div>
    );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div className="loading" style={{ color: '#FF9F1C', textAlign: 'center', padding: '5rem', fontSize: '1.5rem' }}>جاري التحميل...</div>}>
            <MenuContent />
        </Suspense>
    );
}
