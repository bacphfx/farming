import "./editUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { data } = useFetch(`http://localhost:5000/api/users/get/${userId}`);

  useEffect(() => {
    setUser(data.data);
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        info
      );

      if (res.status === 200) {
        navigate(`/users/${user._id}`);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                user?.avata
                  ? `http://103.130.213.34:5000/${user.avata}`
                  : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Fullname</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.fullname}
                  id="fullname"
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.telephone}
                  id="telephone"
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.email}
                  id="email"
                />
              </div>
              <div className="formInput">
                <label>Thôn (xóm)</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.thon_xom}
                  id="thon_xom"
                />
              </div>
              <div className="formInput">
                <label>Phường (xã)</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.xa_phuong}
                  id="xa_phuong"
                />
              </div>
              <div className="formInput">
                <label>Quận (huyện)</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.quan_huyen}
                  id="quan_huyen"
                />
              </div>
              <div className="formInput">
                <label>Tỉnh (thành phố)</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.tinh_tp}
                  id="tinh_tp"
                />
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
            {error && <span className="error">{error.message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
