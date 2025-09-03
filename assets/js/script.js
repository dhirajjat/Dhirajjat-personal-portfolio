'use strict';



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});



/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});



/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});



/**
 * Tab content
 */

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;

  }

}

addEventOnElements(tabBtns, "click", filterContent);



/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

// quotes.js
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper(".myQuotes", {
    loop: true,                // infinite loop
    slidesPerView: 1,          // one slide at a time
    spaceBetween: 30,           // space between slides
    speed: 2000,                // transition speed (ms)
    direction: 'horizontal',    // horizontal slide
    rtl: true,                  // right-to-left slide
    autoplay: {
      delay: 3000,              // 3s per slide
      disableOnInteraction: false,
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true
    // },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev"
    // }
  });
});


 // Get modal elements
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("projectTitle");
  const modalDesc = document.getElementById("projectDescription");
  const modalImg = document.getElementById("projectImage");
  const closeBtn = document.querySelector(".close");

  // Example project data
  const projects = [
    {
      title: "Creative & Experienced Digital Design Studio",
      description: "This project was about creating a modern digital design studio website with responsive UI and smooth animations.",
      image: "./assets/images/project-1.jpg"
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with cart, authentication, and payment gateway integration.",
      image: "./assets/images/project-2.jpg"
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with React and Tailwind CSS to showcase projects and blogs.",
      image: "./assets/images/project-3.jpg"
    }
  ];

  // Attach event to all 'Project Details' buttons
  document.querySelectorAll(".btn.details").forEach((btn, index) => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      modal.style.display = "block";
      modalTitle.textContent = projects[index].title;
      modalDesc.textContent = projects[index].description;
      modalImg.src = projects[index].image;
    });
  });

  // Close modal
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };


  // Open modal
document.querySelectorAll(".details").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    let modalId = this.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

// Close modal
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", function() {
    this.parentElement.parentElement.style.display = "none";
  });
});

// Close when clicking outside modal
window.addEventListener("click", function(e) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
