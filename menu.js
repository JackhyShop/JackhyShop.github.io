(function () {
  // ===== GAYA MENU (hanya aktif di layar kecil) =====
  var css = [
    ".menu-toggle { display: none; background: none; border: 1.5px solid #f5b72e; color: #f5b72e; font-size: 22px; line-height: 1; padding: 6px 12px; border-radius: 10px; cursor: pointer; }",
    "@media (max-width: 900px) {",
    "  .navbar { flex-wrap: nowrap; justify-content: space-between; align-items: center; }",
    "  .menu-toggle { display: block; }",
    "  .navbar .btn-outline { display: none; }",
    "  .navbar nav { display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 50; flex-direction: column; flex-wrap: nowrap; gap: 0; background: #07140e; padding: 6px 20px 16px; border-top: 1px solid rgba(255,255,255,.1); }",
    "  .navbar nav.terbuka { display: flex; }",
    "  .navbar nav a { padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.08); }",
    "}"
  ].join("\n");

  var gaya = document.createElement("style");
  gaya.textContent = css;
  document.head.appendChild(gaya);

  // ===== TOMBOL ☰ =====
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;
  var menu = navbar.querySelector("nav");
  if (!menu) return;

  var tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "menu-toggle";
  tombol.setAttribute("aria-label", "Buka menu");
  tombol.textContent = "☰";
  navbar.insertBefore(tombol, menu);

  tombol.addEventListener("click", function () {
    var terbuka = menu.classList.toggle("terbuka");
    tombol.textContent = terbuka ? "✕" : "☰";
    tombol.setAttribute("aria-label", terbuka ? "Tutup menu" : "Buka menu");
  });

  // Tutup menu kalau layar dilebarkan kembali
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      menu.classList.remove("terbuka");
      tombol.textContent = "☰";
    }
  });
})();
