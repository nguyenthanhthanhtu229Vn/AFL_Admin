import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManageAccount() {
  const [account, setAccount] = useState([]);
  const getAccount = () => {
    let afterDefaultURL = `users?page-offset=2&limit=5`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAccount(res.data.users);
      })
      .catch((err) => console.error(err));
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
    getAccount();
  }, []);

  return (
    <>
      <ScrollToTop />
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
            <span>Có 1880 tài khoản trong hệ thống</span>
            <select>
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
          <form className={styles.search__bot}>
            <input type="text" placeholder="Tìm kiếm" />
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
            {account.map((item,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{item.username}</td>
                <td>{item.gender==="Male"?"Nam":"Nữ"}</td>
                <td>{formatDate(item.dateCreate)}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/accountDetail/${item.id}`} className={styles.view}>
                    Xem
                  </Link>
                  <a href="#" className={styles.block}>
                    Chặn
                  </a>
                </td>
              </tr>
            ))}
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
            pageCount={5}
            marginPagesDisplayed={3}
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
