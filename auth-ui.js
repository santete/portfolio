// ===================================
// Authentication UI Management
// ===================================

/**
 * Update authentication UI based on current user state
 */
function updateAuthUI() {
    const authContainer = document.getElementById('authContainer');
    if (!authContainer) return;

    if (isAuthenticated()) {
        // User is logged in - show user info and logout button
        const userInfo = getUserInfo();
        authContainer.innerHTML = `
            <button class="btn-edit" id="editButton" onclick="openEditModal()">
                <i class="fas fa-edit"></i>
                Chỉnh sửa
            </button>
            <div class="user-profile">
                ${userInfo.avatar ? `<img src="${userInfo.avatar}" alt="Avatar" class="user-avatar">` : '<i class="fas fa-user-circle user-avatar-icon"></i>'}
                <span class="user-name">${userInfo.name}</span>
            </div>
            <button class="btn-logout" onclick="signOut()">
                <i class="fas fa-sign-out-alt"></i>
                Đăng xuất
            </button>
        `;
    } else {
        // User is not logged in - show login button
        authContainer.innerHTML = `
            <button class="btn-login" onclick="signInWithGoogle()">
                <i class="fab fa-google"></i>
                Đăng nhập với Google
            </button>
        `;
    }
}

// ===================================
// Edit Modal Functions
// ===================================

/**
 * Open edit modal
 */
function openEditModal() {
    if (!isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để chỉnh sửa!', 'error');
        return;
    }

    const modal = document.getElementById('editModal');
    if (!modal) {
        createEditModal();
    }

    // Populate form with current data
    populateEditForm();

    // Show modal
    document.getElementById('editModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

/**
 * Close edit modal
 */
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Create edit modal HTML
 */
function createEditModal() {
    const modalHTML = `
        <div id="editModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-edit"></i> Chỉnh sửa Portfolio</h2>
                    <button class="modal-close" onclick="closeEditModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <form id="editForm">
                        <!-- Personal Info -->
                        <div class="form-section">
                            <h3>Thông tin cá nhân</h3>
                            <div class="form-group">
                                <label>Tên</label>
                                <input type="text" id="edit_name" required>
                            </div>
                            <div class="form-group">
                                <label>Chức danh</label>
                                <input type="text" id="edit_title" required>
                            </div>
                            <div class="form-group">
                                <label>Mô tả</label>
                                <textarea id="edit_description" rows="3" required></textarea>
                            </div>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="form-section">
                            <h3>Thông tin liên hệ</h3>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="edit_email" required>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" id="edit_phone" required>
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ</label>
                                <input type="text" id="edit_location" required>
                            </div>
                            <div class="form-group">
                                <label>LinkedIn</label>
                                <input type="text" id="edit_linkedin" required>
                            </div>
                        </div>
                        
                        <!-- Note -->
                        <div class="form-note">
                            <i class="fas fa-info-circle"></i>
                            Để chỉnh sửa Skills, Experience, Projects, vui lòng sửa trực tiếp file JSON trên Google Drive.
                        </div>
                    </form>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeEditModal()">
                        <i class="fas fa-times"></i>
                        Hủy
                    </button>
                    <button type="button" class="btn btn-primary" onclick="saveChanges()">
                        <i class="fas fa-save"></i>
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Populate edit form with current data
 */
function populateEditForm() {
    if (!portfolioData) return;

    // Personal info
    document.getElementById('edit_name').value = portfolioData.personal.name || '';
    document.getElementById('edit_title').value = portfolioData.personal.title || '';
    document.getElementById('edit_description').value = portfolioData.personal.description || '';

    // Contact info
    document.getElementById('edit_email').value = portfolioData.contact.email || '';
    document.getElementById('edit_phone').value = portfolioData.contact.phone || '';
    document.getElementById('edit_location').value = portfolioData.contact.location || '';
    document.getElementById('edit_linkedin').value = portfolioData.contact.linkedin || '';
}

/**
 * Save changes to Google Drive
 */
async function saveChanges() {
    if (!isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để lưu thay đổi!', 'error');
        return;
    }

    try {
        // Show loading
        const saveBtn = event.target;
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
        saveBtn.disabled = true;

        // Get form data
        const updatedData = {
            ...portfolioData,
            personal: {
                ...portfolioData.personal,
                name: document.getElementById('edit_name').value,
                title: document.getElementById('edit_title').value,
                description: document.getElementById('edit_description').value
            },
            contact: {
                ...portfolioData.contact,
                email: document.getElementById('edit_email').value,
                phone: document.getElementById('edit_phone').value,
                location: document.getElementById('edit_location').value,
                linkedin: document.getElementById('edit_linkedin').value
            }
        };

        // Save to Google Drive via Apps Script
        const response = await fetch(DATA_SOURCE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }

        const result = await response.json();

        if (result.success) {
            // Update local data
            portfolioData = updatedData;

            // Re-render portfolio
            renderPortfolio();

            // Close modal
            closeEditModal();

            // Show success message
            showNotification('✅ Đã lưu thay đổi thành công!', 'success');
        } else {
            throw new Error(result.message || 'Unknown error');
        }

    } catch (error) {
        console.error('❌ Save error:', error);
        showNotification('❌ Lỗi khi lưu: ' + error.message, 'error');
    } finally {
        // Reset button
        const saveBtn = document.querySelector('.modal-footer .btn-primary');
        if (saveBtn) {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Lưu thay đổi';
            saveBtn.disabled = false;
        }
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeEditModal();
    }
});
