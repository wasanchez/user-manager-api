import express from "express";
import { AuthController } from "../controllers/authcontroller";
import UserSchema from "../schemas/registerschema";
import LoginSchema from "../schemas/loginschema";
import SchemaValidatorMiddleware from "../common/middlewares/schemavalidatormiddleware";
 
const router = express.Router();
const controller = new AuthController();

router.post(
  "/signup",
  [SchemaValidatorMiddleware.verify(UserSchema)],
  controller.register
);

router.post(
  "/login", 
  [SchemaValidatorMiddleware.verify(LoginSchema)],
  controller.login
);

export = router;
