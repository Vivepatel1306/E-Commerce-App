// import { hashPassword } from "../helpers/authHelper.js";
// import userModel from "../models/userModel.js"
// export const registerController = async (req, res) => {
//     try {
//         const { name, email, password, address, phone } = req.body;
//         if (!name) {
//             return res.send({
//                 error: "name is required"
//             })
//         }
//         if (!password) {
//             return res.send({
//                 error: "Pasword is required"
//             })
//         }
//         if (!email) {
//             return res.send({
//                 error: "Email is required"
//             })
//         }
//         if (!address) {
//             return res.send({
//                 error: "Addres is required"
//             })
//         }
//         if (!phone) {
//             return res.send({
//                 error: "Phone no is required"
//             })
//         }

//         const existedUser = await userModel.findOne({ email });
//         if (existedUser) {
//             res.status(200).send({
//                 success: true,
//                 message: "USer alreay signed up Youe may try to login with this "
//             })
//         }
//         const hashedPassword = hashPassword(password);

//         const user = await new userModel({ name,phone, email, address, password: hashedPassword }).save()
//         res.status(201).send({
//             success: true,
//             message: "User registered succesfully",
//             user
//         })
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: "Error in regitration",
//             success: false,
//             error

//         })
//     }
// };


import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, password, email, address, phone } = req.body; // ✅ corrected: phonee ➝ phone

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
        const existedUser = await userModel.findOne({ email }); // ✅ added await
        if (existedUser) {
            return res.status(200).send({ // ✅ added return
                success: false, // ❌ fixed: it should be false (user already exists is not a success)
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
