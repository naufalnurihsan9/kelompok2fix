import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Home = () => {
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      setName(decode.name);
      setRole(decode.role);
      setExpired(decode.exp);
      if (decode.role !== "admin") {
        if (id != decode.userId) {
          history("/produk");
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
        setName(decode.name);
        setRole(decode.role);
        setExpired(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJwt.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  function addUser() {
    history("/add-User/_add");
  }

  function editUser(id) {
    history(`/add-User/${id}`);
  }

  function viewUser(id) {
    history(`/view-User/${id}`);
  }

  const deleteUser = async (id) => {
    var proceed = window.confirm("Apakah anda yakin hapus?");
    if (proceed) {
      const response = await axiosJwt.delete(
        "http://localhost:5000/users/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal(response.data.msg);
      const NewUsers = users.filter((user) => user.id !== id);
      setUsers(NewUsers);
    } else {
      // swal('batal hapus');
    }
  };

  function gantiPassword(id) {
    history(`/gantiPassword/${id}`);
  }

  function MyComponent() {
    if (role === "admin") {
      return (
        <div>
          <br></br>

          <h3>Data User</h3>
          <button onClick={addUser} className="button is-info">
            Add User
          </button>
          <br></br>

          <table className="table is-bordered is-fullwidth">
            <thead className="has-background-black">
              <tr>
                <th className="has-text-light has-text-centered"> No </th>
                <th className="has-text-light has-text-centered"> Nama </th>
                <th className="has-text-light has-text-centered"> Email </th>
                <th className="has-text-light has-text-centered"> Role </th>

                <th className="has-text-light has-text-centered"> Action </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="has-text-centered"> {index + 1} </td>
                  <td className="has-text-centered"> {user.name} </td>
                  <td className="has-text-centered"> {user.email} </td>
                  <td className="has-text-centered"> {user.role} </td>

                  <td className="has-text-centered">
                    <button
                      onClick={() => editUser(user.id)}
                      className="button is-info ml-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="button is-danger ml-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => viewUser(user.id)}
                      className="button is-primary ml-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => gantiPassword(user.id)}
                      className="button is-warning ml-4"
                    >
                      Ganti Password
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
      <h3 className="has-text-centered">Selamat datang {name} di Bootcamp</h3>
      <h5 className="has-text-centered">Anda login sebagai {role}</h5>
      <hr></hr>
      {MyComponent()}

      {/* <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(user.id)}
                  className='button is-default'>Edit</button>
                <button style={{ marginleft: "10px" }}
                  onClick={() => deleteUser(user.id)}
                  className='button is-danger'>Delete</button>
                <button style={{ marginleft: "10px" }}
                  onClick={() => viewUser(user.id)}
                  className='button is-success'>View</button>
                <button style={{ marginleft: "10px" }}
                  onClick={() => gantiPassword(user.id)}
                  className='button is-warning'>Ganti Password</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Home;
