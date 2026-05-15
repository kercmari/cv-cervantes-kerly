import { datos } from './datos.js'

const EXPERIENCE_START_DATE = new Date(2021, 4, 1) // May 2021

const select = (el, all = false) => {
  el = el.trim()
  return all ? [...document.querySelectorAll(el)] : document.querySelector(el)
}

const on = (type, el, listener, all = false) => {
  const selectEl = select(el, all)
  if (!selectEl) return
  if (all) selectEl.forEach(e => e.addEventListener(type, listener))
  else selectEl.addEventListener(type, listener)
}

const getExperienceInfo = lang => {
  const now = new Date()
  let years = now.getFullYear() - EXPERIENCE_START_DATE.getFullYear()
  let months = now.getMonth() - EXPERIENCE_START_DATE.getMonth()

  if (now.getDate() < EXPERIENCE_START_DATE.getDate()) months--
  if (months < 0) {
    years--
    months += 12
  }

  return {
    years,
    months,
    experiencePlus: lang === 'es' ? `+${years} años` : `${years}+ years`,
    experienceFull:
      lang === 'es'
        ? `${years} años${months > 0 ? ` y ${months} meses` : ''}`
        : `${years} years${months > 0 ? ` and ${months} months` : ''}`
  }
}

const applyDynamicValues = (value, lang) => {
  if (typeof value !== 'string') return value
  const experience = getExperienceInfo(lang)
  return value
    .replaceAll('{experiencePlus}', experience.experiencePlus)
    .replaceAll('{experienceFull}', experience.experienceFull)
    .replaceAll('{experienceYears}', experience.years)
}

const updateTyped = typedElement => {
  if (!typedElement || !window.Typed) return
  if (typedElement._typedInstance) typedElement._typedInstance.destroy()

  const typedStrings = typedElement.getAttribute('data-typed-items')
  if (!typedStrings) return

  typedElement.textContent = ''
  typedElement._typedInstance = new Typed('.typed', {
    strings: typedStrings.split(','),
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  })
}

const crearExperienciaProfesional = ({ title, date, company, location, responsibilities }) => `
  <div class="resume-item">
    <h4>${title}</h4>
    <h5>${date}</h5>
    <p><em>${company}, ${location}</em></p>
    <ul>${responsibilities.map(item => `<li>${item}</li>`).join('')}</ul>
  </div>
`

const contentUpdate = (lang, data) => {
  const currLang = data[lang]
  if (!currLang) return

  document.documentElement.lang = lang

  document.querySelectorAll('.langchange').forEach(selector => {
    const key = selector.getAttribute('data-key')
    const value = currLang[key]
    if (value === undefined) return

    if (key === 'experiences') {
      const professional = document.getElementById('professional')
      if (professional) professional.innerHTML = value.map(crearExperienciaProfesional).join('')
      return
    }

    const finalValue = applyDynamicValues(value, lang)
    selector.innerHTML = finalValue

    if (selector.classList.contains('typed')) {
      selector.setAttribute('data-typed-items', finalValue)
      updateTyped(selector)
    }
  })

  const exp = getExperienceInfo(lang)
  document.querySelectorAll('[data-dynamic="experience-years"]').forEach(el => {
    el.setAttribute('data-purecounter-end', exp.years)
    el.textContent = exp.years
  })
}

const changeLang = langVal => {
  contentUpdate(langVal, datos)
}

window.toggleLanguague = function () {
  const checkbox = document.getElementById('language-toggle')
  changeLang(checkbox && !checkbox.checked ? 'es' : 'en')
}

