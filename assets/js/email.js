// Página de contato: o modelo de e-mail vem pronto. Vindo de um serviço (/contato/?servico=ia),
// o texto, o assunto e os links do Gmail e do app de e-mail passam a ser os daquele serviço.
// Sem JS, fica o modelo geral, que já funciona.
(function () {
  var box = document.querySelector(".mailbox[data-templates]");
  if (!box) return;
  var all, kind;
  try {
    all = JSON.parse(box.getAttribute("data-templates"));
    kind = new URLSearchParams(location.search).get("servico");
  } catch (e) {
    return;
  }
  if (!kind || !Object.prototype.hasOwnProperty.call(all, kind)) return;
  var t = all[kind];
  var pre = box.querySelector("#tpl-text");
  var gmail = box.querySelector('[data-mail="gmail"]');
  var app = box.querySelector('[data-mail="app"]');
  var to = app.getAttribute("href").slice(7).split("?")[0];
  if (pre) pre.textContent = t.body;
  if (gmail)
    gmail.href =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) +
      "&su=" + encodeURIComponent(t.subject) + "&body=" + encodeURIComponent(t.body);
  if (app)
    app.href =
      "mailto:" + to + "?subject=" + encodeURIComponent(t.subject) +
      "&body=" + encodeURIComponent(t.body.replace(/\n/g, "\r\n"));
})();
