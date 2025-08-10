import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import floorRouter from "./routes/floor.route";
import offerRouter from "./routes/offer.route";
import productRouter from "./routes/product.route";
import shopRouter from "./routes/shop.route";
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


// apis
app.use("/api/v2/user", userRouter);
app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/floor",floorRouter );
app.use("/api/v2/offer", offerRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/shop", shopRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listing at port ${PORT}`);
    
});