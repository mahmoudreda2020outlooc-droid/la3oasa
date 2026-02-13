'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [orderId, setOrderId] = React.useState<string | null>(null);
    // Removed showCheckoutForm state
    const [customerName, setCustomerName] = React.useState('');
    const [customerPhone, setCustomerPhone] = React.useState('');
    const [depositImage, setDepositImage] = React.useState<string | null>(null);
    const [viewImage, setViewImage] = React.useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDepositImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Removed initiateCheckout function

    const handleCheckout = () => {
        // Validate form
        if (!customerName.trim() || !customerPhone.trim() || !depositImage) {
            alert('من فضلك أكمل كل البيانات وارفع صورة الديبوزيت');
            return;
        }

        const total = getCartTotal();
        const orderItemsNames: string[] = [];
        cartItems.forEach(item => {
            orderItemsNames.push(`${item.name} (x${item.quantity})`);
        });

        // Generate short 4-digit ID
        const shortId = Math.floor(1000 + Math.random() * 9000).toString();
        setOrderId(shortId);

        // Save to Admin Panel (localStorage)
        const newOrder = {
            id: Date.now(),
            shortId: shortId,
            date: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            items: orderItemsNames,
            total: total,
            status: 'pending',
            customerName: customerName,
            customerPhone: customerPhone,
            depositImage: depositImage,
            depositAmount: Math.ceil(total * 0.2)
        };
        const existingOrders = JSON.parse(localStorage.getItem('la3osa_orders') || '[]');
        localStorage.setItem('la3osa_orders', JSON.stringify([newOrder, ...existingOrders]));

        // Show Success state
        setShowSuccess(true);
        setViewImage(false);
        // Remove auto-clear to allow user to see track link
        // clearCart();
    };

    const toggleImageView = () => {
        if (depositImage) {
            setViewImage(!viewImage);
        }
    };

    if (showSuccess) {
        return (
            <div className="cart-success container">
                <div className="success-content">
                    <span className="success-icon">✅</span>
                    <h1>تم إرسال لغوصتك!</h1>
                    <div className="order-number">رقم طلبك: <span className="id">#{orderId}</span></div>
                    <p>طلبك وصل للمطعم وجاري التجهيز يا وحش 🚀</p>
                    <div className="success-actions">
                        <Link href={`/track?id=${orderId}`} className="btn-track" onClick={() => clearCart()}>
                            تتبع طلبك الآن 📍
                        </Link>
                        <Link href="/menu" className="btn-secondary" onClick={() => clearCart()}>
                            أطلب تاني 🍔
                        </Link>
                    </div>
                </div>
                <style jsx>{`
                    .cart-success {
                        min-height: 80vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                    }
                    .success-content {
                        background: rgba(44, 24, 16, 0.6);
                        padding: 4rem;
                        border-radius: 30px;
                        border: 2px solid var(--color-primary);
                        backdrop-filter: blur(10px);
                        box-shadow: 0 0 30px rgba(255, 159, 28, 0.2);
                        animation: scaleIn 0.5s ease-out;
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .success-icon {
                        font-size: 5rem;
                        display: block;
                        margin-bottom: 2rem;
                    }
                    .order-number {
                        background: rgba(255, 159, 28, 0.1);
                        border: 1px dashed var(--color-primary);
                        padding: 1rem;
                        border-radius: 12px;
                        margin-bottom: 2rem;
                        color: #fff;
                        font-size: 1.5rem;
                    }
                    .id {
                        color: var(--color-primary);
                        font-weight: 900;
                    }
                    h1 { color: #fff; margin-bottom: 1rem; font-family: 'Reem Kufi', sans-serif; }
                    p { color: rgba(255, 255, 255, 0.6); margin-bottom: 2.5rem; font-size: 1.2rem; }
                    .success-actions {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .btn-track {
                        background: var(--color-primary);
                        color: #000;
                        padding: 1rem 2.5rem;
                        border-radius: 12px;
                        font-weight: 800;
                        text-decoration: none;
                        display: inline-block;
                        transition: all 0.3s ease;
                    }
                    .btn-secondary {
                        background: rgba(255, 255, 255, 0.05);
                        color: #fff;
                        padding: 0.8rem 2rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: 600;
                    }
                `}</style>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty container">
                <div className="empty-content">
                    <span className="empty-icon">🛒</span>
                    <h1>لسه مش لغوصت حالك؟</h1>
                    <p>السلة فاضية.. روح المنيو واختار اللي يعجبك</p>
                    <Link href="/menu" className="btn-primary">
                        رجوع للمنيو 🍔
                    </Link>
                </div>
                <style jsx>{`
                    .cart-empty {
                        min-height: 80vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                    }
                    .empty-content {
                        background: rgba(44, 24, 16, 0.4);
                        padding: 4rem;
                        border-radius: 30px;
                        border: 1px solid rgba(255, 159, 28, 0.1);
                        backdrop-filter: blur(10px);
                    }
                    .empty-icon {
                        font-size: 5rem;
                        display: block;
                        margin-bottom: 2rem;
                    }
                    h1 { color: #fff; margin-bottom: 1rem; font-family: 'Reem Kufi', sans-serif; }
                    p { color: rgba(255, 255, 255, 0.6); margin-bottom: 2.5rem; }
                    .btn-primary {
                        background: var(--color-primary);
                        color: #000;
                        padding: 1rem 2.5rem;
                        border-radius: 12px;
                        font-weight: 700;
                        text-decoration: none;
                        display: inline-block;
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
                `}</style>
            </div>
        );
    }

    return (
        <div className="cart-container container">
            <h1 className="page-title">طلباتك يا وحش 🛒</h1>

            <div className="cart-grid">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            {item.image && (
                                <div className="item-img">
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                            )}
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p className="item-price">{item.price} ج.م</p>
                            </div>
                            <div className="item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                            </div>
                            <div className="item-total">
                                {item.price * item.quantity} ج.م
                            </div>
                        </div>
                    ))}

                    <button className="clear-btn" onClick={clearCart}>مسح السلة بالكامل</button>
                </div>

                <div className="cart-summary">
                    <div className="summary-card">
                        <h2>ملخص الحساب</h2>
                        <div className="summary-row">
                            <span>المجموع الفرعي</span>
                            <span>{getCartTotal()} ج.م</span>
                        </div>
                        <div className="summary-row total">
                            <span>الإجمالي</span>
                            <span>{getCartTotal()} ج.م</span>
                        </div>
                        <div className="checkout-form">
                            <h3>بيانات العميل 📝</h3>

                            <input
                                type="text"
                                placeholder="الاسم بالكامل"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="form-input"
                            />

                            <input
                                type="tel"
                                placeholder="رقم الهاتف"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="form-input"
                            />

                            <div className="deposit-info">
                                <p>💰 يجب دفع ديبوزيت <strong>{Math.ceil(getCartTotal() * 0.2)} ج.م</strong></p>
                                <p className="deposit-note">(نسبة 20% من إجمالي الطلب)</p>
                                <div className="remaining-info">
                                    <p>🏷️ المتبقي عند الاستلام: <strong>{getCartTotal() - Math.ceil(getCartTotal() * 0.2)} ج.م</strong></p>
                                </div>
                            </div>

                            <div className="image-upload">
                                <div className="payment-info">
                                    <p>💳 الدفع عبر <strong>فودافون كاش</strong> أو <strong>انستا باي</strong></p>
                                    <p className="phone-number">0100000000000</p>
                                </div>

                                <label htmlFor="cart-deposit-upload" className="upload-label">
                                    {depositImage ? '✅ تم رفع الصورة' : '📸 رفع صورة التحويل (20% عربون)'}
                                </label>
                                <input
                                    id="cart-deposit-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                                {depositImage && (
                                    <div className="image-preview" onClick={toggleImageView}>
                                        <img src={depositImage} alt="Deposit Preview" />
                                        <span>🔍 اضغط للتكبير</span>
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    className={`submit-btn ${(!customerName || !customerPhone || !depositImage) ? 'disabled' : ''}`}
                                    onClick={handleCheckout}
                                    disabled={!customerName || !customerPhone || !depositImage}
                                >
                                    {(!customerName || !customerPhone || !depositImage) ? 'أكمل البيانات أولاً 📝' : 'تأكيد الطلب ✅'}
                                </button>
                            </div>
                        </div>
                        <p className="note">التوصيل بيتحسب على حسب المكان 🛵</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .cart-container {
                    padding: 8rem 1.5rem 5rem;
                    min-height: 100vh;
                }
                .page-title {
                    font-size: 3rem;
                    color: transparent;
                    background: linear-gradient(180deg, #FFB950 20%, #E08E0B 80%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    font-family: 'Reem Kufi', sans-serif;
                    margin-bottom: 3rem;
                    text-align: center;
                }
                .cart-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 3rem;
                }
                .cart-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .cart-item {
                    background: rgba(44, 24, 16, 0.4);
                    border: 1px solid rgba(255, 159, 28, 0.1);
                    border-radius: 20px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    backdrop-filter: blur(10px);
                }
                .item-img {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                .item-info { flex: 1; }
                .item-info h3 { color: #fff; margin-bottom: 0.5rem; }
                .item-price { color: var(--color-primary); font-weight: 700; }
                
                .item-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    background: rgba(0,0,0,0.3);
                    border-radius: 10px;
                    padding: 0.5rem;
                    gap: 1rem;
                }
                .quantity-controls button {
                    background: none;
                    border: none;
                    color: var(--color-primary);
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .quantity-controls button:hover { color: #fff; }
                .quantity-controls span { color: #fff; font-weight: 700; font-size: 1.2rem; min-width: 20px; text-align: center; }
                
                .remove-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: opacity 0.3s;
                }
                .remove-btn:hover { opacity: 1; }
                
                .item-total {
                    font-weight: 800;
                    color: #fff;
                    font-size: 1.2rem;
                    min-width: 100px;
                    text-align: left;
                }
                
                .clear-btn {
                    background: none;
                    border: 1px solid rgba(255, 0, 0, 0.2);
                    color: rgba(255, 0, 0, 0.6);
                    padding: 0.8rem;
                    border-radius: 10px;
                    cursor: pointer;
                    align-self: flex-start;
                    transition: all 0.3s;
                }
                .clear-btn:hover { background: rgba(255, 0, 0, 0.1); color: #ff0000; }
                
                .cart-summary {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }
                .summary-card {
                    background: rgba(44, 24, 16, 0.6);
                    border: 2px solid var(--color-primary);
                    padding: 2.5rem;
                    border-radius: 30px;
                    backdrop-filter: blur(20px);
                }
                .summary-card h2 { color: #fff; margin-bottom: 2rem; font-family: 'Reem Kufi', sans-serif; }
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
                .summary-row.total {
                    border-top: 1px solid rgba(255, 159, 28, 0.2);
                    padding-top: 1.5rem;
                    margin-top: 1.5rem;
                    color: #fff;
                    font-weight: 900;
                    font-size: 1.8rem;
                }
                .order-btn {
                    width: 100%;
                    background: var(--color-primary);
                    color: #000;
                    padding: 1.2rem;
                    border: none;
                    border-radius: 15px;
                    font-size: 1.2rem;
                    font-weight: 800;
                    margin-top: 2rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .order-btn:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(255, 159, 28, 0.4); }
                .note {
                    text-align: center;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.4);
                    margin-top: 1rem;
                }

                /* Checkout Form Styles */
                .checkout-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    animation: fadeIn 0.3s ease;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 1.5rem;
                }
                .checkout-form h3 {
                    color: #fff;
                    font-family: 'Reem Kufi', sans-serif;
                    text-align: center;
                    font-size: 1.3rem;
                }
                .form-input {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.3s;
                    width: 100%;
                }
                .form-input:focus { border-color: var(--color-primary); }
                
                .deposit-info {
                    background: rgba(255, 159, 28, 0.1);
                    padding: 1rem;
                    border-radius: 12px;
                    border-left: 4px solid var(--color-primary);
                }
                .deposit-info p { color: #fff; margin: 0; }
                .deposit-note { color: rgba(255, 255, 255, 0.5) !important; font-size: 0.8rem; margin-top: 0.5rem !important; }
                
                .image-upload { margin: 0.5rem 0; }
                .upload-label {
                    display: block;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                    padding: 1rem;
                    text-align: center;
                    border-radius: 12px;
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.3s;
                    width: 100%;
                }
                .upload-label:hover { border-color: var(--color-primary); color: var(--color-primary); }
                .file-input { display: none; }
                
                .form-actions { display: flex; gap: 1rem; }
                .submit-btn {
                    flex: 2;
                    background: var(--color-primary);
                    color: #000;
                    border: none;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 800;
                    cursor: pointer;
                    font-size: 1.1rem;
                    transition: all 0.3s;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 159, 28, 0.3);
                }

                .submit-btn.disabled {
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.3);
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                .payment-info {
                    background: rgba(255, 159, 28, 0.1);
                    border: 1px dashed var(--color-primary);
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .payment-info p {
                    margin: 0.5rem 0;
                    color: #fff;
                    font-size: 0.9rem;
                }

                .phone-number {
                    font-size: 1.2rem !important;
                    font-weight: 800;
                    color: var(--color-primary) !important;
                    letter-spacing: 1px;
                }

                .image-preview {
                    margin-top: 1rem;
                    position: relative;
                    cursor: zoom-in;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s;
                }

                .image-preview:hover {
                    border-color: var(--color-primary);
                    transform: scale(0.98);
                }

                .image-preview img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .image-preview span {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    color: #fff;
                    font-size: 0.8rem;
                    padding: 0.5rem;
                    text-align: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .image-preview:hover span {
                    opacity: 1;
                }

                .cancel-btn {
                    flex: 1;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.5);
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .cancel-btn:hover { border-color: #ff4444; color: #ff4444; }
                
                @media (max-width: 968px) {
                    .cart-grid { grid-template-columns: 1fr; }
                    .cart-summary { position: static; }
                }
                
                @media (max-width: 480px) {
                    .cart-item { flex-direction: column; text-align: center; }
                    .item-actions { width: 100%; justify-content: center; }
                    .item-total { width: 100%; text-align: center; }
                }
            `}</style>

            {viewImage && depositImage && (
                <div className="image-viewer-overlay" onClick={toggleImageView}>
                    <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
                        <img src={depositImage} alt="Full Deposit Image" />
                        <button className="close-viewer-btn" onClick={toggleImageView}>✕</button>
                    </div>
                </div>
            )}
            <style jsx global>{`
                .image-viewer-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(5px);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                .image-viewer-content {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                }

                .image-viewer-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .close-viewer-btn {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    transition: all 0.3s;
                }

                .close-viewer-btn:hover {
                    color: var(--color-primary);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}
