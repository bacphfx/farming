import "./datatable.scss";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data } = useFetch("http://localhost:5000/api/users/get-all");

  useEffect(() => {
    setList(data.data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <div className="table table-striped">
        <table class="fl-table">
          <tr>
            <th>Full Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
          {list?.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.fullname}</td>
                <td>{val.telephone}</td>
                <td>{val.email}</td>
                <td>{val.isAdmin ? "true" : "false"}</td>
                <td>
                  <Link
                    to={`/users/${val._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="viewButton">View</div>
                  </Link>
                </td>
                <td>
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(val._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Datatable;
