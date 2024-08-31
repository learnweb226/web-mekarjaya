const express = require("express")
const router = express.Router()
const { getIndexPage, getSejarahDesa, getMonografiPage, getStrukturPemerintahan, getBeritaTerbaru, getWisata, getBeritaDetail } = require("./../controllers/webController")

router.get("/", getIndexPage)
router.get("/sejarah-desa", getSejarahDesa)
router.get("/monografi", getMonografiPage)
router.get("/struktur-pemerintahan", getStrukturPemerintahan)
router.get("/berita-terbaru", getBeritaTerbaru)
router.get("/wisata", getWisata)

router.get("/berita/:id", getBeritaDetail);

module.exports = router
