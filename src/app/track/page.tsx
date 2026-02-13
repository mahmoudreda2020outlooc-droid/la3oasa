'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { menuItems, CATEGORIES } from '../../data/menu';
import { APPWRITE_CONFIG } from '../../lib/appwrite';
import client from '../../lib/appwrite';
import { trackOrderAction } from '../../app/actions/order';

interface Order {
    $id: string;
    shortId: string;
    items: string[];
    total: number;
    status: string;
    date: string;
    customerName?: string;
    customerPhone?: string;
    depositAmount?: number;
}

function TrackContent() {
    const searchParams = useSearchParams();
    const [searchId, setSearchId] = useState(searchParams.get('id') || '');
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const checkStatus = async (idToSearch?: string) => {
        const id = idToSearch || searchId;
        if (!id) return;

        setIsLoading(true);
        setError('');

        // Strip '#' if present
        const normalizedId = id.startsWith('#') ? id.slice(1) : id;

        try {
            const response = await trackOrderAction(normalizedId);

            if (response.success && response.order) {
                setOrder(response.order as unknown as Order);
            } else {
                setOrder(null);
                setError(response.error || 'ملقناش طلب بالرقم ده يا وحش.. اتأكد من الرقم وجرب تاني 🕵️‍♂️');
            }
        } catch (err) {
            console.error('Tracking error:', err);
            setError('حدث خطأ أثناء البحث. حاول مرة أخرى.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setSearchId(id);
            checkStatus(id);
        }
    }, [searchParams]);

    // Real-time status updates for the tracked order
    useEffect(() => {
        if (!order) return;

        const unsubscribe = client.subscribe(
            `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collectionId}.documents.${order.$id}`,
            (response) => {
                setOrder(response.payload as Order);
            }
        );

        return () => unsubscribe();
    }, [order?.$id]);

    return (
        <div className="track-container container">
            <div className="track-card">
                <h1 className="title">تتبع لغوصتك 📍</h1>
                <p className="subtitle">دخل رقم الطلب عشان تعرف وصل لفين</p>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="رقم الطلب (مثلاً: 4532)"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && checkStatus()}
                    />
                    <button onClick={() => checkStatus()}>تتبع</button>
                </div>

                {error && <p className="error-msg">{error}</p>}

                {order && (
                    <div className="status-display">
                        <div className="status-header">
                            <span className="order-id">طلب رقم #{order.shortId || order.$id.slice(-4)}</span>
                            <span className="order-date">{new Date(order.date).toLocaleString('ar-EG')}</span>
                        </div>

                        {/* Status Stepper */}
                        <div className="stepper">
                            {[
                                { status: 'pending', label: 'مراجعة الطلب', icon: '⏳' },
                                { status: 'in_progress', label: 'قيد التحضير', icon: '🔥' },
                                { status: 'ready', label: 'جاهز للاستلام / في انتظارك', icon: '🛵' },
                                { status: 'completed', label: 'تم الاستلام', icon: '✅' }
                            ].map((step, index) => {
                                const steps = ['pending', 'in_progress', 'ready', 'completed'];
                                const currentStepIndex = steps.indexOf(order.status || 'pending');
                                const stepIndex = steps.indexOf(step.status);
                                const isActive = stepIndex <= currentStepIndex;
                                const isCurrent = stepIndex === currentStepIndex;

                                return (
                                    <div key={step.status} className={`step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                                        <div className="step-icon">{step.icon}</div>
                                        <span className="step-label">{step.label}</span>
                                        {index < 3 && <div className={`step-line ${stepIndex < currentStepIndex ? 'filled' : ''}`}></div>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="status-message">
                            {order.status === 'pending' && (
                                <>
                                    <h2>طلبك وصل! 📨</h2>
                                    <p>بانتظار تأكيد المطعم ومراجعة الديبوزيت..</p>
                                </>
                            )}
                            {order.status === 'in_progress' && (
                                <>
                                    <h2>تم التأكيد.. جاري التحضير! 🔥</h2>
                                    <p>المطعم قبل طلبك والشيف بدأ يشتغل في اللغوصة حالاً.</p>
                                </>
                            )}
                            {order.status === 'ready' && (
                                <>
                                    <h2>جاهز للاستلام / في انتظارك 🛵</h2>
                                    <p>الأوردر جاهز للاستلام أو طلع مع الطيار.. استعد!</p>
                                </>
                            )}
                            {order.status === 'completed' && (
                                <>
                                    <h2>تم الاستلام.. ألف هنا! ❤️</h2>
                                    <p>نتمنى تكون اللغوصة عجبتك.. مستنيينك تاني!</p>
                                </>
                            )}
                        </div>

                        {/* Customer & Payment Info */}
                        <div className="customer-payment-info">
                            <div className="info-row">
                                <span className="info-label">👤 العميل:</span>
                                <span className="info-value">{order.customerName || 'غير متوفر'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">📞 الهاتف:</span>
                                <span className="info-value">{order.customerPhone || 'غير متوفر'}</span>
                            </div>
                            <div className="info-row highlight">
                                <span className="info-label">💳 المبلغ المدفوع (ديبوزيت):</span>
                                <span className="info-value">{order.depositAmount || 0} ج.م</span>
                            </div>
                            <div className="info-row highlight">
                                <span className="info-label">💰 المتبقي عند الاستلام:</span>
                                <span className="info-value">{order.total - (order.depositAmount || 0)} ج.م</span>
                            </div>
                        </div>

                        <div className="order-details-mini">
                            <h3>محتويات الطلب:</h3>
                            <ul className="items-list">
                                {order.items.map((itemStr, i) => {
                                    // Extract item name and strip category label if present
                                    let itemName = itemStr.split(' (x')[0];
                                    if (itemName.includes('] ')) {
                                        itemName = itemName.split('] ')[1];
                                    }
                                    const menuItem = menuItems.find(m => m.name === itemName);
                                    const category = menuItem ? CATEGORIES.find(c => c.id === menuItem.category) : null;

                                    return (
                                        <li key={i} className="item-row">
                                            <span className="item-name">{itemStr}</span>
                                            {category && (
                                                <span className="item-category">
                                                    {category.emoji} {category.name}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="total-mini">الإجمالي: {order.total} ج.م</div>
                        </div>
                    </div>
                )}

                <div className="track-footer">
                    <Link href="/menu" className="back-link">
                        رجوع للمنيو 🍔
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .track-container {
                    padding: 8rem 1.5rem 5rem;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .track-card {
                    background: rgba(44, 24, 16, 0.6);
                    border: 2px solid var(--color-primary);
                    padding: 3rem;
                    border-radius: 30px;
                    width: 100%;
                    max-width: 600px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .title {
                    font-family: 'Reem Kufi', sans-serif;
                    color: #fff;
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }
                .subtitle {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 2.5rem;
                }
                .search-box {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .search-box input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1.1rem;
                    outline: none;
                }
                .search-box input:focus { border-color: var(--color-primary); }
                .search-box button {
                    background: var(--color-primary);
                    color: #000;
                    border: none;
                    padding: 0 2rem;
                    border-radius: 12px;
                    font-weight: 800;
                    cursor: pointer;
                }
                .error-msg { color: #ff4444; text-align: center; margin-bottom: 2rem; }
                
                .status-display {
                    background: rgba(0,0,0,0.2);
                    border-radius: 20px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    animation: fadeIn 0.5s ease;
                }
                .status-header {
                    display: flex;
                    justify-content: space-between;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.9rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
                    padding-bottom: 1rem;
                }

                /* Stepper Styles */
                .stepper {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 3rem;
                    position: relative;
                }
                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    flex: 1;
                    opacity: 0.5;
                    transition: all 0.3s;
                }
                .step.active { opacity: 1; }
                .step.current .step-icon { transform: scale(1.2); box-shadow: 0 0 20px var(--color-primary); }
                
                .step-icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                    z-index: 2;
                    border: 2px solid transparent;
                    transition: all 0.3s;
                }
                .step.active .step-icon { background: var(--color-primary); color: #000; border-color: var(--color-primary); }
                .step.completed .step-icon { background: #00ff00; }

                .step-label { font-size: 0.8rem; color: #fff; text-align: center; }

                .step-line {
                    position: absolute;
                    top: 20px;
                    right: 50%;
                    width: 100%;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    z-index: 1;
                    transform: translateX(50%);
                    display: none;
                } 
                .stepper {
                    gap: 1rem;
                }
                
                .status-message {
                    text-align: center;
                    margin-bottom: 2rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border-radius: 15px;
                }
                .status-message h2 { color: var(--color-primary); margin-bottom: 0.5rem; font-size: 1.5rem; }
                .status-message p {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1rem;
                }

                .customer-payment-info {
                    background: rgba(255, 159, 28, 0.05);
                    border: 1px solid rgba(255, 159, 28, 0.2);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin: 2rem 0;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .info-row:last-child {
                    border-bottom: none;
                }

                .info-row.highlight {
                    background: rgba(255, 159, 28, 0.1);
                    margin: 0.5rem -1rem;
                    padding: 1rem 1rem;
                    border-radius: 8px;
                    border-bottom: none;
                }

                .info-label {
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.95rem;
                }

                .info-value {
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1.1rem;
                }

                .order-details-mini {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 1.5rem;
                    text-align: right;
                }
                .order-details-mini h3 { color: rgba(255, 255, 255, 0.4); font-size: 1rem; margin-bottom: 1rem; }
                .items-list { list-style: none; padding: 0; margin-bottom: 1rem; }
                
                .item-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .item-row:last-child { border-bottom: none; }
                
                .item-name { color: #fff; font-weight: 500; }
                
                .item-category {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .total-mini { color: var(--color-primary); font-weight: 800; font-size: 1.2rem; margin-top: 1.5rem; border-top: 1px dashed rgba(255, 255, 255, 0.2); padding-top: 1rem; }

                .track-footer { text-align: center; }
                .back-link { color: rgba(255, 255, 255, 0.3); text-decoration: none; font-size: 0.9rem; transition: color 0.3s; }
                .back-link:hover { color: var(--color-primary); }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 480px) {
                    .track-card { padding: 1.5rem; }
                    .search-box { flex-direction: column; }
                    .search-box button { padding: 1rem; }
                    .step-label { font-size: 0.7rem; }
                }
            `}</style>
        </div>
    );
}

export default function TrackPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '10rem', textAlign: 'center', color: '#fff' }}><h2>جاري التحميل... ⏳</h2></div>}>
            <TrackContent />
        </Suspense>
    );
}
