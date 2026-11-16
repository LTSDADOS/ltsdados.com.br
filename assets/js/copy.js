// Botões de copiar: o endereço de e-mail (data-copy) ou o modelo da mensagem (data-copy-from).
// Funcionam mesmo sem app de e-mail instalado.
(function () {
  var buttons = document.querySelectorAll("[data-copy], [data-copy-from]");
  Array.prototype.forEach.call(buttons, function (btn) {
    var isModel = btn.hasAttribute("data-copy-from");
    var scope = btn.closest("details") || document;
    var status = scope.querySelector("#copy-status");
    var original = status ? status.textContent : "";

    function say(msg) {
      if (!status) return;
      status.textContent = msg;
      setTimeout(function () { status.textContent = original; }, 4000);
    }
    function textToCopy() {
      if (!isModel) return btn.getAttribute("data-copy");
      var src = document.querySelector(btn.getAttribute("data-copy-from"));
      return src ? src.textContent : "";
    }

    btn.addEventListener("click", function () {
      var text = textToCopy();
      var okMsg = isModel ? "Modelo copiado. Cole no WhatsApp ou no e-mail e preencha." : "Endereço copiado: " + text;
      var failMsg = isModel ? "Não consegui copiar. Selecione o texto do modelo e copie." : "Não consegui copiar. O endereço é " + text;
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
        say(ok ? okMsg : failMsg);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { say(okMsg); }, fallback);
      } else fallback();
    });
  });
})();
