import express = require("express")
const cors = require('cors');
require("dotenv").config()

import swagger from "./swagger"
import health from "./routes/health"
import brands from "./routes/brands"
import products from "./routes/products"

const API_VERSION = "v1"
const PORT = process.env.PORT || 3000
const app = express()

// CORS
app.use(cors());
app.options('*', cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.use(`/api/${API_VERSION}/health`, health)

// Swagger 
app.use(`/api/${API_VERSION}/api-docs`, swagger)

// Products
app.use(`/api/${API_VERSION}/products`, products)

// Brands
app.use(`/api/${API_VERSION}/brands`, brands)

app.listen(PORT, () => {
    console.log("App is ready.")
})
