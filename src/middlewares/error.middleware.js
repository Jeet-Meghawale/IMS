import jwt from "jsonwebtoken"

import { Prisma } from "@prisma/client"

import { ZodError } from "zod"

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error(err)

  // Default values
  let statusCode = err.statusCode || 500

  let message =
    err.message || "Internal Server Error"

  /*
   * Zod Validation Errors
   */
  if (err instanceof ZodError) {
    statusCode = 400

    message = err.issues
      .map((issue) => issue.message)
      .join(", ")
  }

  /*
   * Prisma Known Errors
   */
  else if (
    err instanceof
    Prisma.PrismaClientKnownRequestError
  ) {
    statusCode = 400

    // Unique constraint
    if (err.code === "P2002") {
      message = `Duplicate field value`

    }

    // Record not found
    else if (err.code === "P2025") {
      message = "Record not found"

    }

    else {
      message = err.message
    }
  }

  /*
   * JWT Errors
   */
  else if (
    err instanceof
    jwt.JsonWebTokenError
  ) {
    statusCode = 401

    message = "Invalid token"
  }

  /*
   * JWT Expired
   */
  else if (
    err instanceof
    jwt.TokenExpiredError
  ) {
    statusCode = 401

    message = "Token expired"
  }

  /*
   * Final Response
   */
 return res.status(statusCode).json({
  success: false,
  message,

  ...(process.env.NODE_ENV ===
    "development" && {
    stack: err.stack
  })
})
}
export default errorMiddleware