import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManagePlayer() {
  const [openGrid, setOpenGrid] = useState(true);

  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statePage, setStagePage] = useState(0);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [contentSearch, setContentSearch] = useState("");

  const [player, setPlayer] = useState([]);
  const [countList, setCountList] = useState(0);
  const [sort, setSort] = useState("");
  const [orderBy, setOrderBy] = useState("PlayerName");
  const [orderType, setOrderType] = useState("ASC");

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setStagePage(data.selected);
    getPlayer(contentSearch, data.selected + 1, "NAME", contentSearch);
    setCheck(!check);
  };

  const getPlayer = (nameFind, currentPage, anotherSearch, value) => {
    setloading(true);
    let afterDefaultURL = null;
    if (anotherSearch === "NAME") {
      afterDefaultURL = `football-players?football-player-name=${nameFind}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
    }
    if (anotherSearch === "SORT") {
      const fullOrder = value.split("-");
      afterDefaultURL = `football-players?football-player-name=${nameFind}&order-by=${fullOrder[0]}&order-type=${fullOrder[1]}&page-offset=${currentPage}&limit=8`;
    }
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        console.log(res.data);
        setPlayer(res.data.footballPlayers);
        console.log(res.data.footballPlayers)
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
    getPlayer(contentSearch, currentPage, "NAME", contentSearch);
  }, [check, currentPage]);
  // const splitTeamArea = (teamArea) => {
  //   let myArray = teamArea.split(",");
  //   return myArray[myArray.length - 1];
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setStagePage(0);
    setCurrentPage(1);
    getPlayer(contentSearch, currentPage, "NAME", contentSearch);
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
          orderby = "PlayerName";
          ordertype = "ASC";
        } else if (value === "nameIns") {
          orderby = "PlayerName";
          ordertype = "DESC";
        }
        setOrderBy(orderby);
        setOrderType(ordertype);

        getPlayer(
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
  const changePosition = (data) => {
    if (data === "goalkeeper") return "Thủ môn";
    else if (data === "defender") return "Hậu vệ";
    else if (data === "midfielder") return "Tiền vệ";
    else return "Tiền đạo";
  };

  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý cầu thủ</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/managePlayer"} className="current__location">
              Quản lý cầu thủ
            </Link>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.search__top}>
            <span>Có {countList} cầu thủ trong hệ thống</span>
            <div className={styles.searchRight}>
              <select onChange={onChangeHandler} value={sort} name="SORT">
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
              onChange={onChangeHandler}
              value={contentSearch}
              name="contentSearch"
              autoComplete="off"
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
            {player.length !== 0 ? (
              player.map((item) => (
                <div className={styles.teamItem} key={item.id}>
                  <div className={styles.itemImage}>
                    <img src={item.playerAvatar} alt={item.playerName} />
                  </div>
                  <div className={styles.itemText}>
                    <div className={styles.nameTeam}>{item.playerName}</div>
                    <div className={styles.descriptionTeam}>
                      {item.userVM.gender === "Male" ? "Nam" : "Nữ"} |{" "}
                      {changePosition(item.position)}
                    </div>
                    <Link
                      to={`/playerDetail/${item.id}`}
                      className={styles.viewDetail}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>Xem thêm
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noItem}>Không tìm thấy cầu thủ</p>
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
            pageCount={Math.ceil(count / 8)}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            pageLinkClassName={styles.pagelink}
            previousLinkClassName={styles.pagelink}
            nextLinkClassName={styles.pagelink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pagelink}
            pageRangeDisplayed={2}
            forcePage={statePage}
            className={styles.pagingTournament}
          />
        </div>
      </div>
    </>
  );
}

export default ManagePlayer;
