const ProfileUser = require('../../models/profile_user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../configJwt');

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class ApiAuthController {
  async setRegistration(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        dateBirth,
        sex,
        countryCode,
        phoneNumber,
        citizenship,
      } = req.body;

      const candidate = await ProfileUser.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `This email is already exists` });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const dateOfBirth = new Date(dateBirth);

      const user = new ProfileUser({
        firstName,
        lastName,
        email,
        password: hashPassword,
        dateBirth: dateOfBirth,
        sex,
        countryCode,
        phoneNumber,
        citizenship,
      });
      await user.save();

      return res.status(200).json({ message: 'Registration complete' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration error` });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await ProfileUser.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: `User ${email} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Password not valid` });
      }

      const userId = user._id;
      const token = generateAccessToken(userId);
      const userProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateBirth: user.dateBirth,
        sex: user.sex,
        countryCode: user.countryCode,
        phoneNumber: user.phoneNumber,
        citizenship: user.citizenship,
      };
      return res.json({ token, userId, userProfile });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Login error` });
    }
  }

  async checkAuth(req, res) {
    try {
      const id = decodeURIComponent(req.query.id);
      ProfileUser.findById(id)
        .then((user) => {
          const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateBirth: user.dateBirth,
            sex: user.sex,
            countryCode: user.countryCode,
            phoneNumber: user.phoneNumber,
            citizenship: user.citizenship,
          };
          return res.status(200).json(userProfile);
        })
        .catch((err) => {
          return res.status(400).json({ message: 'User not found' });
        });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Check auth error` });
    }
  }
}

module.exports = new ApiAuthController();
