import React, { useEffect, useState } from "react";
import { setDefaults } from "react-i18next";
import styles from "./TourDetailComponent/styles/style.module.css";
import { blockUserAPI } from "../api/UserAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import LoadingAction from "./LoadingComponent/LoadingAction";
export default function FlagUserComponet(props) {
  const { user, getUserById } = props;
  const [fault, setFault] = useState(null);
  const [loading, setLoading] = useState(false);
  const defaultFault = [
    {
      id: 1,
      name: "3 ngày",
    },
    {
      id: 2,
      name: "7 ngày",
    },
    {
      id: 3,
      name: "10 ngày",
    },
    {
      id: 4,
      name: "1 tháng",
    },
    {
      id: 5,
      name: "Vĩnh viễn",
    },
  ];
  const [blockIndex, setBlockIndex] = useState(null);

  const onChangeHandler = (e) => {
    setBlockIndex(e.target.value);
  };

  const countFault = () => {
    const newData = defaultFault.splice(user.countBlock, defaultFault.length);
    setFault(newData);
  };
  useEffect(() => {
    countFault();
  }, []);

  const HandleClick = () => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Chặn tài khoản này",
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
        blockAccount();
      }
    });
  };

  const blockAccount = async () => {
    setLoading(true);
    try {
      const response = await blockUserAPI(user.id, +blockIndex);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        getUserById(user.id);
        toast.success("Chặn tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  return (
    <div className={styles.wrapBlocker}>
      {loading ? <LoadingAction /> : null}
      <h1 className={styles.titleBlock}>Chặn tài khoản</h1>
      {/* {
                user.countBlock > 0 ? "Tài khoản này đã bị khóa" + user.countBlock + " lần" : "Tài khoản chưa bị khóa lần nào"
            } */}
      <select
        onChange={onChangeHandler}
        value={blockIndex}
        className={styles.selectBlock}
      >
        <option value="-1">Chọn hình phạt</option>
        {fault !== null
          ? fault.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })
          : null}
      </select>
      {blockIndex !== null && blockIndex != -1 ? (
        <div>
          <button
            className={styles.a}
            onClick={() => {
              HandleClick();
            }}
          >
            Xác nhận
          </button>
        </div>
      ) : null}
    </div>
  );
}
