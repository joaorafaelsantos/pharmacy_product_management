import express = require('express')
require('dotenv').config()

const AWS_REGION = process.env.AWS_REGION
const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => res.send('Product Management | Pharmacy'))

app.listen(process.env.PORT, () => {
    console.log('App is ready.')
})
