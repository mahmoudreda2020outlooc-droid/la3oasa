'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { menuItems, CATEGORIES, MenuItem } from '../../../data/menu';
import MenuCard from '../../../components/MenuCard';

export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.category as string;

    const category = CATEGORIES.find((c: any) => c.id === categoryId);

    // Logic for filtering items based on category
    // Some categories map to multiple tags in data
    const filteredItems = menuItems.filter((item: MenuItem) => {
        if (categoryId === 'fatuta') return item.category === 'fatuta' || item.category === 'tnt';
        if (categoryId === 'appetizers') return item.category === 'appetizer' || item.category === 'sides';
        if (categoryId === 'drinks') return item.category === 'drinks' || item.category === 'extras';
        return item.category === categoryId;
    });

    if (!category) {
        return (
            <div className="error-container">
                <h1>الصفحة غير موجودة</h1>
                <Link href="/menu" className="back-btn">العودة للمنيو</Link>
                <style jsx>{`
                    .error-container {
                        min-height: 80vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: white;
                    }
                    .back-btn {
                        margin-top: 2rem;
                        padding: 1rem 2rem;
                        background: var(--color-primary);
                        color: white;
                        border-radius: 50px;
                        text-decoration: none;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="menu-container">
            <div className="menu-header">
                <Link href="/menu" className="back-link">← العودة للمنيو الرئيسي</Link>
                <h1 className="menu-title">{category.emoji} {category.name}</h1>
                <p className="menu-subtitle">كل اختراعاتنا في قسم {category.name}</p>
            </div>

            <nav className="category-nav">
                <div className="nav-scroll-container">
                    {CATEGORIES.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/menu/${cat.id}`}
                            className={`nav-item ${cat.id === categoryId ? 'active' : ''}`}
                        >
                            {cat.emoji} {cat.name}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="content-wrapper">
                <section className="menu-section">
                    <div className="grid">
                        {filteredItems.map((item: MenuItem) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
                .menu-container {
                    min-height: 100vh;
                    background-color: #0f0a06;
                    background-image: 
                        radial-gradient(circle at 50% 0%, rgba(255, 159, 28, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(255, 159, 28, 0.02) 0%, transparent 50%);
                    padding-bottom: 5rem;
                }

                .back-link {
                    color: var(--color-primary);
                    text-decoration: none;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    display: inline-block;
                    transition: all 0.3s ease;
                }

                .back-link:hover {
                    transform: translateX(-5px);
                    opacity: 0.8;
                }

                .menu-header {
                    padding: 8rem 2rem 4rem;
                    text-align: center;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
                }

                .menu-title {
                    font-size: 5rem;
                    font-weight: 950;
                    color: #fff;
                    margin-bottom: 1rem;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.5);
                    letter-spacing: -2px;
                }

                .menu-subtitle {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .category-nav {
                    position: sticky;
                    top: 70px;
                    z-index: 100;
                    background: rgba(26, 17, 10, 0.95);
                    backdrop-filter: blur(15px);
                    border-bottom: 1px solid rgba(255, 159, 28, 0.1);
                    padding: 1rem 0;
                    margin-bottom: 4rem;
                }

                .nav-scroll-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                    padding: 0 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .nav-item {
                    white-space: nowrap;
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 50px;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .nav-item:hover, .nav-item.active {
                    background: rgba(255, 159, 28, 0.1);
                    color: var(--color-primary);
                    border-color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .content-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .menu-section {
                    margin-bottom: 8rem;
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
                    .nav-scroll-container {
                        gap: 0.5rem;
                    }
                    .nav-item {
                        padding: 0.5rem 1rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
}
