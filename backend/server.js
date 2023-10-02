import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import jwt from "./helper/helper.js";
import jwtt from "jsonwebtoken";

/** import connection file */
import connect from "./database/conn.js";
import User from "./models/userSchema.js";

const app = express();

/** app middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();

app.use(jwt());

/** appliation port */
const port = process.env.PORT || 8080;

/** routes */
app.use("/api", router); /** apis */

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/user", async (req, res) => {
  // console.log("user ", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token (assuming it's a JWT)
    const decodedToken = jwtt.verify(token, process.env.JWT_SECRET);
    // console.log("decodedToken", decodedToken);
    // Fetch user data from the database based on the user identifier (e.g., username or user ID)
    const userData = await getUserDataFromDatabase(decodedToken); // Adjust this function accordingly

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("userData", userData);
    // Return user information in the response
    res.json(userData);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Function to retrieve user data from the database
async function getUserDataFromDatabase(token) {
  try {
    const user = await User.findById(token._id);
    // console.log("hello inside getuserdata from database", user);
    if (!user) {
      // User not found
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // You may want to handle the error differently
  }
}

/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
