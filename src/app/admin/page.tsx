'use client';

import { useEffect, useState } from 'react';
import { APPWRITE_CONFIG, databases, getFilePreview } from '@/lib/appwrite';
import { Query } from 'appwrite';
import client from '@/lib/appwrite';
import { getOrdersAction, updateOrderStatusAction, deleteOrderAction, getImagePreviewAction, adminLoginAction, adminLogoutAction, checkAdminAuthAction } from '@/app/actions/order';

type Order = {
    $id: string;
    shortId?: string;
    date: string;
    items: string[];
    total: number;
    status: string;
    customerName?: string;
    customerPhone?: string;
    depositImageId?: string;
    depositAmount?: number;
};

function OrderImage({ fileId, onZoom }: { fileId: string; onZoom: (uri: string) => void }) {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadImage() {
            const result = await getImagePreviewAction(fileId);
            if (result.success && result.dataUri) {
                setImageUri(result.dataUri);
            } else {
                setError(true);
            }
        }
        loadImage();
    }, [fileId]);

    if (error) return <div className="deposit-error">❌ فشل تحميل الصورة</div>;
    if (!imageUri) return <div className="deposit-loading">⏳ جاري التحميل...</div>;

    return (
        <div className="deposit-img-wrapper" onClick={() => onZoom(imageUri)}>
            <img src={imageUri} alt="Deposit Proof" className="deposit-img" />
            <span className="zoom-hint">🔍 اضغط للتكبير</span>
        </div>
    );
}

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [showArchive, setShowArchive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [archiveSearchQuery, setArchiveSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const verifyAuth = async () => {
            // STRICT: check if sessionStorage flag exists
            // This flag is deleted by the browser ONLY when the tab/window is closed
            const sessionActive = sessionStorage.getItem('admin_session_active');

            if (!sessionActive) {
                // If window was closed, force logout on server too
                await adminLogoutAction();
                setIsAuthenticated(false);
                return;
            }

            const result = await checkAdminAuthAction();
            if (result.authenticated) {
                setIsAuthenticated(true);
            }
        };
        verifyAuth();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await adminLoginAction(password);
        if (result.success) {
            // Set session flag
            sessionStorage.setItem('admin_session_active', 'true');
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError(result.error || 'خطأ في تسجيل الدخول');
        }
    };

    const playNotification = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.error('Audio notification failed', e);
        }
    };

    const fetchOrders = async () => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            // Use Server Action to fetch orders (Bypassing CORS)
            const { success, orders: active, archivedOrders: archived, error } = await getOrdersAction();

            if (success) {
                setOrders(active as unknown as Order[]);
                setArchivedOrders(archived as unknown as Order[]);
            } else {
                console.error('Fetch error:', error);
            }
        } catch (error) {
            console.error('Fetch errors:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchOrders();

        const unsubscribe = client.subscribe(
            `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collectionId}.documents`,
            (response) => {
                const payload = response.payload as any;

                if (response.events.some(e => e.includes('.create'))) {
                    playNotification();
                    setOrders(prev => [payload as Order, ...prev]);
                } else if (response.events.some(e => e.includes('.update'))) {
                    if (payload.status === 'archived') {
                        setOrders(prev => prev.filter(o => o.$id !== payload.$id));
                        setArchivedOrders(prev => [payload as Order, ...prev]);
                    } else {
                        setOrders(prev => prev.map(o => o.$id === payload.$id ? (payload as Order) : o));
                    }
                } else if (response.events.some(e => e.includes('.delete'))) {
                    setOrders(prev => prev.filter(o => o.$id !== payload.$id));
                    setArchivedOrders(prev => prev.filter(o => o.$id !== payload.$id));
                }
            }
        );

        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleLogout = async () => {
        sessionStorage.removeItem('admin_session_active');
        await adminLogoutAction();
        setIsAuthenticated(false);
    };

    const updateStatus = async (docId: string, newStatus: string) => {
        try {
            // Use Server Action
            const result = await updateOrderStatusAction(docId, newStatus);
            if (!result.success) throw new Error(result.error);

            // UI Update is handled by Realout or we can optimistically update if needed
            // For now, let's manually update state to be snappy
            if (newStatus === 'archived') {
                const archivedOrder = orders.find(o => o.$id === docId);
                setOrders(prev => prev.filter(o => o.$id !== docId));
                if (archivedOrder) {
                    setArchivedOrders(prev => [
                        { ...archivedOrder, status: 'archived' },
                        ...prev.filter(o => o.$id !== docId)
                    ]);
                }
            } else {
                setOrders(prev => prev.map(o => o.$id === docId ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            alert('خطأ في تحديث الحالة');
        }
    };

    const deleteOrder = async (docId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) {
            try {
                // Use Server Action
                const result = await deleteOrderAction(docId);
                if (!result.success) throw new Error(result.error);

                // Manual state update
                setOrders(prev => prev.filter(o => o.$id !== docId));
                setArchivedOrders(prev => prev.filter(o => o.$id !== docId));
            } catch (error) {
                alert('خطأ في الحذف');
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            order.customerName?.toLowerCase().includes(query) ||
            order.customerPhone?.toLowerCase().includes(query) ||
            order.shortId?.toLowerCase().includes(query) ||
            order.$id.toLowerCase().includes(query)
        );
    });

    const filteredArchivedOrders = archivedOrders.filter(order => {
        if (!archiveSearchQuery) return true;
        const query = archiveSearchQuery.toLowerCase();
        return (
            order.customerName?.toLowerCase().includes(query) ||
            order.customerPhone?.toLowerCase().includes(query) ||
            order.shortId?.toLowerCase().includes(query) ||
            order.$id.toLowerCase().includes(query)
        );
    });

    if (!isAuthenticated) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <h1>🔐 الدخول للوحة التحكم</h1>
                    <p>منطقة محظورة للغويصة فقط 👮‍♂️✋</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="كلمة السر"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                        <button type="submit" className="login-btn">دخول</button>
                    </form>
                    {loginError && <p className="error-msg">{loginError}</p>}
                </div>
                <style jsx>{`
                    .login-container {
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #120a06;
                        color: #fff;
                    }
                    .login-card {
                        background: rgba(255, 255, 255, 0.05);
                        padding: 3rem;
                        border-radius: 20px;
                        border: 1px solid rgba(255, 159, 28, 0.2);
                        text-align: center;
                        width: 100%;
                        max-width: 400px;
                    }
                    .login-card h1 { color: var(--color-primary); margin-bottom: 0.5rem; }
                    .login-card p { color: #888; margin-bottom: 2rem; }
                    .login-input {
                        width: 100%;
                        padding: 1rem;
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: #fff;
                        margin-bottom: 1rem;
                        font-size: 1.1rem;
                    }
                    .login-btn {
                        width: 100%;
                        padding: 1rem;
                        background: var(--color-primary);
                        border: none;
                        border-radius: 8px;
                        font-weight: 800;
                        cursor: pointer;
                        font-size: 1.1rem;
                        color: #000;
                    }
                    .error-msg {
                        color: #ff5555;
                        margin-top: 1rem;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="admin-container container">


            <div className="admin-header">
                <div>
                    <h1 className="admin-title">لوحة تحكم لغوصة 👨‍🍳</h1>
                    <p className="admin-subtitle">إدارة الطلبات الحية</p>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="🔍 ابحث بالاسم، الهاتف، أو رقم الطلب..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            ✕
                        </button>
                    )}
                </div>
                <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        className="clear-all-btn"
                        onClick={async () => {
                            if (window.confirm('هل أنت متأكد من مسح جميع الطلبات الحالية؟ سيفقد العملاء القدرة على تتبعها.')) {
                                try {
                                    for (const order of orders) {
                                        await deleteOrderAction(order.$id);
                                    }
                                    setOrders([]);
                                    alert('تم مسح جميع الطلبات بنجاح');
                                } catch (e) {
                                    alert('حدث خطأ أثناء المسح');
                                }
                            }
                        }}
                        style={{ background: 'rgba(255, 50, 50, 0.1)', color: '#ff5555', border: '1px solid rgba(255, 50, 50, 0.3)', padding: '0.8rem 1.2rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        🗑️ مسح الكل
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        خروج 🔒
                    </button>
                </div>
            </div>



            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h2>جاري تحميل الطلبات... ⏳</h2>
                </div>
            ) : filteredOrders.length === 0 && orders.length > 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    <h2>لا توجد نتائج للبحث 🔍</h2>
                    <p>جرب البحث باسم أو رقم هاتف مختلف</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    <h2>مفيش طلبات حالياً .. ريح شوية 😴</h2>
                </div>
            ) : (
                <div className="orders-grid">
                    {filteredOrders.map(order => (
                        <div key={order.$id} className="order-card">
                            <div className="order-header">
                                <span className="order-id">طلب رقم #{order.shortId || order.$id.slice(-4)}</span>
                                <span className="order-time">{new Date(order.date).toLocaleString('ar-EG')}</span>
                                <span className={`status-badge ${order.status}`}>
                                    {order.status === 'pending' && '⏳ قيد المراجعة'}
                                    {order.status === 'in_progress' && '🔥 قيد التحضير'}
                                    {order.status === 'ready' && '✅ جاهز للاستلام'}
                                    {order.status === 'completed' && '🎉 تم التسليم'}
                                </span>
                            </div>

                            <ul className="order-items">
                                {order.items.map((item, index) => (
                                    <li key={index} className={item.includes('🌟') ? 'custom-invention' : ''}>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {order.customerName && (
                                <div className="customer-details">
                                    <h4>بيانات العميل 👤</h4>
                                    <p><strong>الاسم:</strong> {order.customerName}</p>
                                    <p><strong>الهاتف:</strong> {order.customerPhone}</p>

                                    {order.depositImageId && (
                                        <div className="deposit-proof">
                                            <p><strong>صورة التحويل (ديبوزيت):</strong></p>
                                            <OrderImage fileId={order.depositImageId} onZoom={(uri) => setViewImage(uri)} />
                                            <p className="remaining-balance">🏷️ المتبقي عند الاستلام: <strong>{order.total - (order.depositAmount || 0)} ج.م</strong></p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="order-footer">
                                <span className="total-price">{order.total} ج.م</span>
                                <div className="order-actions">

                                    {order.status === 'pending' && (
                                        <>
                                            <button className="action-btn in-progress" onClick={() => updateStatus(order.$id, 'in_progress')}>
                                                👨‍🍳 بدء التحضير
                                            </button>
                                            <button className="action-btn delete" onClick={() => deleteOrder(order.$id)} style={{ background: 'rgba(255,50,50,0.2)', color: '#ff5555', maxWidth: '50px' }} title="حذف">
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                    {order.status === 'in_progress' && (
                                        <>
                                            <button className="action-btn ready" onClick={() => updateStatus(order.$id, 'ready')}>
                                                ✅ جاهز للاستلام
                                            </button>
                                            <button className="action-btn delete" onClick={() => deleteOrder(order.$id)} style={{ background: 'rgba(255,50,50,0.2)', color: '#ff5555', maxWidth: '50px' }} title="حذف">
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                    {order.status === 'ready' && (
                                        <>
                                            <button className="action-btn complete" onClick={() => updateStatus(order.$id, 'completed')}>
                                                ✅ تم التسليم للعميل
                                            </button>
                                            <button className="action-btn delete" onClick={() => deleteOrder(order.$id)} style={{ background: 'rgba(255,50,50,0.2)', color: '#ff5555', maxWidth: '50px' }} title="حذف">
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                    {order.status === 'completed' && (
                                        <button className="action-btn archive" onClick={() => updateStatus(order.$id, 'archived')}>
                                            🗑️ أرشفة
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Archive Section */}
            <div className="archive-section">
                <div className="archive-header">
                    <button className="toggle-archive-btn" onClick={() => setShowArchive(!showArchive)}>
                        {showArchive ? '📦 إخفاء الأرشيف' : `📦 عرض الأرشيف (${archivedOrders?.length || 0})`}
                    </button>
                    {showArchive && (
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="🔍 ابحث في الأرشيف..."
                                value={archiveSearchQuery}
                                onChange={(e) => setArchiveSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            {archiveSearchQuery && (
                                <button className="clear-search-btn" onClick={() => setArchiveSearchQuery('')}>
                                    ✕
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {showArchive && (
                    <div className="orders-grid">
                        {filteredArchivedOrders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                <p>لا توجد نتائج في الأرشيف</p>
                            </div>
                        ) : (
                            filteredArchivedOrders.map(order => (
                                <div key={order.$id} className="order-card archived">
                                    <div className="order-header">
                                        <span className="order-id">طلب رقم #{order.shortId || order.$id.slice(-4)}</span>
                                        <span className="order-time">{new Date(order.date).toLocaleString('ar-EG')}</span>
                                        <span className="status-badge completed">🎉 مؤرشف</span>
                                    </div>

                                    <ul className="order-items">
                                        {order.items.map((item, index) => (
                                            <li key={index} className={item.includes('🌟') ? 'custom-invention' : ''}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {order.customerName && (
                                        <div className="customer-details">
                                            <h4>بيانات العميل 👤</h4>
                                            <p><strong>الاسم:</strong> {order.customerName}</p>
                                            <p><strong>الهاتف:</strong> {order.customerPhone}</p>

                                            {order.depositImageId && (
                                                <div className="deposit-proof">
                                                    <p><strong>صورة التحويل:</strong></p>
                                                    <OrderImage fileId={order.depositImageId} onZoom={(uri) => setViewImage(uri)} />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="order-footer">
                                        <span className="total-price">{order.total} ج.م</span>
                                        <div className="order-actions">
                                            <button className="action-btn delete" onClick={() => deleteOrder(order.$id)}>
                                                🗑️ حذف نهائي
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {viewImage && (
                <div className="image-viewer-overlay" onClick={() => setViewImage(null)}>
                    <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
                        <img src={viewImage} alt="Full Deposit Image" />
                        <button className="close-viewer-btn" onClick={() => setViewImage(null)}>✕</button>
                    </div>
                </div>
            )}

            <style jsx>{`
        .admin-container {
            padding: 8rem 2rem 5rem;
            min-height: 100vh;
            background: #120a06;
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 3rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid rgba(255, 159, 28, 0.1);
            gap: 2rem;
            flex-wrap: wrap;
        }

        .search-container {
            position: relative;
            flex: 1;
            max-width: 500px;
            min-width: 300px;
        }

        .search-input {
            width: 100%;
            padding: 0.8rem 3rem 0.8rem 1.2rem;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 159, 28, 0.2);
            border-radius: 12px;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--color-primary);
            background: rgba(255, 159, 28, 0.1);
            box-shadow: 0 0 15px rgba(255, 159, 28, 0.2);
        }

        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }

        .clear-search-btn {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 50, 50, 0.2);
            border: none;
            color: #ff5555;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .clear-search-btn:hover {
            background: #ff5555;
            color: #fff;
        }

        .admin-title {
            font-size: 3rem;
            color: #fff;
            font-family: 'Reem Kufi', sans-serif;
            margin-bottom: 0.5rem;
        }

        .admin-subtitle {
            color: var(--color-primary);
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .clear-all-btn {
            background: rgba(255, 50, 50, 0.1);
            color: #ff5555;
            border: 1px solid rgba(255, 50, 50, 0.2);
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }

        .clear-all-btn:hover {
            background: #ff5555;
            color: #fff;
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .order-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 159, 28, 0.1);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .order-header h3 {
            color: var(--color-primary);
            font-size: 1.4rem;
        }

        .order-id { font-weight: 800; color: #fff; font-size: 1.2rem; }
        .status-badge {
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
        }
        .status-badge.pending { background: rgba(255, 159, 28, 0.2); color: var(--color-primary); }
        .status-badge.in_progress { background: rgba(0, 100, 255, 0.2); color: #4db8ff; }
        .status-badge.ready { background: rgba(0, 255, 0, 0.1); color: #00ff00; }

        .order-time {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.9rem;
        }

        .order-items {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .order-items li {
          margin-bottom: 0.8rem;
          font-weight: 500;
          color: #fff;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          white-space: pre-wrap;
          line-height: 1.4;
        }

        .order-items li.custom-invention {
            background: rgba(255, 159, 28, 0.1);
            padding: 0.8rem;
            border-radius: 8px;
            border-right: 3px solid var(--color-primary);
            color: #ffb950;
        }

        .order-items li::before {
            content: '🍔';
            font-size: 0.9rem;
            margin-top: 0.2rem;
        }

        .order-items li.custom-invention::before {
            content: '✨';
            font-size: 0.9rem;
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .total-price {
          font-size: 1.6rem;
          font-weight: 900;
          color: #fff;
        }

        .customer-details {
            background: rgba(255, 255, 255, 0.05);
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .customer-details h4 {
            color: var(--color-primary);
            margin-bottom: 0.5rem;
            font-size: 1rem;
            border-bottom: 1px solid rgba(255, 159, 28, 0.3);
            padding-bottom: 0.5rem;
        }

        .customer-details p {
            color: #fff;
            margin-bottom: 0.3rem;
            font-size: 0.9rem;
        }

        .deposit-proof {
            margin-top: 1rem;
        }

        .remaining-balance {
            margin-top: 0.8rem;
            padding-top: 0.5rem;
            border-top: 1px dashed rgba(255, 255, 255, 0.2);
            font-size: 1rem !important;
            color: #ffaa00 !important;
        }

        .deposit-img-wrapper {
            position: relative;
            cursor: zoom-in;
            margin-top: 0.5rem;
            max-width: 100%;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s;
        }

        .deposit-img-wrapper:hover {
            border-color: var(--color-primary);
            transform: scale(0.98);
        }

        .deposit-img {
            width: 100%;
            max-height: 200px;
            object-fit: contain;
            display: block;
            background: #000;
        }

        .zoom-hint {
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

        .deposit-loading, .deposit-error {
            padding: 1rem;
            text-align: center;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            color: #888;
            font-size: 0.9rem;
        }

        .deposit-error { color: #ff5555; }

        .deposit-img-wrapper:hover .zoom-hint {
            opacity: 1;
        }

        .order-actions {
            display: flex;
            gap: 1rem;
            width: 100%;
            justify-content: flex-end;
        }

        .action-btn {
            flex: 1;
            border: none;
            padding: 0.8rem;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            color: #000;
        }

        .action-btn.in-progress {
            background: #4db8ff;
            color: #000;
        }
        .action-btn.in-progress:hover { background: #fff; }

        .action-btn.ready {
            background: var(--color-primary);
            color: #000;
        }
        .action-btn.ready:hover { background: #fff; }

        .action-btn.complete {
            background: #00ff00;
            color: #000;
        }
        .action-btn.complete:hover { background: #fff; }

        .action-btn.archive {
            background: rgba(255, 50, 50, 0.2);
            color: #ff5555;
            border: 1px solid rgba(255, 50, 50, 0.3);
        }
        .action-btn.archive:hover { background: #ff5555; color: #fff; }

        .action-btn.delete {
            background: rgba(255, 0, 0, 0.2);
            color: #ff4444;
            border: 1px solid rgba(255, 0, 0, 0.3);
        }
        .action-btn.delete:hover { background: #ff4444; color: #fff; }

        /* Archive Section */
        .archive-section {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 2px solid rgba(255, 159, 28, 0.2);
        }

        .archive-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            gap: 1rem;
        }

        .toggle-archive-btn {
            background: rgba(255, 159, 28, 0.1);
            border: 2px solid rgba(255, 159, 28, 0.3);
            color: var(--color-primary);
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
        }
        .toggle-archive-btn:hover {
            background: rgba(255, 159, 28, 0.2);
            border-color: var(--color-primary);
        }

        .clear-archive-btn {
            background: rgba(255, 50, 50, 0.1);
            border: 2px solid rgba(255, 50, 50, 0.3);
            color: #ff5555;
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        .clear-archive-btn:hover {
            background: rgba(255, 50, 50, 0.2);
            border-color: #ff5555;
        }

        .order-card.archived {
            opacity: 0.7;
            border-color: rgba(255, 255, 255, 0.1);
        }
        .order-card.archived:hover {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .admin-header { flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; }
            .orders-grid { grid-template-columns: 1fr; }
            .header-actions { width: 100%; justify-content: center; }
            .search-container { width: 100%; max-width: none; }
        }

        .logout-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #fff;
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }
        .logout-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .image-viewer-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .image-viewer-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        .image-viewer-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 12px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
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
        }
    `}</style>
        </div>
    );
}
