import React, { useEffect, useState } from "react";
import { setDefaults } from "react-i18next";
import { blockUserAPI } from "../api/UserAPI";
import { toast } from "react-toastify";
export default function FlagUserComponet(props) {
  const { user, getUserById } = props;
  const [fault, setFault] = useState(null);
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
      name: "Vĩnh Viển",
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

  const blockAccount = async () => {
    try {
      const response = await blockUserAPI(user.id, +blockIndex);
      console.log(response);
      if (response.status === 200) {
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
      console.error(err);
    }
  };
  return (
    <div>
      <h1
        style={{
          color: "red",
          fontSize: 24,
          margin: "10px 0",
        }}
      >
        Chặn tài khoản
      </h1>
      {/* {
                user.countBlock > 0 ? "Tài khoản này đã bị khóa" + user.countBlock + " lần" : "Tài khoản chưa bị khóa lần nào"
            } */}
      <select
        style={{
          padding: "10px 30px",
        }}
        onChange={onChangeHandler}
        value={blockIndex}
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
        <div
          style={{
            marginTop: 10,
          }}
        >
          <button
            style={{
              width: 100,
              height: 40,
            }}
            onClick={() => {
              blockAccount();
            }}
          >
            Xác nhận
          </button>
        </div>
      ) : null}
    </div>
  );
}
