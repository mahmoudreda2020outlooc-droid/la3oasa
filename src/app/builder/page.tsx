'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { INGREDIENTS as ingredients } from '@/data/menu';

type Ingredient = {
    id: string;
    name: string;
    price: number;
    type: string;
    emoji?: string;
    description?: string;
    categories?: string[];
};

import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function BuilderPage() {
    const router = useRouter();
    const { addToCart, setIsCartOpen } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [step, setStep] = useState(1);
    const [selectedBase, setSelectedBase] = useState<string>('');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);

    const totalSteps = 4;

    const categories = [
        { id: 'burger', name: 'برجر', emoji: '🍔' },
        { id: 'maria', name: 'ماريا', emoji: '🌯' },
        { id: 'sandwiches', name: 'ساندوتشات', emoji: '🥪' },
    ];

    const toggleTopping = (id: string) => {
        setSelectedToppings(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSauce = (id: string) => {
        setSelectedSauces(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        let total = 0;
        const base = ingredients.find(i => i.id === selectedBase);
        if (base) total += base.price;

        ingredients.filter(i => selectedToppings.includes(i.id)).forEach(i => total += i.price);
        ingredients.filter(i => selectedSauces.includes(i.id)).forEach(i => total += i.price);

        return total;
    };

    const handleNext = () => {
        if (step === 1 && !selectedCategory) {
            alert('اختار القسم الأول يا وحش! 🤚');
            return;
        }
        if (step === 2 && !selectedBase) {
            alert('اختار نوع الساندوتش الأول يا كبير! 🥩');
            return;
        }
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleOrder = () => {
        if (!selectedCategory || !selectedBase) {
            alert('كمل اختياراتك الأول يا وحش!');
            return;
        }

        const baseItem = ingredients.find(i => i.id === selectedBase);
        const categoryName = categories.find(c => c.id === selectedCategory)?.name || 'اختراع';

        const description = [
            ...ingredients.filter(i => selectedToppings.includes(i.id)).map(i => i.name),
            ...ingredients.filter(i => selectedSauces.includes(i.id)).map(i => i.name)
        ].join(' + ');

        const inventionItem = {
            id: `custom_${Date.now()}`,
            name: `${categoryName}: ${baseItem?.name}`,
            description: description || 'ساندوتش على ذوقك',
            price: calculateTotal(),
            category: selectedCategory as any,
            image: ''
        };

        addToCart(inventionItem);
        setIsCartOpen(true);
        alert('تم إضافة اختراعك للسلة! كمل بياناتك واطلب دلوقتي 🚀');
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.stepContent}
                    >
                        <h3>1. اختار القسم 📑</h3>
                        <p className={styles.stepDesc}>عايز تلغوص في إيه النهاردة؟</p>
                        <div className={`${styles.optionsGrid} ${styles.optionsGridBig}`}>
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    className={`${styles.optionCard} ${styles.optionCardBig} ${selectedCategory === cat.id ? styles.active : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setStep(2);
                                    }}
                                >
                                    <div className={styles.emoji}>{cat.emoji}</div>
                                    <div className={styles.details}>
                                        <h4>{cat.name}</h4>
                                    </div>
                                    {selectedCategory === cat.id && <div className={styles.checkIcon}>✅</div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                // Base Selection - filtered by category could be implemented later, currently showing all bases from menu ingredients
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.stepContent}
                    >
                        <h3>2. ناوي على إيه النهاردة؟ 🤔</h3>
                        <p className={styles.stepDesc}>اختار أساس الساندوتش اللي هتبني عليه اللغوصة</p>
                        <div className={`${styles.optionsGrid} ${styles.optionsGridBig}`}>
                            {ingredients.filter(i => i.type === 'base' && (!i.categories || i.categories.includes(selectedCategory))).map(item => (
                                <div
                                    key={item.id}
                                    className={`${styles.optionCard} ${styles.optionCardBig} ${selectedBase === item.id ? styles.active : ''}`}
                                    onClick={() => {
                                        setSelectedBase(item.id);
                                        setStep(3);
                                    }}
                                >
                                    <div className={styles.emoji}>{item.emoji}</div>
                                    <div className={styles.details}>
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                        <span className={styles.price}>{item.price} ج.م</span>
                                    </div>
                                    {selectedBase === item.id && <div className={styles.checkIcon}>✅</div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.stepContent}
                    >
                        <h3>3. دلع ساندوتشك (إضافات) 🧀</h3>
                        <p className={styles.stepDesc}>كل ما تزود.. كل ما اللغوصة تزيد!</p>
                        <div className={styles.optionsGrid}>
                            {ingredients.filter(i => i.type === 'topping' && (!i.categories || i.categories.includes(selectedCategory))).map(item => (
                                <div
                                    key={item.id}
                                    className={`${styles.optionCard} ${selectedToppings.includes(item.id) ? styles.active : ''}`}
                                    onClick={() => toggleTopping(item.id)}
                                >
                                    <div className={`${styles.emoji} ${styles.emojiSmall}`}>{item.emoji}</div>
                                    <div className={styles.details}>
                                        <h4>{item.name}</h4>
                                        <span className={styles.price}>+{item.price} ج.م</span>
                                    </div>
                                    {selectedToppings.includes(item.id) && <div className={styles.checkIcon}>✅</div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.stepContent}
                    >
                        <h3>4. الفنش الأخير (صوصات) 🥣</h3>
                        <p className={styles.stepDesc}>السر كله في الصوص.. غرقها ماترحمهاش!</p>
                        <div className={styles.optionsGrid}>
                            {ingredients.filter(i => i.type === 'sauce' && (!i.categories || i.categories.includes(selectedCategory))).map(item => (
                                <div
                                    key={item.id}
                                    className={`${styles.optionCard} ${selectedSauces.includes(item.id) ? styles.active : ''}`}
                                    onClick={() => toggleSauce(item.id)}
                                >
                                    <div className={`${styles.emoji} ${styles.emojiSmall}`}>{item.emoji}</div>
                                    <div className={styles.details}>
                                        <h4>{item.name}</h4>
                                        <span className={styles.price}>+{item.price} ج.م</span>
                                    </div>
                                    {selectedSauces.includes(item.id) && <div className={styles.checkIcon}>✅</div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`${styles.container} container`}>
            <h1 className={styles.mainTitle}>ابني اختراعك بنفسك 🏗️</h1>

            <div className={styles.layout}>
                {/* Steps Section */}
                <div className={styles.stepsContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                        </div>
                        <div className={styles.stepsIndicator}>
                            <span className={step >= 1 ? styles.active : ''}>1. القسم</span>
                            <span className={step >= 2 ? styles.active : ''}>2. الأساس</span>
                            <span className={step >= 3 ? styles.active : ''}>3. الإضافات</span>
                            <span className={step >= 4 ? styles.active : ''}>4. الصوصات</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {renderStepContent()}
                    </AnimatePresence>
                </div>

                {/* Summary Section */}
                <div className={styles.summarySection}>
                    <div className={styles.summaryCard}>
                        <h2>ملخص اللغوصة 🧾</h2>
                        <div className={styles.summaryContent}>
                            {selectedCategory ? (
                                <div className={`${styles.summaryItem} ${styles.summaryItemBase}`}>
                                    <span className={styles.itemName}>{categories.find(c => c.id === selectedCategory)?.emoji} {categories.find(c => c.id === selectedCategory)?.name}</span>
                                </div>
                            ) : <p className={styles.emptyMsg}>لسة ما اخترتش حاجة</p>}

                            {selectedBase && (
                                <div className={styles.summaryItem}>
                                    <span className={styles.itemName}>{ingredients.find(i => i.id === selectedBase)?.emoji} {ingredients.find(i => i.id === selectedBase)?.name}</span>
                                    <span className={styles.itemPrice}>{ingredients.find(i => i.id === selectedBase)?.price} ج.م</span>
                                </div>
                            )}

                            {selectedToppings.length > 0 && (
                                <div className={styles.summaryGroup}>
                                    <h4>الإضافات:</h4>
                                    {selectedToppings.map(id => (
                                        <div key={id} className={`${styles.summaryItem} ${styles.summaryItemSmall}`}>
                                            <span className={styles.itemName}>+ {ingredients.find(i => i.id === id)?.name}</span>
                                            <span className={styles.itemPrice}>{ingredients.find(i => i.id === id)?.price} ج.م</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedSauces.length > 0 && (
                                <div className={styles.summaryGroup}>
                                    <h4>الصوصات:</h4>
                                    {selectedSauces.map(id => (
                                        <div key={id} className={`${styles.summaryItem} ${styles.summaryItemSmall}`}>
                                            <span className={styles.itemName}>+ {ingredients.find(i => i.id === id)?.name}</span>
                                            <span className={styles.itemPrice}>{ingredients.find(i => i.id === id)?.price} ج.م</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.totalSection}>
                            <span>المجموع الكلي</span>
                            <span className={styles.totalAmount}>{calculateTotal()} ج.م</span>
                        </div>

                        <div className={styles.navigationButtons}>
                            {step > 1 && (
                                <button className={`btn btn-secondary ${styles.backBtn}`} onClick={handleBack}>
                                    🔙 رجوع
                                </button>
                            )}
                            {step < totalSteps && step >= 1 && (
                                <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleNext}>
                                    التالي ⏭️
                                </button>
                            )}
                            {step === totalSteps && (
                                <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleOrder}>
                                    أطلب الأختراع ده 🚀
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
