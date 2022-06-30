import React, { useEffect, useState } from 'react'
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
    const [count, setCount] = useState(0);
    const [check, setCheck] = useState(false);
    const [contentSearch, setContentSearch] = useState("");
  
    const [team, setTeam] = useState([]);
    const [countList, setCountList] = useState(0);
    const [sort, setSort] = useState("");
    const [orderBy, setOrderBy] = useState("TeamName");
    const [orderType, setOrderType] = useState("ASC");
  
    const handlePageClick = (data) => {
      setCurrentPage(data.selected + 1);
      getTeam(contentSearch, data.selected + 1, "NAME", contentSearch);
      setCheck(!check);
    };
  
    const getTeam = (nameFind, currentPage, anotherSearch, value) => {
      setloading(true);
      let afterDefaultURL = null;
      if (anotherSearch === "NAME") {
        afterDefaultURL = `teams?team-name=${nameFind}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=8`;
      }
      if (anotherSearch === "SORT") {
        const fullOrder = value.split("-");
        afterDefaultURL = `teams?team-name=${nameFind}&order-by=${fullOrder[0]}&order-type=${fullOrder[1]}&page-offset=${currentPage}&limit=8`;
      }
      let response = getAPI(afterDefaultURL);
      response
        .then((res) => {
          setTeam(res.data.teams);
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
      getTeam(contentSearch, currentPage, "NAME", contentSearch);
    }, [check, currentPage]);
    const splitTeamArea = (teamArea) => {
      let myArray = teamArea.split(",");
      return myArray[myArray.length - 1];
    };
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      setCurrentPage(1);
      getTeam(contentSearch, currentPage, "NAME", contentSearch);
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
            orderby = "TeamName";
            ordertype = "ASC";
          } else if (value === "nameIns") {
            orderby = "TeamName";
            ordertype = "DESC";
          }
          setOrderBy(orderby);
          setOrderType(ordertype);
  
          getTeam(contentSearch, currentPage, "SORT", orderby + "-" + ordertype);
          setSort(value === "default" ? "" : value);
          break;
        default:
          break;
      }
    };
    return (
      <>
        <ScrollToTop />
        {loading ? <LoadingAction /> : null}
        <HeaderLeft />
        <div className={styles.manage}>
          <div className={styles.title}>
            <h2 className={styles.title__left}>Quản lý đội bóng</h2>
            <div className={styles.title__location}>
              <Link to={"/"} className={styles.another__location}>
                <i className="fa-solid fa-house"></i> Trang chủ
              </Link>
              <span>{">>"}</span>
              <Link to={"/manageTeam"} className="current__location">
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
              {team.length !== 0 ? (
                team.map((item) => (
                  <div className={styles.teamItem} key={item.id}>
                    <div className={styles.itemImage}>
                      <img src={item.teamAvatar} alt={item.teamName} />
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.nameTeam}>{item.teamName}</div>
                      <div className={styles.descriptionTeam}>
                        Bóng Đá {item.teamGender === "Male" ? "Nam" : "Nữ"}{" "}
                        {item.teamArea !== ""
                          ? "| " + splitTeamArea(item.teamArea)
                          : ""}
                      </div>
                      <div className={styles.numberPlayer}>
                        <i className="fa-solid fa-user-group"></i>
                        <span>{item.numberPlayerInTeam}</span>
                      </div>
                      <Link
                        to={`/teamDetail/${item.id}`}
                        className={styles.viewDetail}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>Xem thêm
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noItem}>Không tìm thấy đội bóng</p>
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
              className={styles.pagingTournament}
            />
          </div>
        </div>
      </>
    );
}

export default ManagePlayer