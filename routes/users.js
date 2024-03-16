const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const userData = require('../models/user')
const { userBodyValidationRules, userParamsValidationRules, handleValidationErrors } = require('../models/user-validator')
const logger = require('../logs/logger');

async function getUserById(id) {
  return await userData.find((user) => {
    return user.id === id
  })
}

// get All Users
router.get('/users', async (req, res) => {
  try {
    let allUsers = userData;
    if (allUsers.length < 1)
      return res.status(404).json({
        message: 'No Users',
        data: []
      });
    return res.status(200).json({
      data: allUsers
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// get User by Id
router.get('/users/:userId', userParamsValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await getUserById(userId)
    if (user) {
      return res.status(200).json({
        data: user
      });
    } else {
      return res.status(404).json({
        error: 'User not found'
      });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// Insert User
router.post('/users', userBodyValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const uniqueKey = uuidv4();
    const newUser = req.body;
    newUser.id = uniqueKey
    let op = await userData.push(newUser);
    return res.status(201).json({
      message: `INSERTED ${op}`
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

//Update User
router.put('/users/:userId', userParamsValidationRules, userBodyValidationRules, handleValidationErrors, async (req, res) => {
  try {
    let userId = req.params.userId
    logger.error((userId.length));
    let username = req.body.username;
    let age = req.body.age;
    let hobbies = req.body.hobbies;

    let user = await getUserById(userId);
    if (user) {
      user.username = username ? username : user.username;
      user.age = age ? age : username.age;
      user.hobbies = hobbies ? hobbies : user.hobbies
      logger.error(user);
      return res.status(200).json({
        message: 'Updated'
      });
    } else {
      return res.status(404).json({
        error: 'User not found'
      });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

//Delete User
router.delete('/users/:userId', userParamsValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const userId = req.params.userId;
    const index = userData.findIndex((user) => {
      return user.id === userId
    });
    logger.error(index);
    if (index !== -1) {
      userData.splice(index, 1);
      res.status(200).json({
        message: 'User deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'No User'
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});



module.exports = router;
