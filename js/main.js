import { projects } from "./data-works.js";

function renderProjects() {
  const projectList = document.querySelector(".project-list");
  if (!projectList) return;

  projectList.innerHTML = projects
    .map(
      (project) => `
      <li>
        <a href="${project.link}" target="_blank" title="새창열림">
          <em class="index">${project.idx}</em>
          <p class="project-title">${project.name}</p>
          <div class="text-box">
            <p class="text">${project.detail}</p>
            <ul class="label">
              ${Array.isArray(project.label) ? project.label.map((item) => `<li>${item}</li>`).join("") : ""}
            </ul>
          </div>
        </a>
      </li>
    `
    )
    .join("");
}

$(() => {
  renderProjects();

  // smooth scroll
  const lenis = new Lenis();
  lenis.start();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 마우스 커서 애니메이션 최적화
  const cursor = document.querySelector(".cursor");
  let mouseX = 0, mouseY = 0, isMoving = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateCursor);
    }
  });

  function updateCursor() {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    isMoving = false;
  }

  document.addEventListener("mousedown", () => cursor.classList.add("clicked"));
  document.addEventListener("mouseup", () => cursor.classList.remove("clicked"));
  $("a, button").on("mouseover", () => cursor.classList.add("pointer"));
  $("a, button").on("mouseout", () => cursor.classList.remove("pointer"));

  // main gnb
  const $menuBtn = $(".menu-btn"),
    $gnbWrap = $(".gnb-wrap"),
    $gnbA = $(".gnb>li>a");

  $menuBtn.on("click", function () {
    $(this).toggleClass("on");
    $gnbWrap.toggleClass("open");
  });

  $gnbA.on("click", function () {
    $menuBtn.removeClass("on");
    $gnbWrap.removeClass("open");
  });

  // fadeUp animation 최적화
  function fadeUp() {
    let $window = $(window);
    let delayPosition = 50, windowHeight;

    function insertTargetPosition() {
      windowHeight = $window.height();
      $(".fade-wrap.fade-up .fade-box").each(function () {
        $(this).data("offsetTop", $(this).offset().top);
      });
    }

    insertTargetPosition();
    $window.on("resize", insertTargetPosition);

    $window.on("scroll", function () {
      let position = $window.scrollTop() + windowHeight - delayPosition;
      $(".fade-wrap.fade-up .fade-box").each(function () {
        if (!$(this).hasClass("fadeUp") && $(this).data("offsetTop") < position) {
          $(this).addClass("fadeUp");
        } else if ($(this).hasClass("fadeUp") && $(this).data("offsetTop") > position) {
          $(this).removeClass("fadeUp");
        }
      });
    });
  }
  fadeUp();
});
