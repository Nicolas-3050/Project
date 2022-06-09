import express from "express";
import Actuateur from "@/controllers/Actuateur";
import Authentification from "@/middleware/Authentification";

const router = express.Router();

/* Actuators */
router.use("/actuator", Authentification)
router.get("/actuator", Actuateur.get);
router.get("/actuator/:id", Actuateur.get);
router.post("/actuator", Actuateur.post);
router.patch("/actuator/:id", Actuateur.patch);
router.delete("/actuator/:id", Actuateur.delete);

export default router;
