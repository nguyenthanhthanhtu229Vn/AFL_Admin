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
import Swal from "sweetalert2";
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

  const HandleClick = () => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Đánh cờ đội bóng này",
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
        toast.success("Gắn cờ giải đấu thành công", {
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
        {report !== null && report.countList > 0 ? (
          <h2
            style={{
              color: "red",
              marginTop: 30,
              fontSize: 24,
            }}
          >
            Có {report.countList} báo cáo về đội bóng này
          </h2>
        ) : null}
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src={team.teamAvatar} alt={team.teamName} />
              {report !== null && report.reports.length >= 10 ? (
                <div className={styles.function}>
                  <a
                    onClick={() => {
                      HandleClick();
                    }}
                  >
                    Đánh cờ đội bóng
                  </a>
                </div>
              ) : null}

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
                      Cảnh báo
                    </h1>
                    <p
                      style={{
                        lineHeight: 1.2,
                        fontSize: 20,
                      }}
                    >
                      Tài khoản chủ sở hữu đội bóng đã bị khóa
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <h1 className={styles.titleWarning}>Cảnh báo</h1>
                  <p className={styles.contentWarning}>
                    Khi chủ đội bóng bị dánh cờ nhiều hơn 3 lần, chặn tài khoản
                    sẽ xuất hiện
                  </p>
                </div>
              )}
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
        <div className={styles.wrapReport}>
          <h2>Thông tin báo cáo của đội bóng</h2>

          {report !== null ? (
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
            <h1>Đội bóng chưa nhận được báo cáo nào</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default TeamDetail;
