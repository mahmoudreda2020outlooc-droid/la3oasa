'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '../data/menu';
import styles from './MenuCard.module.css';
import { useCart } from '../context/CartContext';

import { createPortal } from 'react-dom';

interface MenuCardProps {
    item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
    const { addToCart } = useCart();
    const [showFeedback, setShowFeedback] = React.useState(false);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const hasImage = item.image && item.image !== '';

    const handleAddToCart = () => {
        addToCart(item);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
    };

    return (
        <>
            <div className={styles.card}>
                {hasImage && (
                    <div className={styles.imageWrapper} onClick={() => setIsZoomed(true)} style={{ cursor: 'zoom-in' }}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles.zoomHint}>🔍 اضغط لتكبير الصورة</div>
                    </div>
                )}
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{item.name}</h3>
                        <div className={styles.priceTag}>
                            <span className={styles.price}>{item.price}</span>
                            <span className={styles.currency}>ج.م</span>
                        </div>
                    </div>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.footer}>
                        <button
                            className={`${styles.orderBtn} ${showFeedback ? styles.added : ''}`}
                            onClick={handleAddToCart}
                            disabled={showFeedback}
                        >
                            {showFeedback ? 'تمت الإضافة! ✅' : 'إضافة للطلب 🛒'}
                        </button>
                    </div>
                </div>
            </div>

            {isZoomed && typeof document !== 'undefined' && createPortal(
                <div className="lightbox-overlay" onClick={() => setIsZoomed(false)}>
                    <button className="lightbox-close" onClick={() => setIsZoomed(false)}>✕</button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={item.image} alt={item.name} className="lightbox-img" />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default MenuCard;
