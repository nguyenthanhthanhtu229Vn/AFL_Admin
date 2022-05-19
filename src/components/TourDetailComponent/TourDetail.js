import React from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function TourDetail() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>UEFA Champion League</h2>
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
              UEFA Champion League
            </a>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.content__left}>
              <img src="/assets/img/homepage/a2.png" alt="khoa" />
              <div className={styles.function}>
                <a href="#">Hủy giải đấu</a>
                <a href="#">Xóa giải đấu</a>
              </div>
            </div>
            <div className={styles.content__leftdown}>
              <h2>Đội bóng tham gia</h2>
              <div className={styles.team__wrap}>
                <p>Tên đội bóng</p>
                <p>
                  FB PLAY
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team2.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team3.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team2.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
                <p>
                  FC Barca{" "}
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </p>
              </div>
            </div>
          </div>
          <div className={styles.content__right}>
            <h2>Thông tin giải đấu</h2>
            <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
            <form className={styles.info}>
              <div className={styles.text}>
                <label htmlFor="name">Tên giải đấu</label>
                <input type="text" id="name" placeholder="*Tên giải đấu" />
              </div>
              <div className={styles.text}>
                <label htmlFor="namecreate">Người tạo giải</label>
                <input
                  type="text"
                  id="namecreate"
                  placeholder="*Người tạo giải"
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="mail">Điạ chỉ email</label>
                <input type="text" id="mail" placeholder="*Địa chỉ email" />
              </div>
              <div className={styles.text}>
                <label htmlFor="gender">Chế độ</label>
                <select id="gender">
                  <option>Công khai</option>
                  <option>Riêng tư</option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="genderf">Giới tính đội</label>
                <select id="genderf">
                  <option>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEnd">Ngày bắt đầu giải</label>
                <input type="datetime-local" id="dateEnd" />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateStart">Ngày bắt đầu giải</label>
                <input type="datetime-local" id="dateStart" />
              </div>
              <div className={styles.text}>
                <label htmlFor="dob">Ngày tạo giải</label>
                <input type="datetime-local" id="dob" />
              </div>
              <div className={styles.text}>
                <label htmlFor="dateEndRegis">Ngày kết thức đăng ký</label>
                <input type="datetime-local" id="dateEndRegis" />
              </div>
              <div className={styles.text}>
                <label htmlFor="phone">Số điện thoại</label>
                <input type="text" id="phone" placeholder="*Số điện thoại" />
              </div>
              <div className={styles.text}>
                <label htmlFor="address">Địa điểm</label>
                <input type="text" id="address" placeholder="*Địa điểm" />
              </div>
              <div className={styles.text}>
                <label htmlFor="cmnd">Hình thức</label>
                <input type="text" id="cmnd" placeholder="*Hình thức" />
              </div>
              <div className={styles.text}>
                <label htmlFor="phoneB">Loại sân</label>
                <input type="text" id="phoneB" placeholder="*Loại sân" />
              </div>
              <div className={styles.text}>
                <label htmlFor="nameB">Số đội tham gia</label>
                <input type="text" id="nameB" placeholder="*Số đội tham gia" />
              </div>
              <div className={styles.text}>
                <label htmlFor="numPlayer">Thành viên mỗi đội</label>
                <input
                  type="text"
                  id="numPlayer"
                  placeholder="*Thành viên mỗi đội"
                />
              </div>
              <div className={styles.text}>
                <label htmlFor="min">Thời gian mỗi trận</label>
                <input type="text" id="min" placeholder="*Thời gian mỗi trận" />
              </div>
              <div className={styles.text}>
                <label htmlFor="bio">Mô tả giải đấu</label>
                <input type="text" id="bio" placeholder="*Mô tả giải đấu" />
              </div>
            </form>
            <button>Hoàn tất</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourDetail;
