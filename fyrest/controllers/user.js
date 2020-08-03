const User = require('../models').User;
const Profile = require('../models').Profile;

module.exports = {
  //
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Profile,
          as: 'profile'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Profile, as: 'profile' }, 'createdAt', 'DESC'],
        ],
      })
      .then((user) => res.status(200).send(user))
      .catch((error) => { res.status(400).send(error); });
  },
  //
  getById(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Profile,
          as: 'profile'
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },
  //
  add(req, res) {
    return User
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        status: req.body.status,
        nickname: req.body.nickname,
        role: req.body.role,
        avatar: req.body.avatar,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
  //
  update(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Profile,
          as: 'profile'
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            username: req.body.username || 'test username',
            password: req.body.password || 'test password',
            email: req.body.email || 'test email',
            status: req.body.status || 'test status',
            nickname: req.body.nickname || 'test nickname',
            role: req.body.role || 'test role',
            avatar: req.body.avatar || 'test avatar',
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  //
  delete(req, res) {
    return User
      .findByPk(req.params.id
    //     , {
    //     include: [{
    //       model: Profile,
    //       as: 'profile'
    //     }],
    //   }
      )
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  //
  addWithProfile(req, res) {
    return User
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        status: req.body.status,
        nickname: req.body.nickname,
        role: req.body.role,
        avatar: req.body.avatar,
        profile: req.body.profile,
      }, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
};