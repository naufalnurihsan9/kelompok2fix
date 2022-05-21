import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";

const ListTransaksi = () => {
  // const [name, setName] = useState('');
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getTransaksi();
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
      if (decode.role !== "user") {
        if (id != decode.userId) {
          history("/home");
        }
      }
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

  const getTransaksi = async () => {
    const response = await axiosJwt.get("http://localhost:5000/transaksi", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransaksi(response.data);
  };

  function addTransaksi() {
    history("/add-Transaksi/_add");
  }

  function editTransaksi(id) {
    history(`/add-Transaksi/${id}`);
  }

  function viewTransaksi(id) {
    history(`/view-Transaksi/${id}`);
  }

  const deleteTransaksi = async (id) => {
    var proceed = window.confirm("Apakah anda yakin hapus?");
    if (proceed) {
      const response = await axiosJwt.delete(
        "http://localhost:5000/Transaksi/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal(response.data.msg);
      const NewTransaksis = transaksi.filter(
        (Transaksi) => Transaksi.id !== id
      );
      setTransaksi(NewTransaksis);
    } else {
      // swal('batal hapus');
    }
  };

  const columns = [
    {
      name: "Id",
      width: "100px",
      selector: (row, index) => index + 1,
      shortable: true,
    },
    {
      name: "Tanggal",
      width: "100px",
      selector: (row) => row.tgl,
      shortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.nama,
      width: "100px",
      sortable: true,
    },
    {
      name: "Produk",
      selector: (row) => row.produk,
      width: "100px",
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      width: "100px",
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      width: "100px",
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.qty * row.harga,
      width: "100px",
      sortable: true,
    },
    {
      name: "Action",
      width: "400px",
      cell: (row) => (
        <div>
          <button
            onClick={() => editTransaksi(row.id)}
            className="button is-default"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTransaksi(row.id)}
            className="button is-danger ml-4"
          >
            Delete
          </button>
          <button
            onClick={() => viewTransaksi(row.id)}
            className="button is-success ml-4"
          >
            View
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const data = transaksi;

  // const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  function MyComponent() {
    return (
      <div>
        <h3>Data Transaksi</h3>
        <button onClick={addTransaksi} className="button is-info">
          Add Transaksi
        </button>
        <DataTable columns={columns} data={data} pagination />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Transaksi</h1>
      <hr></hr>
      {MyComponent()}
    </div>
  );
};

export default ListTransaksi;
