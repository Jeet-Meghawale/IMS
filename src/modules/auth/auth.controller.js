import AuthService from "./auth.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        result
      )
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  });
}

export default new AuthController();