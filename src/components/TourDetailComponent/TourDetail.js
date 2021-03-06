import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import {
  getReportByTournamentIdAPI,
  getReportFromHostByTournamentIdAPI,
} from "../../api/ReportAPI";
import ReactPaginate from "react-paginate";
import { cancelTournamentAPI } from "../../api/TournamentAPI";
import { takeFlagForUserAPI } from "../../api/UserAPI";
import FlagUserComponet from "../FlagUserComponent";
import { toast } from "react-toastify";
import { changStatusReport } from "../../utils/ChangeStatusReport";
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
      return "Loa??i tr????c ti????p";
    }
    if (2 === id) {
      return "??a?? vo??ng tro??n";
    }
    if (3 === id) {
      return "??a?? chia ba??ng";
    } else {
      return "";
    }
  };

  const getFeild = (id) => {
    if (1 === id) {
      return "S??n 5";
    }
    if (2 === id) {
      return "S??n 7";
    }
    if (3 === id) {
      return "S??n 11";
    } else {
      return "";
    }
  };

  useEffect(() => {
    getTournament();
    getTeam();
    getReportFromHostByHostId();
  }, []);

  useEffect(() => {
    getReportByTourID();
  }, [currentPage]);

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
        getReportByTourID()
        toast.success("G????n c???? gi???i ?????u tha??nh c??ng", {
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
  const changeStatusReportTournament = async () => {
    await changStatusReport([...report.reports, ...reportFromHost.reports]);
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
              <i className="fa-solid fa-house"></i> Trang chu??
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageTournament"} className={styles.another__location}>
              Qua??n ly?? gia??i ??????u
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
            C?? {report.countList} b??o c??o v??? gi???i ?????u n??y
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={tournament.tournamentAvatar} alt="khoa" />
              {tournament.status === true ? (
                <div className={styles.function}>
                  <a
                    onClick={() => {
                      cancleTournament();
                    }}
                  >
                    Hu??y gia??i ??????u
                  </a>
                </div>
              ) : (
                <div className={styles.function}>
                  <a
                    style={{
                      cursor: "default",
                    }}
                  >
                    Gi???i ???? b??? h???y
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
                      C???nh b??o
                    </h1>
                    <p
                      style={{
                        lineHeight: 1.2,
                        fontSize: 20,
                      }}
                    >
                      T??i kho???n ch??? s??? h???u gi???i ?????u ???? b??? kh??a
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <h1 className={styles.titleWarning}>C???nh b??o</h1>
                  <p className={styles.contentWarning}>
                    Khi ch??? gi???i ?????u b??? d??nh c??? nhi???u h??n 3 gi???i ?????u kh??c nhau ,
                    ch???n t??i kho???n s??? xu???t hi???n
                  </p>
                </div>
              )}
            </div>
            <div className={styles.content__leftdown}>
              <h2>??????i bo??ng tham gia</h2>
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
                  <p>Ch??a ??????i bo??ng na??o tham gia</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Th??ng tin gia??i ??????u</h2>
            <p>Admin chi?? co?? th???? xem kh??ng th???? thay ??????i th??ng tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">T??n gia??i ??????u</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*T??n gia??i ??????u"
                  disabled
                  value={tournament.tournamentName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Ng??????i ta??o gia??i</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Ng??????i ta??o gia??i"
                  disabled
                  value={host.username}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">??ia?? chi?? email</label>
                <input
                  type="text"
                  id="mail"
                  placeholder="*??i??a chi?? email"
                  disabled
                  value={host.email}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="gender">Ch???? ??????</label>
                <select id="gender" disabled>
                  <option
                    selected={tournament.mode === "PUBLIC" ? true : false}
                  >
                    C??ng khai
                  </option>
                  <option
                    selected={tournament.mode === "PRIVATE" ? true : false}
                  >
                    Ri??ng t??
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Gi????i ti??nh ??????i</label>
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
                    N????
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEnd">Nga??y b????t ??????u gia??i</label>
                <p>{formatDateTime(tournament.tournamentStartDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateStart">Nga??y b????t ??????u gia??i</label>
                <p>{formatDateTime(tournament.tournamentEndDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Nga??y ta??o gia??i</label>
                <p>{formatDateTime(tournament.dateCreate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEndRegis">Nga??y k????t th????c ????ng ky??</label>
                <p>{formatDateTime(tournament.registerEndDate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">S???? ??i????n thoa??i</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*S???? ??i????n thoa??i"
                  disabled
                  value={host.phone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">??i??a ??i????m</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*??i??a ??i????m"
                  disabled
                  value={tournament.footballFieldAddress}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="cmnd">Hi??nh th????c</label>
                <input
                  type="text"
                  id="cmnd"
                  placeholder="*Hi??nh th????c"
                  disabled
                  value={getType(tournament.tournamentTypeId)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="phoneB">Loa??i s??n</label>
                <input
                  type="text"
                  id="phoneB"
                  placeholder="*Loa??i s??n"
                  disabled
                  value={getFeild(tournament.footballFieldTypeId)}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">S???? ??????i tham gia</label>
                <input
                  type="text"
                  id="nameB"
                  placeholder="*S???? ??????i tham gia"
                  disabled
                  value={tournament.footballTeamNumber}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="numPlayer">Tha??nh vi??n m????i ??????i</label>
                <input
                  type="text"
                  id="numPlayer"
                  placeholder="*Tha??nh vi??n m????i ??????i"
                  disabled
                  value={tournament.footballPlayerMaxNumber}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="min">Th????i gian m????i tr????n (phu??t)</label>
                <input
                  type="text"
                  id="min"
                  placeholder="*Th????i gian m????i tr????n"
                  disabled
                  value={tournament.matchMinutes}
                />
              </div>
            </form>
            <Link to={"/manageTournament"} className={styles.button}>
              Hoa??n t????t
            </Link>
          </div>
        </div>
        <div className={styles.wrapReport}>
          <h2>Th??ng tin h???y gi???i t??? ch??? gi???i ?????u</h2>
          {reportFromHost !== null && reportFromHost.reports.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">L?? do</th>
                  <th scope="col">N???i dung l?? do</th>
                  <th scope="col">Ng??y b??o c??o</th>
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
            <h1>Gi???i ?????u ch??a nh???n ???????c b??o c??o t??? ng?????i t???o gi???i</h1>
          )}
          <div></div>
        </div>

        <div className={styles.wrapReport}>
          <h2>Th??ng tin b??o c??o c???a gi???i ?????u</h2>
          {report !== null && report.reports.length > 0 ? (
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
            <h1>Gi???i ?????u ch??a nh???n ???????c b??o c??o n??o</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default TourDetail;
