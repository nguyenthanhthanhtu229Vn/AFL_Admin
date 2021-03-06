import { load } from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import LoadingCircle from "../LoadingComponent/LoadingCircle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import { getReportByTeamIdAPI } from "../../api/ReportAPI";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { takeFlagForUserAPI } from "../../api/UserAPI";
import FlagUserComponet from "../FlagUserComponent";
import { changStatusReport } from "../../utils/ChangeStatusReport";
function TeamDetail() {
  const { idTeam } = useParams();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSke, setLoadingSke] = useState(false);
  const [manager, setManager] = useState([]);
  const [limit, setLimit] = useState(6);
  const [allTeam, setAllTeam] = useState([]);
  const [height, setHeight] = useState(0);
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

  useEffect(() => {
    getReportByTeamID();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const getReportByTeamID = async () => {
    try {
      const response = await getReportByTeamIdAPI(idTeam, currentPage);

      if (response.status === 200) {
        setReport(response.data);
        
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
  const changeStatusReportTeam = async () => {
    await changStatusReport([...report.reports]);
  };
  const takeFlagForHost = async () => {
    await changeStatusReportTeam();
    try {
      const data = {
        ...manager,
        id: manager.id,
        flagReportTeam: manager.flagReportTeam + 1,
      };

      const response = await takeFlagForUserAPI(data);
      if (response.status === 201) {
        getUserById(manager.id);
        getReportByTeamID();
        setCurrentPage(1);
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
              <i className="fa-solid fa-house"></i> Trang chu??
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageTeam"} className={styles.another__location}>
              Qua??n ly?? ??????i bo??ng
            </Link>
            <span>{">>"}</span>
            <Link to={`/teamDetail/${idTeam}`} className="current__location">
              {team.teamName}
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
            C?? {report.countList} b??o c??o v??? ?????i b??ng n??y
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={team.teamAvatar} alt={team.teamName} />
              <div className={styles.function}>
                <a
                  onClick={() => {
                    takeFlagForHost();
                  }}
                >
                  ????nh c??? ??????i bo??ng
                </a>
              </div>
              {manager !== null && manager.flagReportTeam >= 3 ? (
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
                      T??i kho???n ch??? s??? h???u ?????i b??ng ???? b??? kh??a
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
                    Khi ch??? ?????i b??ng b??? d??nh c??? nhi???u h??n 3 l???n, ch???n t??i kho???n
                    s??? xu???t hi???n
                  </p>
                </div>
              )}
            </div>
            <div className={styles.content__leftdown}>
              <h2>Tha??nh vi??n</h2>
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
                    <p>Ho?? va?? t??n</p>
                    {allTeam.map((item, index) => (
                      <>
                        <Link
                          to={`/playerDetail/${item.footballPlayerId}`}
                          key={item.id}
                        >
                          <p>
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
                  <p>Ch??a c????u thu?? na??o tham gia</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Th??ng tin ??????i bo??ng</h2>
            <p>Admin chi?? co?? th???? xem kh??ng th???? thay ??????i th??ng tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">T??n ??????i bo??ng</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*T??n ??????i bo??ng"
                  disabled
                  value={team.teamName}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Ng??????i qua??n ly??</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Ng??????i qua??n ly??"
                  disabled
                  value={manager.username}
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
                <label htmlFor="genderf">Gi????i ti??nh ??????i</label>
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
                    N????
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Nga??y ta??o ??????i</label>
                <p>{formatDateTime(team.dateCreate)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">S???? ??i????n thoa??i</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*S???? ??i????n thoa??i"
                  disabled
                  value={team.teamPhone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">??i??a chi??</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*??i??a chi??"
                  disabled
                  value={team.teamArea}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">S???? c????u thu?? tham gia</label>
                <input
                  type="text"
                  id="nameB"
                  placeholder="*S???? c????u thu?? tham gia"
                  disabled
                  value={team.numberPlayerInTeam}
                />
              </div>
            </form>
            <Link to={"/manageTeam"} className={styles.button}>
              Hoa??n t????t
            </Link>
          </div>
        </div>
        <div className={styles.wrapReport}>
          <h2>Th??ng tin b??o c??o c???a ?????i b??ng</h2>

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
            <h1>?????i b??ng ch??a nh???n ???????c b??o c??o n??o</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default TeamDetail;
