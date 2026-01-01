import express, { Request,Response } from "express";
import cors from "cors"
import dotev from "dotenv"

dotev.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())

app.get("/",(req:Request,res:Response) => {
    res.send("HELLO from Backend!")
})

app.listen(PORT,()=>{
    console.log(`🚀 server is running on: http://localhost:${PORT}`)
})