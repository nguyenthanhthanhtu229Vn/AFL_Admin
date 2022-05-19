import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManageTournament() {
  const [openGrid, setOpenGrid] = useState(true);
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý giải đấu</h2>
          <div className={styles.title__location}>
            <a href="#" className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </a>
            <span>{">>"}</span>
            <a href="#" className="current__location">
              Quản lý giải đấu
            </a>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.search__top}>
            <span>Có 10 giải đấu trong hệ thống</span>
            <div className={styles.searchRight}>
              <select>
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
                <option>A-Z</option>
                <option>Z-A</option>
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
          <form className={styles.search__bot}>
            <input type="text" placeholder="Tìm kiếm" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </form>
        </div>
        <div className={styles.accountList}>
          <div
            className={
              openGrid ? styles.teamList : `${styles.teamList} ${styles.active}`
            }
          >
            <div className={styles.teamItem}>
              <div className={styles.itemImage}>
                <img src="/assets/img/homepage/a3.png" alt="team" />
              </div>
              <div className={styles.itemText}>
                <div className={styles.nameTeam}>Giải xuân ấm áp alocatasasadasdasdasd</div>
                <div className={styles.descriptionTeam}>Loại trực tiếp | TP.HCM</div>
                <div className={styles.numberPlayer}>
                  <i className="fa-solid fa-user-group"></i>
                  <span>10</span>
                </div>
                <a href="#" className={styles.viewDetail}>
                  <i class="fa-solid fa-pen-to-square"></i>Xem thêm
                </a>
              </div>
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

export default ManageTournament;
