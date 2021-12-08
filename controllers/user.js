// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import UserModal from '../models/user.js';

// const secret = 'test';

// export const signin = async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(email, password);

//   try {
//     const oldUser = await UserModal.findOne({ email });
//     // const oldUser = UserModel.filter((item) => item.email === email);
//     // console.log(oldUser);
//     if (!oldUser)
//       return res.status(404).json({ message: "User doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: 'Username or password is wrong' });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ result: oldUser, token });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };
// // export const getAll = (req, res) => {
// //   res.json({ UserModel });
// // };

// export const signup = async (req, res) => {
//   // const { email, password, confirmPassword } = req.body;
//   const { email, password, firstName, lastName, confirmPassword } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });
//     // const oldUser = UserModel.filter((item) => item.email === email);
//     // console.log(oldUser);
//     if (oldUser.length > 0)
//       return res.status(400).json({ message: 'User already exists' });
//     if (password !== confirmPassword)
//       return res.status(403).json({ message: 'Confirm wrong password' });
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await UserModal.create({
//       // _id: Math.trunc(Math.random() * 1000).toString(16),
//       email,
//       password: hashedPassword,
//       name: `${firstName} ${lastName}`,
//     });
//     // UserModel.push(result);

//     const token = jwt.sign({ email: result.email, id: result._id }, secret, {
//       expiresIn: '1h',
//     });

//     res.status(201).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });

//     console.log(error);
//   }
// };

import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = password === oldUser.password;

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Username or password is wrong' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    const result = await UserModal.create({
      email,
      password: password,
      name: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { email, newPassword, username, image, bio } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { newPassword, username, image, bio, _id: id };

    await UserModal.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
export const getUser = async (req, res) => {
  try {
    const result = await UserModal.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
