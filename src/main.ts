// Main TypeScript file for RDG website
import './style.css'

// Page navigation and animations
class RDGWebsite {
  private currentPage: string = 'home'
  private isTransitioning: boolean = false
  private particles: HTMLElement[] = []

  constructor() {
    this.init()
  }

  private init(): void {
    this.setupEventListeners()
    this.initializeAnimations()
    this.createParticles()
    this.hideLoadingScreen()
  }

  private setupEventListeners(): void {
    // Navigation links
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const page = (e.target as HTMLElement).getAttribute('data-page')
        if (page && page !== this.currentPage && !this.isTransitioning) {
          this.navigateToPage(page)
        }
      })
    })

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle')
    const navLinks = document.getElementById('navLinks')
    
    menuToggle?.addEventListener('click', () => {
      menuToggle.classList.toggle('active')
      navLinks?.classList.toggle('active')
    })

    // Button ripple effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', this.createRipple)
    })

    // Form handling
    const contactForm = document.getElementById('contactForm')
    contactForm?.addEventListener('submit', this.handleFormSubmit)

    // Scroll animations
    this.setupScrollAnimations()

    // Navbar scroll effect
    window.addEventListener('scroll', this.handleNavbarScroll)

    // Portfolio item interactions
    this.setupPortfolioInteractions()

    // Service card interactions
    this.setupServiceCardInteractions()
  }

  private navigateToPage(page: string): void {
    if (this.isTransitioning) return
    
    this.isTransitioning = true
    const transition = document.getElementById('pageTransition')
    
    // Start transition
    transition?.classList.add('active')
    
    setTimeout(() => {
      // Hide current page
      document.getElementById(this.currentPage)?.classList.remove('active')
      
      // Show new page
      document.getElementById(page)?.classList.add('active')
      
      // Update navigation
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('data-page') === page) {
          link.classList.add('active')
        }
      })
      
      this.currentPage = page
      
      // Reset scroll position
      window.scrollTo(0, 0)
      
      // Trigger animations for new page
      this.triggerPageAnimations(page)
      
      setTimeout(() => {
        transition?.classList.remove('active')
        this.isTransitioning = false
      }, 300)
    }, 300)
  }

  private triggerPageAnimations(page: string): void {
    const pageElement = document.getElementById(page)
    const animatedElements = pageElement?.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-on-scroll')
    
    animatedElements?.forEach((element, index) => {
      element.classList.remove('animated')
      setTimeout(() => {
        element.classList.add('animated')
      }, index * 100)
    })
  }

  private createRipple = (e: Event): void => {
    const button = e.currentTarget as HTMLElement
    const ripple = button.querySelector('.btn-ripple') as HTMLElement
    
    if (!ripple) return
    
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = (e as MouseEvent).clientX - rect.left - size / 2
    const y = (e as MouseEvent).clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('active')
    
    setTimeout(() => {
      ripple.classList.remove('active')
    }, 600)
  }

  private handleFormSubmit = (e: Event): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLElement
    const originalText = submitBtn.querySelector('span')?.textContent
    
    submitBtn.querySelector('span')!.textContent = 'Sending...'
    submitBtn.classList.add('loading')
    
    setTimeout(() => {
      submitBtn.querySelector('span')!.textContent = 'Message Sent!'
      submitBtn.classList.remove('loading')
      submitBtn.classList.add('success')
      
      setTimeout(() => {
        submitBtn.querySelector('span')!.textContent = originalText || 'Send Message'
        submitBtn.classList.remove('success')
        form.reset()
      }, 2000)
    }, 1500)
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })
  }

  private handleNavbarScroll = (): void => {
    const navbar = document.getElementById('navbar')
    if (window.scrollY > 100) {
      navbar?.classList.add('scrolled')
    } else {
      navbar?.classList.remove('scrolled')
    }
  }

  private setupPortfolioInteractions(): void {
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hovered')
      })
      
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hovered')
      })
    })
  }

  private setupServiceCardInteractions(): void {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered')
      })
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered')
      })
    })
  }

  private createParticles(): void {
    const particlesContainer = document.getElementById('heroParticles')
    if (!particlesContainer) return

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 20 + 's'
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
      particlesContainer.appendChild(particle)
      this.particles.push(particle)
    }
  }

  private hideLoadingScreen(): void {
    const loadingScreen = document.getElementById('loadingScreen')
    
    setTimeout(() => {
      loadingScreen?.classList.add('fade-out')
      
      setTimeout(() => {
        loadingScreen?.remove()
        this.triggerPageAnimations('home')
      }, 500)
    }, 2000)
  }

  private initializeAnimations(): void {
    // Initialize any additional animations or effects
    this.animateSkillBars()
    this.animateCounters()
    this.setupParallaxEffects()
  }

  private animateSkillBars(): void {
    const skillBars = document.querySelectorAll('.skill-progress')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement
          const width = bar.style.width
          bar.style.width = '0%'
          setTimeout(() => {
            bar.style.width = width
          }, 500)
        }
      })
    })

    skillBars.forEach(bar => observer.observe(bar))
  }

  private animateCounters(): void {
    const counters = document.querySelectorAll('.stat-number')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement
          const target = parseInt(counter.textContent?.replace('+', '') || '0')
          let current = 0
          const increment = target / 50
          
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              counter.textContent = target + '+'
              clearInterval(timer)
            } else {
              counter.textContent = Math.floor(current) + '+'
            }
          }, 50)
        }
      })
    })

    counters.forEach(counter => observer.observe(counter))
  }

  private setupParallaxEffects(): void {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.hero-background')
      
      parallaxElements.forEach(element => {
        const speed = 0.5
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    })
  }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  new RDGWebsite()
})

// Add some interactive elements to the existing HTML structure
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <style>
    #app { display: none; }
  </style>
`