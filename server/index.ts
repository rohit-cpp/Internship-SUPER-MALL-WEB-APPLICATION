import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
// import queryRouter from "./routes/queryLog.route";
// import poiRouter from "./routes/poi.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route";
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
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/poi", poiRouter);
// app.use("/api/v1/query", queryRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listing at port ${PORT}`);
    
});