import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import categoryRoutes from "./routes/category.route";
import floorRoutes from "./routes/floor.route";
import shopRoutes from "./routes/shop.route";
import productRoutes from "./routes/product.route";
import offerRoutes from "./routes/offer.route";
import userRoutes from "./routes/user.route";
import { notFound, errorHandler } from "./middlewares/error.middleware";
import { logger } from "./middlewares/logging.middleware";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";


dotenv.config();
const app = express();

const PORT = process.env.PORT;

//default middleware for any mern project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true, limit: "10mb"
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.use(logger);
app.use("/api/v1/", apiLimiter);


// apis
// Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/floors", floorRoutes);
app.use("/api/v1/shops", shopRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/offers", offerRoutes);
app.use("/api/v1/user", userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listing at port ${PORT}`);
    
});