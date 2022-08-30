import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import Swal from "sweetalert2";
import {
  getReportByTournamentIdAPI,
  getReportFromHostByTournamentIdAPI,
  getReportTeamOutTournamentAPI,
} from "../../api/ReportAPI";
import ReactPaginate from "react-paginate";
import { cancelTournamentAPI } from "../../api/TournamentAPI";
import { takeFlagForUserAPI } from "../../api/UserAPI";
import FlagUserComponet from "../FlagUserComponent";
import { toast } from "react-toastify";
import { changStatusReport } from "../../utils/ChangeStatusReport";
import { async } from "@firebase/util";
import {
  reportOutTeam,
  updateNextTeamInNextRound,
} from "../../api/TeamInMatchAPI";
import getInfoTeamInTournamentByTeamId from "../../api/TeamInTournamentAPI";
import createTieBreakAPI from "../../api/MatchAPI";
import { postNotification } from "../../api/Notification";
function TourDetail() {
  const { idTour } = useParams();
  const [tournament, setTournament] = useState([]);
  const [host, setHost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSke, setLoadingSke] = useState(false);
  const [teams, setTeams] = useState([]);
  const [limit, setLimit] = useState(6);
  const [allTeam, setAllTeam] = useState([]);
  const [height, setHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [report, setReport] = useState(null);
  const [reportFromHost, setReportFromHost] = useState(null);
  const [reportTeamOutTournament, setReportTeamOutTournament] = useState(null);
  const [check, setCheck] = useState(true);
  const infiniteScroll = (event) => {
    if (
      height.scrollHeight - Math.round(height.scrollTop) ===
      height.clientHeight
    ) {
      setLimit(limit + 4);
    }
  };

  const getTeamByIdTour = () => {
    setLoadingSke(true);
    let afterDefaultURL = `team-in-tournaments?tournament-id=${idTour}&status=Tham%20gia&order-by=Id&order-type=ASC&page-offset=1&limit=${limit}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAllTeam(res.data.teamInTournaments);
        console.log(res.data.teamInTournaments);
        setLoadingSke(false);
      })
      .catch((err) => {
        setLoadingSke(false);
        console.error(err);
      });
  };

  const getTournament = () => {
    setLoading(true);
    let afterDefaultURL = `tournaments/${idTour}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTournament(res.data);
        getUserById(res.data.userId);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const changeDate = (data) => {
    const date = data.split(" ")[0];

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
  //Get User
  const getUserById = async (id) => {
    let afterDefaultURL = `users/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setHost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
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
      return "Sân 5";
    }
    if (2 === id) {
      return "Sân 7";
    }
    if (3 === id) {
      return "Sân 11";
    } else {
      return "";
    }
  };

  useEffect(() => {
    getTournament();
    getTeam();
    getReportFromHostByHostId();
    getReportTeamOutTournament();
  }, [check]);
  useEffect(() => {
    getReportByTourID();
  }, [currentPage]);

  const getReportTeamOutTournament = async () => {
    try {
      const response = await getReportTeamOutTournamentAPI(idTour);
      if (response.status === 200) {
        if (response.data.reports.length > 0) {
          setReportTeamOutTournament(response.data.reports);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const getReportFromHostByHostId = async () => {
    try {
      const response = await getReportFromHostByTournamentIdAPI(idTour);

      if (response.status === 200) {
        setReportFromHost(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getReportByTourID = async () => {
    try {
      const response = await getReportByTournamentIdAPI(idTour, currentPage);

      if (response.status === 200) {
        setReport(response.data);
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
    getTeamByIdTour();
  }, [limit]);

  const getTeam = async () => {
    try {
      let afterURLDefault = `teams?page-offset=1&limit=200`;
      setLoading(true);
      const res = await getAPI(afterURLDefault);
      if (res.status === 200) {
        setTeams(res.data.teams);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const checkTeam = (item) => {
    let a = [];
    if (teams.length > 0) {
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].id === item.teamId) {
          a = teams[i];
          break;
        }
      }
    }
    return a;
  };

  const HandleClickDel = (item) => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Xóa đội này ra khỏi giải",
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
        console.log(item);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        excuteOutTournament(item);
      }
    });
  };

  const HandleClick = () => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Hủy giải đấu này",
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
        cancleTournament();
      }
    });
  };
  const cancleTournament = async () => {
    setLoading(false);
    await changeStatusReportTournament();
    try {
      const response = await cancelTournamentAPI(tournament.id);
      if (response.status === 200) {
        getTournament();
        await takeFlagForHost();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const takeFlagForHost = async () => {
    try {
      const data = {
        ...host,
        id: host.id,
        flagReportTournament: host.flagReportTournament + 1,
      };

      const response = await takeFlagForUserAPI(data);
      if (response.status === 201) {
        getUserById(host.id);
        setLoading(true);
        getReportFromHostByHostId();
        setCurrentPage(1);
        getReportByTourID();
        toast.success("Gắn cờ giải đấu thành công", {
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

  const postNotificateForUser = async () => {
    try {
      const data = {
        content: "Cảnh báo đánh cờ vì bị nhiều báo cáo",
        forAdmin: false,
        userId: host.id,
        tournamentId: 0,
        teamId: 0,
        footballPlayerId: 0,
      };
      const response = await postNotification(data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatusReportTournament = async () => {
    await changStatusReport([...report.reports, ...reportFromHost.reports]);
  };

  const changeStatusReportTeamOutTournament = async () => {
    await changStatusReport([...reportTeamOutTournament]);
  };

  const excuteOutTournament = async (data) => {
    setLoading(true);
    await changeStatusReportTeamOutTournament();
    setReportTeamOutTournament(null);
    try {
      const teamInTourId = await findTeamInTournamentByTeamId(data.team.id);
      const response = await reportOutTeam(teamInTourId);
      if (response.status === 200) {
        if (response.data.status) {
          if (
            !response.data.groupFight.includes("tie-break") &&
            response.data.groupFight.includes("Bảng")
          ) {
            const flagTieBreak = await createTieBreak(response.data);
            if (flagTieBreak === false)
              await updateNextTeamInTournament(response.data);
            await getReportTeamOutTournament();
            toast.success("Đội bóng bị kick khỏi giải thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            await updateNextTeamInTournament(response.data);
            await getReportTeamOutTournament();
            toast.success("Đội bóng bị kick khỏi giải thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          await getReportTeamOutTournament();
          toast.success("Đội bóng bị kick khỏi giải thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const createTieBreak = async (data) => {
    try {
      const response = await createTieBreakAPI(
        idTour,
        tournament === 2
          ? null
          : data.groupFight.includes("Bảng") &&
            !data.groupFight.includes("tiebreak")
          ? data.groupFight.split(" ")[1]
          : null
      );
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const updateNextTeamInTournament = async (data) => {
    try {
      const dataBody = {
        tournamentId: +idTour,
        matchId:
          tournament.tournamentTypeId === 2 || data.groupFight.includes("Bảng")
            ? 0
            : data.matchId,
        groupName: data.groupFight.includes("Bảng")
          ? data.groupFight.split(" ")[1]
          : "",
      };
      const response = await updateNextTeamInNextRound(dataBody);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const findTeamInTournamentByTeamId = async (id) => {
    try {
      const response = await getInfoTeamInTournamentByTeamId(idTour, id);

      if (response.status === 200) {
        return response.data.teamInTournaments[0].id;
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
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
        {report !== null && report.countList > 0 ? (
          <h2
            style={{
              color: "red",
              marginTop: 30,
              fontSize: 24,
            }}
          >
            Có {report.countList} báo cáo về giải đấu này
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={tournament.tournamentAvatar} alt="khoa" />
              {tournament.status === true ? (
                (reportFromHost !== null &&
                  reportFromHost.reports.length > 0) ||
                (report !== null && report.reports.length >= 10) ? (
                  <div className={styles.function}>
                    <a
                      onClick={() => {
                        HandleClick();
                      }}
                    >
                      Hủy giải đấu
                    </a>
                  </div>
                ) : (
                  <div className={styles.function}>
                    {" "}
                    <a
                      style={{
                        backgroundColor: "transparent",
                        cursor: "default",
                      }}
                    ></a>
                  </div>
                )
              ) : (
                <div className={styles.function}>
                  <a
                    style={{
                      cursor: "default",
                    }}
                  >
                    Giải đã bị hủy
                  </a>
                </div>
              )}
              {host !== null && host.flagReportTournament >= 3 ? (
                host.status === true ? (
                  <FlagUserComponet user={host} getUserById={getUserById} />
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
                      Tài khoản chủ sở hữu giải đấu đã bị khóa
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <h1 className={styles.titleWarning}>Cảnh báo</h1>
                  <p className={styles.contentWarning}>
                    Khi chủ giải đấu bị dánh cờ nhiều hơn 3 giải đấu khác nhau ,
                    chặn tài khoản sẽ xuất hiện
                  </p>
                </div>
              )}
            </div>
            <div className={styles.content__leftdown}>
              <h2>Đội bóng tham gia</h2>
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
                    {allTeam.map((item, index) => (
                      <>
                        <Link to={`/teamDetail/${item.teamId}`} key={item.id}>
                          <p>
                            {checkTeam(item).teamName}
                            <img
                              src={checkTeam(item).teamAvatar}
                              alt={checkTeam(item).teamName}
                            />
                          </p>
                        </Link>
                      </>
                    ))}
                    {loadingSke ? <LoadingCircle /> : null}
                  </>
                ) : (
                  <p>Chưa đội bóng nào tham gia</p>
                )}
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
                <input
                  type="text"
                  id="mail"
                  placeholder="*Địa chỉ email"
                  disabled
                  value={host.email}
                />
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
                <p>{formatDateTime(tournament.tournamentStartDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateStart">Ngày bắt đầu giải</label>
                <p>{formatDateTime(tournament.tournamentEndDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Ngày tạo giải</label>
                <p>{formatDateTime(tournament.dateCreate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEndRegis">Ngày kết thức đăng ký</label>
                <p>{formatDateTime(tournament.registerEndDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*Số điện thoại"
                  disabled
                  value={host.phone}
                />
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
                <input
                  type="text"
                  id="cmnd"
                  placeholder="*Hình thức"
                  disabled
                  value={getType(tournament.tournamentTypeId)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="phoneB">Loại sân</label>
                <input
                  type="text"
                  id="phoneB"
                  placeholder="*Loại sân"
                  disabled
                  value={getFeild(tournament.footballFieldTypeId)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">Số đội tham gia</label>
                <input
                  type="text"
                  id="nameB"
                  placeholder="*Số đội tham gia"
                  disabled
                  value={tournament.footballTeamNumber}
                />
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
                <input
                  type="text"
                  id="min"
                  placeholder="*Thời gian mỗi trận"
                  disabled
                  value={tournament.matchMinutes}
                />
              </div>
            </form>
            <Link to={"/manageTournament"} className={styles.button}>
              Hoàn tất
            </Link>
          </div>
        </div>

        <div className={styles.wrapReport}>
          <h2>Thông tin đội bóng muốn thoát khỏi giải</h2>
          <i
            class="fa-solid fa-arrow-rotate-right"
            onClick={() => {
              setCheck(!check);
            }}
          ></i>
          {reportTeamOutTournament !== null ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Đội bóng</th>
                  {/* <th scope="col">Lí do</th> */}
                  <th scope="col">Nội dung lí do</th>
                  <th scope="col">Ngày báo cáo</th>
                  <th scope="col">Xóa khỏi giải</th>
                </tr>
              </thead>
              <tbody>
                {reportTeamOutTournament.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                          }}
                          src={item.team.teamAvatar}
                        />{" "}
                        {item.team.teamName}
                      </td>
                      {/* <td>{item.status}</td> */}
                      <td>{item.reason}</td>
                      <td>{changeDate(item.dateReport)}</td>
                      <td>
                        <button
                          className={styles.btnDel}
                          onClick={() => {
                            HandleClickDel(item);
                          }}
                        >
                          Xóa đội
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1>Chưa có đội bóng muốn rời giải đấu</h1>
          )}
          <div></div>
        </div>

        <div className={styles.wrapReport}>
          <h2>Thông tin hủy giải từ chủ giải đấu</h2>
          {reportFromHost !== null && reportFromHost.reports.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Lí do</th>
                  <th scope="col">Nội dung lí do</th>
                  <th scope="col">Ngày báo cáo</th>
                </tr>
              </thead>
              <tbody>
                {reportFromHost.reports.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.reason}</td>
                      <td>{item.reason}</td>
                      <td>{changeDate(item.dateReport)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1>Giải đấu chưa nhận được báo cáo từ người tạo giải</h1>
          )}
          <div></div>
        </div>

        <div className={styles.wrapReport}>
          <h2>Thông tin báo cáo của giải đấu</h2>
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
            <h1>Giải đấu chưa nhận được báo cáo nào</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default TourDetail;
