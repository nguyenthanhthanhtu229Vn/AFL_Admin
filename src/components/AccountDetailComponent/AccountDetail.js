import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../api";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function AccountDetail() {
  const { idAccount } = useParams();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const getAccount = () => {
    setLoading(true);
    let afterDefaultURL = `users/${idAccount}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setAccount(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAccount();
  }, []);
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

  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft id={account.id} />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>{account.username}</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/manageAccount"} className={styles.another__location}>
              Quản lý giải đấu
            </Link>
            <span>{">>"}</span>
            <Link
              to={`/accountDetail/${account.id}`}
              className="current__location"
            >
              {account.username}
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content__left}>
            <img src={account.avatar} alt={account.username} />
            <div className={styles.function}>
              <a href="#">Chặn tài khoản</a>
              <a href="#">Xóa tài khoản</a>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Thông tin tài khoản</h2>
            <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  placeholder="*Họ và tên"
                  value={account.username}
                  disabled
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">Địa chỉ email</label>
                <input
                  type="text"
                  id="mail"
                  placeholder="*Địa chỉ email"
                  value={account.email}
                  disabled
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="gender">Giới tính</label>
                <select id="gender" disabled>
                  <option
                    value="Male"
                    selected={account.gender === "Male" ? true : false}
                  >
                    Nam
                  </option>
                  <option
                    value="Female"
                    selected={account.gender === "Female" ? true : false}
                  >
                    Nữ
                  </option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Ngày sinh</label>
                <p>{formatDate(account.dateOfBirth)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="*Số điện thoại"
                  disabled
                  value={account.phone}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  placeholder="*Địa chỉ"
                  disabled
                  value={account.address}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="cmnd">CMND</label>
                <input
                  type="text"
                  id="cmnd"
                  placeholder="*CMND"
                  disabled
                  value={account.identityCard}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Ngày cấp CMND</label>
                <p> {formatDate(account.dateIssuance)}</p>
              </div>
              <div className={styles.text}>
                <label htmlFor="phoneB">Số điện thoại doanh nghiệp</label>
                <input
                  type="text"
                  id="phoneB"
                  placeholder="*Số điện thoại doanh nghiệp"
                  disabled
                  value={account.phoneBusiness}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">Tên doanh nghiệp</label>
                <input
                  type="text"
                  id="nameB"
                  placeholder="*Tên doanh nghiệp"
                  disabled
                  value={account.nameBusiness}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="codeB">Mã doanh nghiệp</label>
                <input
                  type="text"
                  id="codeB"
                  placeholder="*Mã doanh nghiệp"
                  disabled
                  value={account.tinbusiness}
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateCreate">Ngày tạo tài khoản</label>
                <p>{formatDate(account.dateCreate)}</p>
              </div>
            </form>
            <Link to={"/manageAccount"} className={styles.button}>
              Hoàn tất
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetail;
