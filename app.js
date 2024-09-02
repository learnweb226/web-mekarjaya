const express = require("express")
const path = require("path")
const routerAdmin = require("./routes/adminRoutes")
const routerAuth = require("./routes/authRouter")
const routerWeb = require("./routes/webRoutes")
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cookieParser());

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routerAuth)
app.use(routerAdmin)
app.use(routerWeb)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
})
