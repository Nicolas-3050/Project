import express from "express";
import User from "@/controllers/User";
import Authentification from "@/middleware/Authentification";

const router = express.Router();

/* Users */
router.post("/user/login", User.postLogin);
router.use("/user/login", Authentification)
router.get("/user", User.get);
router.get("/user/:id", User.getId);
router.post("/user", User.post);
router.patch("/user/:id", User.patch);
router.delete("/user/:id", User.delete);

export default router;
