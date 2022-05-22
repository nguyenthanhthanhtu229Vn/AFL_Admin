import React from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManageReport() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý báo cáo</h2>
          <div className={styles.title__location}>
            <a href="#" className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </a>
            <span>{">>"}</span>
            <a href="#" className="current__location">
              Quản lý báo cáo
            </a>
          </div>
        </div>
        <div className={styles.content__wrap}>
          <div className={styles.content__left}>
            <a href="#">Soạn cảnh báo</a>
            <a href="#">
              <i class="fa-solid fa-circle-exclamation"></i>Tất cả báo cáo
            </a>
            <a href="#">
              <i class="fa-solid fa-circle-check"></i>Đã xem
            </a>
            <a href="#">
              <i class="fa-solid fa-star"></i>Gắn sao
            </a>
            <a href="#">
              <i class="fa-solid fa-trash-can"></i>Thùng rác
            </a>
            <p>Phân loại</p>
            <a href="#">
              <span className={styles.green}></span>Báo cáo tài khoản
            </a>
            <a href="#">
              <span className={styles.red}></span>Báo cáo giải đấu
            </a>
            <a href="#">
              <span className={styles.yellow}></span>Báo cáo đội bóng
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
                  <input type="checkbox" id="selectall"/>
                  <label htmlFor="selectall"/>
                  <span>Chọn tất cả</span>
                </div>
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-1.png" alt="img" />
                    <input type="checkbox" id="a" />
                    <label htmlFor="a"/>
                  </div>
                  <div className={styles.mid}>
                    <h3>Nguyễn Thanh Thanh Tú</h3>
                    <p>Đã báo cáo 1 giải đấu</p>
                    <p>
                      Tú đã báo cáo giải đấu có từ khóa “mua bán” không hợp lệ
                      với quy tắc cộng đồng
                    </p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.red}></span>2 tiếng
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-1.png" alt="img" />
                    <input type="checkbox" id="c"/>
                    <label htmlFor="c"/>
                  </div>
                  <div className={styles.mid}>
                    <h3>Nguyễn Thanh Thanh Tú</h3>
                    <p>Đã báo cáo một tài khoản</p>
                    <p>
                      Thái đã báo cáo một tài khoản tên “quang phúc” với nội
                      dung vi phạm quy tắc cộng đồng
                    </p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.green}></span>2 tiếng
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.left}>
                    <img src="/assets/img/homepage/pic-1.png" alt="img" />
                    <input type="checkbox" id="b"/>
                    <label htmlFor="b"/>
                  </div>
                  <div className={styles.mid}>
                    <h3>Nguyễn Thanh Thanh Tú</h3>
                    <p>Đã báo cáo một đội bóng</p>
                    <p>
                      Tú đã báo cáo một đội bóng vi phạm những quy tắc của trang
                      web với từ khóa “giết chết”{" "}
                    </p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.yellow}></span>2 tiếng
                    <i class="fa-solid fa-star"></i>
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

export default ManageReport;
