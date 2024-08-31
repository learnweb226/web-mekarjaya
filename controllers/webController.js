const { Berita } = require("./../models")

exports.getIndexPage = (req, res) => {
  res.render("web/index")
}

exports.getBeritaTerbaru = (req, res) => {
  res.render("web/berita-terbaru")
}

exports.getMonografiPage = (req, res) => {
  res.render("web/monografi")
}

exports.getSejarahDesa = (req, res) => {
  res.render("web/sejarah-desa")
}

exports.getStrukturPemerintahan = (req, res) =>{
  res.render("web/struktur-pemerintahan")
}

exports.getWisata = (req, res) => {
  res.render("web/wisata")
}

exports.getBeritaDetail = async (req, res) => {
  try {
    const beritaId = req.params.id;
    const berita = await Berita.findByPk(beritaId); // Mengambil berita berdasarkan ID

    if (!berita) {
      return res.status(404).render('404', { message: "Berita tidak ditemukan" });
    }

    res.render('web/detail-berita', { berita });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};