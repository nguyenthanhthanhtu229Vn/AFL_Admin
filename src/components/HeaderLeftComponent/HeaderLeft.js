import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/style.module.css";
function HeaderLeft() {
  const location = useLocation();
  const [activeMenu, setactiveMenu] = useState(location.pathname);
  const [openManage, setOpenManage] = useState(true);
  const [openReport, setOpenReport] = useState(true);
  const [openExten, setOpenExten] = useState(true);
  useEffect(() => {
    setactiveMenu(location.pathname);
  }, [location]);
  return (
    <div className={styles.headerAll}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/assets/icons/logo.png" alt="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link
              to={"/"}
              className={
                activeMenu === "/home" || activeMenu === "/"
                  ? `${styles.title} ${styles.active}`
                  : styles.title
              }
              onClick={() => setactiveMenu("/home")}
            >
              <i className="fa-solid fa-house"></i>
              Trang chủ
            </Link>
          </li>
          <li>
            <p
              className={`${styles.title}`}
              onClick={() => {
                setOpenManage(!openManage);
              }}
            >
              <i className="fa-solid fa-user-group"></i>
              Quản lý
              {openManage ? (
                <i className="fa-solid fa-caret-down"></i>
              ) : (
                <i class="fa-solid fa-caret-left"></i>
              )}
            </p>
            {openManage ? (
              <>
                <Link
                  to={"/manageTournament"}
                  onClick={() => setactiveMenu("/manageTournament")}
                  className={
                    activeMenu === "/manageTournament" ? styles.active : ""
                  }
                >
                  Quản lý giải đấu
                </Link>
                <Link
                  to={"/manageTeam"}
                  onClick={() => setactiveMenu("/manageTeam")}
                  className={activeMenu === "/manageTeam" ? styles.active : ""}
                >
                  Quản lý đội bóng
                </Link>
                <Link
                  to={"/manageAccount"}
                  onClick={() => setactiveMenu("/manageAccount")}
                  className={
                    activeMenu === "/manageAccount" ? styles.active : ""
                  }
                >
                  Quản lý tài khoản
                </Link>
                <Link
                  to={"/manageReport"}
                  onClick={() => setactiveMenu("/manageReport")}
                  className={
                    activeMenu === "/manageReport" ? styles.active : ""
                  }
                >
                  Quản lý report
                </Link>
              </>
            ) : null}
          </li>
          <li>
            <p
              className={`${styles.title}`}
              onClick={() => {
                setOpenReport(!openReport);
              }}
            >
              <i className="fa-solid fa-chart-column"></i>
              Thống kê
              {openReport ? (
                <i className="fa-solid fa-caret-down"></i>
              ) : (
                <i class="fa-solid fa-caret-left"></i>
              )}
            </p>
            {openReport ? (
              <>
                <a href="#">Thành viên</a>
                <a href="#">Giải đấu</a>
                <a href="#">Số thẻ</a>
              </>
            ) : null}
          </li>
          <li>
            <p
              className={`${styles.title}`}
              onClick={() => {
                setOpenExten(!openExten);
              }}
            >
              <i className="fa-solid fa-code-fork"></i>
              Tiện ích
              {openExten ? (
                <i className="fa-solid fa-caret-down"></i>
              ) : (
                <i class="fa-solid fa-caret-left"></i>
              )}
            </p>
            {openExten ? (
              <>
                <a href="#">Lịch</a>
                <a href="#">Hộp thư</a>
              </>
            ) : null}
          </li>
        </ul>
      </div>
      <div className={styles.headerRight}>
        <i class="fa-regular fa-bell"></i>
        <div className={styles.right}>
          <div className={styles.myAccount}>
            <img
              src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/274166188_1923462711159734_6796055857826196805_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i3_zmlwthCgAX8-c-Y0&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9FqaWwL1G8NF6aN9WBVFwHCiCutvvNghB4dSbg7uqevQ&oe=628BD073"
              alt="img"
            />
            <p>Nguyễn Thanh Thanh Tú</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLeft;
