import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map(issue => issue.message).join(", ");
  }

  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;

    switch (err.code) {
      case "P2002":
        message = `Duplicate value for ${err.meta?.target?.join(", ")}`;
        break;

      case "P2025":
        message = "Record not found";
        break;

      default:
        message = "Database operation failed";
    }
  }

  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid database query";
  }

  else if (err instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token expired";
  }

  else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token";
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;