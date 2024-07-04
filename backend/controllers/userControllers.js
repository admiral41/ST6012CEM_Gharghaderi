const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  // Step 1: Check the incoming data
  console.log(req.body);

  // Step 2: Destructure data
  const { name, email, phone, password } = req.body;

  // Step 3: Validate data
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    // Step 4: Check if user already exists
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Step 5: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 6: Create a new user
    const newUser = new Users({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      isAdmin: false, // Ensure isAdmin is false
    });

    // Step 7: Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  // Step 1: Check if data is coming or not
  console.log(req.body);

  // Step 2: Destructure the data
  const { email, password } = req.body;

  // Step 3: Validate the incoming data
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  // Step 4: Try-catch block
  try {
    // Step 5: Check existing user
    const existingUser = await Users.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Step 6: Check password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Step 7: Create token
    const token = await jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Step 8: Response
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token: token,
      userData: existingUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  create,
  login,
};
