import { datos } from "./datos.js";
/**
 * Template Name: MyResume
 * Updated: Jan 29 2024 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
  // json
})();

document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.getElementById("language-toggle");
  changeLang("en", datos);
  checkbox.checked = true;
  // // Verifica si el toggle está seleccionado
  // if (!checkbox.checked) {
  //   // Si está seleccionado, establece el idioma por defecto en ruso
  //   changeLang("es", datos);
  // } else {
  //   // Si no está seleccionado, establece el idioma por defecto en inglés
    
  //   console.log("Estoy en en");
  // }
});

window.toggleLanguague= function() {
  console.log(datos)
  var checkbox = document.getElementById("language-toggle");
  console.log(checkbox)

  if (!checkbox.checked) {
    // Si el interruptor está en posición "on"
    changeLang("es", datos);
  } else {
    // Si el interruptor está en posición "off"
    changeLang("en",datos);
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
function changeLang(langVal, data) {
  // set local-storage lang value from value given in onchange="changeLang(value)"
  // localStorage.setItem('lang', langVal);

  // fun contentUpdate function with value from onchange="changeLang(value)"
  contentUpdate(langVal, data);
}

// content/innerhtml update/assign
function contentUpdate(cl, data) {
  // get current langage contents in array
  let currLang = Object.entries(data)[Object.keys(data).indexOf(cl)][1],
    // get current language content array length
    langCont = Object.entries(currLang).length;
  // console.log(langCont);

  for (let i = 0; i < langCont; i++) {
    // get selectors which has .langchange classes
    var getSelector = document.querySelectorAll(".langchange")[i];
    if (getSelector) {
      // console.log(getSelector);
      // get data-key attribute from .langchange class selectors
      let getAttr = getSelector.getAttribute("data-key");

      // console.log(
      //   "Todas las etiquetas",
      //   getSelector,
      //   getSelector.classList.contains("typed")
      // );

      // assign the data-key value from current language array to the .langchange[data-key] selector
      getSelector.innerHTML = currLang[getAttr];
      if (getSelector.classList.contains("typed")) {
        // Assign the value to the data-typed-items attribute{}
        // console.log(
        //   "Dentro",
        //   currLang[getAttr],
        //   getSelector.classList.contains("typed")
        // );
        getSelector.setAttribute("data-typed-items", currLang[getAttr]);
      }
    }
  }
}
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener valores de los campos del formulario
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Construir el cuerpo del mensaje para WhatsApp
    var body = encodeURIComponent(
      "Hola! Soy " +
        name +
        "😎.Te envio mi email para que me contactes" +
        email +
        ".\nEscribo por el motivo de" +
        subject +
        "\n.A continucación detallo más información," +
        message +
        "📝"
    );

    // Agregar el cuerpo del mensaje al enlace de WhatsApp
    var whatsappLink = this.action + "&text=" + body;

    // Redireccionar a WhatsApp
    window.location.href = whatsappLink;
  });

function changeSkill() {
  let obj = {
    frontend: [
      { skill: "HTML", score: "100" },
      { skill: "CSS", score: "90" },
      { skill: "JavaScript", score: "75" },
      { skill: "Angular JS", score: "60" },
      { skill: "React JS", score: "70" },
      { skill: "Vue JS", score: "90" },
      { skill: "WordPress/CMS", score: "75" },
      { skill: "Photoshop", score: "60" },
    ],
    backend: [
      { skill: "PHP/Laravel", score: "90" },
      { skill: "Node Express", score: "75" },
      { skill: ".NET", score: "60" },
      { skill: "Docker", score: "70" },
      { skill: "MySQL", score: "80" },
      { skill: "MongoDB", score: "70" },
      { skill: "AWS", score: "70" },
      { skill: "Python", score: "75" },
    ],
  };

  for (let categoria in obj) {
    let cardSkill = document.getElementById(categoria);
    obj[categoria].forEach(({ skill, score }) => {
      var nuevoDiv = document.createElement("div");
      nuevoDiv.className = "progress";
      nuevoDiv.innerHTML = `
      <span class="skill">${skill} <i class="val">${score}%</i></span>
      <div class="progress-bar-wrap">
        <div class="progress-bar" role="progressbar" aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
   
      `;
      cardSkill.append(nuevoDiv);
    });
  }
}

function changeProfessional() {
  let obj = {
    frontend: [
      { skill: "HTML", score: "100" },
      { skill: "CSS", score: "90" },
      { skill: "JavaScript", score: "75" },
      { skill: "Angular JS", score: "60" },
      { skill: "React JS", score: "70" },
      { skill: "Vue JS", score: "90" },
      { skill: "WordPress/CMS", score: "75" },
      { skill: "Photoshop", score: "60" },
    ],
    backend: [
      { skill: "PHP/Laravel", score: "90" },
      { skill: "Node Express", score: "75" },
      { skill: ".NET", score: "60" },
      { skill: "Docker", score: "70" },
      { skill: "MySQL", score: "80" },
      { skill: "MongoDB", score: "70" },
      { skill: "AWS", score: "70" },
      { skill: "Python", score: "75" },
    ],
  };

  for (let categoria in obj) {
    let cardSkill = document.getElementById(categoria);
    obj[categoria].forEach(({ skill, score }) => {
      var nuevoDiv = document.createElement("div");
      nuevoDiv.className = "progress";
      nuevoDiv.innerHTML = `
      <span class="skill">${skill} <i class="val">${score}%</i></span>
      <div class="progress-bar-wrap">
        <div class="progress-bar" role="progressbar" aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
   
      `;
      cardSkill.append(nuevoDiv);
    });
  }
}
changeSkill();
