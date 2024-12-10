const pool = require("../config/db")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    const { name, email, password, role, preferences } = req.body;
    console.log(
     ` Name: ${name} || email: ${email} || password: ${password} || role: ${role} || preferences: ${preferences}`
    );
  
    if (!name || !email || !password || !role || preferences.length === 0) {
      console.log("Please enter all the needed information");
      return res
        .status(400)
        .json({ error: "Please enter all the needed information" });
    }
  
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      console.log("Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    }
  
    try {
      const hashPassword = await bcrypt.hash(password, 13);
      const results = await pool.query(
        "INSERT INTO users (name,email,password, role, preferences) VALUES($1,$2,$3,$4,$5)",
        [name, email, hashPassword, role ||"user", preferences]
      );
  
      console.log("User registered successfully");
      return res.status(201).json({ msg: "User registered successfully", user: results.rows[0] });
    } catch (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Error registering user" });
    }
  };

  const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email} || password: ${password}`);

    if (!email ||!password) {
      console.log("Please enter email and password");
      return res.status(400).json({ error: "Please enter email and password" });
    }

    const results = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
    if (!results.rows.length) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const user = results.rows[0]
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid creditianls" });
    }

    console.log(`User ${email} logged in successfully`);
    res.json({ msg:"User login succesfully",userDetails: { id: user.id, name: user.name, email: user.email, role: user.role, preferences: user.preferences } });
}

  module.exports = {registerUser, LoginUser}