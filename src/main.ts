import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <!-- Navigation -->
    <nav class="nav">
      <div class="nav-brand">
        <span class="brand-text">RDG</span>
      </div>
      <div class="nav-links">
        <a href="#about" class="nav-link">About</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <button class="menu-toggle" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-subtitle">Founded in 2024</p>
        <h1 class="hero-title">Reed Digital Group</h1>
        <p class="hero-description">
          Professional technology consulting specializing in cybersecurity,
          digital solutions, and AI integration for forward-thinking businesses.
        </p>
        <div class="hero-actions">
          <button class="btn primary" id="portfolioBtn">View Portfolio</button>
          <button class="btn secondary" id="contactBtn">Get in Touch</button>
        </div>
      </div>
    </section>

    <!-- Featured Media -->
    <section class="media-section">
      <div class="media-grid">
        <div class="media-item">
          <div class="media-icon">📰</div>
          <h3 class="media-name">Baltimore Times</h3>
          <p class="media-desc">Featured Technology Innovation</p>
        </div>
        <div class="media-item">
          <div class="media-icon">✍️</div>
          <h3 class="media-name">Medium</h3>
          <p class="media-desc">Tech Industry Insights</p>
        </div>
        <div class="media-item">
          <div class="media-icon">🛡️</div>
          <h3 class="media-name">MITRE Insights</h3>
          <p class="media-desc">Cybersecurity Research</p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
      <h2 class="section-title">Services</h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">🔒</div>
          <h3 class="service-title">Cybersecurity</h3>
          <p class="service-description">
            Comprehensive security assessments, penetration testing, and infrastructure hardening
            to protect your business from evolving cyber threats.
          </p>
        </div>
        <div class="service-card">
          <div class="service-icon">💻</div>
          <h3 class="service-title">Software Development</h3>
          <p class="service-description">
            Custom web and mobile applications built with cutting-edge technologies
            and best practices for security and scalability.
          </p>
        </div>
        <div class="service-card">
          <div class="service-icon">🤖</div>
          <h3 class="service-title">AI Integration</h3>
          <p class="service-description">
            Machine learning and artificial intelligence solutions to automate processes,
            generate insights, and create competitive advantage.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <h2 class="cta-title">Ready to Transform Your Business?</h2>
      <p class="cta-description">Let's discuss how RDG can help you achieve your technology goals.</p>
      <button class="btn primary" id="ctaBtn">Get Started</button>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">Reed Digital Group</div>
        <p class="footer-description">
          Empowering businesses through innovative technology solutions and cybersecurity excellence.
        </p>
        <div class="footer-links">
          <a href="#" class="footer-link">LinkedIn</a>
          <a href="#" class="footer-link">GitHub</a>
          <a href="#" class="footer-link">Twitter</a>
          <a href="#" class="footer-link">Email</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 Reed Digital Group. All rights reserved.</p>
      </div>
    </footer>
  </div>
`

// Add smooth scrolling and interactions
const portfolioBtn = document.querySelector('#portfolioBtn')
const contactBtn = document.querySelector('#contactBtn')
const ctaBtn = document.querySelector('#ctaBtn')
const menuToggle = document.querySelector('#menuToggle')
const navLinks = document.querySelector('.nav-links')

// Button interactions
portfolioBtn?.addEventListener('click', () => {
  portfolioBtn.textContent = 'Coming Soon ✓'
  setTimeout(() => {
    portfolioBtn.textContent = 'View Portfolio'
  }, 2000)
})

contactBtn?.addEventListener('click', () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
})

ctaBtn?.addEventListener('click', () => {
  ctaBtn.textContent = 'Let\'s Connect ✓'
  setTimeout(() => {
    ctaBtn.textContent = 'Get Started'
  }, 2000)
})

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active')
  menuToggle.classList.toggle('active')
})

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

// Add scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll('.service-card, .media-item').forEach(el => {
  observer.observe(el)
})