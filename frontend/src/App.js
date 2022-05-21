import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import CreateCustomer from "./components/customer/CreateCustomer";
import ListCustomer from "./components/customer/ListCustomer";
import ViewCustomer from "./components/customer/ViewCustomer";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CreateProduk from "./components/Produk/CreateProduk";
import ListProduk from "./components/Produk/ListProduk";
import ViewProduk from "./components/Produk/ViewProduk";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import CreateRoles from "./components/Roles/CreateRoles";
import ListRoles from "./components/Roles/ListRoles";
import ViewRoles from "./components/Roles/ViewRoles";

import ViewUser from "./components/ViewUser";
import ViewTransaksi from "./components/Transaksi/ViewTransaksi";
import ListTransaksi from "./components/Transaksi/ListTransaksi";
import CreateTransaksi from "./components/Transaksi/CreateTransaksi";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <>
                {" "}
                <Navbar />
                <Home />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/add-User/:id"
            element={
              <>
                {" "}
                <Navbar />
                <CreateUser />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/view-User/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ViewUser />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/gantiPassword/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ResetPassword />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/produk"
            element={
              <>
                {" "}
                <Navbar />
                <ListProduk />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/add-Produk/:id"
            element={
              <>
                {" "}
                <Navbar />
                <CreateProduk />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/view-Produk/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ViewProduk />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/roles"
            element={
              <>
                {" "}
                <Navbar />
                <ListRoles />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/add-Roles/:id"
            element={
              <>
                {" "}
                <Navbar />
                <CreateRoles />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/view-Roles/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ViewRoles />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/customer"
            element={
              <>
                {" "}
                <Navbar />
                <ListCustomer />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/add-Customer/:id"
            element={
              <>
                {" "}
                <Navbar />
                <CreateCustomer />
                <Footer />{" "}
              </>
            }
          ></Route>
          <Route
            path="/view-Customer/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ViewCustomer />
                <Footer />{" "}
              </>
            }
          ></Route>
           <Route
            path="/view-Transaksi/:id"
            element={
              <>
                {" "}
                <Navbar />
                <ViewTransaksi />
                <Footer />{" "}
              </>
            }
          ></Route>
           <Route
            path="/add-Transaksi/:id"
            element={
              <>
                {" "}
                <Navbar />
                <CreateTransaksi />
                <Footer />{" "}
              </>
            }
          ></Route>
           <Route
            path="/transaksi"
            element={
              <>
                {" "}
                <Navbar />
                <ListTransaksi/>
                <Footer />{" "}
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
