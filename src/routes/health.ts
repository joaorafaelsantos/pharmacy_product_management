const express = require("express")
const router = express.Router()
import healthController from "../controllers/healthController"

router.get("/", async (req, res) => {
  res.json(await healthController.getHealthStatus())
})

export default router