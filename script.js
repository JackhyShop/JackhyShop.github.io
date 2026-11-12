// ===== DATA YANG BISA DICARI =====
var DATA = [
  { jenis: "Gunung", nama: "Gunung Semeru", info: "Jawa Timur", ket: "3.676 mdpl", gambar: "images/semeru.jpg", halaman: "gunung.html" },
  { jenis: "Gunung", nama: "Gunung Rinjani", info: "NTB", ket: "3.726 mdpl", gambar: "images/rinjani.jpg", halaman: "gunung.html" },
  { jenis: "Gunung", nama: "Gunung Prau", info: "Jawa Tengah", ket: "2.565 mdpl", gambar: "images/prau.jpg", halaman: "gunung.html" },
  { jenis: "Gunung", nama: "Gunung Bromo", info: "Jawa Timur", ket: "2.329 mdpl", gambar: "images/bromo.jpg", halaman: "gunung.html" },
  { jenis: "Gunung", nama: "Gunung Kerinci", info: "Jambi", ket: "3.805 mdpl", gambar: "images/kerinci.jpg", halaman: "gunung.html" },
  { jenis: "Gunung", nama: "Gunung Merbabu", info: "Jawa Tengah", ket: "3.145 mdpl", gambar: "images/merbabu.jpg", halaman: "gunung.html" },

  { jenis: "Kuliner", nama: "Rendang", info: "Sumatera Barat", ket: "", gambar: "images/rendang.jpg", halaman: "kuliner.html" },
  { jenis: "Kuliner", nama: "Gudeg", info: "Yogyakarta", ket: "", gambar: "images/gudeg.jpg", halaman: "kuliner.html" },
  { jenis: "Kuliner", nama: "Sate Madura", info: "Jawa Timur", ket: "", gambar: "images/sate.jpg", halaman: "kuliner.html" },
  { jenis: "Kuliner", nama: "Soto Lamongan", info: "Jawa Timur", ket: "", gambar: "images/soto.jpg", halaman: "kuliner.html" },
  { jenis: "Kuliner", nama: "Rawon", info: "Jawa Timur", ket: "", gambar: "images/rawon.jpg", halaman: "kuliner.html" },
  { jenis: "Kuliner", nama: "Pempek", info: "Sumatera Selatan", ket: "", gambar: "images/pempek.jpg", halaman: "kuliner.html" },

  { jenis: "Artikel", nama: "Tips Mendaki Gunung dengan Aman dan Nyaman", info: "10 Nov 2026", ket: "", gambar: "images/artikel1.jpg", halaman: "artikel.html" },
  { jenis: "Artikel", nama: "5 Kuliner Khas Indonesia yang Wajib Dicoba", info: "9 Nov 2026", ket: "", gambar: "images/artikel2.jpg", halaman: "artikel.html" },
  { jenis: "Artikel", nama: "Destinasi Wisata Alam Terindah di Indonesia", info: "8 Nov 2026", ket: "", gambar: "images/artikel3.jpg", halaman: "artikel.html" },
  { jenis: "Artikel", nama: "Panduan Menikmati Sunrise di Gunung Bromo", info: "7 Nov 2026", ket: "", gambar: "images/bromo.jpg", halaman: "artikel.html" },
  { jenis: "Artikel", nama: "Ragam Soto Nusantara dan Cerita di Baliknya", info: "6 Nov 2026", ket: "", gambar: "images/soto.jpg", halaman: "artikel.html" },
  { jenis: "Artikel", nama: "Persiapan Mendaki Rinjani untuk Pemula", info: "5 Nov 2026", ket: "", gambar: "images/rinjani.jpg", halaman: "artikel.html" }
];

// ===== 1. KOLOM PENCARIAN DI BERANDA =====
var kotak = document.querySelector(".search-box");
if (kotak) {
  var input = kotak.querySelector("input");
  var tombol = kotak.querySelector("button");

  var jalankanCari = function () {
    var kata = input.value.trim();
    if (kata === "") return;
    window.location.href = "hasil.html?cari=" + encodeURIComponent(kata);
  };

  tombol.addEventListener("click", jalankanCari);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") jalankanCari();
  });
}

// ===== 2. HALAMAN HASIL PENCARIAN =====
var wadah = document.getElementById("hasil");
if (wadah) {
  var params = new URLSearchParams(window.location.search);
  var kataCari = (params.get("cari") || "").trim();
  var keterangan = document.getElementById("keterangan");

  if (kataCari === "") {
    keterangan.textContent = "Ketik kata kunci di kolom pencarian pada Beranda.";
  } else {
    var kecil = kataCari.toLowerCase();
    var cocok = DATA.filter(function (item) {
      var teks = (item.jenis + " " + item.nama + " " + item.info + " " + item.ket).toLowerCase();
      return teks.indexOf(kecil) !== -1;
    });

    if (cocok.length === 0) {
      keterangan.textContent = 'Tidak ada hasil untuk "' + kataCari + '". Coba kata lain, misalnya "Jawa Timur" atau "sate".';
    } else {
      keterangan.textContent = cocok.length + ' hasil untuk "' + kataCari + '"';
      cocok.forEach(function (item) {
        var kartu = document.createElement("a");
        kartu.className = "card";
        kartu.href = item.halaman;
        kartu.style.backgroundImage = "url('" + item.gambar + "')";

        var isi = document.createElement("div");
        isi.className = "card-info";

        var label = document.createElement("small");
        label.textContent = item.jenis + " · " + item.info;

        var judul = document.createElement("h3");
        judul.textContent = item.nama;

        isi.appendChild(label);
        isi.appendChild(judul);

        if (item.ket !== "") {
          var ket = document.createElement("span");
          ket.textContent = item.ket;
          isi.appendChild(ket);
        }

        kartu.appendChild(isi);
        wadah.appendChild(kartu);
      });
    }
  }
}
