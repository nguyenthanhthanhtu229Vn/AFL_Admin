import React from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManagePromote() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý thăng cấp</h2>
          <div className={styles.title__location}>
            <a href="#" className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </a>
            <span>{">>"}</span>
            <a href="#" className="current__location">
              Quản lý thăng cấp
            </a>
          </div>
        </div>
        <div className={styles.content__wrap}>
          <div className={styles.content__left}>
            <a href="#">
              <i class="fa-solid fa-circle-exclamation"></i>Tất cả yêu cầu
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-check"></i>Đã duyệt
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-dot"></i>Chưa duyệt
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-minus"></i>Đã từ chối
            </a>
            <p>Trạng thái</p>
            <a href="#">
              <span className={styles.green}></span>Đang trực tuyến
            </a>
            <a href="#">
              <span className={styles.red}></span>Đang ngoại tuyến
            </a>
          </div>
          <div className={styles.content__right}>
            <form className={styles.search__bot}>
              <input type="text" placeholder="Tìm kiếm" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </form>
            <div className={styles.main__content}>
              <div className={styles.option}>
                <div className={styles.selectAll}>
                  <input type="checkbox" id="selectall" />
                  <label htmlFor="selectall" />
                  <span>Chọn tất cả</span>
                </div>
                <div className={styles.option_right}>
                  <i class="fa-solid fa-circle-check"></i>
                  <i class="fa-solid fa-circle-minus"></i>
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-1.png" alt="img" />
                    <input type="checkbox" id="a" />
                    <label htmlFor="a" />
                  </div>
                  <div className={styles.mid}>
                    <h3>Nguyễn Thanh Thanh Tú</h3>
                    <p>Đã gửi 1 yêu cầu trở thành người tạo giải đấu</p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.green}></span>2 tiếng
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-3.png" alt="img" />
                    <input type="checkbox" id="c" />
                    <label htmlFor="c" />
                  </div>
                  <div className={styles.mid}>
                    <h3>Trương Khoa</h3>
                    <p>Đã gửi 1 yêu cầu trở thành người tạo giải đấu</p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.green}></span>2 tiếng
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-4.png" alt="img" />
                    <input type="checkbox" id="b" />
                    <label htmlFor="b" />
                  </div>
                  <div className={styles.mid}>
                    <h3>Nguyễn Văn Tâm</h3>
                    <p>Đã gửi 1 yêu cầu trở thành người tạo giải đấu</p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.red}></span>2 tiếng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagePromote;
