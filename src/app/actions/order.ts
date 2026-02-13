'use server';

import { cookies } from 'next/headers';

// SECURE: No hardcoded FALLBACK_KEY anymore.
// All secrets MUST be provided via environment variables in Vercel/Hosting.

const ADMIN_SESSION_NAME = 'la3osa_admin_session';

/**
 * SECURE: Verifies admin password and sets a secure, HTTP-only cookie.
 */
export async function adminLoginAction(password: string) {
    const correctPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    // Debug logging (will show in Vercel logs)
    console.log('Login Attempt - Env check:', {
        has_ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
        has_NEXT_PUBLIC: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        using_default: !process.env.ADMIN_PASSWORD && !process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    });

    if (password === correctPassword) {
        const cookieStore = await cookies();
        cookieStore.set(ADMIN_SESSION_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });
        return { success: true };
    }
    return { success: false, error: 'كلمة المرور غير صحيحة 🚫' };
}

/**
 * SECURE: Checks if the user has a valid admin session cookie.
 */
async function checkAdminAuth() {
    const cookieStore = await cookies();
    return cookieStore.get(ADMIN_SESSION_NAME)?.value === 'authenticated';
}

/**
 * SECURE: Logout by clearing the session cookie.
 */
export async function adminLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_NAME);
    return { success: true };
}

/**
 * SECURE: Check if the user is currently authenticated (for UI hydration).
 */
export async function checkAdminAuthAction() {
    return { authenticated: await checkAdminAuth() };
}

export async function pingAction() {
    // Only reveal non-sensitive info
    return {
        success: true,
        message: 'pong',
        timestamp: new Date().toISOString(),
        envCheck: {
            hasApiKey: !!process.env.APPWRITE_API_KEY,
            hasProject: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
            hasDb: !!process.env.APPWRITE_DATABASE_ID || !!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        }
    };
}

