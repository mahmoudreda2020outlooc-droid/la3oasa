'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './FloatingCart.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { submitOrderAction, pingAction } from '../app/actions/order';
import { getFilePreview } from '../lib/appwrite';

const FloatingCart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart, isCartOpen, setIsCartOpen } = useCart();
    const pathname = usePathname();
    const cartCount = getCartCount();

    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [depositImage, setDepositImage] = useState<string | null>(null);
    const [depositFile, setDepositFile] = useState<File | null>(null);
    const [viewImage, setViewImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDepositFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDepositImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleImageView = () => {
        if (depositImage) {
            setViewImage(!viewImage);
        }
    };

    const handleCheckout = async () => {
        // Validate form
        if (!customerName.trim() || !customerPhone.trim() || !depositFile) {
            alert('من فضلك أكمل كل البيانات وارفع صورة الديبوزيت');
            return;
        }

        setIsSubmitting(true);

        try {
            const total = getCartTotal();
            const categoryMap: { [key: string]: string } = {
                'burger': 'برجر',
                'chicken': 'فراخ',
                'maria': 'ماريا',
                'sandwiches': 'ساندوتش',
                'mac-cheese': 'ماك أند تشيز',
                'fatuta': 'فتوتة',
                'tnt': 'TNT',
                'box': 'بوكس/وجبة',
                'appetizer': 'مقبلات',
                'extras': 'إضافات',
                'mix-savory': 'ميكس حادق',
                'mix-sweet': 'ميكس حلو',
                'drinks': 'مشروب'
            };

            const orderItemsNames: string[] = [];
            cartItems.forEach(item => {
                const categoryLabel = categoryMap[item.category] ? `[${categoryMap[item.category]}] ` : '';

                if (item.id.startsWith('custom_')) {
                    orderItemsNames.push(`🌟 ${categoryLabel}[اختراع عميل] ${item.name} (x${item.quantity})\n📝 المكونات: ${item.description}`);
                } else {
                    orderItemsNames.push(`${categoryLabel}${item.name} (x${item.quantity})`);
                }
            });

            // Generate short 4-digit ID
            const shortIdString = Math.floor(1000 + Math.random() * 9000).toString();

            // Save to Appwrite
            const orderData = {
                shortId: shortIdString,
                items: orderItemsNames,
                total: total,
                depositAmount: Math.ceil(total * 0.2),
                customerName: customerName,
                customerPhone: customerPhone,
            };

            // 1. Create FormData
            const fData = new FormData();
            fData.append('orderData', JSON.stringify(orderData));
            fData.append('depositFile', depositFile);

            // 2. Call Server Action
            const response = await submitOrderAction(fData);

            if (!response || !response.success) {
                const errorDetail = response?.error || 'السيرفر لم يرسل ردًا صالحًا';
                throw new Error(errorDetail);
            }

            // Trust the server-side result (if it returned a specific ID, we could use it, 
            // but shortIdString is what we use for local tracking display)
            setOrderId(shortIdString);
            setShowSuccess(true);
        } catch (error: any) {
            console.error('Checkout error details:', error);
            const message = error.message || 'خطأ غير معروف في الاتصال';
            alert(`حدث خطأ أثناء إرسال الطلب:\n\n❌ ${message}\n\n💡 نصيحة: لو انت على اللينك الحي، تأكد انك ضفت الـ API Key في Vercel وعملت Redeploy.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const testPing = async () => {
        try {
            const res = await pingAction();
            const info = res.envCheck;
            const appwriteKeys = info.allKeys.filter((k: string) => k.toLowerCase().includes('appwrite'));
            alert(`Diagnostic Results:
- Project: ${info.hasProject ? '✅' : '❌'}
- Database: ${info.hasDb ? '✅' : '❌'}
- API Key (Standard): ${info.hasApiKey ? '✅' : '❌'}

Available Appwrite keys on server:
${appwriteKeys.length > 0 ? appwriteKeys.join('\n') : 'NONE FOUND'}

💡 Tip: The name MUST be exactly "APPWRITE_API_KEY" (All Caps).`);
        } catch (err: any) {
            alert(`Ping Failed: ${err.message}`);
        }
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        setCustomerName('');
        setCustomerPhone('');
        setDepositImage(null);
        setDepositFile(null);
        setViewImage(false);
        clearCart();
        setIsCartOpen(false);
    };

    if (pathname?.startsWith('/admin')) return null;
    if (cartCount === 0 && !isCartOpen && !showSuccess) return null;

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className={`${styles.floatingBtn} ${isCartOpen ? styles.hidden : ''}`}
                onClick={() => setIsCartOpen(true)}
                title="مشاهدة الطلبات"
            >
                <span className={styles.icon}>🛒</span>
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                <span className={styles.label}>{getCartTotal()} ج.م</span>
            </button>

            {/* Overlay */}
            {isCartOpen && <div className={styles.overlay} onClick={() => setIsCartOpen(false)} />}

            {/* Side Drawer */}
            <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
                {!showSuccess && (
                    <div className={styles.drawerHeader}>
                        <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>×</button>
                        <h2>طلباتك يا وحش 🛍️</h2>
                        <button className={styles.clearBtn} onClick={clearCart}>مسح الكل</button>
                    </div>
                )}

                <div className={styles.scrollableContent}>
                    {showSuccess ? (
                        <div className={styles.successState}>
                            <div className={styles.successIcon}>
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white" />
                                </svg>
                            </div>
                            <h3>تم إرسال طلبك بنجاح!</h3>
                            <div className={styles.orderNumber}>رقم طلبك: <span className={styles.id}>#{orderId}</span></div>
                            <p>جاري تجهيز لغوصتك يا وحش.. خليك مستعد 🚀</p>
                            <div className={styles.successActions}>
                                <Link href={`/track?id=${orderId}`} className={styles.trackBtn} onClick={closeSuccess}>
                                    تتبع طلبك الآن 📍
                                </Link>
                                <button className={styles.closeSuccessBtn} onClick={closeSuccess}>
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>السلة فاضية.. لغوص حالك يا وحش! 🍔</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.cartSummaryBox}>
                                <h3 className={styles.boxTitle}>ملخص الطلبات 🧾</h3>
                                <div className={styles.itemList}>
                                    {cartItems.map(item => (
                                        <div key={item.id} className={styles.cartItem}>
                                            <div className={styles.itemInfo}>
                                                <h3>{item.name}</h3>
                                                <p>{item.price} ج.م</p>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <div className={styles.quantity}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className={styles.remove} onClick={() => removeFromCart(item.id)}>🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.totalRow}>
                                    <span>الإجمالي</span>
                                    <span>{getCartTotal()} ج.م</span>
                                </div>
                            </div>

                            <div className={styles.checkoutForm}>
                                <h3 className={styles.formTitle}>بيانات العميل 📝</h3>

                                <input
                                    type="text"
                                    placeholder="الاسم بالكامل"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className={styles.formInput}
                                />

                                <input
                                    type="tel"
                                    placeholder="رقم الهاتف"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    className={styles.formInput}
                                />

                                <div className={styles.depositInfo}>
                                    <p>💰 يجب دفع ديبوزيت <strong>{Math.ceil(getCartTotal() * 0.2)} ج.م</strong></p>
                                    <p className={styles.depositNote}>(نسبة 20% من إجمالي الطلب)</p>
                                    <div className={styles.remainingInfo}>
                                        <p>🏷️ المتبقي عند الاستلام: <strong>{getCartTotal() - Math.ceil(getCartTotal() * 0.2)} ج.م</strong></p>
                                    </div>
                                </div>

                                <div className={styles.imageUpload}>
                                    <div className={styles.paymentInfo}>
                                        <p>💳 الدفع عبر <strong>فودافون كاش</strong> أو <strong>انستا باي</strong></p>
                                        <p className={styles.phoneNumber}>010 80482489</p>
                                    </div>

                                    <label htmlFor="deposit-upload" className={styles.uploadLabel}>
                                        {depositImage ? '✅ تم رفع الصورة' : '📸 رفع صورة التحويل (20% عربون)'}
                                    </label>
                                    <input
                                        id="deposit-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className={styles.fileInput}
                                    />
                                    {depositImage && (
                                        <div className={styles.imagePreview} onClick={toggleImageView}>
                                            <img src={depositImage} alt="Deposit Preview" />
                                            <span>🔍 اضغط للتكبير</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className={`${styles.checkoutBtn} ${(!customerName || !customerPhone || !depositFile || isSubmitting) ? styles.disabled : ''}`}
                                    onClick={handleCheckout}
                                    disabled={!customerName || !customerPhone || !depositFile || isSubmitting}
                                >
                                    {isSubmitting ? 'جاري الإرسال... 🚀' : (!customerName || !customerPhone || !depositFile) ? 'أكمل البيانات أولاً 📝' : 'إرسال الطلب للمطعم 🚀'}
                                </button>

                                <button
                                    onClick={testPing}
                                    style={{ opacity: 0.1, fontSize: '10px', marginTop: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                >
                                    ⚙️ Diagnostics
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {viewImage && depositImage && (
                <div className={styles.imageViewerOverlay} onClick={toggleImageView}>
                    <div className={styles.imageViewerContent} onClick={(e) => e.stopPropagation()}>
                        <img src={depositImage} alt="Full Deposit Image" />
                        <button className={styles.closeViewerBtn} onClick={toggleImageView}>✕</button>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default FloatingCart;
