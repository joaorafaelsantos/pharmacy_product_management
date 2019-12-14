const express = require("express")
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')
const fs = require('fs')


router.get('/', (req, res) => {
  if (process.env.ENVIRONMENT === 'development') {
    const options = {
      definition: {
        swagger: '2.0',
        info: {
          title: 'Product Management',
          version: '1.0.0',
        },
      },
      apis: ['./**/*.ts']
    };

    let swaggerSpec = swaggerJSDoc(options);

    // Write file
    fs.writeFile('swagger.json', JSON.stringify(swaggerSpec), 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    res.json(swaggerSpec)
  }

  else res.sendFile('swagger.json', { root: __dirname + '/../' })
})

export default router