const express = require("express")
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'Product Management',
            version: '1.0.0', 
      },
    },
    apis: ['./**/*.ts'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);

router.get("/", (req, res) => {
    res.json(swaggerSpec);
})

export default router