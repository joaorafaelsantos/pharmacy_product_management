const express = require("express")
const router = express.Router()
import brandController from "../controllers/brandController"

/**
* @swagger
  * /brand:
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
  *         schema:
  *           $ref: '#/definitions/Brand'
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
  * /brand:
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
  *           schema:
  *             $ref: '#/definitions/Brand'
  *       tags:
  *         - Brand
  *       description: Get all brands
*/
router.get("/", async (req, res) => {
  res.json(await brandController.getAll())
})

/**
* @swagger
  * /brand/{brandId}:
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
  * /brand/{brandId}:
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
  * /brand/{brandId}:
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
  *         schema:
  *           $ref: '#/definitions/Brand'
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
  res.json(await brandController.updateById(res, req.params.id, name))
})

export default router