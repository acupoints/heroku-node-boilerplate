const router = require("express").Router();
const User = require('../fyrest/models').User;
const Profile = require('../fyrest/models').Profile;

// const bcrypt = require("bcrypt")
const bcrypt = require("bcryptjs")
const { jwt_sign, jwt_verify, expiresIn, jwt } = require("./auth-jwt")
const { redisStore, getAllActiveSessions } = require("./auth-redis")

// validation
const {registerValidation, loginValidation} = require("./auth-validations")

// Sign up
router.post("/register", async (req, res) => {
  // Check if the field is legal
  const {error} = registerValidation(req.body)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    })
  }
  // Check if the email address already exists
  // Check all use "false" to judge empty, check one use "undefined" to judge empty
  // const user = await User.findAll({
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  // .then((user) => user.map(obj => obj.dataValues))
  .then((user) => user == undefined ? user : user.dataValues)
  .catch((error) => { res.status(400).send(error); });
  if (user != undefined) {
    return res.status(400).json({
      error: "Email already exists"
    })
  }

  // Generate salt to hash the password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  try {
    // const savedUser = await user.save()
    await User
      .create({
        username: req.body.username,
        // password: req.body.password,
        password,
        email: req.body.email,
        status: req.body.status,
        nickname: req.body.nickname,
      })
      // .then((user) => res.status(201).send(user))
      // .catch((error) => res.status(400).send(error));
    // Save to database and return json
    res.json({
      error: null,
      password,
    })
  } catch (error) {
    res.status(400).json({error})
  }
});

// Sign in
router.post("/login", async (req, res) => {
  // Check if the field is legal
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).json({
    error: error.details[0].message,
  })
  // Retrieve users by email address
  // Check all use "false" to judge empty, check one use "undefined" to judge empty
  // const user = await User.findAll({
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  // .then((user) => user.map(obj => obj.dataValues))
  .then((user) => user == undefined ? user : user.dataValues)
  .catch((error) => { res.status(400).send(error); });
  if (user == undefined) return res.status(400).json(
    {
      error: "Email is wrong",
    }
  )

  // Compare the salted and hashed cipher text
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      error: "Password is wrong",
    })
  }

  const token = jwt_sign({
    id: user.id,
    username: user.username,
    email: user.email,
  })

  //
  const {refreshToken} = token
  if (!req.session.hasOwnProperty("refreshTokens")) {
    req.session.refreshTokens=[]
    req.session.refreshTokens.push(refreshToken)
  } else {
    // Delete the refresh token and add it again
    if (req.session.hasOwnProperty("refreshToken")) {
      req.session.refreshTokens = req.session.refreshTokens.filter(tk => tk !== req.session[user.id].refreshToken)
    }
    req.session.refreshTokens.push(refreshToken)
  }
  console.log("refreshTokens [login]", req.session.refreshTokens)

  req.session[user.id] = {
    id: user.id,
    username: user.username,
    email: user.email,
    refreshToken,
  }
  console.log(req.session[user.id])

  res.json({
    error: null,
    data: {
      ...token,
    }
  })
});

// Sign out
router.post("/logout", async (req, res) => {
  //
  const {token} = req.body
  req.session.refreshTokens = req.session.refreshTokens.filter(tk => tk !== token)
  console.log("refreshTokens [logout]", req.session.refreshTokens)

  res.json({
    error: null,
    data: {
      message: 'Logout successful',
    }
  })
});

// Refresh token
router.post('/token', async (req, res) => {
  const {token} = req.body
  if (!token) {
      return res.status(401).json({
          message: 'Token does not exist'
      })
  }
  //
  if (!req.session.refreshTokens.includes(token)) {
      return res.status(403).json({
          message: 'Does not exist in the list'
      })
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({
              message: 'Jwt verification fails'
          })
      }

      const accessToken = jwt.sign({
          email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET, 
      {
          expiresIn,
      })

      res.json({
          accessToken,
      })
  })
})

module.exports = router;