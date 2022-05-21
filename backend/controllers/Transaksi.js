import { Op } from "sequelize";
import Transaksi from "../models/TransaksiModel.js";

export const getTransaksi = async (req, res) => {
  try {
    const dataTransaksi = await Transaksi.findAll({
      attributes: ["id", "tgl", "nama", "produk", "harga", "qty"],
    });
    res.json(dataTransaksi);
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksiByid = async (req, res) => {
  const id = req.params.id;
  try {
    const dataTransaksi = await Transaksi.findByPk(id);
    res.json(dataTransaksi);
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksibyname = async (req, res) => {
  const nama = req.body.name;
  var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
  try {
    const dataTransaksi = await Transaksi.findAll({ where: condition });
    res.json(dataTransaksi);
  } catch (error) {
    console.log(error);
  }
};

export const AddTransaksi = async (req, res) => {
  const { tgl, nama, produk, harga, qty } = req.body;
  try {
    await Transaksi.create({
      tgl: tgl,
      nama: nama,
      produk: produk,
      harga: harga,
      qty: qty,
    });
    res.json({ msg: "Tambah Transaksi Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTransaksi = async (req, res) => {
  const id = req.params.id;
  const { tgl, nama, produk, harga, qty } = req.body;
  const data = {
    tgl: tgl,
    nama: nama,
    produk: produk,
    harga: harga,
    qty: qty,
  };
  try {
    await Transaksi.update(data, {
      where: {
        id: id,
      },
    });
    res.json({ msg: "Update Transaksi Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTransaksi = async (req, res) => {
  const id = req.params.id;
  try {
    await Transaksi.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Berhasil Hapus Transaksi" });
  } catch (error) {
    console.log(error);
  }
};
