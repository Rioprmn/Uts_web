const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let produk = [
  {
    id: 1,
    nama: "Pupuk Organik Premium",
    deskripsi: "Mengandung unsur hara untuk meningkatkan kesuburan tanah dan kesehatan tanaman.",
    harga: 45000,
    gambar: "1.png"
  },
  {
    id: 2,
    nama: "Pupuk NPK 16-16-16",
    deskripsi: "Formula seimbang Nitrogen, Fosfor, dan Kalium untuk segala jenis tanaman.",
    harga: 60000,
    gambar: "2.png"
  },
  {
    id: 3,
    nama: "Pupuk Cair Konsentrat",
    deskripsi: "Aplikasi cepat melalui daun untuk pertumbuhan optimal dan hasil panen maksimal.",
    harga: 30000,
    gambar: "3.png"
  }
];

// GET semua produk
app.get("/produk", (req, res) => {
  res.json(produk);
});

// GET produk by id
app.get("/produk/:id", (req, res) => {
  const item = produk.find(p => p.id == req.params.id);
  if (!item) return res.status(404).json({ message: "Produk tidak ditemukan" });
  res.json(item);
});

// POST tambah produk
app.post("/produk", (req, res) => {
  const newProduk = {
    id: produk.length + 1,
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    harga: req.body.harga,
    gambar: req.body.gambar
  };
  produk.push(newProduk);
  res.json({ message: "Produk berhasil ditambahkan", data: newProduk });
});

// PUT update produk
app.put("/produk/:id", (req, res) => {
  const index = produk.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Produk tidak ditemukan" });

  produk[index] = { ...produk[index], ...req.body };
  res.json({ message: "Produk diperbarui", data: produk[index] });
});

// DELETE hapus produk
app.delete("/produk/:id", (req, res) => {
  const index = produk.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Produk tidak ditemukan" });

  const deleted = produk.splice(index, 1);
  res.json({ message: "Produk dihapus", data: deleted });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
