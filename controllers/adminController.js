const { Berita } = require("./../models")

exports.getIndexAdminPage = (req, res) => {
  res.render('admin/indexAdmin', { activePage: 'home' });
}

exports.getTambahBerita = (req, res) => {
  res.render('admin/tambahBerita', { activePage: 'berita' });
}

exports.postTambahBerita = async (req, res) => {
  try {
    const { judul, penulis, konten, tanggal } = req.body;

    console.log(judul, penulis, konten, tanggal);
    const addBerita = await Berita.create({
      judul_berita: judul,
      penulis,
      konten_berita: konten,
      tanggal_posting: tanggal
    });

    res.redirect("/admin-webpdesa/tambah-berita");

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getDaftarBerita = async (req, res) => {
  try {
    const daftarBerita = await Berita.findAll(); // Mengambil semua data berita
    res.render('web/berita-terbaru', { daftarBerita }); // Mengirim data ke view
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};