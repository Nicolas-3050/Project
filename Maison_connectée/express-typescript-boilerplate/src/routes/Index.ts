import Index from "@/controllers/Index";
import express from "express";
const router = express.Router();

/* Users */
router.get("/user", Index.get);
router.get("/user/:id", Index.get);
router.post("/user", Index.post);
router.patch("/user/:id", Index.patch);
router.delete("/user/:id", Index.delete);

/* Actuators */
router.get("/actuator", Index.get);
router.get("/actuator/:id", Index.get);
router.post("/actuator", Index.post);
router.patch("/actuator/:id", Index.patch);
router.delete("/actuator/:id", Index.delete);

/* Sensors */
router.get("/sensor", Index.get);
router.get("/sensor/:id", Index.get);
router.post("/sensor", Index.post);
router.patch("/sensor/:id", Index.patch);
router.delete("/sensor/:id", Index.delete);


export default router;
