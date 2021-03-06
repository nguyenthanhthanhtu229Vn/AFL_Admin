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
import { changStatusReport } from "../../utils/ChangeStatusReport";
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
    if (data === "goalkeeper") return "Th??? m??n";
    else if (data === "defender") return "H???u v???";
    else if (data === "midfielder") return "Ti???n v???";
    else return "Ti???n ?????o";
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
        toast.success("G????n c???? c???u th??? tha??nh c??ng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
              <i className="fa-solid fa-house"></i> Trang chu??
            </Link>
            <span>{">>"}</span>
            <Link to={"/managePlayer"} className={styles.another__location}>
              Qua??n ly?? c????u thu??
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
            C?? {report.countList} b??o c??o v??? c???u th??? n??y
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={player.playerAvatar} alt={player.playerName} />
              <div className={styles.function}>
              {manager.flagReportFootballPlayer > 0  ? (
                <div className={styles.function}>
                  
                  <a
                    onClick={() => {
                      takeFlagForHost();
                    }}
                  >
                    ????nh c??? c???u th???
                  </a>
                </div>
              ) : (
                <div className={styles.function}>
                  <a
                    onClick={() => {
                      takeFlagForHost();
                    }}
                  >
                    C???u th??? ???? b??? ????nh c???
                  </a>

                </div>
              )}
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
                    C???nh b??o
                  </h1>
                  <p
                    style={{
                      lineHeight: 1.2,
                      fontSize: 20,
                    }}
                  >
                    T??i kho???n ch??? s??? h???u c???u th??? ???? b??? kh??a
                  </p>
                </div>
              )
            ) : (
              <div>
                <h1
                 className={styles.titleWarning}
                >
                  C???nh b??o
                </h1>
                <p
                 className={styles.contentWarning}
                >
                  Khi c???u th??? b??? ????nh c??? h??n 3 l???n ,
                  ch???n t??i kho???n s??? xu???t hi???n
                </p>
              </div>
            )}
            </div>
            <div className={styles.content__leftdown}>
              <h2>??????i tham gia</h2>
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
                    <p>T??n ??????i bo??ng</p>
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
                  <p>Ch??a tham gia ??????i bo??ng na??o</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Th??ng tin c????u thu??</h2>
            <p>Admin chi?? co?? th???? xem kh??ng th???? thay ??????i th??ng tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">T??n c????u thu??</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*T??n c????u thu??"
                  disabled
                  value={player.playerName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Vi?? tri??</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Vi?? tri??"
                  disabled
                  value={changePosition(player.position)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">??ia?? chi?? email</label>
                <input
                  type="text"
                  id="mail"
                  placeholder="*??i??a chi?? email"
                  disabled
                  value={manager.email}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Nga??y sinh</label>
                <p>{formatDate(manager.dateOfBirth)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Gi????i ti??nh c????u thu??</label>
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
                    N????
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Nga??y ta??o c????u thu??</label>
                <p>{formatDateTime(player.dateCreate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">S???? ??i????n thoa??i</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*S???? ??i????n thoa??i"
                  disabled
                  value={manager.phone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">??i??a chi??</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*??i??a chi??"
                  disabled
                  value={manager.address}
                />
              </div>
            </form>
            <Link to={"/managePlayer"} className={styles.button}>
              Hoa??n t????t
            </Link>
          </div>
        </div>
        <div className={styles.wrapReport}>
          <h2>Th??ng tin b??o c??o c???a c???u th???</h2>

          {report !== null ? (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">L?? do</th>
                    <th scope="col">Ng??y b??o c??o</th>
                    <th scope="col">T???</th>
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
                previousLabel={"Trang tr??????c"}
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
            <h1>C???u th??? ch??a nh???n ???????c b??o c??o n??o</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default PlayerDetail;
