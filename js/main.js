import { projects } from "./data-works.js";

function renderProjects() {
  const projectList = document.querySelector(".project-list"); // ✅ 올바른 선택자

  if (!projectList) return; // ✅ 요소가 없으면 실행 안 함

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
              ${project.label.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </a>
      </li>
    `
    )
    .join("");
}

// ✅ jQuery가 로드된 후 실행되도록 조정
$(() => {
  renderProjects(); // ✅ jQuery 안에서 실행

  // smooth scroll
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 마우스 커서
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.animate(
      {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
      },
      { duration: 300, fill: "forwards" }
    );
  });

  document.addEventListener("mousedown", () => cursor.classList.add("clicked"));
  document.addEventListener("mouseup", () =>
    cursor.classList.remove("clicked")
  );

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
});
