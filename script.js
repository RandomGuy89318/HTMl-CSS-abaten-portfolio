// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Animate skill cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});

// Certificate modal functionality
function createCertificateModal() {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3></h3>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Initialize certificate modal
const certificateModal = createCertificateModal();

// Add click event to certificate items
document.querySelectorAll('.certificate-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        certificateModal.querySelector('.modal-image').src = img.src;
        certificateModal.querySelector('.modal-image').alt = img.alt;
        certificateModal.querySelector('.modal-info h3').textContent = title;
        certificateModal.querySelector('.modal-info p').textContent = description;
        
        certificateModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal functionality
certificateModal.querySelector('.modal-close').addEventListener('click', () => {
    certificateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.style.display === 'flex') {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Animate certificates on scroll
document.querySelectorAll('.certificate-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});
// Projects modal functionality (similar to certificates)
function createProjectModal() {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3></h3>
                <p></p>
                <div class="project-tech"></div>
                <div class="project-links"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Initialize project modal
const projectModal = createProjectModal();

// Add click event to project items (when they exist)
function initializeProjectItems() {
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const techTags = item.querySelectorAll('.tech-tag');
            const links = item.querySelectorAll('.project-link');
            
            projectModal.querySelector('.modal-image').src = img.src;
            projectModal.querySelector('.modal-image').alt = img.alt;
            projectModal.querySelector('.modal-info h3').textContent = title;
            projectModal.querySelector('.modal-info p').textContent = description;
            
            // Copy tech tags
            const modalTechContainer = projectModal.querySelector('.project-tech');
            modalTechContainer.innerHTML = '';
            techTags.forEach(tag => {
                modalTechContainer.appendChild(tag.cloneNode(true));
            });
            
            // Copy project links
            const modalLinksContainer = projectModal.querySelector('.project-links');
            modalLinksContainer.innerHTML = '';
            links.forEach(link => {
                modalLinksContainer.appendChild(link.cloneNode(true));
            });
            
            projectModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close project modal functionality
projectModal.querySelector('.modal-close').addEventListener('click', () => {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close project modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.style.display === 'flex') {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Animate projects on scroll
document.querySelectorAll('.project-item, .project-placeholder').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Initialize project items when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectItems();
});