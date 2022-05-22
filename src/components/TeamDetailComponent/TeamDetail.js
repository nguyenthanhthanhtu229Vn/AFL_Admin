import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function TeamDetail() {
  const { idTeam } = useParams();
  const [team, setTeam] = useState([]);
  const [manager, setManager] = useState([]);
  const getTeam = () => {
    let afterDefaultURL = `teams/${idTeam}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTeam(res.data);
        getUserById(idTeam);
      })
      .catch((err) => console.error(err));
  };

  //Get User
  const getUserById = async (id) => {
    let afterDefaultURL = `users/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setManager(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTeam();
  }, []);
  return (
    <>
      <ScrollToTop />
      <HeaderLeft id={idTeam}/>
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>{team.teamName}</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageTeam"} className={styles.another__location}>
              Quản lý đội bóng
            </Link>
            <span>{">>"}</span>
            <Link to={`/teamDetail/${idTeam}`} className="current__location">
              {team.teamName}
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={team.teamAvatar} alt={team.teamName} />
              <div className={styles.function}>
                <a href="#">Xóa đội bóng</a>
              </div>
            </div>
            <div className={styles.content__leftdown}>
              <h2>Thành viên</h2>
              <div className={styles.team__wrap}>
                <p>Họ và tên</p>
                <p>
                  Nguyễn Thanh Thanh Tú
                  <img src="/assets/img/homepage/pic-1.png" alt="team" />
                </p>
                <p>
                  Nguyễn Tuấn Anh
                  <img src="/assets/img/homepage/pic-2.png" alt="team" />
                </p>
                <p>
                  Trương Anh Khoa
                  <img src="/assets/img/homepage/pic-3.png" alt="team" />
                </p>
                <p>
                  Nguyễn Văn Tâm
                  <img src="/assets/img/homepage/pic-4.png" alt="team" />
                </p>
                <p>
                  Nguyễn Thanh Thanh Tú
                  <img src="/assets/img/homepage/pic-1.png" alt="team" />
                </p>
                <p>
                  Nguyễn Tuấn Anh
                  <img src="/assets/img/homepage/pic-2.png" alt="team" />
                </p>
                <p>
                  Trương Anh Khoa
                  <img src="/assets/img/homepage/pic-3.png" alt="team" />
                </p>
                <p>
                  Nguyễn Văn Tâm
                  <img src="/assets/img/homepage/pic-4.png" alt="team" />
                </p>
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Thông tin đội bóng</h2>
            <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">Tên đội bóng</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*Tên đội bóng"
                  disabled
                  value={team.teamName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Người quản lý</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Người quản lý"
                  disabled
                  value={manager.username}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">Điạ chỉ email</label>
                <input type="text" id="mail" placeholder="*Địa chỉ email" disabled value={manager.email}/>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Giới tính đội</label>
                <select id="genderf" disabled>
                  <option
                    value="Male"
                    selected={team.gender === "Male" ? true : false}
                  >
                    Nam
                  </option>
                  <option
                    value="Female"
                    selected={team.gender === "Female" ? true : false}
                  >
                    Nữ
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Ngày tạo đội</label>
                <input
                  type="datetime-local"
                  id="dob"
                  disabled
                  value={team.dateCreate}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*Số điện thoại"
                  disabled
                  value={team.teamPhone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*Địa chỉ"
                  disabled
                  value={team.teamArea}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">Số cầu thủ tham gia</label>
                <input
                  type="text"
                  id="nameB"
                  placeholder="*Số cầu thủ tham gia"
                  disabled
                  value={team.numberPlayerInTeam}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="bio">Mô tả đội bóng</label>
                <input
                  type="text"
                  id="bio"
                  placeholder="*Mô tả đội bóng"
                  disabled
                  value={team.description}
                />
              </div>
            </form>
            <Link to={"/manageTeam"} className={styles.button}>Hoàn tất</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamDetail;
