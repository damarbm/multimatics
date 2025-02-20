const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deptId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created");
  })
  .catch((error) => console.error(error));

module.exports = Users;
