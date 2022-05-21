import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";

const ListProduk = () => {
  // const [name, setName] = useState('');
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [produk, setProduk] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getProduks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      // setName(decode.name);
      setRole(decode.role);
      setExpired(decode.exp);
    } catch (error) {
      if (error.response) {
        history("/");
      }
    }
  };

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        // setName(decode.name);
        setRole(decode.role);
        setExpired(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getProduks = async () => {
    const response = await axiosJwt.get("http://localhost:5000/produk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProduk(response.data);
  };

  function addProduk() {
    history("/add-Produk/_add");
  }

  function editProduk(id) {
    history(`/add-Produk/${id}`);
  }

  function viewProduk(id) {
    history(`/view-Produk/${id}`);
  }

  const deleteProduk = async (id) => {
    var proceed = window.confirm("Apakah anda yakin hapus?");
    if (proceed) {
      const response = await axiosJwt.delete(
        "http://localhost:5000/Produk/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal(response.data.msg);
      const NewProduks = produk.filter((Produk) => Produk.id !== id);
      setProduk(NewProduks);
    } else {
      // swal('batal hapus');
    }
  };

  function numberWithCommas(harga) {
    return harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  }

  function MyComponent() {
    return (
      <div>
        <br></br>

        <h3>Data Produk</h3>
        <button onClick={addProduk} className="button is-info">
          Add Produk
        </button>
        <br></br>

        <table className="table is-bordered is-fullwidth">
          <thead className="has-background-black">
            <tr>
              <th className="has-text-light has-text-centered"> No </th>
              <th className="has-text-light has-text-centered"> Nama </th>
              <th className="has-text-light has-text-centered"> Harga </th>

              <th className="has-text-light has-text-centered"> Action </th>
            </tr>
          </thead>
          <tbody>
            {produk.map((user, index) => (
              <tr key={user.id}>
                <td className="has-text-centered"> {index + 1} </td>
                <td className="has-text-centered"> {user.nama} </td>
                <td className="has-text-centered ">
                  Rp. {numberWithCommas(user.harga)}
                </td>

                <td className="has-text-centered">
                  <button
                    onClick={() => editProduk(user.id)}
                    className="button is-info ml-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduk(user.id)}
                    className="button is-danger ml-4"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => viewProduk(user.id)}
                    className="button is-primary ml-4"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Produk</h1>
      <hr></hr>
      {MyComponent()}
    </div>
  );
};

export default ListProduk;
