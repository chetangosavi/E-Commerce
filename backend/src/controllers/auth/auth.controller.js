import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../schemas/User.Schema.js";
import { registerSchema, loginSchema } from "../../lib/zod.js";

// register
export const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    //if User exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hasing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password please try again" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({ success: true, message: "User logged in successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// logout controller

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, message: "logout successfull" });
  } catch (error) {}
};

// auth middleware

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token Expired" });
    }
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Server Error, Unauthorized" });
  }
};

