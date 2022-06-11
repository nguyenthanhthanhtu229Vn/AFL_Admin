import React, { useEffect, useState } from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import { getAPI } from "../../api";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import LoadingAction from "../LoadingComponent/LoadingAction";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function ManagePromote() {
  const [promoteAccount, setPromoteAccount] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [contentSearch, setContentSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("Chưa duyệt");
  const [countList, setCountList] = useState(0);
  const [reason, setReason] = useState("");

  const [itemAccount, setItemAccount] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(promoteAccount.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const getPromoteAccount = (nameFind, currentPage, statusSearch) => {
    setloading(true);
    let afterDefaultURL = null;
    afterDefaultURL = `PromoteRequest?content=${nameFind}&status=${statusSearch}&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=3`;
    // afterDefaultURL = `users?user-name=${nameFind}&order-by=${orderBy}&order-type=${orderType}&page-offset=${currentPage}&limit=5`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setPromoteAccount(res.data.promoteRequests);
        setCountList(res.data.countList);
        setCount(res.data.countList);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setloading(false);
      });
  };

  // format Date
  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0") +
      " " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };
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
  useEffect(() => {
    getPromoteAccount(contentSearch, currentPage, statusSearch);
  }, [check, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    getPromoteAccount(contentSearch, data.selected + 1, statusSearch);
    setCheck(!check);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getPromoteAccount(contentSearch, currentPage, statusSearch);
    setCheck(!check);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "contentSearch":
        setContentSearch(value);
        break;
      default:
        break;
    }
  };

  const HandleClick = (item, status) => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: status === "Đã duyệt" ? "Duyệt thăng cấp" : "Từ chối thăng cấp",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5fe37d",
      cancelButtonColor: "#b80e4e",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      customClass: {
        icon: styles.no_before_icon,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        promoteAction(item, status, "");
      }
    });
  };

  const RejectClick = (item, status) => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: status === "Đã duyệt" ? "Duyệt thăng cấp" : "Từ chối thăng cấp",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5fe37d",
      cancelButtonColor: "#b80e4e",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      customClass: {
        icon: styles.no_before_icon,
      },
      preConfirm: (login) => {
        setReason(login);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        promoteAction(item, status, result.value);
      }
    });
  };
  const promoteAction = async (item, status, reasonVal) => {
    setloading(true);
    console.log(reasonVal);
    const data = {
      id: item.id,
      requestContent: item.requestContent,
      identityCard: item.identityCard,
      dateIssuance: item.dateIssuance,
      phoneBusiness: item.phoneBusiness,
      nameBusiness: item.nameBusiness,
      tinbusiness: item.tinbusiness,
      status: status,
      reason: reasonVal,
    };
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/PromoteRequest",
        data
      );
      if (response.status === 200) {
        sendmail(item.id, status, item);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloading(false);
      console.error(error.response);
    }
  };

  const sendmail = async (id, status, item) => {
    try {
      const response = await axios.post(
        `https://afootballleague.ddns.net/api/v1/systems/send-mail-promote?promote-request-id=${id}&approve=${
          status === "Đã duyệt" ? true : false
        }`
      );
      if (response.status === 200) {
        if (status === "Đã duyệt") {
          updateRoleUser(item);
        } else {
          toast.success("Duyệt thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCheck(!check);
          setloading(false);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error.response);
      setloading(false);
    }
  };

  const updateRoleUser = async (item) => {
    const data = {
      id: item.userId,
      roleId: 2,
      identityCard: item.identityCard,
      dateIssuance: item.dateIssuance,
      phoneBusiness: item.phoneBusiness,
      nameBusiness: item.nameBusiness,
      tinbusiness: item.tinbusiness,
    };
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/users",
        data,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        toast.success("Duyệt thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCheck(!check);
        setloading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error.response);
      setloading(false);
    }
  };
  const filterStatusPromote = (status) => {
    setCurrentPage(1);
    setStatusSearch(status);
    getPromoteAccount(contentSearch, currentPage, statusSearch);
    setCheck(!check);
  };
  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Quản lý thăng cấp</h2>
          <div className={styles.title__location}>
            <Link to={"/"} className={styles.another__location}>
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
            <span>{">>"}</span>
            <Link to={"/managePromote"} className="current__location">
              Quản lý thăng cấp
            </Link>
          </div>
        </div>
        <div className={styles.content__wrap}>
          <div className={styles.content__left}>
            <div
              className={
                statusSearch === "Chưa duyệt"
                  ? `${styles.a} ${styles.active}`
                  : styles.a
              }
              onClick={() => filterStatusPromote("Chưa duyệt")}
            >
              <i class="fa-solid fa-circle-dot"></i>Chưa duyệt
            </div>
            <div
              className={
                statusSearch === "Đã duyệt"
                  ? `${styles.a} ${styles.active}`
                  : styles.a
              }
              onClick={() => filterStatusPromote("Đã duyệt")}
            >
              <i class="fa-solid fa-circle-check"></i>Đã duyệt
            </div>
            <div
              className={
                statusSearch === "Từ chối"
                  ? `${styles.a} ${styles.active}`
                  : styles.a
              }
              onClick={() => filterStatusPromote("Từ chối")}
            >
              <i class="fa-solid fa-circle-minus"></i>Đã từ chối
            </div>
            <div
              className={
                statusSearch === "" ? `${styles.a} ${styles.active}` : styles.a
              }
              onClick={() => filterStatusPromote("")}
            >
              <i class="fa-solid fa-circle-exclamation"></i>Tất cả yêu cầu
            </div>
            <p>Trạng thái</p>
            <div className={styles.a}>
              <span className={styles.green}></span>Đang trực tuyến
            </div>
            <div className={styles.a}>
              <span className={styles.red}></span>Đang ngoại tuyến
            </div>
          </div>
          <div className={styles.content__right}>
            <form className={styles.search__bot} onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={onChangeHandler}
                autoComplete="off"
                value={contentSearch}
                name="contentSearch"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </form>
            <div className={styles.main__content}>
              <div className={styles.list}>
                {promoteAccount.length !== 0 ? (
                  promoteAccount.map((item) => (
                    <div className={styles.item} key={item.id}>
                      <div className={styles.left}></div>

                      <div className={styles.mid}>
                        <h3>{item.requestContent}</h3>
                        <h4>Nội dung:</h4>
                        {item.identityCard !== null ? (
                          <p>-CMND: {item.identityCard}</p>
                        ) : null}
                        {item.dateIssuance !== null ? (
                          <p>-Ngày cấp: {formatDate(item.dateIssuance)}</p>
                        ) : null}
                        {item.nameBusiness !== null ? (
                          <p>-Tên doanh nghiệp: {item.nameBusiness}</p>
                        ) : null}
                        {item.phoneBusiness !== null ? (
                          <p>-SĐT doanh nghiệp: {item.phoneBusiness}</p>
                        ) : null}
                        {item.tinbusiness !== null ? (
                          <p>-Mã doanh nghiệp: {item.tinbusiness}</p>
                        ) : null}
                      </div>
                      <div className={styles.right}>
                        <span className={styles.green}></span>
                        {formatDateTime(item.dateCreate)}
                        {item.status === "Chưa duyệt" ? (
                          <div className={styles.right_sub}>
                            <i
                              class="fa-solid fa-circle-check"
                              onClick={() => HandleClick(item, "Đã duyệt")}
                            ></i>
                            <i
                              class="fa-solid fa-circle-minus"
                              onClick={() => RejectClick(item, "Từ chối")}
                            ></i>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có yêu cầu nào</p>
                )}
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
                pageCount={Math.ceil(count / 3)}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
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
        </div>
      </div>
    </>
  );
}

export default ManagePromote;
