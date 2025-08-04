
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, password, email, address, phone } = req.body; 

        // Validation
        if (!name) {
            return res.status(400).send({ error: "Name is required" });
        }
        if (!password) {
            return res.status(400).send({ error: "Password is required" });
        }
        if (!email) {
            return res.status(400).send({ error: "Email is required" });
        }
        if (!address) {
            return res.status(400).send({ error: "Address is required" });
        }
        if (!phone) {
            return res.status(400).send({ error: "Phone number is required" });
        }

        // Check if user already exists
        const existedUser = await userModel.findOne({ email }); 
        if (existedUser) {
            return res.status(200).send({ 
                success: false, 
                message: "User already signed up. You may try to login."
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password); // ✅ spelling and await fixed

        // Save new user
        const user = await new userModel({
            name,
            email,
            address,
            phone,
            password: hashedPassword
        }).save();

        // Success response
        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error on registration",
            error: error.message
        });
    }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("Email not found");
      return res.status(401).send({
        success: false,
        message: "Email not found",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      console.log("Password is incorrect");
      return res.status(401).send({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({
      success: false,
      message: "Login failed",
      error,
    });
  }
};


// testing middleware
export const hello = async (req, res) => {
    res.send("protected")
}