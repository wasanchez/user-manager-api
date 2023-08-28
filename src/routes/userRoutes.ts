import express from "express";
import { UserController } from "../controllers/UserController";
const router = express.Router();
const controller = new UserController();

router.get("/", controller.getAll );
router.get("/:id", controller.get);

export = router;
