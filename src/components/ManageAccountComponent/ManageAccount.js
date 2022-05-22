import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction"
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManageAccount() {
  const [account, setAccount] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [contentSearch, setContentSearch] = useState("");
  const [countList, setCountList] = useState(0);
  const [sort, setSort] = useState("");
  const [orderBy, setOrderBy] = useState("DateCreate");
  const [orderType, setOrderType] = useState("DESC");

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getAccount(contentSearch, data.selected + 1, "NAME", contentSearch);
    setCheck(!check);
  };

  const getAccount = (nameFind, currentPage, anotherSearch, value) => {
    setloading(true);
    let afterDefaultURL = null;
    if (anotherSearch === "NAME") {
      afterDefaultURL = `users?user-name=${nameFind}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=5`;
    }
    if (anotherSearch === "SORT") {
      const fullOrder = value.split("-");
      afterDefaultURL = `users?user-name=${nameFind}&order-by=${fullOrder[0]}&order-type=${fullOrder[1]}&page-offset=${currentPage}&limit=5`;
    }
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAccount(res.data.users);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setloading(false);
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
  useEffect(() => {
    getAccount(contentSearch, currentPage, "NAME", contentSearch);
  }, [check, currentPage]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getAccount(contentSearch, currentPage, "NAME", contentSearch);
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
          orderby = "UserName";
          ordertype = "ASC";
        } else if (value === "nameIns") {
          orderby = "UserName";
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

        getAccount(
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
  return (
    <>
      <ScrollToTop />
      {loading?<LoadingAction/>:null}
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý tài khoản</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageAccount"} className="current__location">
              Quản lý tài khoản
            </Link>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.search__top}>
            <span>Có {countList} tài khoản trong hệ thống</span>
            <select onChange={onChangeHandler} value={sort} name="SORT">
              <option value="timeIns">Mới nhất</option>
              <option value="timeDesc">Cũ nhất</option>
              <option value="nameDesc">A-Z</option>
              <option value="nameIns">Z-A</option>
            </select>
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
          <table>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Giới tính</th>
              <th>Ngày tạo tài khoản</th>
              <th>Email</th>
              <th>Chức năng</th>
            </tr>
            {account.length !== 0 ? (
              account.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.gender === "Male" ? "Nam" : "Nữ"}</td>
                  <td>{formatDate(item.dateCreate)}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link
                      to={`/accountDetail/${item.id}`}
                      className={styles.view}
                    >
                      Xem
                    </Link>
                    <a href="#" className={styles.block}>
                      Chặn
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noItem}>
                  {" "}
                  Không tìm thấy tài khoản
                </td>
              </tr>
            )}
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
    </>
  );
}

export default ManageAccount;
