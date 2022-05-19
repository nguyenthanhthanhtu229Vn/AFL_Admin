import React from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function AccountDetail() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Trương Khoa</h2>
          <div className={styles.title__location}>
            <a href="#" className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </a>
            <span>{">>"}</span>
            <a href="#" className={styles.another__location}>
              Quản lý giải đấu
            </a>
            <span>{">>"}</span>
            <a href="#" className="current__location">
              Trương Khoa
            </a>
          </div>
        </div>
        <div className={styles.content}>
            <div className={styles.content__left}>
                <img src="/assets/img/homepage/pic-3.png" alt="khoa"/>
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
                        <input type="text" id="name" placeholder="*Họ và tên"/>
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="mail">Địa chỉ email</label>
                        <input type="text" id="mail" placeholder="*Địa chỉ email" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="gender" >Giới tính</label>
                       <select id="gender" >
                           <option>Nam</option>
                           <option>Nữ</option>
                       </select>
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="dob">Ngày sinh</label>
                        <input type="datetime-local" id="dob" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="*Số điện thoại" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" id="address" placeholder="*Địa chỉ" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="cmnd">CMND</label>
                        <input type="text" id="cmnd" placeholder="*CMND" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="phoneB">Số điện thoại doanh nghiệp</label>
                        <input type="text" id="phoneB" placeholder="*Số điện thoại doanh nghiệp" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="nameB">Tên doanh nghiệp</label>
                        <input type="text" id="nameB" placeholder="*Tên doanh nghiệp" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="codeB">Mã doanh nghiệp</label>
                        <input type="text" id="codeB" placeholder="*Mã doanh nghiệp" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="dateCreate">Ngày tạo tài khoản</label>
                        <input type="datetime-local" id="dateCreate" />
                    </div>
                    <div className={styles.text}>
                        <label htmlFor="bio">Mô tả bản thân</label>
                        <input type="text" id="bio" placeholder="*Mô tả bản thân" />
                    </div>
                </form>
                <button>Hoàn tất</button>
            </div>
        </div>
        </div>
    </>
  );
}

export default AccountDetail;
