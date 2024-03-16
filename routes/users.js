var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const usersTable = require('../bin/user')


async function getUserById(id) {
  return await usersTable.find((user) => {
    return user.id === id
  })
}

// get All Users
router.get('/users', async (req, res) => {
  try {
    let allUsers = await usersTable;
    if (allUsers.length < 1)
      return res.status(404).json({
        code: 404,
        message: 'No Users',
        data: []
      });
    return res.status(200).json({
      code: 200,
      data: allUsers
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      code: 400,
      message: 'Something Went Wrong'
    });
  }
});

// get User by Id
router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await getUserById(userId)
    if (user) {
      return res.status(200).json({
        code: 200,
        data: user
      });
    } else {
      return res.status(404).json({
        code: 404,
        error: 'User not found'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      code: 400,
      message: 'Something Went Wrong'
    });
  }
});

// Insert User
router.post('/users', async (req, res) => {
  try {
    const uniqueKey = uuidv4();
    const userData = req.body;
    userData.id = uniqueKey
    let op = await usersTable.push(userData);
    return res.status(201).json({
      code: 201,
      message: `INSERTED ${op}`
    });
  } catch (err) {
    console.log(err);
    return res.status(204).json({
      code: 204,
      message: `Something went Wrong`
    });
  }
});

//Update User
router.put('/users/:userId', async (req, res) => {
  try {
    let userId = req.params.userId

    let username = req.body.username;
    let age = req.body.age;
    let hobbies = req.body.hobbies;

    let user = await getUserById(userId);
    if (user) {
      user.username = username ? username : user.username;
      user.age = age ? age : username.age;
      user.hobbies = hobbies ? hobbies : user.hobbies
      console.log(user);
      return res.status(200).json({
        code: 200,
        message: 'Updated'
      });
    } else {
      return res.status(404).json({
        code: 404,
        error: 'User not found'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      code: 400,
      message: 'Something Went Wrong'
    });
  }
});

//Delete User
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const index = usersTable.findIndex((user) => {
      return user.id === userId
    });
    console.log(index);
    if (index !== -1) {
      usersTable.splice(index, 1);
      res.status(200).json({
        code: 204,
        message: 'User deleted successfully'
      });
    } else {
      res.status(404).json({
        code: 404,
        message: 'No User'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      message: 'Something Went Wrong'
    });
  }
});



module.exports = router;
