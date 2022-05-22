import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

const CreateTransaksi = () => {
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [produk, setProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [qty, setQty] = useState(0);
  const history = useNavigate();
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const axiosJwt = axios.create();
  const [namas, setNamas] = useState([]);
  const [produks, setProduks] = useState([]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      // setNama(decode.name);
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
        // setNama(decode.name);
        setExpired(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    refreshToken();
    cekId();
    getNameCustomer();
    getProduk();
    // eslint-disable-next-line
  }, []);

  const cekId = async () => {
    if (id === "_add") {
      setNama("");
      setHarga(0);
      setTanggal("");
      setProduk("");
      setQty("");
      return;
    } else {
      const res = await axiosJwt.get("http://localhost:5000/Transaksi/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let Transaksi = res.data;
      setId(Transaksi.id);
      setNama(Transaksi.nama);
      setTanggal(Transaksi.tanggal);
      setProduk(Transaksi.produk);
      setHarga(Transaksi.harga);
      setQty(Transaksi.qty);
    }
  };

  const saveOrUpdateTransaksi = async (e) => {
    e.preventDefault();
    let Transaksi = {
      nama: nama,
      harga: harga,
      tgl: tanggal,
      produk: produk,
      qty: qty,
    };

    if (id === "_add") {
      await axios
        .post("http://localhost:5000/Transaksi", Transaksi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          swal(res.data.msg);
          history("/transaksi");
        });
    } else {
      await axios
        .put("http://localhost:5000/Transaksi/" + id, Transaksi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          swal(res.data.msg);
          history("/transaksi");
        });
    }
  };

  function cancel() {
    history("/transaksi");
  }

  function getTitle() {
    if (id === "_add") {
      return <h3 className="text-center">Add Transaksi</h3>;
    } else {
      return <h3 className="text-center">Update Transaksi</h3>;
    }
  }

  const getNameCustomer = async () => {
    const response = await axiosJwt.get("http://localhost:5000/Customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNamas(response.data);
    setNama(response.data[0].name);
  };

  const getProduk = async () => {
    const response = await axiosJwt.get("http://localhost:5000/Produk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProduks(response.data);
    setProduk(response.data[0].nama);
    setHarga(response.data[0].harga);
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Tanggal </label>
                <input
                  placeholder="Tanggal"
                  name="tanggal"
                  className="form-control"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                />
              </div>
              <div className="form-group">
                <label>Name Customer</label>
                <select
                  className="input"
                  name="namas"
                  id="namas"
                  onChange={(e) => setNama(e.target.value)}
                  defaultValue={nama}
                >
                  {namas.map((name) => (
                    <option key={name.id}>{name.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Produk </label>
                <select
                  className="input"
                  name="produks"
                  id="produks"
                  onChange={(e) => setNama(e.target.value)}
                  defaultValue={nama}
                >
                  {produks.map((produk) => (
                    <option key={produk.id}>{produk.nama}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Harga</label>
                <input
                  placeholder="Harga"
                  name="harga"
                  type="number"
                  className="form-control"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Qty</label>
                <input
                  placeholder="Qty"
                  name="qty"
                  type="number"
                  className="form-control"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
              <br></br>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateTransaksi}
              >
                Simpan
              </button>
              <button className="btn btn-danger ml-4" onClick={cancel}>
                Batal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaksi;
//test
