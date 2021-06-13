const learn_btn = document.querySelector(".learn_btn");
const sectionHistory = document.querySelector(".section--1");
const navlinks = document.querySelector(".navlinks");

//SCROLL TO HISTORY BY LEARN MORE
learn_btn.addEventListener("click", (e) => {
  console.log(e);
  sectionHistory.scrollIntoView({ behavior: "smooth" });
});

navlinks.addEventListener("click", (e) => {
  console.log(e.target.classList);
  e.preventDefault();
  if (e.target.classList.contains("navlink")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const tabs = document.querySelectorAll(".btn");
const tabsContainner = document.querySelector(".buttons");
const desc = document.querySelectorAll(".desc");

tabsContainner.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn");

  // ACTIVATE MENU BUTTON
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("btn__active"));
  clicked.classList.add("btn__active");

  // ACTIVATE MENU

  desc.forEach((menu) => menu.classList.remove("desc__active"));

  document
    .querySelector(`.desc--${clicked.dataset.tab}`)
    .classList.add("desc__active");
});

// FADE ANIMATION EFFECT
const handleHover = function (e) {
  if (e.target.classList.contains("navlink")) {
    const link = e.target;
    const siblings = link.closest(".navlist").querySelectorAll(".navlink");
    const logo = link.closest("nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector("nav");

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// STICKY NAV

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// entries is/can be a single value or an array of thresholds.
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

// const observerObject = new IntersectionObserver(observerCallback, observerOptions);

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// REVEALING ELEMENTS ON SCROLL

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

// LAZY LOADING IMAGES

const lazy__img = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = "img/img-1.jpg";
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-blur");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

lazy__img.forEach((img) => imgObserver.observe(img));

// SLIDER
const slider = function () {
  const left_btn = document.querySelector(".left");
  const right_btn = document.querySelector(".right");
  const slides = document.querySelectorAll(".slide");
  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 75}rem)`;
    });
  };

  const dotsContainer = document.querySelector(".dots");

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        ` <button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  left_btn.addEventListener("click", prevSlide);
  right_btn.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
