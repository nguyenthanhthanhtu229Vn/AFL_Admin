import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAPI, postAPI, putAPI } from "../../api";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import "firebase/compat/auth";
import LoadingAction from "../LoadingComponent/LoadingAction";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
function Profile() {
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [check, setCheck] = useState(false);
  const [myAccount, setMyAccount] = useState([]);
  const getMyAccount = () => {
    setLoading(true);
    const afterURL = `users/${user.userVM.id}`;
    const response = getAPI(afterURL);
    response
      .then((res) => {
        let splitdate = dob.value.split("-");
        let day = parseInt(splitdate[2]) + 1;
        setEmail({ value: res.data.email });
        setUsername({ value: res.data.username });
        setGender({ value: res.data.gender });
        setDob({
          value: new Date(res.data.dateOfBirth).toISOString().split("T")[0],
        });
        setAvt({ value: res.data.avatar, img: res.data.avatar });
        setAddress({ value: res.data.address });
        setPhone({ value: res.data.phone });
        setBio({ value: res.data.bio });
        setIdentityCard({ value: res.data.identityCard });
        setNameBussiness({ value: res.data.nameBusiness });
        setPhoneBussiness({ value: res.data.phoneBusiness });
        setDateIdentityCard({ value: res.dateIssuance });
        setTinBussiness({ value: res.data.tinbusiness });
        setRole(res.data.roleId);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getMyAccount();
  }, [check]);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({
    value: myAccount.username,
    error: "",
  });
  const [gender, setGender] = useState({
    value: "",
    error: "",
  });
  const [dob, setDob] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({
    value: "",
    error: "",
  });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [avt, setAvt] = useState({
    value: "",
    error: "",
    img: "",
  });
  const [bio, setBio] = useState({ value: "", error: "" });
  const [identityCard, setIdentityCard] = useState({
    value: "",
    error: "",
  });
  const [dateIdentityCard, setDateIdentityCard] = useState({
    value: "",
    error: "",
  });
  const [phoneBussiness, setPhoneBussiness] = useState({
    value: "",
    error: "",
  });
  const [tinbussiness, setTinBussiness] = useState({
    value: "",
    error: "",
  });
  const [nameBussiness, setNameBussiness] = useState({
    value: "",
    error: "",
  });

  const validateForm = (name, value) => {
    switch (name) {
      case "avt":
        break;
      case "name":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (/\d+/.test(value)) {
          return {
            flag: false,
            content: "*Tên bạn là chữ",
          };
        }
        break;
      case "phone":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (!/^[0-9]+$/.test(value)) {
          return {
            flag: false,
            content: "*Số điện thoại không được là chữ hay kí tự khác",
          };
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return {
            flag: false,
            content: "*Sai định dạng số điện thoại",
          };
        }

        break;
      case "gender":
        break;
      case "address":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "dob":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "cmnd":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (value.length !== 9 && value.length !== 12) {
          return {
            flag: false,
            content: "CMND/CCCD phải có 9 hoặc 12 số",
          };
        }
        break;
      case "nameB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "phoneB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (!/^[0-9]+$/.test(value)) {
          return {
            flag: false,
            content: "*Số điện thoại không được là chữ hay kí tự khác",
          };
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return {
            flag: false,
            content: "*Sai định dạng số điện thoại",
          };
        }
        break;
      case "codeB":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "nc":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "bio":
        break;
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "avt":
        const valueImg = URL.createObjectURL(e.target.files[0]);
        setAvt({
          ...avt,
          img: valueImg,
          value: e.target.files[0],
        });
        break;
      case "name":
        let username = null;
        if (flagValid.flag === false) {
          username = {
            value,
            error: flagValid.content,
          };
        } else {
          username = {
            value,
            error: null,
          };
        }
        setUsername({
          ...username,
        });
        break;
      case "phone":
        let phone = null;
        if (flagValid.flag === false) {
          phone = {
            value,
            error: flagValid.content,
          };
        } else {
          phone = {
            value,
            error: null,
          };
        }
        setPhone({
          ...phone,
        });
        break;
      case "gender":
        let gender = null;
        if (flagValid.flag === false) {
          gender = {
            value,
            error: flagValid.content,
          };
        } else {
          gender = {
            value,
            error: null,
          };
        }

        setGender({
          ...gender,
        });
        break;
      case "address":
        let address = null;
        if (flagValid.flag === false) {
          address = {
            value,
            error: flagValid.content,
          };
        } else {
          address = {
            value,
            error: null,
          };
        }
        setAddress({
          ...address,
        });
        break;
      case "dob":
        let dob = null;
        if (flagValid.flag === false) {
          dob = {
            value,
            error: flagValid.content,
          };
        } else {
          dob = {
            value,
            error: null,
          };
        }
        setDob({
          ...dob,
        });
        break;
      case "cmnd":
        let cmnd = null;
        if (flagValid.flag === false) {
          cmnd = {
            value,
            error: flagValid.content,
          };
        } else {
          cmnd = {
            value,
            error: null,
          };
        }
        setIdentityCard({
          ...cmnd,
        });
        break;
      case "nameB":
        let nameB = null;
        if (flagValid.flag === false) {
          nameB = {
            value,
            error: flagValid.content,
          };
        } else {
          nameB = {
            value,
            error: null,
          };
        }
        setNameBussiness({
          ...nameB,
        });
        break;
      case "codeB":
        let codeB = null;
        if (flagValid.flag === false) {
          codeB = {
            value,
            error: flagValid.content,
          };
        } else {
          codeB = {
            value,
            error: null,
          };
        }
        setTinBussiness({
          ...codeB,
        });
        break;
      case "phoneB":
        let phoneB = null;
        if (flagValid.flag === false) {
          phoneB = {
            value,
            error: flagValid.content,
          };
        } else {
          phoneB = {
            value,
            error: null,
          };
        }
        setPhoneBussiness({
          ...phoneB,
        });
        break;
      case "nc":
        let nc = null;
        if (flagValid.flag === false) {
          nc = {
            value,
            error: flagValid.content,
          };
        } else {
          nc = {
            value,
            error: null,
          };
        }
        setDateIdentityCard({
          ...nc,
        });
        break;
      case "bio":
        let bio = null;
        if (flagValid.flag === false) {
          bio = {
            value,
            error: flagValid.content,
          };
        } else {
          bio = {
            value,
            error: null,
          };
        }
        setBio({
          ...bio,
        });
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      username.value.trim() === "" ||
      phone.value.trim() === "" ||
      dob.value === undefined ||
      dob.value === ""
    ) {
      toast.error("Vui lòng kiểm tra lại thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const data = {
      id: user.userVM.id,
      username: username.value,
      gender: gender.value,
      dateOfBirth: new Date(dob.value),
      address: address.value,
      phone: phone.value,
      avatar: avt.value,
      bio: bio.value,
      identityCard: identityCard.value,
      phoneBusiness: phoneBussiness.value,
      nameBusiness: nameBussiness.value,
      tinbusiness: tinbussiness.value,
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
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
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
    }
  };
  return (
    <>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <HeaderLeft />
      <div className={styles.profile}>
        <h2 className={styles.profile__title}>Thông tin cá nhân</h2>
        <form onSubmit={onSubmitHandler} className={styles.profile__wrap}>
          <div className={styles.profile__img}>
            <label htmlFor="avt">
              <img src={avt.img} alt={username.value} />
              <h5>Thay đổi hình đại diện</h5>
            </label>
            <input
              type="file"
              id="avt"
              accept="image/*"
              name="avt"
              onChange={onChangeHandler}
            />
            <div className={styles.email}>{email.value}</div>
            <Link to="/changePassword" className={styles.changePass}>
              Đổi mật khẩu
            </Link>
          </div>
          <div className={styles.profile__text}>
            <div className={styles.text}>
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                value={username.value}
                onChange={onChangeHandler}
              />
              {username.error != null ? (
                <p className={styles.error}>{username.error}</p>
              ) : null}
            </div>
            <div className={styles.text}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                id="phone"
                name="phone"
                autoComplete="off"
                value={phone.value}
                onChange={onChangeHandler}
              />
              {phone.error != null ? (
                <p className={styles.error}>{phone.error}</p>
              ) : null}
            </div>
            <div className={styles.text}>
              <label htmlFor="gender" autoComplete="off">
                Giới tính
              </label>
              <select id="gender" onChange={onChangeHandler} name="gender">
                <option
                  selected={gender.value === "Male" ? true : false}
                  value="Male"
                >
                  Nam
                </option>
                <option
                  selected={gender.value === "Female" ? true : false}
                  value="Female"
                >
                  Nữ
                </option>
              </select>
            </div>
            <div className={styles.text}>
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                autoComplete="off"
                value={address.value}
                onChange={onChangeHandler}
                name="address"
              />
            </div>
            <div className={styles.text}>
              <label htmlFor="dob" autoComplete="off">
                Ngày sinh
              </label>
              <input
                type="date"
                id="dob"
                value={dob.value}
                onChange={onChangeHandler}
                min="1990-01-01"
                placeholder="dd-mm-yyyy"
                max={date}
                name="dob"
              />
              {/* <DateTimePicker onChange={onChange} value={value} className={styles.datetimepicker} calendarClassName={styles.calendar}/> */}
            </div>
            <div className={styles.text}>
              <label htmlFor="bio">Mô tả </label>
              <textarea
                id="bio"
                value={bio.value}
                onChange={onChangeHandler}
                name="bio"
              />
            </div>
            <input type="submit" value="Lưu" className={styles.btnSave} />
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
