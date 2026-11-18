(function () {
  var grid = document.querySelector(".page-section .cards-grid");
  if (!grid) return;

  var kartu = grid.querySelectorAll(".card");
  if (kartu.length === 0) return;

  // Daftar pulau dan kata kunci provinsinya
  var PETA = [
    ["Sumatera", ["sumatera", "jambi", "aceh", "riau", "lampung", "bengkulu", "bangka", "belitung"]],
    ["Jawa", ["jawa", "yogyakarta", "jakarta", "banten"]],
    ["Bali & Nusa Tenggara", ["ntb", "ntt", "nusa tenggara", "bali", "lombok", "flores"]],
    ["Kalimantan", ["kalimantan"]],
    ["Sulawesi", ["sulawesi"]],
    ["Maluku & Papua", ["maluku", "papua"]]
  ];

  // Cari pulau dari teks provinsi di kartu
  function cariPulau(kartuIni) {
    var teks = "";
    kartuIni.querySelectorAll("small, span").forEach(function (el) {
      teks += " " + el.textContent.toLowerCase();
    });
    for (var i = 0; i < PETA.length; i++) {
      for (var j = 0; j < PETA[i][1].length; j++) {
        if (teks.indexOf(PETA[i][1][j]) !== -1) return PETA[i][0];
      }
    }
    return "Lainnya";
  }

  // Catat pulau tiap kartu, dan daftar pulau yang ada
  var adaPulau = [];
  kartu.forEach(function (k) {
    var pulau = cariPulau(k);
    k.setAttribute("data-pulau", pulau);
    if (adaPulau.indexOf(pulau) === -1) adaPulau.push(pulau);
  });

  // Kalau cuma ada satu pulau, filter tidak diperlukan
  if (adaPulau.length < 2) return;

  // Gaya tombol
  var gaya = document.createElement("style");
  gaya.textContent = [
    ".filter-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 0 auto 26px; }",
    ".filter-btn { background: transparent; color: #fff; border: 1.5px solid #f5b72e; padding: 8px 18px; border-radius: 30px; font-size: 14px; font-family: inherit; cursor: pointer; }",
    ".filter-btn:hover { background: rgba(245,183,46,.15); }",
    ".filter-btn.aktif { background: #f5b72e; color: #000; font-weight: 700; }"
  ].join("\n");
  document.head.appendChild(gaya);

  // Urutkan tombol sesuai urutan di PETA
  var urut = PETA.map(function (p) { return p[0]; }).concat(["Lainnya"]);
  var daftar = urut.filter(function (p) { return adaPulau.indexOf(p) !== -1; });
  daftar.unshift("Semua");

  var bar = document.createElement("div");
  bar.className = "filter-bar";

  daftar.forEach(function (nama) {
    var tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "filter-btn" + (nama === "Semua" ? " aktif" : "");
    tombol.textContent = nama;

    tombol.addEventListener("click", function () {
      bar.querySelectorAll(".filter-btn").forEach(function (t) {
        t.classList.remove("aktif");
      });
      tombol.classList.add("aktif");

      kartu.forEach(function (k) {
        var cocok = (nama === "Semua") || (k.getAttribute("data-pulau") === nama);
        k.style.display = cocok ? "" : "none";
      });
    });

    bar.appendChild(tombol);
  });

  grid.parentNode.insertBefore(bar, grid);
})();
