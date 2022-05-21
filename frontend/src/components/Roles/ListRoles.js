import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";

const ListRoles = () => {
  // const [name, setName] = useState('');
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [roles, setRoles] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getRoles();
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

  const getRoles = async () => {
    const response = await axiosJwt.get("http://localhost:5000/Roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRoles(response.data);
  };

  function addRoles() {
    history("/add-Roles/_add");
  }

  function editRoles(id) {
    history(`/add-Roles/${id}`);
  }

  function viewRoles(id) {
    history(`/view-Roles/${id}`);
  }

  const deleteRoles = async (id) => {
    var proceed = window.confirm("Apakah anda yakin hapus?");
    if (proceed) {
      const response = await axiosJwt.delete(
        "http://localhost:5000/Roles/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal(response.data.msg);
      const NewRoles = roles.filter((Role) => Role.id !== id);
      setRoles(NewRoles);
    } else {
      // swal('batal hapus');
    }
  };

  function MyComponent() {
    if (role === "admin") {
      return (
        <div>
          <br></br>

          <h3>Data Roles</h3>
          <button onClick={addRoles} className="button is-info">
            Add Role
          </button>
          <br></br>

          <table className="table is-bordered is-fullwidth">
            <thead className="has-background-black">
              <tr>
                <th className="has-text-light has-text-centered"> No </th>
                <th className="has-text-light has-text-centered"> Role </th>

                <th className="has-text-light has-text-centered"> Action </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((user, index) => (
                <tr key={user.id}>
                  <td className="has-text-centered"> {index + 1} </td>
                  <td className="has-text-centered"> {user.role} </td>

                  <td className="has-text-centered">
                    <button
                      onClick={() => editRoles(user.id)}
                      className="button is-info ml-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoles(user.id)}
                      className="button is-danger ml-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => viewRoles(user.id)}
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
      <h1>Roles</h1>
      <hr></hr>
      {MyComponent()}
    </div>
  );
};

export default ListRoles;
