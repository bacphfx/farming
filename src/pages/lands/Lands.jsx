import "./lands.scss";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [lands, setLands] = useState();
  const { data } = useFetch("http://localhost:5000/api/lands/get-all");

  useEffect(() => {
    setLands(data.data);
  }, [data]);

  const OrganizationName = ({ id }) => {
    const [name, setName] = useState();
    const { data } = useFetch(
      `http://localhost:5000/api/organization/get/${id}`
    );
    useEffect(() => {
      setName(data?.data);
    }, [data]);

    return <span>{name?.ten_to_chuc}</span>;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lands/delete/${id}`);
      setLands(lands.filter((item) => item._id !== id));
      // console.log(lands);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
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
                <th>Tên mảnh đất</th>
                <th>Tên tổ chức</th>
                <th>Địa chỉ</th>
              </tr>
              {lands?.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.ten}</td>
                    <td>
                      <OrganizationName id={val.orgId} />
                    </td>
                    <td>{val?.thon_xom}</td>
                    <td>
                      <Link
                        to={`/lands/${val._id}`}
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
      </div>
    </div>
  );
};

export default Datatable;
