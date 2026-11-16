// Mobile dock: o botão de WhatsApp fica ao alcance do polegar depois que o botão do topo sai da tela,
// e some quando o CTA final aparece. É navegação, não decoração: funciona com movimento reduzido.
(function () {
  if (!("IntersectionObserver" in window)) return;
  var dock = document.querySelector(".dock");
  var heroCta = document.getElementById("hero-cta");
  var finalCta = document.getElementById("fim");
  if (!dock || !heroCta) return;
  dock.hidden = false;
  var heroGone = false;
  var atEnd = false;
  function sync() {
    dock.classList.toggle("on", heroGone && !atEnd);
  }
  new IntersectionObserver(function (en) {
    heroGone = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
    sync();
  }).observe(heroCta);
  if (finalCta) {
    new IntersectionObserver(
      function (en) {
        atEnd = en[0].isIntersecting;
        sync();
      },
      { threshold: 0.2 }
    ).observe(finalCta);
  }
})();
