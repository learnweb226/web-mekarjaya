const express = require("express")
const path = require("path")
const routerAdmin = require("./routes/adminRoutes")
const routerWeb = require("./routes/webRoutes")
const { limits } = require("argon2")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routerAdmin)
app.use(routerWeb)

app.listen(3000, () => {
  console.log(`Server run in http://localhost:3000`);
})