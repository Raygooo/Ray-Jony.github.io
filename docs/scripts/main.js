const heroImage = document.querySelector('.hero-portrait')
const greetingHeading = document.querySelector('.hero-title')
const customizeGreetingButton = document.getElementById('customize-greeting')
const themeToggleButton = document.getElementById('theme-toggle')
const backToTopButton = document.getElementById('back-to-top')
const copyrightYear = document.getElementById('copyright-year')
const skillMeters = document.querySelectorAll('.skill-meter')

const HERO_IMAGE_DEFAULT = 'images/firefox-logo.png'
const HERO_IMAGE_ALT = 'images/firefox-logo2.png'

function updateGreeting(name) {
    if (name && greetingHeading) {
        greetingHeading.innerHTML = `你好，我是 <span class="accent">${name}</span>`
    }
}

function setUserName() {
    const storedName = localStorage.getItem('name')
    const promptDefault = storedName ? storedName : 'Ray Jony'
    const inputName = prompt('请输入你的名字，让我记住你：', promptDefault)

    if (!inputName) {
        return
    }

    const trimmed = inputName.trim()
    if (!trimmed) {
        return
    }

    localStorage.setItem('name', trimmed)
    updateGreeting(trimmed)
}

if (heroImage) {
    heroImage.addEventListener('click', () => {
        const currentSrc = heroImage.getAttribute('src')
        const nextSrc = currentSrc === HERO_IMAGE_DEFAULT ? HERO_IMAGE_ALT : HERO_IMAGE_DEFAULT
        heroImage.setAttribute('src', nextSrc)
    })
}

if (customizeGreetingButton) {
    customizeGreetingButton.addEventListener('click', setUserName)
}

const savedName = localStorage.getItem('name')
if (savedName) {
    updateGreeting(savedName)
}

if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear()
}

function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark')
    if (themeToggleButton) {
        themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙'
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark')
    localStorage.setItem('preferred-theme', isDark ? 'dark' : 'light')
    if (themeToggleButton) {
        themeToggleButton.textContent = isDark ? '☀️' : '🌙'
    }
}

const storedTheme = localStorage.getItem('preferred-theme')
if (storedTheme) {
    applyTheme(storedTheme)
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark')
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme)
}

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 360) {
            backToTopButton.classList.add('show')
        } else {
            backToTopButton.classList.remove('show')
        }
    })

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}

if (skillMeters.length > 0) {
    const revealMeter = (meter) => {
        const level = meter.getAttribute('data-level') || '0'
        meter.style.setProperty('--level', `${level}%`)
        const label = meter.querySelector('span')
        if (label) {
            label.textContent = `${level}%`
        }
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                revealMeter(entry.target)
                obs.unobserve(entry.target)
            }
        })
    }, { threshold: 0.3 })

    skillMeters.forEach((meter) => {
        observer.observe(meter)
    })
}
