// Formulário de contato: envia por AJAX para o FormSubmit. Sem JS, o formulário ainda funciona
// como POST normal para o mesmo serviço.
(function () {
  var form = document.getElementById("contato-form");
  var status = document.getElementById("form-status");
  if (!form || !window.fetch) return;
  var original = status ? status.innerHTML : "";
  var button = form.querySelector("button[type=submit]");

  function say(msg) {
    if (status) status.textContent = msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (form.elements._honey && form.elements._honey.value) return; // robô: ignora em silêncio
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    button.disabled = true;
    say("Enviando…");
    fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.body.success) === "true") {
          form.reset();
          say("Mensagem enviada. Respondo no e-mail que você informou.");
        } else {
          throw new Error("falha");
        }
      })
      .catch(function () {
        if (status) status.innerHTML = "Não foi possível enviar agora. Use o WhatsApp ou os botões abaixo. " + "";
      })
      .then(function () {
        button.disabled = false;
        setTimeout(function () { if (status) status.innerHTML = original; }, 8000);
      });
  });
})();
