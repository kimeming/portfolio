$(() => {
  // smooth scroll
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // 마우스 커서
  const cursor = document.querySelector(".cursor");

  // 커서 이동
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.animate(
      {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
      },
      1000
    );
  });

  // 마우스 클릭
  document.addEventListener("mousedown", () => {
    cursor.classList.add("clicked");
  });
  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicked");
  });
  // 링크 hover
  let links = document.querySelectorAll("a");
  links.forEach((i) => {
    i.addEventListener("mouseover", () => {
      cursor.classList.add("pointer");
    });
    i.addEventListener("mouseout", () => {
      cursor.classList.remove("pointer");
    });
  });
  // 버튼 hover
  let btns = document.querySelectorAll("button");
  btns.forEach((i) => {
    i.addEventListener("mouseover", () => {
      cursor.classList.add("pointer");
    });
    i.addEventListener("mouseout", () => {
      cursor.classList.remove("pointer");
    });
  });

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
