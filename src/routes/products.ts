const express = require("express")
const router = express.Router()
import productController from "../controllers/productController"

/**
* @swagger
  * /products:
  * post:
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - description: Product information
  *         in: body
  *         name: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/Product'
  *     responses:
  *       '201':
  *         description: Created
  *         examples:
  *           application/json:
  *             brand_id: 0
  *             id: 0
  *             name: Paracetamol
  *             properties: {}
  *     tags:
  *       - Product
  *     description: Add a new product
*/
router.post("/", async (req, res, next) => {
  const name = req.body.name || null
  const brand_id = req.body.brand_id || null
  res.json(await productController.create(res, name, brand_id))
})

/**
* @swagger
  * /products:
  * get:
  *     produces:
  *       - application/json
  *     parameters:
  *       - description: The name of the medicine product brand
  *         in: query
  *         name: brand
  *         type: string
  *     responses:
  *       '200':
  *         description: OK
  *         examples:
  *           application/json:
  *             - brand_id: 0
  *               id: 0
  *               name: Paracetamol
  *               properties: {}
  *             - brand_id: 1
  *               id: 1
  *               name: Aspirin
  *               properties: {}
  *             - brand_id: 2
  *               id: 2
  *               name: Delasone
  *               properties: {}
  *             - brand_id: 3
  *               id: 3
  *               name: Amoxicillin
  *               properties: {}
  *         schema:
  *           $ref: '#/definitions/Product'
  *     tags:
  *       - Product
  *     description: Get all products
*/
router.get("/", async (req, res) => {
  res.json(await productController.getAll())
})

/**
* @swagger
  * /products/{productId}:
  * get:
  *     parameters: []
  *     responses:
  *       '200':
  *         description: OK
  *     tags:
  *       - Product
  *     description: Get product by id
*/
router.get("/:id", async (req, res) => {
  res.json(await productController.getById(req.params.id))
})

/**
* @swagger
  * /products/{productId}:
  * delete:
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       '204':
  *         description: OK
  *     tags:
  *       - Product
  *     description: Delete a product
*/
router.delete("/:id", async (req, res) => {
  res.json(await productController.removeById(req.params.id))
})

/**
* @swagger
  * /brand/{brandId}:
  * put:
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - description: Product information
  *         in: body
  *         name: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/Product'
  *     responses:
  *       '200':
  *         description: OK
  *         examples:
  *           application/json:
  *             brand_id: 0
  *             id: 0
  *             name: Paracetamol
  *             properties: {}
  *     tags:
  *       - Product
  *     description: Update the entire product
*/
router.put("/:id", async (req, res) => {
  const name = req.body.name || null
  const brand_id = req.body.brand_id || null
  res.json(await productController.updateById(res, req.params.id, name, brand_id))
})

export default router