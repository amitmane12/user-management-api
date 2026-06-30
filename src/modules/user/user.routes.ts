import { Router } from "express";
import userController from "./user.controller";
import validate from "../../common/middlewares/validate.middelware";
import { registerSchema } from "./schema.validation";
import authMiddleware from "../../common/middlewares/auth.middleware";
// import authMiddleware from "../../common/middlewares/auth.middleware";
const router = Router();

router.post(
    "/register",
    validate({ body: registerSchema }),
    userController.registerUser
);

router.post("/login", userController.loginUser);
router.post("/logout", authMiddleware, userController.logout);

export default router;
