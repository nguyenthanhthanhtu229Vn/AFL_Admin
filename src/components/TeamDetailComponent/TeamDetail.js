import React from 'react'
import HeaderLeft from '../HeaderLeftComponent/HeaderLeft'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import styles from "./styles/style.module.css"
function TeamDetail() {
  return (
    <>
    <ScrollToTop />
    <HeaderLeft />
    <div className={styles.manage}>
      <div className={styles.title}>
        <h2 className={styles.title__left}>FC KhoaTuAnhTam</h2>
        <div className={styles.title__location}>
          <a href="#" className={styles.another__location}>
            <i className="fa-solid fa-house"></i> Trang chủ
          </a>
          <span>{">>"}</span>
          <a href="#" className={styles.another__location}>
            Quản lý đội bóng
          </a>
          <span>{">>"}</span>
          <a href="#" className="current__location">
          FC KhoaTuAnhTam
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.content__left}>
            <img src="/assets/img/homepage/team2.png" alt="khoa" />
            <div className={styles.function}>
              <a href="#">Xóa đội bóng</a>
            </div>
          </div>
          <div className={styles.content__leftdown}>
            <h2>Thành viên</h2>
            <div className={styles.team__wrap}>
              <p>Họ và tên</p>
              <p>
                Nguyễn Thanh Thanh Tú
                <img src="/assets/img/homepage/pic-1.png" alt="team" />
              </p>
              <p>
               Nguyễn Tuấn Anh
                <img src="/assets/img/homepage/pic-2.png" alt="team" />
              </p>
              <p>
               Trương Anh Khoa
                <img src="/assets/img/homepage/pic-3.png" alt="team" />
              </p>
              <p>
                Nguyễn Văn Tâm
                <img src="/assets/img/homepage/pic-4.png" alt="team" />
              </p>
              <p>
                Nguyễn Thanh Thanh Tú
                <img src="/assets/img/homepage/pic-1.png" alt="team" />
              </p>
              <p>
               Nguyễn Tuấn Anh
                <img src="/assets/img/homepage/pic-2.png" alt="team" />
              </p>
              <p>
               Trương Anh Khoa
                <img src="/assets/img/homepage/pic-3.png" alt="team" />
              </p>
              <p>
                Nguyễn Văn Tâm
                <img src="/assets/img/homepage/pic-4.png" alt="team" />
              </p>
            </div>
          </div>
        </div>
        <div className={styles.content__right}>
          <h2>Thông tin đội bóng</h2>
          <p>Admin chỉ có thể xem không thể thay đổi thông tin</p>
          <form className={styles.info}>
            <div className={styles.text}>
              <label htmlFor="name">Tên đội bóng</label>
              <input type="text" id="name" placeholder="*Tên đội bóng" />
            </div>
            <div className={styles.text}>
              <label htmlFor="namecreate">Người quản lý</label>
              <input
                type="text"
                id="namecreate"
                placeholder="*Người quản lý"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="mail">Điạ chỉ email</label>
              <input type="text" id="mail" placeholder="*Địa chỉ email" />
            </div>
            <div className={styles.text}>
              <label htmlFor="genderf">Giới tính đội</label>
              <select id="genderf">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
            <div className={styles.text}>
              <label htmlFor="dob">Ngày tạo đội</label>
              <input type="datetime-local" id="dob" />
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
              <label htmlFor="nameB">Số cầu thủ tham gia</label>
              <input type="text" id="nameB" placeholder="*Số cầu thủ tham gia" />
            </div>
            <div className={styles.text}>
              <label htmlFor="numPlayer">Số cầu thủ đã tham gia</label>
              <input
                type="text"
                id="numPlayer"
                placeholder="*Số cầu thủ đã tham gia"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="bio">Mô tả đội bóng</label>
              <input type="text" id="bio" placeholder="*Mô tả đội bóng" />
            </div>
          </form>
          <button>Hoàn tất</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default TeamDetail