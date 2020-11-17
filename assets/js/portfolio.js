"use strict";

// json

let skills_obj = {
  html: {
    ex: "90%",
  },
  css: {
    ex: "85%",
  },
  js: {
    ex: "80%",
  },
  react: {
    ex: "70%",
  },
  java: {
    ex: "80%",
  },
};

let projects_obj = {
  1: {
    img: "/assets/img/projects/drum.PNG",
    name: "Drum",
    part: "front-end",
    url: "",
  },
  2: {
    img: "/assets/img/projects/filter.PNG",
    name: "Filter",
    part: "front-end",
    url: "https://youtu.be/lCA_NAuaBqM",
  },
  3: {
    img: "/assets/img/projects/gallery.PNG",
    name: "Gallery",
    part: "front-end",
    url: "https://youtu.be/7Jn_vN-vSFc",
  },
  4: {
    img: "/assets/img/projects/horizontal.PNG",
    name: "Horizontal Scroll",
    part: "front-end",
    url: "https://youtu.be/5hGJw0g2Jo8",
  },
  5: {
    img: "/assets/img/projects/paint.PNG",
    name: "Painting",
    part: "front-end",
    url: "",
  },
  6: {
    img: "/assets/img/projects/yoga.PNG",
    name: "YoGa",
    part: "front-end",
    url: "https://youtu.be/k1IUXyHbLLc",
  },
  7: {
    img: "/assets/img/projects/portfolio.PNG",
    name: "Portfolio",
    part: "front-end",
    url: "",
  },
  8: {
    img: "/assets/img/projects/school.PNG",
    name: "InterView",
    part: "back-end",
    url: "https://youtu.be/Kd3G7OvXQmQ",
  },
};

const navbar = document.querySelector("#navbar");
const home = document.querySelector("#home");
const about = document.querySelector("#about");
const skills = document.querySelector("#skills");
const resume = document.querySelector("#resume");
const work = document.querySelector("#work");
const contact = document.querySelector("#contact");

// 1. transparent Navbar
const transNavbar = () => {
  document.addEventListener("scroll", () => {
    if (window.scrollY > getHeight(navbar)) {
      navbar.classList.add("navbar--dark");
    } else {
      navbar.classList.remove("navbar--dark");
    }
  });
};

// 2. addSelected function
// 노드를 input 하면 그 노드에 class로 selected를 추가

const addSelected = (node) => {
  const name = node.className;

  const active = document.querySelector(`.${name}.selected`);
  if (active != null) {
    active.classList.remove("selected");
  }
  node.classList.add("selected");
};

// 3. getHeight function

const getHeight = (section) => {
  return section.getBoundingClientRect().height;
};

// 3. getPrevSectionHeight function
// 재귀함수 사용
// section을 넣으면 자기 section 전 section까지 높이를 더해서 구해줌

const getPrevHeight = (section) => {
  const prevSection = section.previousElementSibling;
  if (prevSection == null) {
    return getHeight(section);
  } else {
    return getHeight(section) + getPrevHeight(prevSection);
  }
};

// 4. Button lights up when scrolling

const scrollLightButton = () => {
  const list = document.querySelectorAll(".navbar__list");
  document.addEventListener("scroll", () => {
    const total_prevSectionOne = getPrevHeight(navbar);
    const total_prevSectionTwo = getPrevHeight(home);
    const total_prevSectionThree = getPrevHeight(about);
    const total_prevSectionFour = getPrevHeight(skills);
    const total_prevSectionFive = getPrevHeight(resume);
    const total_prevSectionSix = getPrevHeight(work);
    const total_prevSectionSeven = getPrevHeight(contact);

    const a = window.scrollY * 1.01;

    if (total_prevSectionOne < a && a < total_prevSectionTwo) {
      addSelected(list[0]);
    } else if (
      total_prevSectionTwo < window.scrollY &&
      window.scrollY < total_prevSectionThree
    ) {
      addSelected(list[1]);
    } else if (total_prevSectionThree < a && a < total_prevSectionFour) {
      addSelected(list[2]);
      setSkillValue();
    } else if (total_prevSectionFour < a && a < total_prevSectionFive) {
      addSelected(list[3]);
    } else if (total_prevSectionFive < a && a < total_prevSectionSix) {
      addSelected(list[4]);
    } else if (total_prevSectionSix < a) {
      addSelected(list[5]);
    }
  });
};

