const bcrypt = require("bcrypt"); // used for hashing passwords 
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

// REGISTER
// user khud ko register kar raha hai jismei wo name, email aur password provide karega.
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    // agar user already exist karta hai toh ham usko error message bhejenge ki user already exist karta hai, find based on eamil
    // agar nhi exist kar raha hoga toh ham new user create karenge.
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // ek constant create liya hai hasedpassword naam se jo hamare user ke password ko hash karega using bcrypt library, 
    // jisme password aur salt rounds (10) pass kiya gaya hai.
    const generateToken = require("../utils/generateToken");
    // generateToken function ko import kiya hai utils folder se, jise ham user ke liye token generate karne ke liye use karenge,
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }); // to create a new user record in the database with the provided name, email, and hashed password.

    res.status(201).json({
      message: "User registered",
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
// after reg, we will go on login where req fields are only email and password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ where: { email } });
    // we call findone method from user model to find user by email, this is wait b/c will wait for other function to complete

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // agar user exist karta hai toh ham bcrypt library ka compare function use karke provided password ko database me stored hashed password se compare karenge,

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
      // agar password match nhi hua toh ham error show kare gye
    }

    res.json({ // otherwise resposne is generated with a token and user role. 
    // token is generated using generateToken function which takes user as parameter and creates a JWT token for authentication.
  token: generateToken(user),
  role: user.role,   
});
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      // findByPk method is used to find a user by primary key, which is the user's id in this case.
      attributes: ["id", "name", "email", "role"],
    });

    res.json(user); // when found user then return user data in json format
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get user
// GET ALL USERS (ADMIN)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
      order: [["id", "DESC"]],
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ROLE
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};