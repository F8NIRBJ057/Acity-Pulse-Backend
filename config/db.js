const {Pool} = require("pg")

const connectionString = "postgresql://student:FMGGo0iaAawGGybMJmtYLnBwJmLQzZRY@dpg-ct7ich52ng1s73cg1c1g-a.oregon-postgres.render.com/student_info_u9bv"


const pool = new Pool({
    connectionString:connectionString,
    ssl:{
        rejectUnauthorized:false
    }
})

pool.connect().then(()=>console.log("Connected to Database")).catch(err=>console.log("Error connecting to database",err))

module.exports = pool