// 5. scroll to section when click button and LightButton

const navbarLists = document.querySelector(".navbar__lists");
const scrollClickButton = () => {
  navbarLists.addEventListener("click", (e) => {
    const target = e.target;
    const list = target.dataset.list;

    if (target == null || target.className == "navbar__lists") {
      return;
    }

    addSelected(e.target);

    const scrollTo = document.querySelector(list);
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });
};

// 6. navbar

const navbarToggle = () => {
  const navbarToggle = document.querySelector(".navbar__toggle-btn");

  navbarToggle.addEventListener("click", () => {
    navbarLists.classList.toggle("display");
  });
};

// 7. homeContainer opacticy

const homeConainer_Opactiy = () => {
  const homeContainer = document.querySelector(".home__container");

  document.addEventListener("scroll", () => {
    homeContainer.style.opacity = 1 - window.scrollY / getHeight(home) + 0.111;
  });
};

// 8. Projects Scattring to HTML

const scattering_Project = () => {
  const projectContainer = document.querySelector(".work__projects");

  let temp_str = "";
  Object.keys(projects_obj).forEach((key) => {
    const temp_obj = projects_obj[key];
    const name = temp_obj.name;
    const url = temp_obj.url;
    const part = temp_obj.part;
    const img = temp_obj.img;

    temp_str += `<a href="${url}" class="project" data-type="${part}"><img
      src="${img}"
      alt="${name}"
      class="project__img"
    />
    <div class="project__description">
      <h4 class="project__title">${name}</h4>
      Go to
      <i class="fab fa-youtube project__icon"></i>
      Youtube
      <h4 class="project__part">${part}</h4>
    </div>
  </a>`;
  });

  projectContainer.innerHTML = temp_str;
};

// 9. category__count Scattering to HTML

const project_num = () => {
  let all_num = 0;
  let front_num = 0;
  let back_num = 0;
  let mobile_num = 0;
  const count = document.querySelectorAll(".category__count");
  Object.keys(projects_obj).forEach((key) => {
    if (projects_obj[key].part == "front-end") {
      front_num += 1;
    } else if (projects_obj[key].part == "back-end") {
      back_num += 1;
    } else if (projects_obj[key].part == "mobile") {
      mobile_num += 1;
    }
    all_num = front_num + back_num + mobile_num;
  });

  count[0].innerHTML = all_num;
  count[1].innerHTML = front_num;
  count[2].innerHTML = back_num;
  count[3].innerHTML = mobile_num;
};

// 9. project filtering

const filtering_Project = () => {
  const workBtnContainer = document.querySelector(".work__categories");
  const projectContainer = document.querySelector(".work__projects");
  const projects = document.querySelectorAll(".project");

  workBtnContainer.addEventListener("click", (e) => {
    projectContainer.classList.add("anim-out");

    const filter =
      e.target.dataset.filter || e.target.parentNode.dataset.filter;

    if (filter == null) {
      return;
    }

    addSelected(e.target);

    projects.forEach((project) => {
      if (filter === "all" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });

    setTimeout(() => {
      projectContainer.classList.remove("anim-out");
    }, 1000);
  });
};

// 10. animation skillvalue

const setSkillValue = () => {
  const skill_values = document.querySelectorAll(".skill__value");
  let count = 0;
  Object.keys(skills_obj).forEach((key) => {
    const skill = skills_obj[key];
    const skill_experience = `${skill.ex}`;

    skill_values[count].style.width = skill_experience;
    count += 1;
  });
};

// 11. start function
const init = function () {
  transNavbar();
  scrollLightButton();
  scrollClickButton();
  homeConainer_Opactiy();
  scattering_Project();
  project_num();
  filtering_Project();
  navbarToggle();
};

init();
