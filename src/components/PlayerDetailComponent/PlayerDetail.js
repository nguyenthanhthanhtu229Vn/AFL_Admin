import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function PlayerDetail() {
  const { idPlayer } = useParams();
  const [player, setPlayer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSke, setLoadingSke] = useState(false);
  const [manager, setManager] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [height, setHeight] = useState(0);
  const [limit, setLimit] = useState(6);
  const infiniteScroll = (event) => {
    if (
      height.scrollHeight - Math.round(height.scrollTop) ===
      height.clientHeight
    ) {
      setLimit(limit + 4);
    }
  };

  const getTeam = () => {
    setLoading(true);
    let afterDefaultURL = `football-players/${idPlayer}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setPlayer(res.data);
        getUserById(idPlayer);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Get User
  const getUserById = async (id) => {
    let afterDefaultURL = `users/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setManager(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const changePosition = (data) => {
    if (data === "goalkeeper") return "Thủ môn";
    else if (data === "defender") return "Hậu vệ";
    else if (data === "midfielder") return "Tiền vệ";
    else return "Tiền đạo";
  };

  const getTeamByIdPlayer = () => {
    setLoadingSke(true);
    let afterDefaultURL = `PlayerInTeam?footballPlayerId=${idPlayer}&status=true&orderType=DESC&pageIndex=1&limit=${limit}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAllTeam(res.data.playerInTeamsFull);
        setLoadingSke(false);
      })
      .catch((err) => {
        setLoadingSke(false);
        console.error(err);
      });
  };
  // format Date
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };

  // format DateTime
  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0") +
      " - " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };

  useEffect(()=>{
    getTeam();
  },[])
  
  useEffect(() => {
    getTeamByIdPlayer();
  }, [limit]);
  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft id={idPlayer} />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>{player.playerName}</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/managePlayer"} className={styles.another__location}>
              Quản lý cầu thủ
            </Link>
            <span>{">>"}</span>
            <Link
              to={`/playerDetail/${idPlayer}`}
              className="current__location"
            >
              {player.playerName}
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={player.playerAvatar} alt={player.playerName} />
              <div className={styles.function}>
                <a href="#">Xóa cầu thủ</a>
              </div>
            </div>
            <div className={styles.content__leftdown}>
              <h2>Đội tham gia</h2>
              <div
                className={styles.team__wrap}
                ref={(divElement) => {
                  setHeight(divElement);
                }}
                onScroll={(e) => {
                  infiniteScroll(e);
                }}
              >
                {allTeam.length !== 0 ? (
                  <>
                    <p>Tên đội bóng</p>
                    {allTeam.map((item) => (
                      <>
                        <Link to={`/teamDetail/${item.team.id}`} key={item.id}>
                        <p>
                          {item.team.teamName}
                          <img
                            src={item.team.teamAvatar}
                            alt={item.team.teamName}
                          />
                        </p>
                          </Link>
                      </>
                    ))}
                    {loadingSke ?<LoadingCircle/> : null}
                  </>
                ) : (
                  <p>Chưa tham gia đội bóng nào</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Thông tin cầu thủ</h2>
            <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">Tên cầu thủ</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*Tên cầu thủ"
                  disabled
                  value={player.playerName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Vị trí</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Vị trí"
                  disabled
                  value={changePosition(player.position)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">Điạ chỉ email</label>
                <input
                  type="text"
                  id="mail"
                  placeholder="*Địa chỉ email"
                  disabled
                  value={manager.email}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Ngày sinh</label>
                <p>{formatDate(manager.dateOfBirth)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Giới tính cầu thủ</label>
                <select id="genderf" disabled>
                  <option
                    value="Male"
                    selected={manager.gender === "Male" ? true : false}
                  >
                    Nam
                  </option>
                  <option
                    value="Female"
                    selected={manager.gender === "Female" ? true : false}
                  >
                    Nữ
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Ngày tạo cầu thủ</label>
                <p>{formatDateTime(player.dateCreate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*Số điện thoại"
                  disabled
                  value={manager.phone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*Địa chỉ"
                  disabled
                  value={manager.address}
                />
              </div>
            </form>
            <Link to={"/managePlayer"} className={styles.button}>
              Hoàn tất
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerDetail;