function changeSkill () {
  const skills = {
    frontend: [
      { skill: 'React JS', score: '85' },
      { skill: 'Angular', score: '80' },
      { skill: 'Vue JS', score: '75' },
      { skill: 'JavaScript', score: '85' },
      { skill: 'HTML/CSS', score: '90' },
      { skill: 'UI Integration', score: '80' }
    ],
    backend: [
      { skill: 'Node.js', score: '85' },
      { skill: 'Python', score: '80' },
      { skill: 'PHP/Laravel/Django', score: '75' },
      { skill: '.NET Core', score: '75' },
      { skill: 'AWS/Azure Serverless', score: '80' },
      { skill: 'Docker/Linux', score: '75' },
      { skill: 'PostgreSQL/MySQL/MongoDB', score: '80' },
      { skill: 'Redis/Milvus/Spark/MinIO', score: '75' },
      { skill: 'LLM Automation & Embeddings', score: '80' }
    ]
  }

  Object.entries(skills).forEach(([category, items]) => {
    const cardSkill = document.getElementById(category)
    if (!cardSkill) return
    cardSkill.innerHTML = ''

    items.forEach(({ skill, score }) => {
      const nuevoDiv = document.createElement('div')
      nuevoDiv.className = 'progress'
      nuevoDiv.innerHTML = `
        <span class="skill">${skill} <i class="val">${score}%</i></span>
        <div class="progress-bar-wrap">
          <div class="progress-bar" role="progressbar" aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`
      cardSkill.append(nuevoDiv)
    })
  })
}

function initContactForm () {
  const form = document.getElementById('contactForm')
  if (!form) return

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value

    const body = encodeURIComponent(
      `Hola, soy ${name}. Mi correo es ${email}.\nAsunto: ${subject}\nMensaje: ${message}`
    )

    window.location.href = `${this.action}&text=${body}`
  })
}

function initTemplateBehaviors () {
  const navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      navbarlink.classList.toggle(
        'active',
        position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight
      )
    })
  }

  window.addEventListener('load', navbarlinksActive)
  document.addEventListener('scroll', navbarlinksActive)

  const backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => backtotop.classList.toggle('active', window.scrollY > 100)
    window.addEventListener('load', toggleBacktotop)
    document.addEventListener('scroll', toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function () {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.scrollto', function (e) {
    if (!select(this.hash)) return
    e.preventDefault()

    const body = select('body')
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active')
      const navbarToggle = select('.mobile-nav-toggle')
      navbarToggle.classList.toggle('bi-list')
      navbarToggle.classList.toggle('bi-x')
    }

    window.scrollTo({ top: select(this.hash).offsetTop, behavior: 'smooth' })
  }, true)

  window.addEventListener('load', () => {
    const preloader = select('#preloader')
    if (preloader) preloader.remove()

    if (window.location.hash && select(window.location.hash)) {
      window.scrollTo({ top: select(window.location.hash).offsetTop, behavior: 'smooth' })
    }

    if (window.AOS) {
      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false })
    }

    if (window.PureCounter) new PureCounter()
  })

  const skilsContent = select('.skills-content')
  if (skilsContent && window.Waypoint) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: () => {
        select('.progress .progress-bar', true).forEach(el => {
          el.style.width = `${el.getAttribute('aria-valuenow')}%`
        })
      }
    })
  }

  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container')
    if (!portfolioContainer || !window.Isotope) return

    const portfolioIsotope = new Isotope(portfolioContainer, { itemSelector: '.portfolio-item' })
    const portfolioFilters = select('#portfolio-flters li', true)

    on('click', '#portfolio-flters li', function (e) {
      e.preventDefault()
      portfolioFilters.forEach(el => el.classList.remove('filter-active'))
      this.classList.add('filter-active')
      portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') })
      portfolioIsotope.on('arrangeComplete', () => window.AOS && AOS.refresh())
    }, true)
  })

  if (window.GLightbox) {
    GLightbox({ selector: '.portfolio-lightbox' })
    GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' })
  }

  if (window.Swiper) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('language-toggle')
  if (checkbox) checkbox.checked = true
  changeSkill()
  changeLang('en')
  initContactForm()
})

initTemplateBehaviors()
