const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Defined routes directories
const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventsRoutes")

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("Welcome to Maureen's Server")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})