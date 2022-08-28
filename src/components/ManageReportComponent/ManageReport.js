import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import { getReportGroupByAPI } from "../../api/ReportAPI";
function ManageReport() {
  const MySwal = withReactContent(Swal);
  const [flagItem, setFlagItem] = useState({ item: [], user: [] });
  const [popUpFlag, setPopUpFlag] = useState(false);
  const [account, setAccount] = useState([]);
  const [tournament, setTournament] = useState([]);
  const [contentSearch, setContentSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("Chưa duyệt");
  const [currentPage, setCurrentPage] = useState(1);
  const [check, setCheck] = useState(false);
  const [popupReport, setPopupReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listReport, setListReport] = useState(null);
  const [reportType, setReportType] = useState("FootballPlayer");
  const [count, setCount] = useState(0);
  const [countList, setCountList] = useState(0);
  const getListReport = () => {
    setLoading(true);
    const response = getReportGroupByAPI(reportType, statusSearch, currentPage);
    response
      .then((res) => {
        setListReport(res.data.reports);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getListReport();
    // getAccount();
    // getTournament();
  }, [reportType, statusSearch, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    // getListReport(contentSearch, data.selected + 1, statusSearch, reportType);
    // setCheck(!check);
  };

  const changeStatusReport = async (item, status) => {
    const data = {
      id: item.id,
      reason: item.reason,
      userId: item.userId,
      footballPlayerId: item.footballPlayerId,
      teamId: item.teamId,
      tournamentId: item.tournamentId,
      status: "Đã duyệt",
    };
    try {
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/reports`,
        data
      );
      if (response.status === 200) {
        if (status === "Ganco") {
          setPopUpFlag(false);
          setLoading(false);
          toast.success("Gắn cờ thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("Chặn thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setCheck(!check);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  const changeStatusUser = async (id, item) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://afootballleague.ddns.net/api/v1/users/${id}`
      );
      if (response.status === 200) {
        changeStatusReport(item, "Chan");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      console.log(error);
    }
  };
  // format Date
  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0") +
      " " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
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

  // const filterStatusReport = (status) => {
  //   setCurrentPage(1);
  //   setStatusSearch(status);
  //   getListReport();
  //   setCheck(!check);
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(1);
  //   getListReport();
  //   setCheck(!check);
  // };

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   switch (name) {
  //     case "contentSearch":
  //       setContentSearch(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const getAccount = () => {
    setLoading(true);
    let afterDefaultURL = `users?page-offset=1&limit=150`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAccount(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const getTournament = () => {
    setLoading(true);
    let afterDefaultURL = `tournaments?page-offset=1&limit=250`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTournament(res.data.tournaments);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const checkTournament = (id) => {
    let item = "";
    if (tournament.length > 0) {
      for (let i = 0; i < tournament.length; i++) {
        if (tournament[i].id === id) {
          item = tournament[i].userId;
          break;
        }
      }
    }
    return item;
  };
  const checkAccount = (id) => {
    let item = [];
    if (account.length > 0) {
      for (let i = 0; i < account.length; i++) {
        if (account[i].id === id) {
          item = account[i];
          console.log(item);
          break;
        }
      }
    }
    return item;
  };

  const flagReport = async (flagItem) => {
    setLoading(true);
    const data = {
      id:
        flagItem.item.tournamentId !== 0
          ? flagItem.item.tournamentId
          : flagItem.item.teamId !== 0
          ? flagItem.item.teamId
          : flagItem.item.footballPlayerId,
      flagReportFootballPlayer:
        flagItem.item.footballPlayerId !== 0
          ? flagItem.user.flagReportFootballPlayer + 1
          : flagItem.user.flagReportFootballPlayer,
      flagReportTeam:
        flagItem.item.teamId !== 0
          ? flagItem.user.flagReportTeam + 1
          : flagItem.user.flagReportTeam,
      flagReportTournament:
        flagItem.item.tournamentId !== 0
          ? flagItem.user.flagReportTournament + 1
          : flagItem.user.flagReportTournament,
    };
    try {
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/users`,
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        changeStatusReport(flagItem.item, "Ganco");
      }
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      {loading ? <LoadingAction /> : null}
      {/* flag popup */}
      <div
        className={
          popUpFlag ? `${styles.popupflag} ${styles.active}` : styles.popupflag
        }
      >
        <div className={styles.closePopupReport}>
          <p>Gắn cờ tài khoản này</p>
          <p onClick={() => setPopUpFlag(false)}>X</p>
        </div>
        <div className={styles.contentFlag}>
          <p
            className={
              (flagItem.item.tournamentId !== 0
                ? flagItem.user.flagReportTournament
                : flagItem.item.teamId !== 0
                ? flagItem.user.flagReportTeam
                : flagItem.user.flagReportFootballPlayer) >= 10
                ? `${styles.redDot}`
                : null
            }
          >
            <i class="fa-solid fa-flag"></i>
            {flagItem.item.tournamentId !== 0
              ? " Giải đấu "
              : flagItem.item.teamId !== 0
              ? " Đội bóng "
              : " Cầu thủ "}
            có số cờ hiện tại của tài khoản này là:{" "}
            {flagItem.item.tournamentId !== 0
              ? flagItem.user.flagReportTournament
              : flagItem.item.teamId !== 0
              ? flagItem.user.flagReportTeam
              : flagItem.user.flagReportFootballPlayer}
          </p>
          <p>
            {(flagItem.item.tournamentId !== 0
              ? flagItem.user.flagReportTournament
              : flagItem.item.teamId !== 0
              ? flagItem.user.flagReportTeam
              : flagItem.user.flagReportFootballPlayer) >= 10 ? (
              <p className={styles.note2}>
                *Người dùng này đã bị cấm cờ quá nhiều bạn có thể chặn người
                dùng này
              </p>
            ) : null}
          </p>
          <p className={styles.noteFlag}>Bạn chắc chứ</p>
          <div className={styles.optionA}>
            {(flagItem.item.tournamentId !== 0
              ? flagItem.user.flagReportTournament
              : flagItem.item.teamId !== 0
              ? flagItem.user.flagReportTeam
              : flagItem.user.flagReportFootballPlayer) >= 10 ? (
              <p
                className={styles.optionFlagBlock}
                onClick={() => {
                  changeStatusUser(
                    flagItem.item.tournamentId !== 0
                      ? flagItem.item.tournamentId
                      : flagItem.item.teamId !== 0
                      ? flagItem.item.teamId
                      : flagItem.item.footballPlayerId,
                    flagItem.item
                  );
                }}
              >
                Chặn
              </p>
            ) : null}
            <p
              className={styles.optionFlag}
              onClick={() => flagReport(flagItem)}
            >
              Gắn cờ
            </p>
            <p
              className={styles.optionFlagBlock}
              onClick={() => setPopUpFlag(false)}
            >
              Hủy
            </p>
          </div>
        </div>
      </div>
      {/* report popup */}
      <div
        className={
          popUpFlag ? `${styles.overlay} ${styles.active}` : styles.overlay
        }
      />
      <div
        className={
          popupReport
            ? `${styles.popupReport} ${styles.active}`
            : styles.popupReport
        }
      >
        <div className={styles.closePopupReport}>
          <p>Soạn cảnh báo</p>
          <p onClick={() => setPopupReport(false)}>X</p>
        </div>
        <form className={styles.bodyReport}>
          <div className={styles.toUser}>
            <label htmlFor="to">Gửi đến:</label>
            <input type="text" name="" id="to" placeholder="Email người gửi" />
          </div>
          <div className={styles.checkReport}>
            <p>
              <input type="radio" id="tour" name="checkReport_group" />
              <label for="tour">Giải đấu</label>
            </p>
            <p>
              <input type="radio" id="team" name="checkReport_group" />
              <label for="team">Đội bóng</label>
            </p>
            <p>
              <input type="radio" id="player" name="checkReport_group" />
              <label for="player">Cầu thủ</label>
            </p>
          </div>
          <div className={styles.toContent}>
            <textarea
              placeholder={"Nội dung"}
              className={styles.content}
              autoComplete="off"
            />
          </div>
          <div className={styles.optionReport}>
            <input type="submit" value="Gửi" className={styles.sendReport} />
          </div>
        </form>
      </div>
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý báo cáo</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageReport"} className="current__location">
              Quản lý báo cáo
            </Link>
          </div>
        </div>
        <div className={styles.content__wrap}>
          <div className={styles.content__left}>
            {/* <span
              className={styles.a}
              onClick={() => setPopupReport(!popupReport)}
            >
              Soạn cảnh báo
            </span> */}
            <div
              className={
                statusSearch === "Chưa duyệt"
                  ? `${styles.ac} ${styles.active}`
                  : styles.ac
              }
              onClick={() => {
                setStatusSearch("Chưa duyệt");
                setCurrentPage(1);
              }}
            >
              <i class="fa-solid fa-circle-dot"></i>Chưa duyệt
            </div>
            <div
              className={
                statusSearch === "Đã duyệt"
                  ? `${styles.ac} ${styles.active}`
                  : styles.ac
              }
              onClick={() => {
                setStatusSearch("Đã duyệt");
                setCurrentPage(1);
              }}
            >
              <i class="fa-solid fa-circle-check"></i>Đã duyệt
            </div>
            <div
              className={
                statusSearch === ""
                  ? `${styles.ac} ${styles.active}`
                  : styles.ac
              }
              onClick={() => {
                setStatusSearch("");
                setCurrentPage(1);
              }}
            >
              <i class="fa-solid fa-circle-exclamation"></i>Tất cả báo cáo
            </div>
            <p>
              Phân loại{" "}
              {/* {reportType !== "" ? (
                <span
                  className={styles.clearFilter}
                  onClick={() => {
                    setReportType("");
                  }}
                >
                  X
                </span>
              ) : null} */}
            </p>
            <div
              className={
                reportType === "FootballPlayer"
                  ? `${styles.av} ${styles.active2}`
                  : styles.av
              }
              onClick={() => {
                setReportType("FootballPlayer");
                setListReport(null);
                setCurrentPage(1);
              }}
            >
              <span className={styles.green}></span>Báo cáo cầu thủ
            </div>
            <div
              className={
                reportType === "Tournament"
                  ? `${styles.av} ${styles.active2}`
                  : styles.av
              }
              onClick={() => {
                setReportType("Tournament");
                setListReport(null);
                setCurrentPage(1);
              }}
            >
              <span className={styles.red}></span>Báo cáo giải đấu
            </div>
            <div
              className={
                reportType === "Team"
                  ? `${styles.av} ${styles.active2}`
                  : styles.av
              }
              onClick={() => {
                setReportType("Team");
                setListReport(null);
                setCurrentPage(1);
              }}
            >
              <span className={styles.yellow}></span>Báo cáo đội bóng
            </div>
          </div>
          <div className={styles.content__right}>
            {/* <form className={styles.search__bot} onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={onChangeHandler}
                autoComplete="off"
                value={contentSearch}
                name="contentSearch"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </form> */}
            <div className={styles.main__content}>
              <div className={styles.option}>
                <div className={styles.selectAll}></div>
                <i
                  class="fa-solid fa-arrow-rotate-right"
                  onClick={() => {
                    setCheck(!check);
                  }}
                ></i>
              </div>
              <div className={styles.list}>
                {listReport !== null ? (
                  listReport.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <div
                        className={styles.left}
                      >
                        <img
                          src={
                            reportType === "FootballPlayer"
                              ? item.footballPlayerReportVM.playerAvatar
                              : reportType === "Team"
                              ? item.teamReportVM.teamAvatar
                              : item.tournamentReportVM.tournamentAvatar
                          }
                          alt={
                            reportType === "FootballPlayer"
                              ? item.footballPlayerReportVM.playerName
                              : reportType === "Team"
                              ? item.teamReportVM.teamName
                              : item.tournamentReportVM.tournamentName
                          }
                        />
                      </div>
                      <div
                        style={{
                          width: 710,
                        }}
                        className={styles.mid}
                      >
                        <Link
                          to={
                            reportType === "FootballPlayer"
                              ? `/playerDetail/${item.footballPlayerReportVM.id}`
                              : reportType === "Team"
                              ? `/teamDetail/${item.teamReportVM.id}`
                              : `/tourDetail/${item.tournamentReportVM.id}`
                          }
                        >
                          <h3>
                            {reportType === "FootballPlayer"
                              ? item.footballPlayerReportVM.playerName
                              : reportType === "Team"
                              ? item.teamReportVM.teamName
                              : item.tournamentReportVM.tournamentName}
                          </h3>
                        </Link>
                        <p className={styles.titleMid}>
                          Đã bị báo cáo{" "}
                          {reportType === "FootballPlayer"
                            ? item.footballPlayerReportVM.countReport
                            : reportType === "Team"
                            ? item.teamReportVM.countReport
                            : item.tournamentReportVM.countReport}{" "}
                          lần
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có yêu cầu nào</p>
                )}
              </div>
            </div>
            <ReactPaginate
              previousLabel={"Trang trước"}
              nextLabel={"Trang sau"}
              containerClassName="pagination"
              activeClassName={styles.active}
              pageClassName={styles.pageItem}
              nextClassName={styles.pageItem}
              previousClassName={styles.pageItem}
              breakLabel={"..."}
              pageCount={Math.ceil(count / 5)}
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
        </div>
      </div>
    </>
  );
}

export default ManageReport;
