const User = require('../models').User;
const Profile = require('../models').Profile;

module.exports = {
  list(req, res) {
    return Profile
      .findAll({
        include: [{
          model: User,
          as: 'user'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: User, as: 'user' }, 'createdAt', 'DESC'],
        ],
      })
      .then((profile) => res.status(200).send(profile))
      .catch((error) => { res.status(400).send(error); });
  },
  //
  getById(req, res) {
    return Profile
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'user'
        }],
      })
      .then((profile) => {
        if (!profile) {
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
    return Profile
      .create({
        user_id: req.body.user_id,
        sex: req.body.sex,
        age: req.body.age,
        profession: req.body.hobby,
        hobby: req.body.hobby,
      })
      .then((profile) => res.status(201).send(profile))
      .catch((error) => res.status(400).send(error));
  },
  //
  update(req, res) {
    return Profile
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'user'
        }],
      })
      .then(profile => {
        if (!profile) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return profile
          .update({
            user_id: req.body.user_id,
            sex: req.body.sex,
            age: req.body.age,
            profession: req.body.hobby,
            hobby: req.body.hobby,
          })
          .then(() => res.status(200).send(profile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  //
  delete(req, res) {
    return Profile
      .findByPk(req.params.id)
      .then(profile => {
        if (!profile) {
          return res.status(400).send({
            message: 'Profile Not Found',
          });
        }
        return profile
          .destroy()
          .then(() => res.status(204).send(profile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
//   addWithCourse(req, res) {
//     return User
//       .create({
//         lecturer_name: req.body.lecturer_name,
//         course: req.body.course
//       }, {
//         include: [{
//           model: Profile,
//           as: 'profile'
//         }]
//       })
//       .then((user) => res.status(201).send(user))
//       .catch((error) => res.status(400).send(error));
//   },
};