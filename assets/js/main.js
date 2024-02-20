/**
* Template Name: MyResume
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
// json



})()

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.getElementById('language-toggle');
  checkbox.checked = true;
  // Verifica si el toggle está seleccionado
  if (!checkbox.checked) {
    // Si está seleccionado, establece el idioma por defecto en ruso
    changeLang('es');
  } else {
    // Si no está seleccionado, establece el idioma por defecto en inglés
    changeLang('en');

    console.log('Estoy en en')
  }
});

function toggleLanguage() {
  var checkbox = document.getElementById('language-toggle');
  var langElement = document.getElementById('language');

  if (!checkbox.checked) {
    // Si el interruptor está en posición "on"
    changeLang('es');
  } else {
    // Si el interruptor está en posición "off"
    changeLang('en');
  }
}

// run function after page load :: get/set localstorage value and run function
// document.addEventListener("DOMContentLoaded", function(event) {
//   var appLang = localStorage.getItem('lang');

//   // if no language value saved in local-storage, set en as default
//   if(appLang === null){
//     localStorage.setItem('lang', 'en'); // updaet local-storage

//     // fun contentUpdate function with en value
//     contentUpdate('en'); 

//     // select radiobutton which has data-value = en
//     document.querySelector('[data-value="en"]').checked = true; 
//   }
//   else{
//     // fun contentUpdate function with value from local-storage - en, ru..
//     contentUpdate(appLang); 

//     // select radiobutton which has data-value == local storage value
//     document.querySelector('[data-value="'+appLang+'"]').checked = true;
//   }
// });

// change innerhtml on radiobtn click
function changeLang(langVal){
  // set local-storage lang value from value given in onchange="changeLang(value)"
  // localStorage.setItem('lang', langVal);

  // fun contentUpdate function with value from onchange="changeLang(value)"
  contentUpdate(langVal);
}

// content/innerhtml update/assign
function contentUpdate(cl){
  var langJSON = {
    "es" : {
      "hero-title": "Soy",
      "hero-rol"  : "",
      "about-title"  : "Sobre Mi",
      "about-text"  : "Soy Kerly Cervantes, apasionada por la creación e innovación en tecnologías. Me destaco en la automatización de procesos y la ejecución de operaciones eficientes. Poseo experiencia tanto en el desarrollo front-end como en el back-end.\nMi interés actual se centra en aprender sobre Inteligencia Artificial y desarrollar herramientas potenciales que beneficien a la sociedad. Disfruto del proceso de investigación y análisis de datos, buscando constantemente nuevas formas de mejorar y optimizar los sistemas.",
      "about-rol"  : "Full Stack Developer, Freelancer",
      "about-hobby"  : "En mis tiempos libres me pongo a realizar actividades deportivas, pasear con mi familia. Disfrutar los espacios verdes y ¡conocer nuevos lugares!",
      "about-birthday"  : "Cumpleaños:",
      "about-website"  : "Sitio Web:",
      "about-phone"  : "Celular:",
      "about-city"  : "Localidad:",
      "about-age"  : "Edad:",
      "about-degree"  : "Nivel Educativo:",
      "about-email"  : "Correo:",
      "about-freelance"  : "Disponible",
      "fact-title"  : "Actualidad",
      "fact-experence"  : "En mi historial, destaco el liderazgo en un emocionante proyecto de desarrollo de aplicaciones criptográficas y la participación clave en la integración bancaria y automatización financiera. Actualmente, me encuentro inmerso en la creación de un sistema de formación con módulos personalizados utilizando PHP nativo, enfocado en proporcionar experiencias de aprendizaje adaptadas y eficientes. Mi pasión radica en explorar las aplicaciones de la inteligencia artificial en la medicina para el diagnóstico y la predicción de enfermedades. Además, me entusiasma contribuir a la transparencia y eficiencia en la gestión pública y judicial mediante la combinación de blockchain e inteligencia artificial",
      "fact-clients"  : "Clientes Satisfechos",
      "fact-proyect"  : "Poryectos",
      "fact-support"  : "Horas de Soporte",
      "skill-title"  : "Habilidades",
      "skill-resume"  : "on una rica experiencia en tecnologías como AWS y en frameworks destacados como React, Django, Vue y Laravel, he aplicado habilidades en desarrollos MVC tanto en C# como en PHP y Node.js. Además, he destacado en el despliegue de servicios serverless utilizando Python y Node.js, demostrando un compromiso continuo con el crecimiento y aprendizaje constantes",
      "resume-title"  : "Trayectoria",
      "resume-intro"  : "Comencé mi educación en el colegio Guayaquil, donde desarrollé una base o logica de programación. Luego, avancé a la Escuela Superior Politécnica del Litoral, donde continué nutriendo mi pasión por la tecnología y la innovación. Esta trayectoria educativa ha sido fundamental para mi desarrollo profesional",
      "resume-education-title-1"  : "Escuela Superior Politécnica del Litoral",
      "resume-education-carrer-1"  : "Telemática",
      "resume-education-resume-"  : "Sólidos conocimientos en las áreas de redes y comunicación de datos, tecnologías de información e infraestructura tecnológica brindándoles capacidades para diseñar, implementar y dirigir proyectos tecnológicos multidisciplinarios. ",
      "resume-education-title-2"  : "Colegio Guayaquil",
      "resume-education-carrer-2"  : "Bachiller de Informática",
      "resume-education-resume-2"  : "Me instruí en el área digital, como poder crear nuestro primer sito con sitos no-code. Adicional desarrolle logica matemática para resolver problemas reales a menor escala",
      "resume-experence-title"  : "Experiencia Prófesional",
      "resume-experence-title-1"  : "Back End Integration",
      "resume-experence-location-1"  : "JELOU S. A.",
      "resume-experence-resume-1"  : "Integrar APIs REST y SOAP para facilitar la comunicación entre diferentes sistemas bancarios",
      "resume-experence-resume-1-2"  : "Diseñar y desarrollar scripts de automatización para optimizar procesos bancarios, incorporando lógica empresarial para lograr resultados deseados.",
      "resume-experence-resume-1-3"  : "Crear arquitecturas basadas en eventos para activar acciones automatizadas en función de eventos específicos o horarios predefinidos con Serverless Lambda.",
      "resume-experence-resume-1-4"  : "Documentación y test unitarios",
      "resume-experence-title-2"  : "Back End Developer",
      "resume-experence-location-2"  : "ANUBIS S.A.",
      "resume-experence-resume-2"  : "Construir sistemas backend  escalables utilizando Node.js para manejar la lógica del lado del servidor en aplicaciones relacionadas con criptomonedas.",
      "resume-experence-resume-2-2"  : "Diseñar e implementar arquitecturas de microservicios utilizando AWS Lambda para crear componentes modulares.",
      "resume-experence-resume-2-3"  : "Diseñar UX/UI en Figmap para plataforma realtime",
      "resume-experence-resume-2-4"  : "Crear procesos con websockes para la comunicación de cliente y server",
      "resume-experence-title-3"  : "Training Full Stack Developer",
      "resume-experence-carrer-3"  : "ALDEBERAN CIA. LTDA",
      "resume-experence-resume-3"  : "Diseñar y desarrollar aplicaciones web utilizando tecnologías front-end y back-end.",
      "resume-experence-resume-3-2"  : "Implementar Base RDS para comunicacion con Servicio Web de AWS.",
      "resume-experence-resume-3-3"  : "Configurar y gestionar FreeRADIUS para controlar el acceso a la red y gestionar la autenticación de usuarios.",
      "resume-experence-resume-3-4"  : "Automatización de controladora Ruckus",
      "portfolio-resume"  : "Los poroyectos que he trabajado son Alpha Radius gestion de la Red, ERP para Courier, Automatización para equipos MikroTik.", 
      "portfolio-title"  : "Portafolio", 
      "contact-title"  : "Contátanos", 
      "contact-locatinon"  : "Localidad", 
      "contact-email"  : "Correo", 
      "contact-call"  : "Celular", 
      "footer-verso"  : "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres. Colosenses 3:23", 
   
  
    },
  
    "en" : {
      "hero-title": "I'm",
      "hero-rol"  : "",
      "about-title"  : "ABOUT",
      "about-text"  : "I am Kerly Cervantes, passionate about creation and innovation in technologies. I excel at automating processes and executing efficient operations, always taking time management into account. I have experience in both front-end and back-end development.\nMy current interest is focused on learning about Artificial Intelligence and developing potential tools that benefit society. I enjoy the process of research and data analysis, constantly looking for new ways to improve and optimize systems.",
      "about-rol"  : "Full Stack Developer, Freelancer",
      "about-hobby"  : "In my free time I start doing sports activities, walking with my family. Enjoy the green spaces and discover new places!",
      "about-birthday"  : "Birthday:",
      "about-wesite"  : "Website:",
      "about-phone"  : "Phone:",
      "about-city"  : "City:",
      "about-age"  : "Age:",
      "about-degree"  : "Degree:",
      "about-email"  : "Email:",
      "about-freelance"  : "Available",
      "fact-title"  : "Facts",
      "fact-experence"  : "In my background, I highlight leadership in an exciting crypto application development project and key participation in banking integration and financial automation. Currently, I am immersed in creating a training system with custom modules using native PHP, focused on providing adapted and efficient learning experiences. My passion lies in exploring the applications of artificial intelligence in medicine for the diagnosis and prediction of diseases. Furthermore, I am excited to contribute to transparency and efficiency in public and judicial management through the combination of blockchain and artificial intelligence.",
      "fact-clients"  : "Happy Clients",
      "fact-proyect"  : "Projects",
      "fact-support"  : "Hours Of Support",
      "skill-title"  : "SKILLS",
      "skill-resume"  : "With rich experience in technologies such as AWS and prominent frameworks such as React, Django, Vue and Laravel, I have applied skills in MVC developments in both C#, PHP and Node.js. Additionally, I have excelled in the deployment of serverless services using Python and Node.js, demonstrating a continuous commitment to constant growth and learning.",
      "resume-title"  : "RESUME",
      "resume-intro"  : "I began my education at the Guayaquil school, where I developed a programming base or logic. Then, I advanced to the Escuela Superior Politécnica del Litoral, where I continued to nurture my passion for technology and innovation. This educational path has been fundamental for my professional development",
      "resume-education-title-1"  : "Escuela Superior Politécnica del Litoral",
      "resume-education-carrer-1"  : "Engineer Telematics",
      "resume-education-resume-"  : "Solid knowledge in the areas of networks and data communication, information technologies and technological infrastructure, providing them with the capabilities to design, implement and direct multidisciplinary technological projects.",
      "resume-education-title-2"  : "Colegio Guayaquil",
      "resume-education-carrer-2"  : "Bachelor of Computer Science",
      "resume-education-resume-2"  : "I educated myself in the digital area, how to create our first site with no-code sites. Additionally, develop mathematical logic to solve real problems on a smaller scale.",
      "resume-experence-title"  : "Professional Experience",
      "resume-experence-title-1"  : "Back End Integration",
      "resume-experence-location-1"  : "JELOU S. A.",
      "resume-experience-resume-1": "Integrate REST and SOAP APIs to facilitate communication between different banking systems.",
      "resume-experience-resume-1-2": "Design and develop automation scripts to optimize banking processes, incorporating business logic to achieve desired results.",
      "resume-experience-resume-1-3": "Create event-driven architectures to trigger automated actions based on specific events or predefined schedules with Serverless Lambda.",
      "resume-experience-resume-1-4": "Documentation and unit testing",
      "resume-experience-title-2": "Back End Developer",
      "resume-experience-location-2": "ANUBIS S.A.",
      "resume-experience-resume-2": "Build scalable backend systems using Node.js to handle server-side logic in cryptocurrency-related applications.",
      "resume-experience-resume-2-2": "Design and implement microservices architectures using AWS Lambda to create modular components.",
      "resume-experience-resume-2-3": "Design UX/UI in Figma for real-time platform",
      "resume-experience-resume-2-4": "Create processes with websockets for client-server communication",
      "resume-experience-title-3": "Training Full Stack Developer",
      "resume-experience-career-3": "ALDEBERAN CIA. LTDA",
      "resume-experience-resume-3": "Design and develop web applications using front-end and back-end technologies.",
      "resume-experience-resume-3-2": "Implement RDS database for communication with AWS Web Service.",
      "resume-experience-resume-3-3": "Configure and manage FreeRADIUS to control network access and manage user authentication.",
      "resume-experience-resume-3-4": "Automation of Ruckus controller",
      "portfolio-resume": "The projects I have worked on include Alpha Radius network management, ERP for Courier, Automation for MikroTik devices.",
      "portfolio-title": "Portfolio",
      "contact-title": "Contact Us",
      "contact-location": "Location",
      "contact-email": "Email",
      "contact-call": "Phone",
      "footer-verse": "And whatever you do, do it heartily, as to the Lord and not to men. Colossians 3:23"
    
 
    }
  }
  // get current langage contents in array
  var currLang = Object.entries(langJSON)[Object.keys(langJSON).indexOf(cl)][1],
      // get current language content array length
      langCont = Object.entries(currLang).length;

  for(let i = 0; i < langCont; i++){
    // get selectors which has .langchange classes
    var getSelector = document.querySelectorAll('.langchange')[i],
        // get data-key attribute from .langchange class selectors
        getAttr = getSelector.getAttribute('data-key');

        console.log('Todas las etiquetas',getSelector, getSelector.classList.contains('typed'))

       

    // assign the data-key value from current language array to the .langchange[data-key] selector
    getSelector.innerHTML = currLang[getAttr];
    if (getSelector.classList.contains('typed')) {
          
      // Assign the value to the data-typed-items attribute{}
      console.log('Dentro',currLang[getAttr], getSelector.classList.contains('typed'))
      getSelector.setAttribute('data-typed-items', currLang[getAttr]);
    }
  }
}
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  // Obtener valores de los campos del formulario
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Construir el cuerpo del mensaje para WhatsApp
  var body = encodeURIComponent("Hola! Soy " + name + "\n.Te envio mi email para que me contactes" + email + ". Escribo por el motivo de" + subject + "\n. A continucación detallo más información," + message);

  // Agregar el cuerpo del mensaje al enlace de WhatsApp
  var whatsappLink = this.action + "&text=" + body;

  // Redireccionar a WhatsApp
  window.location.href = whatsappLink;
});