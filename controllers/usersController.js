
// importing Express
const express = require("express");

// Creating an instance of a Router
const users = express.Router();

require("dotenv").config();

// Package to generate tokens to authenticate users when sending requests.
const jwt = require("jsonwebtoken");

// Secret string from .env used when function to create a token is called.
const secret = process.env.SECRET;
const {
  getUsers,
  getUser,
  createUser,
  logInUser
  // updateUser
} = require("../queries/users");

users.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
// users.put('/:id', async (req, res) => {
//   try {
//     const updatedUser = await updateUser(req.body, req.params.id);
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });
  

users.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign(
      { userId: newUser.user_id, username: newUser.username },
      secret
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res
      .status(400)
      .json({ error: "invalid information provided", info: error });
  }
});

users.post("/login", async (req, res) => {
  try {
    const user = await logInUser(req.body);
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return; // Exit the function
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      secret
    );

    
    res.status(200).json({
      
      id: user.user_id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
});

module.exports = users;




// // importing Express
// const express = require("express");

// // Creating an instance of a Router
// const users = express.Router();

// require("dotenv").config();

// // Package to generate tokens to authenticate users when sending requests.
// const jwt = require("jsonwebtoken");

// // Secret string from .env used when function to create a token is called.
// const secret = process.env.SECRET;
// const {
//   getUsers,
//   getUser,
//   createUser,
//   logInUser,
// } = require("../queries/users");

// // const { getProfile } = require("../queries/profiles");
// // Get All Users
// users.get("/", async (req, res) => {
//   try {
//     const users = await getUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Get Single User
// users.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await getUser(id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Create User
// users.post("/", async (req, res) => {
//   try {
//     const newUser = await createUser(req.body);
//     console.log(newUser);
//     const token = jwt.sign(
//       { userId: newUser.id, username: newUser.username },
//       secret
//     );

//     res.status(201).json({ user: newUser, token });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(400)
//       .json({ error: "invalid information provided", info: error });
//   }
// });

// // Login User
// users.post("/login", async (req, res) => {
//   try {
//     const user = await logInUser(req.body);
//     // const userProfile = await getProfile(user.id);
//     if (!user) {
//       res.status(401).json({ error: "Invalid username or password" });
//       return; // Exit the function
//     }

//     const token = jwt.sign(
//       { userId: user.id, username: user.username },
//       secret
//     );

//     res.status(200).json({
      
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         token,
      
    
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to login user" });
//   }
// });

// module.exports = users;