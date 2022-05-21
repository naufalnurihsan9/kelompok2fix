import Express from "express";
import {
  getusers,
  Register,
  Login,
  Logout,
  getuserbyid,
  getuserbyname,
  UpdateUser,
  DeleteUser,
  AddUser,
  UpdatePassword,
} from "../controllers/Users.js";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  AddProduk,
  DeleteProduk,
  getProduk,
  getProdukbyid,
  getProdukbyname,
  UpdateProduk,
} from "../controllers/Produk.js";
import {
  AddRoles,
  DeleteRoles,
  getRoles,
  getRolesbyid,
  getRolesbyname,
  UpdateRoles,
} from "../controllers/Roles.js";
import {
  AddTransaksi,
  DeleteTransaksi,
  getTransaksi,
  getTransaksiByid,
  getTransaksibyname,
  UpdateTransaksi,
} from "../controllers/Transaksi.js";
import {
  AddCustomer,
  DeleteCustomer,
  getCustomerByName,
  getCustomers,
  getCustomersById,
  UpdateCustomer,
} from "../controllers/Customer.js";
const router = Express.Router();

router.get("/users", verifyToken, getusers);
router.get("/users/:id", verifyToken, getuserbyid);
router.get("/userbyname", verifyToken, getuserbyname);
router.post("/users", Register);
router.post("/adduser", verifyToken, AddUser);
router.put("/users/:id", verifyToken, UpdateUser);
router.put("/resetpassword/:id", verifyToken, UpdatePassword);
router.delete("/users/:id", verifyToken, DeleteUser);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//route produk
router.get("/produk", verifyToken, getProduk);
router.get("/produk/:id", verifyToken, getProdukbyid);
router.get("/produkbyname", verifyToken, getProdukbyname);
router.post("/produk", verifyToken, AddProduk);
router.put("/produk/:id", verifyToken, UpdateProduk);
router.delete("/produk/:id", verifyToken, DeleteProduk);

//route roles
router.get("/roles", getRoles);
router.get("/roles/:id", getRolesbyid);
router.get("/rolesbyname", getRolesbyname);
router.post("/roles", verifyToken, AddRoles);
router.put("/roles/:id", verifyToken, UpdateRoles);
router.delete("/roles/:id", verifyToken, DeleteRoles);

//route Transaksi
router.get("/transaksi", verifyToken, getTransaksi);
router.get("/transaksi/:id", verifyToken, getTransaksiByid);
router.get("/transaksibyname", verifyToken, getTransaksibyname);
router.post("/transaksi", verifyToken, AddTransaksi);
router.put("/transaksi/:id", verifyToken, UpdateTransaksi);
router.delete("/transaksi/:id", verifyToken, DeleteTransaksi);

//route Customer

router.get("/customer", verifyToken, getCustomers);
router.get("/customer/:id", verifyToken, getCustomersById);
router.get("/customerbyname", verifyToken, getCustomerByName);
router.post("/customer", verifyToken, AddCustomer);
router.put("/customer/:id", verifyToken, UpdateCustomer);
router.delete("/customer/:id", verifyToken, DeleteCustomer);

export default router;
