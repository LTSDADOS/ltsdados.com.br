// Botão "Copiar endereço": funciona mesmo sem app de e-mail instalado.
(function () {
  var btn = document.querySelector("[data-copy]");
  var status = document.getElementById("copy-status");
  if (!btn) return;
  var original = status ? status.textContent : "";
  function say(msg) {
    if (!status) return;
    status.textContent = msg;
    setTimeout(function () { status.textContent = original; }, 4000);
  }
  btn.addEventListener("click", function () {
    var text = btn.getAttribute("data-copy");
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      say(ok ? "Endereço copiado: " + text : "Não consegui copiar. O endereço é " + text);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say("Endereço copiado: " + text); }, fallback);
    } else fallback();
  });
})();
