import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <header class="header">
      <h1 class="title">Minimal</h1>
      <p class="subtitle">Less is more</p>
    </header>
    
    <main class="main">
      <section class="card">
        <h2 class="card-title">Clean Design</h2>
        <p class="card-text">Embracing simplicity through thoughtful design choices and intentional whitespace.</p>
        <button class="button" id="primary-btn">Get Started</button>
      </section>
      
      <section class="card">
        <h2 class="card-title">Focus</h2>
        <p class="card-text">Removing distractions to highlight what truly matters in your experience.</p>
        <button class="button button-secondary" id="secondary-btn">Learn More</button>
      </section>
    </main>
    
    <footer class="footer">
      <p class="footer-text">Designed with intention</p>
    </footer>
  </div>
`

// Add subtle interactions
const primaryBtn = document.querySelector('#primary-btn')
const secondaryBtn = document.querySelector('#secondary-btn')

primaryBtn?.addEventListener('click', () => {
  primaryBtn.textContent = 'Welcome ✓'
  setTimeout(() => {
    primaryBtn.textContent = 'Get Started'
  }, 2000)
})

secondaryBtn?.addEventListener('click', () => {
  secondaryBtn.textContent = 'Coming Soon'
  setTimeout(() => {
    secondaryBtn.textContent = 'Learn More'
  }, 2000)
})