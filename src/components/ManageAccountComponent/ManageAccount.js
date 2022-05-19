import React from "react";
import ReactPaginate from "react-paginate";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ManageAccount() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý tài khoản</h2>
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
              <th>Ngày sinh</th>
              <th>Ngày tạo tài khoản</th>
              <th>Email</th>
              <th>Chức năng</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Nguyễn Thanh Thanh Tú</td>
              <td>Nam</td>
              <td>22/09/2000</td>
              <td>19/08/2019</td>
              <td>tnn22@gmail.com</td>
              <td>
                <a href="#" className={styles.view}>
                  Xem
                </a>
                <a href="#" className={styles.block}>
                  Chặn
                </a>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Nguyễn Thanh Thanh Tú</td>
              <td>Nam</td>
              <td>22/09/2000</td>
              <td>19/08/2019</td>
              <td>tnn22@gmail.com</td>
              <td>
                <a href="#" className={styles.view}>
                  Xem
                </a>
                <a href="#" className={styles.block}>
                  Chặn
                </a>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Nguyễn Thanh Thanh Tú</td>
              <td>Nam</td>
              <td>22/09/2000</td>
              <td>19/08/2019</td>
              <td>tnn22@gmail.com</td>
              <td>
                <a href="#" className={styles.view}>
                  Xem
                </a>
                <a href="#" className={styles.block}>
                  Chặn
                </a>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Nguyễn Thanh Thanh Tú</td>
              <td>Nam</td>
              <td>22/09/2000</td>
              <td>19/08/2019</td>
              <td>tnn22@gmail.com</td>
              <td>
                <a href="#" className={styles.view}>
                  Xem
                </a>
                <a href="#" className={styles.block}>
                  Chặn
                </a>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Nguyễn Thanh Thanh Tú</td>
              <td>Nam</td>
              <td>22/09/2000</td>
              <td>19/08/2019</td>
              <td>tnn22@gmail.com</td>
              <td>
                <a href="#" className={styles.view}>
                  Xem
                </a>
                <a href="#" className={styles.block}>
                  Chặn
                </a>
              </td>
            </tr>
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
