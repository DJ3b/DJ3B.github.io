'use strict';

// ---------- language toggle (FR/EN), shared key with article pages ----------
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
    if (btn) btn.textContent = l === "fr" ? "🇬🇧 EN" : "🇫🇷 FR";
  }
})();

// ---------- sidebar (mobile contacts toggle) ----------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { sidebar.classList.toggle("active"); });
}

// ---------- page navigation (tabs, matched by data attribute) ----------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function showPage(target) {
  pages.forEach(function (page) {
    page.classList.toggle("active", page.dataset.page === target);
  });
  navigationLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.navLink === target);
  });
  window.scrollTo(0, 0);
}

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () { showPage(this.dataset.navLink); });
});

// deep links: index.html#portfolio opens the Portfolio tab, etc.
(function () {
  var hash = window.location.hash.replace("#", "");
  var valid = Array.prototype.some.call(pages, function (p) { return p.dataset.page === hash; });
  if (valid) showPage(hash);
})();

// ---------- portfolio filter (matched by data attribute) ----------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

function filterFunc(selectedValue) {
  filterItems.forEach(function (item) {
    var show = selectedValue === "all" || selectedValue === item.dataset.category;
    item.classList.toggle("active", show);
  });
}

if (select) {
  select.addEventListener("click", function () { this.classList.toggle("active"); });

  selectItems.forEach(function (item) {
    item.addEventListener("click", function () {
      selectValue.innerHTML = this.innerHTML;
      select.classList.remove("active");
      filterFunc(this.dataset.filterValue);
    });
  });
}

let lastClickedBtn = filterBtns[0];
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (selectValue) selectValue.innerHTML = this.innerHTML;
    filterFunc(this.dataset.filterValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});
