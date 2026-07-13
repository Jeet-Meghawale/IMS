import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/index.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())


app.use("/api/v1", routes) 

// Error middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  })
})



app.use(errorMiddleware)
export default app;