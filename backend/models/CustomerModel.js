import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Customer = db.define(
  "customer",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Customer;
