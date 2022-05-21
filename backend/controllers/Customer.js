import Customer from "../models/CustomerModel.js";
import { Op } from "sequelize";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(customers);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomersById = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findByPk(id);
    res.json(customer);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerByName = async (req, res) => {
  const name = req.body.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  try {
    const customer = await Customer.findAll({ where: condition });
    res.json(customer);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Customer.create({
      name: name,
      email: email,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const AddCustomer = async (req, res) => {
  const { name, email } = req.body;
  try {
    await Customer.create({
      name: name,
      email: email,
    });
    res.json({ msg: "Tambah Customer Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCustomer = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const data = {
    name: name,
    email: email,
  };
  try {
    await Customer.update(data, {
      where: {
        id: id,
      },
    });
    res.json({ msg: "Update Customer Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    await Customer.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Berhasil Hapus Customer" });
  } catch (error) {
    console.log(error);
  }
};
