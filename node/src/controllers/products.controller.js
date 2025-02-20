const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/db");

exports.getAllProducts = async (_, res) => {
  try {
    const products = await sequelize.query("SELECT * FROM products", {
      type: QueryTypes.SELECT,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { productName, price, livestock } = req.body;

    await sequelize.query(
      "INSERT INTO products (productName, price, livestock) VALUES (?, ?, ?)",
      {
        replacements: [productName, price, livestock],
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Product created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findProductById = async (id) => {
  try {
    const product = await sequelize.query(
      "SELECT id FROM products WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    return product.length > 0 ? product[0] : null;
  } catch (error) {
    return error.message;
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await sequelize.query("DELETE FROM products WHERE id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    });

    return res.json({ message: "Product deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, price, livestock } = req.body;
    const product = await findProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await sequelize.query(
      "UPDATE products SET productName = ?, price = ?, livestock = ? WHERE id = ?",
      {
        replacements: [productName, price, livestock, id],
        type: QueryTypes.UPDATE,
      }
    );

    res.status(200).json({ message: "Product successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
