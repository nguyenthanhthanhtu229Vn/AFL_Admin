import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAPI } from "../../api";
import styles from "./styles/style.module.css";
function HeaderLeft(id) {
  const location = useLocation();
  const [activeMenu, setactiveMenu] = useState(location.pathname);
  const [openManage, setOpenManage] = useState(true);
  const [openReport, setOpenReport] = useState(true);
  const [openExten, setOpenExten] = useState(true);
  const [clickUserMenu, setClickUserMenu] = useState(false);
 const [myAccount, setMyAccount] = useState( JSON.parse(localStorage.getItem("userInfo")))
  const [user, setUser] = useState("")
    //Get User
    const getUserById = async () => {
      let afterDefaultURL = `users/${myAccount.userVM.id}`;
      let response = getAPI(afterDefaultURL);
      response
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    };
  // signout
  const signout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  useEffect(() => {
    setactiveMenu(location.pathname);
    getUserById();
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
                    activeMenu === "/manageTournament" ||
                    activeMenu === `/tourDetail/${id.id}`
                      ? styles.active
                      : ""
                  }
                >
                  Quản lý giải đấu
                </Link>
                <Link
                  to={"/manageTeam"}
                  onClick={() => setactiveMenu("/manageTeam")}
                  className={
                    activeMenu === "/manageTeam" ||
                    activeMenu === `/teamDetail/${id.id}`
                      ? styles.active
                      : ""
                  }
                >
                  Quản lý đội bóng
                </Link>
                <Link
                  to={"/manageAccount"}
                  onClick={() => setactiveMenu("/manageAccount")}
                  className={
                    activeMenu === "/manageAccount" ||
                    activeMenu === `/accountDetail/${id.id}`
                      ? styles.active
                      : ""
                  }
                >
                  Quản lý tài khoản
                </Link>
                <Link
                  to={"/managePromote"}
                  onClick={() => setactiveMenu("/managePromote")}
                  className={
                    activeMenu === "/managePromote" ? styles.active : ""
                  }
                >
                  Quản lý thăng cấp
                </Link>
                <Link
                  to={"/manageReport"}
                  onClick={() => setactiveMenu("/manageReport")}
                  className={
                    activeMenu === "/manageReport" ? styles.active : ""
                  }
                >
                  Quản lý báo cáo
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
                <a href="#">Cấu hình</a>
                <a href="#">Hộp thư</a>
              </>
            ) : null}
          </li>
        </ul>
      </div>
      <div className={styles.headerRight}>
        <i class="fa-regular fa-bell"></i>
        <div className={styles.right}>
          <div
            className={styles.myAccount}
            onClick={() => setClickUserMenu(!clickUserMenu)}
          >
            <img
              src={user.avatar}
              alt={user.username}
            />
            <p>{user.username}</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <div
            className={
              clickUserMenu
                ? `${styles.popup_down} ${styles.active}`
                : styles.popup_down
            }
          >
            <Link to={"/profile"}>Hồ sơ</Link>
            <a href="#" onClick={signout}>
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLeft;