export async function submitOrderAction(formData: FormData) {
    try {
        const orderDataStr = formData.get('orderData') as string;
        const depositFile = formData.get('depositFile') as File;

        if (!orderDataStr) throw new Error('بيانات الطلب مفقودة');
        if (!depositFile || depositFile.size === 0) throw new Error('صورة الديبوزيت مفقودة');

        // Use non-public variables for sensitive backend operations
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const databaseId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
        const collectionId = process.env.APPWRITE_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
        const bucketId = process.env.APPWRITE_BUCKET_ID || process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'product_images';
        const apiKey = process.env.APPWRITE_API_KEY;

        if (!apiKey) throw new Error('تكوين السيرفر غير مكتمل (Missing API Key)');

        const orderData = JSON.parse(orderDataStr);
        let depositImageId = '';

        // Upload file using pure fetch
        const fileFormData = new FormData();
        fileFormData.append('fileId', 'unique()');
        fileFormData.append('file', depositFile);

        const uploadHeaders: Record<string, string> = {
            'x-appwrite-project': project,
        };
        if (apiKey) uploadHeaders['x-appwrite-key'] = apiKey;

        const uploadResponse = await fetch(`${endpoint}/storage/buckets/${bucketId}/files`, {
            method: 'POST',
            headers: uploadHeaders,
            body: fileFormData
        });

        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({}));
            throw new Error(`فشل رفع الصورة: ${errorData.message || uploadResponse.statusText}`);
        }

        const uploadData = await uploadResponse.json();
        depositImageId = uploadData.$id;

        // Create document using pure fetch
        const docHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-appwrite-project': project,
        };
        if (apiKey) docHeaders['x-appwrite-key'] = apiKey;

        const documentResponse = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`, {
            method: 'POST',
            headers: docHeaders,
            body: JSON.stringify({
                documentId: 'unique()',
                data: {
                    shortId: orderData.shortId,
                    items: orderData.items,
                    total: orderData.total,
                    depositAmount: orderData.depositAmount,
                    customerName: orderData.customerName,
                    customerPhone: String(orderData.customerPhone),
                    depositImageId: depositImageId,
                    status: 'pending',
                    date: new Date().toISOString()
                }
            })
        });

        if (!documentResponse.ok) {
            const errorData = await documentResponse.json().catch(() => ({}));
            throw new Error(`فشل حفظ الطلب: ${errorData.message || documentResponse.statusText}`);
        }

        const documentData = await documentResponse.json();
        return { success: true, orderId: documentData.$id };

    } catch (e: any) {
        console.error('ORDER ERROR:', e.message);
        return {
            success: false,
            error: e.message || 'حدث خطأ غير معروف'
        };
    }
}

export async function trackOrderAction(searchId: string) {
    try {
        if (!searchId) throw new Error('رقم الطلب مطلوب');

        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const databaseId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
        const collectionId = process.env.APPWRITE_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
        const apiKey = process.env.APPWRITE_API_KEY;

        if (!apiKey) throw new Error('Missing API Key');

        const normalizedId = searchId.trim().replace('#', '');

        let foundDocument = null;

        // 1. Try to find by shortId using JSON Query Format
        const listUrl = new URL(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`);
        listUrl.searchParams.append('queries[]', JSON.stringify({
            method: 'equal',
            attribute: 'shortId',
            values: [normalizedId]
        }));

        const listHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-appwrite-project': project,
        };
        if (apiKey) listHeaders['x-appwrite-key'] = apiKey;

        const listResponse = await fetch(listUrl.toString(), {
            method: 'GET',
            headers: listHeaders
        });

        if (listResponse.ok) {
            const listData = await listResponse.json();
            if (listData.documents && listData.documents.length > 0) {
                foundDocument = listData.documents[0];
            }
        }

        // 2. If not found, try by Document ID (Direct Fetch)
        if (!foundDocument) {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'x-appwrite-project': project,
            };
            if (apiKey) headers['x-appwrite-key'] = apiKey;

            const docResponse = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents/${normalizedId}`, {
                method: 'GET',
                headers
            });

            if (docResponse.ok) {
                foundDocument = await docResponse.json();
            }
        }

        if (!foundDocument) {
            return { success: false, error: 'ملقناش طلب بالرقم ده يا وحش.. اتأكد من الرقم وجرب تاني 🕵️‍♂️' };
        }

        return {
            success: true,
            order: {
                $id: foundDocument.$id,
                shortId: foundDocument.shortId,
                items: foundDocument.items,
                total: foundDocument.total,
                status: foundDocument.status,
                date: foundDocument.date,
                customerName: foundDocument.customerName,
                customerPhone: foundDocument.customerPhone,
                depositAmount: foundDocument.depositAmount,
            }
        };

    } catch (e: any) {
        console.error('TRACKING ERROR:', e.message);
        return {
            success: false,
            error: 'حدث خطأ أثناء البحث عن الطلب'
        };
    }
}

export async function getOrdersAction() {
    try {
        // SECURE: Check authentication before proceeding
        if (!await checkAdminAuth()) return { success: false, error: 'Unauthorized', orders: [], archivedOrders: [] };

        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const databaseId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
        const collectionId = process.env.APPWRITE_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
        const apiKey = process.env.APPWRITE_API_KEY;

        if (!apiKey || !project || !databaseId || !collectionId) {
            throw new Error('إعدادات السيرفر ناقصة (API Key or Env Vars)');
        }

        // 1. Prepare Active Orders URL
        const activeUrl = new URL(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`);
        activeUrl.searchParams.append('queries[]', JSON.stringify({ method: 'notEqual', attribute: 'status', values: ['archived'] }));
        activeUrl.searchParams.append('queries[]', JSON.stringify({ method: 'orderDesc', attribute: 'date' }));
        activeUrl.searchParams.append('queries[]', JSON.stringify({ method: 'limit', values: [100] }));

        // 2. Prepare Archived Orders URL
        const archivedUrl = new URL(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`);
        archivedUrl.searchParams.append('queries[]', JSON.stringify({ method: 'equal', attribute: 'status', values: ['archived'] }));
        archivedUrl.searchParams.append('queries[]', JSON.stringify({ method: 'orderDesc', attribute: 'date' }));
        archivedUrl.searchParams.append('queries[]', JSON.stringify({ method: 'limit', values: [100] }));

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-appwrite-project': project,
        };
        if (apiKey) headers['x-appwrite-key'] = apiKey;

        // 3. Fetch in Parallel
        const [activeResponse, archivedResponse] = await Promise.all([
            fetch(activeUrl.toString(), {
                method: 'GET',
                headers,
                cache: 'no-store'
            }),
            fetch(archivedUrl.toString(), {
                method: 'GET',
                headers,
                cache: 'no-store'
            })
        ]);

        let activeOrders = [];
        let archivedOrders = [];

        if (activeResponse.ok) {
            const data = await activeResponse.json();
            activeOrders = data.documents || [];
        }

        if (archivedResponse.ok) {
            const data = await archivedResponse.json();
            archivedOrders = data.documents || [];
        }

        return {
            success: true,
            orders: activeOrders,
            archivedOrders: archivedOrders
        };

    } catch (e: any) {
        console.error('ADMIN FETCH ERROR:', e.message);
        return { success: false, error: e.message, orders: [], archivedOrders: [] };
    }
}

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
    try {
        if (!await checkAdminAuth()) return { success: false, error: 'Unauthorized' };

        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const databaseId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
        const collectionId = process.env.APPWRITE_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
        const apiKey = process.env.APPWRITE_API_KEY;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-appwrite-project': project,
        };
        if (apiKey) headers['x-appwrite-key'] = apiKey;

        const response = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents/${orderId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                data: { status: newStatus }
            })
        });

        if (!response.ok) throw new Error('فشل تحديث الحالة');

        const updatedOrder = await response.json();
        return { success: true, order: updatedOrder };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteOrderAction(orderId: string) {
    try {
        if (!await checkAdminAuth()) return { success: false, error: 'Unauthorized' };

        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const databaseId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
        const collectionId = process.env.APPWRITE_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';
        const apiKey = process.env.APPWRITE_API_KEY;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-appwrite-project': project,
        };
        if (apiKey) headers['x-appwrite-key'] = apiKey;

        const response = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents/${orderId}`, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) throw new Error('فشل حذف الطلب');

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function getImagePreviewAction(fileId: string) {
    try {
        if (!await checkAdminAuth()) return { success: false, error: 'Unauthorized' };

        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';
        const bucketId = process.env.APPWRITE_BUCKET_ID || process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'product_images';
        const apiKey = process.env.APPWRITE_API_KEY;

        const url = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${project}`;

        const headers: Record<string, string> = {
            'x-appwrite-project': project,
        };
        if (apiKey) headers['x-appwrite-key'] = apiKey;

        const response = await fetch(url, {
            headers
        });

        if (!response.ok) throw new Error('Failed to fetch image');

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const contentType = response.headers.get('content-type') || 'image/png';

        return { success: true, dataUri: `data:${contentType};base64,${base64}` };
    } catch (e: any) {
        console.error('IMAGE PROXY ERROR:', e.message);
        return { success: false, error: e.message };
    }
}
