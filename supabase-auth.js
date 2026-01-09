// ===================================
// Supabase Configuration
// ===================================

// BƯỚC 1: Tạo Supabase project tại https://supabase.com
// BƯỚC 2: Lấy URL và Anon Key từ Project Settings > API
// BƯỚC 3: Thay thế các giá trị dưới đây

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Ví dụ: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Current user state
let currentUser = null;

// ===================================
// Authentication Functions
// ===================================

/**
 * Sign in with Google
 */
async function signInWithGoogle() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;

        console.log('🔐 Redirecting to Google login...');

    } catch (error) {
        console.error('❌ Login error:', error);
        showNotification('Lỗi đăng nhập: ' + error.message, 'error');
    }
}

/**
 * Sign out
 */
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        currentUser = null;
        updateAuthUI();
        showNotification('Đã đăng xuất thành công!', 'success');

        // Reload page to reset state
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    } catch (error) {
        console.error('❌ Logout error:', error);
        showNotification('Lỗi đăng xuất: ' + error.message, 'error');
    }
}

/**
 * Get current session
 */
async function getCurrentSession() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
            currentUser = session.user;
            console.log('✅ User logged in:', currentUser.email);
        } else {
            currentUser = null;
            console.log('ℹ️ No active session');
        }

        return session;

    } catch (error) {
        console.error('❌ Session error:', error);
        return null;
    }
}

/**
 * Listen to auth state changes
 */
function setupAuthListener() {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('🔄 Auth state changed:', event);

        if (session) {
            currentUser = session.user;
            console.log('✅ User:', currentUser.email);
        } else {
            currentUser = null;
        }

        updateAuthUI();
    });
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return currentUser !== null;
}

/**
 * Get user info
 */
function getUserInfo() {
    if (!currentUser) return null;

    return {
        email: currentUser.email,
        name: currentUser.user_metadata?.full_name || currentUser.email,
        avatar: currentUser.user_metadata?.avatar_url || null
    };
}

// ===================================
// Initialize on load
// ===================================
async function initAuth() {
    console.log('🔐 Initializing authentication...');

    // Get current session
    await getCurrentSession();

    // Setup listener
    setupAuthListener();

    // Update UI
    updateAuthUI();
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
}
