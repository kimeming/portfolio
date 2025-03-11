$(() => {
  // smooth scroll
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

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
