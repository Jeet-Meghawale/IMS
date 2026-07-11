import UserService from "./user.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class UserController {
  createUser = asyncHandler(async (req, res) => {
    const user = await UserService.createUser(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "User created successfully",
        user
      )
    );
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers(req.query);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Users fetched successfully",
        users
      )
    );
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "User fetched successfully",
        user
      )
    );
  });

  updateUser = asyncHandler(async (req, res) => {
    const user = await UserService.updateUser(
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "User updated successfully",
        user
      )
    );
  });

  updateUserStatus = asyncHandler(async (req, res) => {
    const user = await UserService.updateUserStatus(
      req.params.id,
      req.body.isActive
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "User status updated successfully",
        user
      )
    );
  });
}

export default new UserController();