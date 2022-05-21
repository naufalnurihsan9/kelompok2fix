import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ListCustomer = () => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [customer, setCustomer] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getCustomer();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
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
        setRole(decode.role);
        setExpired(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getCustomer = async () => {
    const response = await axiosJwt.get("http://localhost:5000/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCustomer(response.data);
  };

  function addCustomer() {
    history("/add-Customer/_add");
  }

  function editCustomer(id) {
    history(`/add-Customer/${id}`);
  }

  function viewCustomer(id) {
    history(`/view-Customer/${id}`);
  }

  const deleteCustomer = async (id) => {
    var proceed = window.confirm("Apakah anda yakin hapus?");
    if (proceed) {
      const response = await axiosJwt.delete(
        "http://localhost:5000/customer/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal(response.data.msg);
      const NewCustomer = customer.filter((customer) => customer.id !== id);
      setCustomer(NewCustomer);
    } else {
      // swal('batal hapus');
    }
  };

  function MyComponent() {
    if (role === "admin") {
      return (
        <div>
          <br></br>

          <h3>Data Customer</h3>
          <button onClick={addCustomer} className="button is-info">
            Add Customer
          </button>
          <br></br>

          <table className="table is-bordered is-fullwidth">
            <thead className="has-background-black">
              <tr>
                <th className="has-text-light has-text-centered"> No </th>
                <th className="has-text-light has-text-centered"> Nama </th>
                <th className="has-text-light has-text-centered"> Email </th>

                <th className="has-text-light has-text-centered"> Action </th>
              </tr>
            </thead>
            <tbody>
              {customer.map((user, index) => (
                <tr key={user.id}>
                  <td className="has-text-centered"> {index + 1} </td>
                  <td className="has-text-centered"> {user.name} </td>
                  <td className="has-text-centered"> {user.email} </td>

                  <td className="has-text-centered">
                    <button
                      onClick={() => editCustomer(user.id)}
                      className="button is-info ml-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(user.id)}
                      className="button is-danger ml-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => viewCustomer(user.id)}
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
    } else {
      return (
        <div>
          <h3>Aplikasi React Js</h3>
        </div>
      );
    }
  }

  return (
    <div className="container mt-5">
      <hr></hr>
      {MyComponent()}
    </div>
  );
};

export default ListCustomer;
