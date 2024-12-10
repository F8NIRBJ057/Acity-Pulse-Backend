const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

app.use(cors({
    origin: process.env.FRONTEND_URL || "https://acity-pulse.vercel.app",
    credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Defined routes directories
const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventsRoutes")

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      auth: req.headers.authorization
    });
    next();
  });

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("Welcome to Maureen's Server")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})