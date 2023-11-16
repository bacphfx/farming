import "./singleLand.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Single = () => {
  const { landId } = useParams();
  const [land, setLand] = useState({});
  const { data } = useFetch(`http://localhost:5000/api/lands/get/${landId}`);
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
  const UserName = ({ id }) => {
    const [name, setName] = useState();
    const { data } = useFetch(`http://localhost:5000/api/users/get/${id}`);
    useEffect(() => {
      setName(data?.data);
    }, [data]);

    return <span>{name?.fullname}</span>;
  };

  useEffect(() => {
    setLand(data.data);
  }, [data]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link
              to={`/lands/update/${land?._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* {land?.imagePath.map((img) => ( */}
              <img
                src={
                  land?.imagePath
                    ? `http://103.130.213.34:5000/${land.imagePath[0]}`
                    : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                }
                alt=""
                className="itemImg"
              />
              {/* ))} */}

              <div className="details">
                <h1 className="itemTitle">{land?.ten}</h1>
                <div className="detailItem">
                  <span className="itemKey">Tên tổ chức:</span>
                  <span className="itemValue">
                    <OrganizationName id={land?.orgId} />
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Người tạo:</span>
                  <span className="itemValue">
                    <UserName id={land?.userId} />
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {`${land?.thon_xom}, ${land?.xa_phuong}, ${land?.quan_huyen}, ${land?.tinh_tp}.`}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Kích thước:</span>
                  <span className="itemValue">{land?.kich_thuoc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tọa độ:</span>
                  <span className="itemValue">{land?.toa_do}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tình trạng:</span>
                  <span className="itemValue">{land?.tinh_trang}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Chi phí:</span>
                  <span className="itemValue">{land?.chi_phi}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Thổ nhưỡng:</span>
                  <span className="itemValue">Xem chi tiết</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Thời vụ:</span>
                  <span className="itemValue">Xem chi tiết</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tưới tiêu:</span>
                  <span className="itemValue">Xem chi tiết</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Làm cỏ:</span>
                  <span className="itemValue">Xem chi tiết</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dinh Dưỡng:</span>
                  <span className="itemValue">Xem chi tiết</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
