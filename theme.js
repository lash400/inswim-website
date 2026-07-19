// 主題切換：記憶於 localStorage，預設跟隨系統
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("inswim-theme");
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  window.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    function sync() {
      var dark = current() === "dark";
      btn.textContent = dark ? "☀" : "☾";
      btn.setAttribute("aria-label", dark ? "切換為淺色模式" : "切換為深色模式");
    }
    sync();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("inswim-theme", next); } catch (e) {}
      sync();
    });

    // 手機漢堡選單
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      function setOpen(open) {
        links.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.textContent = open ? "✕" : "☰";
      }
      toggle.addEventListener("click", function () {
        setOpen(!links.classList.contains("open"));
      });
      // 點選單內連結後收合
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      // 視窗放大回桌機寬度時，清除展開狀態
      window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) {
        if (e.matches) setOpen(false);
      });
    }
  });
})();
