import express from "express";
import { UserController } from "../controllers/usercontroller";
const router = express.Router();
const controller = new UserController();

router.get("/", controller.getAll );
router.get("/:id", controller.get);

export = router;
