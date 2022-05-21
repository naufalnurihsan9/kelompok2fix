import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Transaksi = db.define(
  "transaksi",
  {
    tgl: {
      type: DataTypes.DATEONLY,
    },
    nama: {
      type: DataTypes.STRING,
    },
    produk: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.INTEGER,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Transaksi;
