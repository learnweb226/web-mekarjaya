const { Berita } = require("./../models")
const { Op } = require('sequelize');

exports.getIndexAdminPage = (req, res) => {
  res.render('admin/indexAdmin', { activePage: 'home' });
}

exports.getTambahBerita = async (req, res) => {
  try {
    const daftarBerita = await Berita.findAll();
    res.render('admin/tambahBerita', { activePage: 'berita', daftarBerita });
  } catch (error) {

  }
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
    const searchQuery = req.query.q || "";

    let daftarBerita;

    if (searchQuery) {
      daftarBerita = await Berita.findAll({
        where: {
          [Op.or]: [
            { judul_berita: { [Op.like]: `%${searchQuery}%` } },
            { konten_berita: { [Op.like]: `%${searchQuery}%` } }
          ]
        }
      });
    } else {
      daftarBerita = await Berita.findAll();
    }

    res.render('web/berita-terbaru', { daftarBerita, searchQuery });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteBerita = async (req, res) => {
  const { id } = req.params;

  try {
    await Berita.destroy({ where: { id } });
    res.redirect('/admin-webpdesa/tambah-berita');
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat menghapus berita.');
  }
};
