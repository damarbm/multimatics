const Users = require("../models/users.model");

exports.getAllUsers = async (_, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const findUserById = async (id) => {
  try {
    const user = await Users.findOne({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, profileImage, deptId } = req.body;
    const newUser = await Users.create({
      name,
      email,
      profileImage,
      deptId,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await user.update(req.body, { where: { id: id } });

    res.status(200).json(updatedUser);
  } catch (error) {}
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
