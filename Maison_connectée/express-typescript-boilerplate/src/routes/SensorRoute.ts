import express from "express";
import Sensor from "@/controllers/Sensor";
import Authentification from "@/middleware/Authentification";

const router = express.Router();

/* Sensors */
router.use("/sensor", Authentification)
router.get("/sensor", Sensor.get);
router.get("/sensor/:id", Sensor.get);
router.post("/sensor", Sensor.post);
router.patch("/sensor/:id", Sensor.patch);
router.delete("/sensor/:id", Sensor.delete);

export default router;
