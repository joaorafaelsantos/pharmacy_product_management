const express = require("express")
const router = express.Router()
import brandController from "../controllers/brandController"

router.post("/", async (req, res, next) => {
  const name = req.body.name || null
  res.json(await brandController.create(res, name))
})

router.get("/", async (req, res) => {
  res.json(await brandController.getAll())
})

router.get("/:id", async (req, res) => {
  res.json(await brandController.getById(req.params.id))
})

router.delete("/:id", async (req, res) => {
  res.json(await brandController.removeById(req.params.id))
})

export default router