import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import { toast } from "react-toastify";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import { getReportByFootballPlayerIdAPI } from "../../api/ReportAPI";
import ReactPaginate from "react-paginate";
import { takeFlagForUserAPI } from "../../api/UserAPI";
import FlagUserComponet from "../FlagUserComponent";
import Swal from "sweetalert2";
import { changStatusReport } from "../../utils/ChangeStatusReport";
import { postNotification } from "../../api/Notification";
function PlayerDetail() {
  const { idPlayer } = useParams();
  const [player, setPlayer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSke, setLoadingSke] = useState(false);
  const [manager, setManager] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [height, setHeight] = useState(0);
  const [limit, setLimit] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [report, setReport] = useState(null);

  const HandleClick = () => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Đánh cờ cầu thủ này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5fe37d",
      cancelButtonColor: "#b80e4e",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      customClass: {
        icon: styles.no_before_icon,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        takeFlagForHost();
      }
    });
  };
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

  const postNotificateForUser = async () => {
    try {
      const data = {
        content: "Cảnh báo đánh cờ vì bị nhiều báo cáo",
        forAdmin: false,
        userId: manager.id,
        tournamentId: 0,
        teamId: 0,
        footballPlayerId: 0,
      };
      const response = await postNotification(data);
    } catch (err) {
      console.log(err);
    }
  };
  const changeStatusReportTeam = async () => {
    await changStatusReport([...report.reports]);
  };
  const takeFlagForHost = async () => {
    await changeStatusReportTeam();
    try {
      const data = {
        ...manager,
        id: manager.id,
        flagReportFootballPlayer: manager.flagReportFootballPlayer + 1,
      };

      const response = await takeFlagForUserAPI(data);
      if (response.status === 201) {
        getUserById(manager.id);
        getReportByFootballID();
        setCurrentPage(1);
        toast.success("Gắn cờ cầu thủ thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await postNotificateForUser();
      }
    } catch (err) {
      console.error(err);
    }
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

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    getTeamByIdPlayer();
  }, [limit]);

  useEffect(() => {
    getReportByFootballID();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const getReportByFootballID = async () => {
    try {
      const response = await getReportByFootballPlayerIdAPI(
        idPlayer,
        currentPage
      );

      if (response.status === 200) {
        setReport(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changeDate = (data) => {
    const date = data.split(" ")[0];
    console.log(data);
    return (
      date.split("/")[1] +
      "/" +
      date.split("/")[0] +
      "/" +
      date.split("/")[2] +
      " " +
      data.split(" ")[1].split(":")[0] +
      ":" +
      data.split(" ")[1].split(":")[1]
    );
  };
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
        {report !== null && report.countList > 0 ? (
          <h2
            style={{
              color: "red",
              marginTop: 30,
              fontSize: 24,
            }}
          >
            Có {report.countList} báo cáo về cầu thủ này
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={player.playerAvatar} alt={player.playerName} />
              <div className={styles.function}>
                {report !== null && report.reports.length >= 10 ? (
                  <div className={styles.function}>
                    <a
                      onClick={() => {
                        HandleClick();
                      }}
                    >
                      Đánh cờ cầu thủ
                    </a>
                  </div>
                ) : null}
              </div>
              {manager !== null && manager.flagReportFootballPlayer >= 3 ? (
                manager.status === true ? (
                  <FlagUserComponet user={manager} getUserById={getUserById} />
                ) : (
                  <div>
                    <h1
                      style={{
                        color: "red",
                        fontSize: 24,
                        margin: "10px 0",
                      }}
                    >
                      Cảnh báo
                    </h1>
                    <p
                      style={{
                        lineHeight: 1.2,
                        fontSize: 20,
                      }}
                    >
                      Tài khoản chủ sở hữu cầu thủ đã bị khóa
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <h1 className={styles.titleWarning}>Cảnh báo</h1>
                  <p className={styles.contentWarning}>
                    Khi cầu thủ bị đánh cờ hơn 3 lần , chặn tài khoản sẽ xuất
                    hiện
                  </p>
                </div>
              )}
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
                    {loadingSke ? <LoadingCircle /> : null}
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
        <div className={styles.wrapReport}>
          <h2>Thông tin báo cáo của cầu thủ</h2>

          {report !== null && report.reports.length > 0 ? (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Lí do</th>
                    <th scope="col">Ngày báo cáo</th>
                    <th scope="col">Từ</th>
                  </tr>
                </thead>
                <tbody>
                  {report.reports.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.reason}</td>
                        <td>{changeDate(item.dateReport)}</td>
                        <td>{item.user.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Trang trước"}
                nextLabel={"Trang sau"}
                containerClassName="pagination"
                activeClassName={styles.active}
                pageClassName={styles.pageItem}
                nextClassName={styles.pageItem}
                previousClassName={styles.pageItem}
                breakLabel={"..."}
                pageCount={Math.ceil(report.countList / 10)}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                pageLinkClassName={styles.pagelink}
                previousLinkClassName={styles.pagelink}
                nextLinkClassName={styles.pagelink}
                breakClassName={styles.pageItem}
                breakLinkClassName={styles.pagelink}
                pageRangeDisplayed={2}
                className={styles.pagingTournament}
              />
            </div>
          ) : (
            <h1>Cầu thủ chưa nhận được báo cáo nào</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default PlayerDetail;
