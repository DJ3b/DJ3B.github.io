(function () {
  var saved = localStorage.getItem("lang");
  var lang = saved === "en" || saved === "fr" ? saved : "fr";
  apply(lang);

  var btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      lang = lang === "fr" ? "en" : "fr";
      localStorage.setItem("lang", lang);
      apply(lang);
    });
  }

  function apply(l) {
    document.body.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l);
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = l === "fr" ? "🇬🇧 English" : "🇫🇷 Français";
  }
})();
