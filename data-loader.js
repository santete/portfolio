// ===================================
// Configuration
// ===================================

// OPTION 1: Load from local file (for development)
// const DATA_SOURCE = 'data.json';

// OPTION 2: Load from Google Drive via Apps Script (for production)
// Uncomment dòng dưới và thay YOUR_SCRIPT_ID bằng ID thật
const DATA_SOURCE = 'https://script.google.com/macros/s/AKfycbxTZx5hxIR97cQDyXzelloNMLHUvYf-4M3TAuy3DwbgvvI6mXYABxWMXpvQG9MYghPA/exec';

// Current setting: Local file (change this after setup Google Apps Script)
//const DATA_SOURCE = 'data.json';

// ===================================
// Data Loader - Load content from data source
// ===================================

let portfolioData = null;

// Load data from configured source
async function loadPortfolioData() {
    try {
        console.log('📡 Loading portfolio data from:', DATA_SOURCE);

        const response = await fetch(DATA_SOURCE);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        portfolioData = await response.json();
        renderPortfolio();

        console.log('✅ Portfolio data loaded successfully!');

    } catch (error) {
        console.error('❌ Error loading portfolio data:', error);

        // Show user-friendly error message
        // Fallback: show error message
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 2rem;">
                <div>
                    <h1 style="color: #f5576c; margin-bottom: 1rem;">⚠️ Lỗi tải dữ liệu</h1>
                    <p style="color: #4a5568;">Không thể tải file data.json. Vui lòng kiểm tra lại.</p>
                    <p style="color: #718096; font-size: 0.9rem; margin-top: 1rem;">Error: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

// Render all portfolio sections
function renderPortfolio() {
    if (!portfolioData) return;

    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderContact();
    renderFooter();

    // Re-initialize animations and interactions after rendering
    initializeAfterRender();
}

// ===================================
// Render Hero Section
// ===================================
function renderHero() {
    const { personal } = portfolioData;
    const heroContent = document.querySelector('.hero-content');

    heroContent.innerHTML = `
        <p class="hero-subtitle">${personal.subtitle}</p>
        <h1 class="hero-title">${personal.name}</h1>
        <h2 class="hero-subtitle" style="font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 1.5rem;">
            <span class="text-gradient">${personal.title}</span>
        </h2>
        <p class="hero-description">${personal.description}</p>
        <div class="hero-buttons">
            <a href="#contact" class="btn btn-primary">
                <i class="fas fa-envelope"></i>
                Liên hệ ngay
            </a>
            <a href="#projects" class="btn btn-secondary">
                <i class="fas fa-briefcase"></i>
                Xem dự án
            </a>
        </div>
    `;
}

// ===================================
// Render About Section
// ===================================
function renderAbout() {
    const { about, personal } = portfolioData;
    const aboutCard = document.querySelector('#about .card > div:last-child');

    const paragraphsHTML = about.paragraphs.map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join('');
    const statsHTML = personal.stats.map(stat => `
        <div>
            <h4 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 0.25rem;">${stat.value}</h4>
            <p style="margin: 0; color: var(--text-muted);">${stat.label}</p>
        </div>
    `).join('');

    aboutCard.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;">${about.title}</h3>
        ${paragraphsHTML}
        <div style="margin-top: 2rem; display: flex; gap: 2rem; flex-wrap: wrap;">
            ${statsHTML}
        </div>
    `;
}

// ===================================
// Render Skills Section
// ===================================
function renderSkills() {
    const { skills } = portfolioData;
    const skillsGrid = document.querySelector('.skills-grid');

    const skillsHTML = skills.map(category => `
        <div class="card skill-category">
            <h3><i class="fas ${category.icon}" style="color: var(--primary-color);"></i> ${category.category}</h3>
            ${category.items.map(skill => `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="${skill.progress}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    skillsGrid.innerHTML = skillsHTML;
}

// ===================================
// Render Experience Timeline
// ===================================
function renderExperience() {
    const { experience } = portfolioData;
    const timeline = document.querySelector('.timeline');

    const experienceHTML = experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content card">
                <span class="timeline-date">${exp.period}</span>
                <h3 class="timeline-title">${exp.title}</h3>
                <p class="timeline-company"><i class="fas fa-building"></i> ${exp.company}</p>
                <p class="timeline-description">${exp.description}</p>
                <div class="project-tags" style="margin-top: 1rem;">
                    ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    timeline.innerHTML = experienceHTML;
}

// ===================================
// Render Projects Section
// ===================================
function renderProjects() {
    const { projects } = portfolioData;
    const projectsGrid = document.querySelector('.projects-grid');

    const projectsHTML = projects.map(project => `
        <div class="card project-card" data-category="${project.category}">
            <div class="project-image" style="background: ${project.gradient};">
                <i class="fas ${project.icon}"></i>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="#" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                    Chi tiết
                </a>
            </div>
        </div>
    `).join('');

    projectsGrid.innerHTML = projectsHTML;
}

// ===================================
// Render Education & Certifications
// ===================================
function renderEducation() {
    const { education, certifications } = portfolioData;

    // Find the education section more reliably
    // Look for the section that contains education/certifications
    const sections = document.querySelectorAll('.section-alt');
    let eduGrid = null;

    // Find the section after the projects section
    for (let section of sections) {
        const header = section.querySelector('.section-title');
        if (header && header.textContent.includes('Học vấn')) {
            eduGrid = section.querySelector('.container > div:last-child');
            break;
        }
    }

    // Fallback: if not found, skip rendering this section
    if (!eduGrid) {
        console.warn('⚠️ Education section not found in HTML, skipping render');
        return;
    }

    const educationHTML = education.map(edu => `
        <div class="card">
            <div style="width: 60px; height: 60px; background: ${edu.gradient}; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                <i class="fas ${edu.icon}" style="font-size: 2rem; color: white;"></i>
            </div>
            <h3>${edu.degree}</h3>
            <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 0.5rem;">
                ${edu.school}
            </p>
            <p style="color: var(--text-muted); margin: 0;">${edu.period}</p>
        </div>
    `).join('');

    const certificationsHTML = certifications.map(cert => `
        <div class="card">
            <div style="width: 60px; height: 60px; background: ${cert.gradient}; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                <i class="fas ${cert.icon}" style="font-size: 2rem; color: white;"></i>
            </div>
            <h3>${cert.name}</h3>
            <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 0.5rem;">
                ${cert.issuer}
            </p>
            <p style="color: var(--text-muted); margin: 0;">${cert.year}</p>
        </div>
    `).join('');

    eduGrid.innerHTML = educationHTML + certificationsHTML;
}

// ===================================
// Render Contact Section
// ===================================
function renderContact() {
    const { contact } = portfolioData;
    const contactInfo = document.querySelector('.contact-info');

    const contactHTML = `
        <div class="contact-item">
            <div class="contact-icon">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-details">
                <h4>Email</h4>
                <p>${contact.email}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">
                <i class="fas fa-phone"></i>
            </div>
            <div class="contact-details">
                <h4>Điện thoại</h4>
                <p>${contact.phone}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="contact-details">
                <h4>Địa chỉ</h4>
                <p>${contact.location}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">
                <i class="fab fa-linkedin"></i>
            </div>
            <div class="contact-details">
                <h4>LinkedIn</h4>
                <p>${contact.linkedin}</p>
            </div>
        </div>
    `;

    contactInfo.innerHTML = contactHTML;
}

// ===================================
// Render Footer Social Links
// ===================================
function renderFooter() {
    const { social } = portfolioData;
    const socialLinks = document.querySelector('.social-links');

    const socialHTML = social.map(link => `
        <a href="${link.url}" class="social-link" aria-label="${link.name}">
            <i class="fab ${link.icon}"></i>
        </a>
    `).join('');

    socialLinks.innerHTML = socialHTML;
}

// ===================================
// Re-initialize after rendering
// ===================================
function initializeAfterRender() {
    // Re-observe cards for animations
    document.querySelectorAll('.card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Re-initialize skill bars
    document.querySelectorAll('.skill-category').forEach(category => {
        if (isElementInViewport(category)) {
            animateSkillBars(category);
        }
    });

    // Re-attach project filter event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===================================
// Initialize on page load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
});
