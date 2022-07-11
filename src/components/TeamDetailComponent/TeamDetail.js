import { load } from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function TeamDetail() {
  const { idTeam } = useParams();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSke, setLoadingSke] = useState(false);
  const [manager, setManager] = useState([]);
  const [limit, setLimit] = useState(6);
  const [allTeam, setAllTeam] = useState([]);
  const [height, setHeight] = useState(0);
  const infiniteScroll = (event) => {
    if (
      height.scrollHeight - Math.round(height.scrollTop) ===
      height.clientHeight
    ) {
      setLimit(limit + 4);
    }
  };

  const getTeamByIdPlayer = () => {
    setLoadingSke(true);
    let afterDefaultURL = `PlayerInTeam?teamId=${idTeam}&status=true&orderType=DESC&pageIndex=1&limit=${limit}`;
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

  const getTeam = () => {
    setLoading(true);
    let afterDefaultURL = `teams/${idTeam}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTeam(res.data);
        getUserById(idTeam);
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
      });
  };

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    getTeamByIdPlayer();
  }, [limit]);
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

  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft id={idTeam} />
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
                    <p>Họ và tên</p>
                    {allTeam.map((item,index) => (
                      <>
                        <Link to={`/playerDetail/${item.footballPlayerId}`} key={item.id}>
                          <p >
                            {item.footballPlayer.playerName}
                            <img
                              src={item.footballPlayer.playerAvatar}
                              alt={item.footballPlayer.playerName}
                            />
                          </p>
                        </Link>
                      </>
                    ))}
                    {loadingSke ? <LoadingCircle /> : null}
                  </>
                ) : (
                  <p>Chưa cầu thủ nào tham gia</p>
                )}
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
                <input
                  type="text"
                  id="mail"
                  placeholder="*Địa chỉ email"
                  disabled
                  value={manager.email}
                />
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
                <p>{formatDateTime(team.dateCreate)}</p>
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
            </form>
            <Link to={"/manageTeam"} className={styles.button}>
              Hoàn tất
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamDetail;
