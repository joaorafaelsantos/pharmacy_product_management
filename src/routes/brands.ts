const express = require("express")
const router = express.Router()
import brandController from "../controllers/brandController"

/**
* @swagger
  * /brands:
  * post:
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - description: Brand information
  *         in: body
  *         name: body
  *         required: true
  *     responses:
  *       '201':
  *         description: Created
  *         examples:
  *           application/json:
  *             id: 0
  *             name: Panadol
  *     tags:
  *       - Brand
  *     description: Add a new brand
*/
router.post("/", async (req, res, next) => {
  const name = req.body.name || null
  res.json(await brandController.create(res, name))
})

/**
* @swagger
  * /brands:
  *     get:
  *       produces:
  *         - application/json
  *       parameters: []
  *       responses:
  *         '200':
  *           description: OK
  *           examples:
  *             application/json:
  *               - id: 0
  *                 name: Panadol
  *               - id: 1
  *                 name: Bayer
  *               - id: 2
  *                 name: Deltasone
  *               - id: 3
  *                 name: Amoxil
  *       tags:
  *         - Brand
  *       description: Get all brands
*/
router.get("/", async (req, res) => {
  res.json(await brandController.getAll())
})

/**
* @swagger
  * /brands/{brandId}:
  * get:
  *     parameters: []
  *     responses:
  *       '200':
  *         description: OK
  *     tags:
  *       - Brand
  *     description: Get brand by id
*/
router.get("/:id", async (req, res) => {
  res.json(await brandController.getById(req.params.id))
})

/**
* @swagger
  * /brands/{brandId}:
  * delete:
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       '204':
  *         description: OK
  *     tags:
  *       - Brand
  *     description: Delete a brand
*/
router.delete("/:id", async (req, res) => {
  res.json(await brandController.removeById(req.params.id))
})

/**
* @swagger
  * /brands/{brandId}:
  * put:
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - description: Brand information
  *         in: body
  *         name: body
  *         required: true
  *     responses:
  *       '200':
  *         description: OK
  *         examples:
  *           application/json:
  *             id: 0
  *             name: Panadol
  *     tags:
  *       - Brand
  *     description: Update a brand
*/
router.put("/:id", async (req, res) => {
  const name = req.body.name || null
  res.json(await brandController.updateById(res, req.params.id, name))
})

export default router