import { Router } from "express";

import UserController from "./user.controller.js";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "./user.validation.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

const router = Router();

// Create User
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  validate(createUserSchema),
  UserController.createUser
);

// Get All Users
router.get(
  "/",
  // authMiddleware,
  // authorize("ADMIN", "BUSINESS_INTELLIGENCE"),
  UserController.getAllUsers
);

// Get User By ID
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "BUSINESS_INTELLIGENCE"),
  UserController.getUserById
);

// Update User
router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  validate(updateUserSchema),
  UserController.updateUser
);

// Activate / Deactivate User
router.patch(
  "/:id/status",
  authMiddleware,
  authorize("ADMIN"),
  validate(updateUserStatusSchema),
  UserController.updateUserStatus
);

export default router;