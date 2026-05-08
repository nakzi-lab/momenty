/**
 * Momenty docs — language toggle (ko | en)
 * Sets html[data-lang], html[lang], persists momenty.lang in localStorage.
 */
(function () {
  var STORAGE_KEY = "momenty.lang";

  function browserDefault() {
    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : "en";
  }

  function getStored() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "ko" || v === "en") return v;
    } catch (e) {}
    return null;
  }

  function setLang(lang) {
    if (lang !== "ko" && lang !== "en") return;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    syncButtons();
    if (typeof window.momentyOnLangChange === "function") {
      window.momentyOnLangChange(lang);
    }
  }

  function syncButtons() {
    var lang = document.documentElement.getAttribute("data-lang") || "en";
    document.querySelectorAll(".lang-btn[data-set-lang]").forEach(function (btn) {
      var isSel = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
      btn.classList.toggle("is-active", isSel);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var initial = getStored() || browserDefault();
    setLang(initial);

    document.querySelectorAll(".lang-btn[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-set-lang"));
      });
    });
  });

  window.momentySetLang = setLang;
})();
