const express = require("express")
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')
const fs = require('fs');


// const options = {
//   definition: {
//     swagger: '2.0',
//     info: {
//       title: 'Product Management',
//       version: '1.0.0',
//     },
//   },
//   apis: process.env.ENVIRONMENT === "development" ? ['./**/*.ts'] : ['./**/*.js'],
// };

// let swaggerSpec = swaggerJSDoc(options);


router.get("/", (req, res) => {
  res.json({})
  // if (process.env.ENVIRONMENT === 'development')
  //   res.json(swaggerSpec)
  // res.sendFile("swagger.json", { root: __dirname })
})

export default router