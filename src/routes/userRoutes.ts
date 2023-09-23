import express from "express";
import { UserController } from "../controllers/UserController";
import UpdateUserSchema from "../schemas/updateuserschema";
import SchemaValidatorMiddleware from "../common/middlewares/schemavalidatormiddleware";

const router = express.Router();
const controller = new UserController();

router.get("/", controller.getAll );
router.get("/:id", controller.get);
router.patch(
    "/:id",
    [SchemaValidatorMiddleware.verify(UpdateUserSchema)],
    controller.updateUserInfo
);

export = router;
