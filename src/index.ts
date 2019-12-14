import express = require("express")
const cors = require('cors');
require("dotenv").config()

import swagger from "./swagger"
import brands from "./routes/brands"
import products from "./routes/products"

const API_VERSION = "v1"
const AWS_REGION = process.env.AWS_REGION
const PORT = process.env.PORT || 3000
const app = express()

// CORS
app.use(cors());
app.options('*', cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO - Health check
app.get("/health", (req, res) => res.json({ status: "health", code: "200" }))

// Swagger 
app.use(`/api/${API_VERSION}/api-docs`, swagger)

// Brands
app.use(`/api/${API_VERSION}/products`, products)

// Brands
app.use(`/api/${API_VERSION}/brands`, brands)

app.listen(process.env.PORT, () => {
    console.log("App is ready.")
})
