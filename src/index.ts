import express = require("express")
require("dotenv").config()

import brands from "./routes/brands"

const API_VERSION = "v1"
const AWS_REGION = process.env.AWS_REGION
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// TODO - Health check
app.get("/", (req, res) => res.send("Product Management | Pharmacy"))

// TODO - Products

// Brands
app.use(`/api/${API_VERSION}/brands`, brands)

app.listen(process.env.PORT, () => {
    console.log("App is ready.")
})
