import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ViewTransaksi = () => {
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [produk, setProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [qty, setQty] = useState("");
  const history = useNavigate();
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const axiosJwt = axios.create();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      //   setName(decode.name);
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
    // eslint-disable-next-line
  }, []);

  const cekId = async () => {
    const res = await axiosJwt.get("http://localhost:5000/transaksi/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let Transaksi = res.data;
    setId(Transaksi.id);
    setNama(Transaksi.nama);
    setTanggal(Transaksi.tgl);
    setProduk(Transaksi.produk);
    setHarga(Transaksi.harga);
    setQty(Transaksi.qty);
  };

  function cancel() {
    history("/transaksi");
  }

  function getTitle() {
    return <h3 className="text-center">View Transaksi</h3>;
  }

  function numberWithCommas(harga) {
    return harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <br></br>

            {getTitle()}

            <br></br>

            <div className="columns is-flex is-centered">
              <figure className="image is-128x128">
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                  alt="logo"
                />
              </figure>
            </div>

            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Nama : {nama}</label>
                </div>
                <div className="form-group">
                  <label>Tanggal : {tanggal}</label>
                </div>
                <div className="form-group">
                  <label>Nama Produk : {produk}</label>
                </div>
                <div className="form-group">
                  <label>Harga : Rp. {numberWithCommas(harga)}</label>
                </div>
                <div className="form-group">
                  <label>Qty : {qty}</label>
                </div>
                <div className="form-group">
                  <label>Total : Rp. {numberWithCommas(qty * harga)} </label>
                </div>
                <br></br>
                <button className="btn btn-danger" onClick={cancel}>
                  Batal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransaksi;
