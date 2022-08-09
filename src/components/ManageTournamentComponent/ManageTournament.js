import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
function ManageTournament() {
  const [openGrid, setOpenGrid] = useState(true);

  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [contentSearch, setContentSearch] = useState("");

  const [tournament, setTournament] = useState([]);
  const [countList, setCountList] = useState(0);
  const [sort, setSort] = useState("");
  const [orderBy, setOrderBy] = useState("DateCreate");
  const [orderType, setOrderType] = useState("DESC");

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getTournament(contentSearch, data.selected + 1, "NAME", contentSearch);
    setCheck(!check);
  };

  const getTournament = (nameFind, currentPage, anotherSearch, value) => {
    setloading(true);
    let afterDefaultURL = null;
    if (anotherSearch === "NAME") {
      afterDefaultURL = `tournaments?tournament-name=${nameFind}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=6`;
    }
    if (anotherSearch === "SORT") {
      const fullOrder = value.split("-");
      console.log(fullOrder);
      afterDefaultURL = `tournaments?tournament-name=${nameFind}&order-by=${fullOrder[0]}&order-type=${fullOrder[1]}&page-offset=${currentPage}&limit=6`;
    }
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTournament(res.data.tournaments);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setloading(false);
      });
  };

  useEffect(() => {
    getTournament(contentSearch, currentPage, "NAME", contentSearch);
  }, [check, currentPage]);

  const splitTeamArea = (teamArea) => {
    let a = teamArea;
    console.log(teamArea);
    if (a !== null) {
      let myArray = a.split(",");
      return myArray[myArray.length - 1];
    }
    return teamArea;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getTournament(contentSearch, currentPage, "NAME", contentSearch);
    setCheck(!check);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "contentSearch":
        setContentSearch(value);
        break;
      case "SORT":
        let ordertype = null;
        let orderby = null;
        if (value === "nameDesc") {
          orderby = "TournamentName";
          ordertype = "ASC";
        } else if (value === "nameIns") {
          orderby = "TournamentName";
          ordertype = "DESC";
        } else if (value === "timeDesc") {
          orderby = "DateCreate";
          ordertype = "ASC";
        } else if (value === "timeIns") {
          orderby = "DateCreate";
          ordertype = "DESC";
        }
        setOrderBy(orderby);
        setOrderType(ordertype);

        getTournament(
          contentSearch,
          currentPage,
          "SORT",
          orderby + "-" + ordertype
        );
        setSort(value === "default" ? "" : value);
        break;
      default:
        break;
    }
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
  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý giải đấu</h2>
          <div className={styles.title__location}>
            <Link to={"/"} href="#" className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageTournament"} className="current__location">
              Quản lý giải đấu
            </Link>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.search__top}>
            <span>Có {countList} giải đấu trong hệ thống</span>
            <div className={styles.searchRight}>
              <select onChange={onChangeHandler} value={sort} name="SORT">
                <option value="timeIns">Mới nhất</option>
                <option value="timeDesc">Cũ nhất</option>
                <option value="nameDesc">A-Z</option>
                <option value="nameIns">Z-A</option>
              </select>
              <p
                className={openGrid ? styles.active : ""}
                onClick={() => {
                  setOpenGrid(true);
                }}
              >
                <i class="fa-solid fa-border-all"></i>
              </p>
              <p
                className={openGrid ? "" : styles.active}
                onClick={() => {
                  setOpenGrid(false);
                }}
              >
                <i class="fa-solid fa-bars"></i>
              </p>
            </div>
          </div>
          <form className={styles.search__bot} onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              autoComplete="off"
              onChange={onChangeHandler}
              value={contentSearch}
              name="contentSearch"
            />
            <i class="fa-solid fa-magnifying-glass"></i>
          </form>
        </div>
        <div className={styles.accountList}>
          <div
            className={
              openGrid ? styles.teamList : `${styles.teamList} ${styles.active}`
            }
          >
            {tournament.length !== 0 ? (
              tournament.map((item) => (
                <Link
                  to={`/tourDetail/${item.id}`}
                  className={styles.teamItem}
                  key={item.id}
                >
                  <div className={styles.itemImage}>
                    <img
                      src={item.tournamentAvatar}
                      alt={item.tournamentName}
                    />
                  </div>
                  <div className={styles.itemText}>
                    <div className={styles.nameTeam}>{item.tournamentName}</div>
                    <div className={styles.descriptionTeam}>
                      {getType(item.tournamentTypeId)}
                      {item.footballFieldAddress !== ""
                        ? " | " + splitTeamArea(item.footballFieldAddress)
                        : ""}
                    </div>
                    <div className={styles.numberPlayer}>
                      <i className="fa-solid fa-user-group"></i>
                      <span>{item.numberTeamInTournament}</span>
                    </div>
                    <Link
                      to={`/tourDetail/${item.id}`}
                      className={styles.viewDetail}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>Xem thêm
                    </Link>
                  </div>
                </Link>
              ))
            ) : (
              <p className={styles.noItem}>Không tìm thấy giải đấu</p>
            )}
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
            pageCount={Math.ceil(count / 6)}
            marginPagesDisplayed={3}
            pageLinkClassName={styles.pagelink}
            onPageChange={handlePageClick}
            previousLinkClassName={styles.pagelink}
            nextLinkClassName={styles.pagelink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pagelink}
            pageRangeDisplayed={2}
            className={styles.pagingTournament}
          />
        </div>
      </div>
    </>
  );
}

export default ManageTournament;
