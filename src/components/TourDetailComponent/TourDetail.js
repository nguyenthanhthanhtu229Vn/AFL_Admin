import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function TourDetail() {
  const { idTour } = useParams();
  const [tournament, setTournament] = useState([]);
  const [host, setHost] = useState([])
  const getTournament = () => {
    let afterDefaultURL = `tournaments/${idTour}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTournament(res.data);
        getUserById(res.data.userId)
      })
      .catch((err) => console.error(err));
  };

    //Get User
    const getUserById = async (id) => {
      let afterDefaultURL = `users/${id}`;
      let response = getAPI(afterDefaultURL);
      response
        .then((res) => {
          setHost(res.data);
        })
        .catch((err) => console.error(err));
    };
  const getType = (id) => {
    if (1 === id) {
      return "Loại trực tiếp";
    }
    if (2 === id) {
      return "Đá vòng tròn";
    }
    if (3 === id) {
      return "Đá chia bảng";
    } else {
      return "";
    }
  };

  const getFeild = (id) => {
    if (1 === id) {
      return " | Sân 5";
    }
    if (2 === id) {
      return " | Sân 7";
    }
    if (3 === id) {
      return " | Sân 11";
    } else {
      return "";
    }
  };

  useEffect(() => {
    getTournament();
  }, []);
  return (
    <>
      <ScrollToTop />
      <HeaderLeft id={idTour} />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>{tournament.tournamentName}</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageTournament"} className={styles.another__location}>
              Quản lý giải đấu
            </Link>
            <span>{">>"}</span>
            <Link to={`/tourDetail/${idTour}`} className="current__location">
              {tournament.tournamentName}
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={tournament.tournamentAvatar} alt="khoa" />
              <div className={styles.function}>
                <a href="#">Hủy giải đấu</a>
                <a href="#">Xóa giải đấu</a>
              </div>
            </div>
            <div className={styles.content__leftdown}>
              <h2>Đội bóng tham gia</h2>
              <div className={styles.team__wrap}>
                <p>Tên đội bóng</p>
                <p>
                  FB PLAY
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team2.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team3.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team2.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Thông tin giải đấu</h2>
            <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">Tên giải đấu</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*Tên giải đấu"
                  disabled
                  value={tournament.tournamentName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Người tạo giải</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Người tạo giải"
                  disabled
                  value={host.username}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">Điạ chỉ email</label>
                <input type="text" id="mail" placeholder="*Địa chỉ email" disabled
                  value={host.email}/>
              </div>
              <div className={styles.text}>
                <label htmlFor="gender">Chế độ</label>
                <select id="gender" disabled>
                  <option
                    selected={tournament.mode === "PUBLIC" ? true : false}
                  >
                    Công khai
                  </option>
                  <option
                    selected={tournament.mode === "PRIVATE" ? true : false}
                  >
                    Riêng tư
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Giới tính đội</label>
                <select id="genderf" disabled>
                  <option
                    selected={
                      tournament.tournamentGender === "Male" ? true : false
                    }
                  >
                    Nam
                  </option>
                  <option
                    selected={
                      tournament.tournamentGender === "Female" ? true : false
                    }
                  >
                    Nữ
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEnd">Ngày bắt đầu giải</label>
                <input
                  type="datetime-local"
                  id="dateEnd"
                  disabled
                  value={tournament.tournamentStartDate}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateStart">Ngày bắt đầu giải</label>
                <input
                  type="datetime-local"
                  id="dateStart"
                  disabled
                  value={tournament.tournamentEndDate}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Ngày tạo giải</label>
                <input
                  type="datetime-local"
                  id="dob"
                  disabled
                  value={tournament.dateCreate}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEndRegis">Ngày kết thức đăng ký</label>
                <input
                  type="datetime-local"
                  id="dateEndRegis"
                  disabled
                  value={tournament.registerEndDate}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input type="text" id="phone" placeholder="*Số điện thoại" disabled
                  value={host.phone}/>
              </div>
              <div className={styles.text}>
                <label htmlFor="address">Địa điểm</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*Địa điểm"
                  disabled
                  value={tournament.footballFieldAddress}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="cmnd">Hình thức</label>
                <input type="text" id="cmnd" placeholder="*Hình thức" disabled value={getType(tournament.tournamentTypeId)}/>
              </div>
              <div className={styles.text}>
                <label htmlFor="phoneB">Loại sân</label>
                <input type="text" id="phoneB" placeholder="*Loại sân" disabled value={getFeild(tournament.footballFieldTypeId)} />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">Số đội tham gia</label>
                <input type="text" id="nameB" placeholder="*Số đội tham gia" disabled value={tournament.footballTeamNumber}/>
              </div>
              <div className={styles.text}>
                <label htmlFor="numPlayer">Thành viên mỗi đội</label>
                <input
                  type="text"
                  id="numPlayer"
                  placeholder="*Thành viên mỗi đội"
                  disabled
                  value={tournament.footballPlayerMaxNumber}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="min">Thời gian mỗi trận (phút)</label>
                <input type="text" id="min" placeholder="*Thời gian mỗi trận" disabled value={tournament.matchMinutes}/>
              </div>
            </form>
            <Link to={"/manageTournament"} className={styles.button}>Hoàn tất</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourDetail;
