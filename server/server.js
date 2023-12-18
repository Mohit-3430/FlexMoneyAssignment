import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/', (req, res) => {
    res.send("Hello From Server!!")
})

import UserRoutes from "./src/routes/register.js"

app.use('/api/', UserRoutes)

app.listen(port, () => {
    console.log(`Runnning on port ${port}`);
})