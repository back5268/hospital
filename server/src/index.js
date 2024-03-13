import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./database/index.js";
import { routes } from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

routes(app);
// app.use(async(req, res, next)=>{
//     next(createError.NotFound());
// })

// app.use((err, req, res, next)=>{
//     res.status(err.status || 500);
//     res.send({
//         error: {
//             status: err.status || 500,
//             message: err.message,
//         }
//     });
// });

app.listen(PORT, ()=>{
    db.connectDB();
    console.log(`Server running on port ${PORT}`);
})