const express = require("express")
const router = express.Router()
const multer = require("multer")
const sharp = require('sharp');
const path = require("path")
const { getIndexAdminPage, getTambahBerita, postTambahBerita, getDaftarBerita, deleteBerita} = require("./../controllers/adminController")
const { getRegisterPage, getLoginPage } = require("./../controllers/authController")
const  { authentication } = require("./../middlewares/authMiddleware")

router.get("/admin-webpdesa", authentication, getIndexAdminPage)
router.get("/admin-webpdesa/tambah-berita", authentication, getTambahBerita)

router.get("/admin-webpdesa/register", getRegisterPage)
router.get("/admin-webpdesa/login", getLoginPage)

router.post("/simpan-berita", authentication, postTambahBerita)

router.get("/berita-terbaru", authentication, getDaftarBerita)

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-image', authentication, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const file = req.file;
    const outputFileName = Date.now() + path.extname(file.originalname);
    const outputFilePath = path.join('public/img', outputFileName);

    await sharp(file.buffer)
      .resize(500, 500, {
        fit: "inside"
      })
      .toFile(outputFilePath);

    res.json({ url: `/img/${outputFileName}` });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'An error occurred during file processing.' });
  }
});

router.get('/hapus-berita/:id', deleteBerita);

module.exports = router
