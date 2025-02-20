// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/db");

// const Products = sequelize.define("Products", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   productName: {
//     type: DataTypes.STRING(30),
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   livestock: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Table created");
//   })
//   .catch((error) => console.error(error));

// module.exports = Products;

class Product {
  constructor(id, productName, price, livestock) {
    this.id = id;
    this._productName = productName;
    this._price = price;
    this._livestock = livestock;
  }

  set productName(val) {
    this._productName = val.charAt(0).toUpperCase() + val.slice(1);
  }

  get productName() {
    return this._productName.toUpperCase();
  }

  set price(val) {
    this._price = parseFloat(val).toFixed(2);
  }

  get price() {
    return this._price;
  }

  set livestock(val) {
    this._livestock = val;
  }

  get livestock() {
    return this._livestock === 0 ? "Out of stock" : this._livestock;
  }
}

module.exports = Product;
