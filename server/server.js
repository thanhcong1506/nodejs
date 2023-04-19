import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";

//configure env
dotenv.config();

//rest object
const app = express();

//middelwares

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://thanhcongecommerce.netlify.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  // const allowedOrigins = [
  //   "http://localhost:3000",
  //   "https://thanhcongecommerce.netlify.app/",
  //   "https://thanhcongadmin.netlify.app/",
  // ];
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.setHeader("Access-Control-Allow-Origin", origin);
  // }
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  // res.header("Access-Control-Allow-credentials", true);
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  // next();
});

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//err
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running  on port ${PORT}`);
});
