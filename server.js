import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import morgan from 'morgan';
import authRoute from "./routers/authRoutes.js"
// import { isAdmin, requireSignIn } from './middlewares/authMiddleware.js';
import cors from "cors";

const app = express();

// env configration
dotenv.config()

// database configration
connectDb();

function greet(nmae) {
    return nmae;
}

//middleware
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());


//routes 
app.use("/api/v1/auth",authRoute)




// rest api
app.get('/', (req, res) => {
    const name = greet("Vivek");
    res.send({
        name: name,
        meassage: " Hello we are starting ecommerce app developmet",
    })
})
const PORT = process.env.PoRT || 8080;
app.listen(PORT, () => {
    console.log(`App is  listening in : ${PORT}`.bgBlack)
})