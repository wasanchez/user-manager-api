import express from "express";
import { AuthController } from "../controllers/authcontroller";
import UserSchema from "../schemas/registerschema";
import SchemaValidatorMiddleware from "../common/middlewares/schemavalidatormiddleware";
 
const router = express.Router();
const controller = new AuthController();

router.post(
  "/signup",
  [SchemaValidatorMiddleware.verify(UserSchema)],
  controller.register
);

export = router;
