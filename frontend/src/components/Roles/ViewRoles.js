import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ViewRoles = () => {
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [role, setRole] = useState("");
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
    const res = await axiosJwt.get("http://localhost:5000/Roles/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let User = res.data;
    setId(User.id);
    setRole(User.role);
  };

  function cancel() {
    history("/Roles");
  }

  function getTitle() {
    return <h3 className="text-center">View Roles</h3>;
  }

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <br></br>

            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group ">
                  <label className="is-size-5 has-text-weight-semibold ml-5">
                    Id Role :
                  </label>
                  <label className="is-size-5 ml-5">{id}</label>
                </div>
                <br></br>
                <div className="form-group ">
                  <label className="is-size-5 has-text-weight-semibold ml-5">
                    Nama Role :
                  </label>
                  <label className="is-size-5 ml-5">{role}</label>
                </div>
                <br></br>
                <button className="button is-danger ml-5 mb-5" onClick={cancel}>
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

export default ViewRoles;
